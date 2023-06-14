/*
  Warnings:

  - The primary key for the `Expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Expenses` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `VarChar(36)`.

*/
-- DropIndex
DROP INDEX `id` ON `Expenses`;

-- AlterTable
ALTER TABLE `Expenses` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    ADD PRIMARY KEY (`id`);
