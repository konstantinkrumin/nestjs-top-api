import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

import { Types } from 'mongoose';
import { addDays } from 'date-fns';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

	@UseGuards(JwtAuthGuard)
	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async findByCategory(dto: FindTopPageDto) {
		return this.topPageModel
			.aggregate([
				{
					$match: {
						firstCategory: dto.firstCategory,
					},
				},
				{
					$group: {
						_id: { secondCategory: '$secondCategory' },
						pages: {
							$push: {
								alias: '$alias',
								title: '$title',
							},
						},
					},
				},
			])
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel
			.find({
				$text: {
					$search: text,
					$caseSensitive: false,
				},
			})
			.exec();
	}

	@UseGuards(JwtAuthGuard)
	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	@UseGuards(JwtAuthGuard)
	async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findForHhUpdate(date: Date) {
		return this.topPageModel
			.find({
				firstCategory: 0,
				$or: [
					{ 'hh.updatedAt': { $lt: addDays(date, -1) } },
					{ 'hh.updatedAt': { $exists: false } },
				],
			})
			.exec();
	}
}
