import express from "express";
import {
   getKeluar,
   getKeluarById,
   createKeluar,
   updateKeluar,
   deleteKeluar
} from "../controllers/BarangKeluar.js";

const router = express.Router();

router.get('/keluar', getKeluar);
router.get('/keluar/:id', getKeluarById);
router.post('/keluar', createKeluar);
router.patch('/keluar/:id', updateKeluar);
router.delete('/keluar/:id', deleteKeluar);

export default router;
