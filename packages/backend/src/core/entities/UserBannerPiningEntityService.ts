import { Inject, Injectable } from '@nestjs/common';
import { bindThis } from '@/decorators.js';
import type { MiUser } from '@/models/User.js';
import { DI } from '@/di-symbols.js';
import type { MiUserBannerPining, UserBannerRepository } from '@/models/_.js';
import { IdentifiableError } from '@/misc/identifiable-error.js';
import { UserBannerEntityService } from '@/core/entities/UserBannerEntityService.js';

@Injectable()
export class UserBannerPiningEntityService {
	constructor(
		@Inject(DI.userBannerRepository)
		private userBannerRepository: UserBannerRepository,
		private userBannerEntityService: UserBannerEntityService,
	) {}

	@bindThis
	public async packMany(
		src: MiUserBannerPining[],
		me: { id: MiUser['id'] } | null | undefined,
	) {
		return await Promise.all(src.map(async pining => {
			const bannerId = pining.pinnedBannerId;
			if (bannerId === null) {
				throw new IdentifiableError('5c908a72-e7d5-4176-95a9-aeb93f3844e4', 'Pinned banner ID is null.');
			}
			const banner = await this.userBannerRepository.findOneByOrFail({ id: bannerId });
			if (!banner) throw new IdentifiableError('e1dfb757-c85f-44b5-a874-f648685ff3f6', 'No such piningBanner.');
			return this.userBannerEntityService.pack(banner, me);
		}));
	}
}
