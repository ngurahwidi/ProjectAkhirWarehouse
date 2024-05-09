import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const getInputs = async (req, res) => {    
    try {
        const response = await prisma.barangMasuk.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getInputById = async (req, res) => {    
    console.log('apa');
    try {
        const response = await prisma.barangMasuk.findUnique({
            where:{
                id: Number(req.params.id)
            } 
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const createInput = async (req, res) => {
    const {id_barang, tanggal, jumlah, id_suppliers } = req.body;  
    try {
        
      const entry = await prisma.barangMasuk.create({
          data: {
              barang: { connect: { id: id_barang } },
              tanggal,
              jumlah,
              supplier: { connect: { id: id_suppliers } }
          }        
      });
      await prisma.barang.update({
        where: { id: id_barang },
            data: {
                stok: {
                    increment: jumlah
                }
            }
        });
      console.log('New entry created:', entry);
      res.status(201).json(entry);
  } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  export const updateInput = async (req, res) => {
    const { id_barang, tanggal, jumlah, id_suppliers } = req.body;
  
    try {
      const previousEntry = await prisma.barangMasuk.findUnique({
        where: {
          id: Number(req.params.id),
        },
        select: {
          barang: { select: { id: true } },
          jumlah: true,
        },
      });
  
      const entry = await prisma.barangMasuk.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          barang: { connect: { id: id_barang } },
          tanggal,
          jumlah,
          supplier: { connect: { id: id_suppliers } },
        },
      });
  
      await prisma.barang.update({
        where: { id: previousEntry.barang.id },
        data: {
          stok: {
            decrement: previousEntry.jumlah,
          },
        },
      });
  
      await prisma.barang.update({
        where: { id: id_barang },
        data: {
          stok: {
            increment: jumlah,
          },
        },
      });
  
      res.status(200).json(entry);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  export const deleteInput = async (req, res) => {
    try {
      const entryToDelete = await prisma.barangMasuk.findUnique({
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
            decrement: entryToDelete.jumlah,
          },
        },
      });
  
      const deletedEntry = await prisma.barangMasuk.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      res.status(200).json(deletedEntry);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };