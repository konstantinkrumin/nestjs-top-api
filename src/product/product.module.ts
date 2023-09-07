import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
	controllers: [ProductController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductModel,
				schemaOptions: {
					collection: 'Product',
				},
			},
		]),
	],
	providers: [ProductService],
})
export class ProductModule {}
