import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BillsModule } from './bills/bill.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, BillsModule,MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
