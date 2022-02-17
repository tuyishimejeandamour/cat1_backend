import { Module } from '@nestjs/common';
import { PostsService } from './bill.service';
import { PostsController } from './bill.controller';

@Module({
  controllers: [PostsController],
  providers: [PostsService]
})
export class BillsModule {}
