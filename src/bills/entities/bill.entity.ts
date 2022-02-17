import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Bill {
    _id?: string;
    @Prop({ required: true })
    usernumber: number;
    @Prop({reguired:true})
    token:number
    @Prop({ required: true })
    expired: number;
    @Prop({required: true})
    createAt:number
}

export type BillDocument = Bill & mongoose.Document;
export const BillSchema = SchemaFactory.createForClass(Bill);
BillSchema.index({ userNumber: 1 });


