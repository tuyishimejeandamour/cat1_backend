import { Controller, Get, Post, Body,  Param, NotFoundException,} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bill')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private readonly userService: UsersService
    ) {}

  @Post()
  create(@Body() createPostDto: CreateBillDto) {
      if (this.userService.findById(createPostDto.usernumber)) {
        return this.billService.create(createPostDto);
      }else{
        return new NotFoundException("user is notfound")
      }
    
     
  }

  @Get(':token')
  findOne(@Param('token') id: string) {
    return this.billService.findToken(+id);
  }
  @Get(':usernumber')
  findByNumber(@Param('usernumber') id: string) {
    return this.billService.findOne(+id);
  }

}
