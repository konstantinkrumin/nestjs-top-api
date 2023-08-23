import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		// MongooseModule.forRoot('mongo://localhost/test'),
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
	],
})
export class AppModule {}
