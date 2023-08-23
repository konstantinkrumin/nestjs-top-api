import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/test'),
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		UsersModule,
	],
})
export class AppModule {}
