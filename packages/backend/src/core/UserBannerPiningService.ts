import { Inject, Injectable } from '@nestjs/common';
import { bindThis } from '@/decorators.js';
import { MiUser } from '@/models/User.js';
import { MiUserBanner } from '@/models/UserBanner.js';
import type { MiUserBannerPining, UserBannerPiningRepository, UserBannerRepository } from '@/models/_.js';
import { DI } from '@/di-symbols.js';
import { IdentifiableError } from '@/misc/identifiable-error.js';
import { IdService } from '@/core/IdService.js';

@Injectable()
export class UserBannerPiningService {
	constructor(
		@Inject(DI.userBannerRepository)
		private userBannerRepository: UserBannerRepository,
		@Inject(DI.userBannerPiningRepository)
		private userBannerPiningRepository: UserBannerPiningRepository,

		private idService: IdService,
	) {

	}

	/**
	*	指定したユーザーのバナーをピン留めします
	* @param userId
	* @param bannerId
	*/
	@bindThis
	public async addPinned(userId:MiUser['id'], bannerId: MiUserBanner['id']) {
		const banner = await this.userBannerRepository.findOneBy({
			id: bannerId,
		});

		if (banner == null) {
			throw new IdentifiableError('2bdd48b9-f47d-4bbf-94cc-a23a832e2c16', 'No such banner.');
		}

		if (banner.userId === userId) throw new IdentifiableError('a30cd192-b837-4f63-ba31-b338a45731ff', 'You can only pin your own banner.');
		const exist = await this.userBannerPiningRepository.exists({
			where: {
				userId,
				pinnedBannerId: bannerId,
			},
		});

		if (exist) throw new IdentifiableError('adbbf6f5-bbce-4685-889f-ee04fcc8b812', 'Already pinned.');

		await this.userBannerPiningRepository.insert({
			id: this.idService.gen(),
			userId,
			pinnedBannerId: banner.id,
		} as MiUserBannerPining);
	}

	/**
	 * 指定したユーザーのバナーのピン留めを解除します
	 * @param userId
	 * @param bannerId
	 */
	@bindThis
	public async removePinned(userId:MiUser['id'], bannerId:MiUserBanner['id']) {
		const banner = await this.userBannerRepository.findOneBy({
			id: bannerId,
		});

		if (banner == null) {
			throw new IdentifiableError('33f1f95e-d52c-408c-8754-70a9334a868e', 'No such banner.');
		}

		await this.userBannerPiningRepository.delete({
			userId,
			pinnedBannerId: bannerId,
		});
	}
}
