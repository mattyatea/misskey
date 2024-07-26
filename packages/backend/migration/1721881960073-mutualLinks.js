/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class MutualLinks1721881960073 {
    name = 'MutualLinks1721881960073'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "mutualLinks" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "myMutualLink" jsonb`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "mutualLinks"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "myMutualLink"`);
    }
}
