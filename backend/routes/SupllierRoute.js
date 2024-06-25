import express from "express";
import {
  getSupllierById,
  getSuplliers,
  createSupllier,
  updateSupllier,
  deleteSupllier,
} from "../controllers/SupllierController.js";

const router = express.Router();

router.get("/suppliers", getSuplliers);
router.get("/suppliers/:id", getSupllierById);
router.post("/suppliers", createSupllier);
router.patch("/suppliers/:id", updateSupllier);
router.delete("/suppliers/:id", deleteSupllier);

export default router;
