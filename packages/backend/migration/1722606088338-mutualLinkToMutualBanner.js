export class MutualLinkToMutualBanner1722606088338 {
    name = 'MutualLinkToMutualBanner1722606088338'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "mutualLinks"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "myMutualLink"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "myMutualLink" jsonb`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "mutualLinks" jsonb NOT NULL DEFAULT '[]'`);
    }
}
