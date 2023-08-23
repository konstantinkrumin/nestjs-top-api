import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	controllers: [AuthController],
	imports: [MongooseModule.forFeature([{ name: AuthModel, schema: AuthSchema }])],
})
export class AuthModule {}
