import express from "express";
import {
  getSupplierById,
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/SupplierController.js";

const router = express.Router();

router.get("/suppliers", getSuppliers);
router.get("/suppliers/:id", getSupplierById);
router.post("/suppliers", createSupplier);
router.patch("/suppliers/:id", updateSupplier);
router.delete("/suppliers/:id", deleteSupplier);

export default router;
