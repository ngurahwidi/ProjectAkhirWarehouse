import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getKeluar = async ( req , res ) =>{
    try {
        const response = await prisma.barangKeluar.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const getKeluarById = async (req,res) =>{
    try {
        const response = await prisma.barangKeluar.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const createKeluar = async (req,res) =>{
    const {id_barang, tanggal, jumlah, id_customer } = req.body;
    try {
        const keluar = await prisma.barangKeluar.create({
            data:{
                barang : {connect : {id:id_barang}},
                jumlah,
                tanggal,
                customer:{connect : {id:id_customer}}
            }
        })

        await prisma.barang.update({
            where :{id : id_barang},
            data:{
                stok:{
                    decrement:jumlah
                }
            }
        })
        res.status(201).json(keluar)
    } catch (error) {
         res.status(400).json({ msg: error.message });
    }
}

export const updateKeluar = async (req, res) => {
    const { id_barang, tanggal, jumlah, id_customer } = req.body;
  
    try {
      const previousEntry = await prisma.barangKeluar.findUnique({
        where: {
          id: Number(req.params.id),
        },
        select: {
          barang: { select: { id: true } },
          jumlah: true,
        },
      });
  
      const entry = await prisma.barangKeluar.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          barang: { connect: { id: id_barang } },
          tanggal,
          jumlah,
          customer: { connect: { id: id_customer } },
        },
      });
  
      await prisma.barang.update({
        where: { id: previousEntry.barang.id },
        data: {
          stok: {
            increment: previousEntry.jumlah,
          },
        },
      });
  
      await prisma.barang.update({
        where: { id: id_barang },
        data: {
          stok: {
            decrement: jumlah,
          },
        },
      });
  
      res.status(200).json(entry);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  export const deleteKeluar = async (req, res) => {
    try {
      const entryToDelete = await prisma.barangKeluar.findUnique({
        where: {
          id: Number(req.params.id),
        },
        select: {
          barang: { select: { id: true } },
          jumlah: true,
        },
      });
  
      await prisma.barang.update({
        where: { id: entryToDelete.barang.id },
        data: {
          stok: {
            increment: entryToDelete.jumlah,
          },
        },
      });
  
      const deletedEntry = await prisma.barangKeluar.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      res.status(200).json(deletedEntry);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };