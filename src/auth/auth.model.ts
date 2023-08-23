import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

export interface AuthModel extends Base {}
@Schema({ timestamps: true })
export class AuthModel {
	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
