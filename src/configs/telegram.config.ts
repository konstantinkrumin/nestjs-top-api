import { ITelegramOptions } from 'src/telegram/telergram.interface';

export const getTelegramConfig = (): ITelegramOptions => {
	return {
		token: '',
		chatId: '',
	};
};
