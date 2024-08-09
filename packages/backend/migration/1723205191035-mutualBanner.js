export class MutualBanner1723205191035 {
    name = 'MutualBanner1723205191035'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_banner_pining" DROP CONSTRAINT "FK_d13be8242980f7018d664f780f6"`);
        await queryRunner.query(`ALTER TABLE "user_banner_pining" ALTER COLUMN "pinnedBannerId" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7d51b5a8ae859e0023a98837a1" ON "user_banner_pining" ("userId", "pinnedBannerId") `);
        await queryRunner.query(`ALTER TABLE "user_banner_pining" ADD CONSTRAINT "FK_d13be8242980f7018d664f780f6" FOREIGN KEY ("pinnedBannerId") REFERENCES "user_banner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_banner_pining" DROP CONSTRAINT "FK_d13be8242980f7018d664f780f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d51b5a8ae859e0023a98837a1"`);
        await queryRunner.query(`ALTER TABLE "user_banner_pining" ALTER COLUMN "pinnedBannerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_banner_pining" ADD CONSTRAINT "FK_d13be8242980f7018d664f780f6" FOREIGN KEY ("pinnedBannerId") REFERENCES "user_banner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
