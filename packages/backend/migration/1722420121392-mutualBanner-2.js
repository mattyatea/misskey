export class MutualBanner1722420121392 {
    name = 'MutualBanner1722420121392'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_banner" ADD "url" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "user_banner" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user_banner" ADD "description" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "user_banner" ADD CONSTRAINT "FK_5fcb453ec5e2d42c87e3ef2a254" FOREIGN KEY ("ownerUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_banner" DROP CONSTRAINT "FK_5fcb453ec5e2d42c87e3ef2a254"`);
        await queryRunner.query(`ALTER TABLE "user_banner" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user_banner" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "user_banner" DROP COLUMN "url"`);
    }
}
