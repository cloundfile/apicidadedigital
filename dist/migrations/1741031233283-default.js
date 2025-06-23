"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1741031233283 = void 0;
class Default1741031233283 {
    constructor() {
        this.name = 'Default1741031233283';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "CHUNKS" ADD "LANGUAGE" varchar2(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "CHUNKS" DROP COLUMN "LANGUAGE"`);
    }
}
exports.Default1741031233283 = Default1741031233283;
