import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModel } from './user.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getJWTConfig } from '../configs/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	controllers: [AuthController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
	],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
