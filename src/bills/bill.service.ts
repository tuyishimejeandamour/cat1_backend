import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBillDto } from './dto/create-bill.dto';
import { Model } from 'mongoose';
import { Bill, BillDocument } from './entities/bill.entity';
import { calculateExpireDate } from 'src/utils/tokenValidation';

@Injectable()
export class BillService {

  constructor(
    @InjectModel(Bill.name)
    private templateModel: Model<BillDocument>
  ) { }
  create(createBillDto: CreateBillDto) {
    if (createBillDto.amount < 100) {
      return
    }

    if ((createBillDto.amount % 100) != 0) {
      return
    }

    if (createBillDto.amount / 100 > 365 * 5) {
      return
    }
    const data = { ...createBillDto, expire:calculateExpireDate(createBillDto.amount) , createAt:Date.now() }
    return this.templateModel.create(data)


  }

  async findToken(token: number) {
    const toke = await this.templateModel.findOne({token:token})
    if (!this.isExipered(toke)) {
      return new NotAcceptableException("token is expired")
    }
    return {...toke,remain:this.remain(toke)}
  }
  isExipered(token) {
    const remain = this.remain(token)
    if(remain > 0){
      return true;
    }else{
      return false
    }
  }
  remain(token){
    return  Date.now() - new Date().setDate(new Date(token.token).getDate()+token.expiredat)
  }

  findOne(userNumber: number) {
    return this.templateModel.find({ usernumber: userNumber });
  }

}
