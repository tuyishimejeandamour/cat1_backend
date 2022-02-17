import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { PostsController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './entities/bill.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Bill.name, schema: BillSchema },
  ])],
  controllers: [PostsController],
  providers: [BillService]
})
export class BillsModule { }
