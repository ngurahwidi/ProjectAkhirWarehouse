-- CreateTable
CREATE TABLE `Barang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BarangKeluar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `id_barang` INTEGER NOT NULL,
    `id_customers` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BarangMasuk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `id_barang` INTEGER NOT NULL,
    `id_suppliers` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NULL,
    `no_hp` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BarangKeluar` ADD CONSTRAINT `BarangKeluar_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `Barang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangKeluar` ADD CONSTRAINT `BarangKeluar_id_customers_fkey` FOREIGN KEY (`id_customers`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangMasuk` ADD CONSTRAINT `BarangMasuk_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `Barang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangMasuk` ADD CONSTRAINT `BarangMasuk_id_suppliers_fkey` FOREIGN KEY (`id_suppliers`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
