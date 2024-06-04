import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSuppliers = async (req, res) => {
  try {
    const response = await prisma.supplier.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const response = await prisma.supplier.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createSupplier = async (req, res) => {
  const { nama, no_hp, email } = req.body;
  try {
    const response = await prisma.supplier.create({
      data: {
        nama,
        no_hp,
        email,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { nama, no_hp, email } = req.body;
  try {
    const response = await prisma.supplier.update({
      where: {
        id: Number(id),
      },
      data: {
        nama,
        no_hp,
        email,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const response = await prisma.supplier.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
