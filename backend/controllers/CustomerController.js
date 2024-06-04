import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const { nama, no_hp, email } = req.body;
  try {
    const customer = await prisma.customer.create({
      data: {
        nama,
        no_hp,
        email,
      },
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { nama, no_hp, email } = req.body;
  try {
    const customer = await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: {
        nama,
        no_hp,
        email,
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
