import express from "express"
import {
    getInputs,
    getInputById,
    createInput,
    updateInput,
    deleteInput
} from "../controllers/InputController.js"
const router = express.Router()

router.get('/inputs', getInputs)
router.get('/inputs/:id', getInputById)
router.post('/inputs', createInput)
router.patch('/inputs/:id', updateInput)
router.delete('/inputs/:id', deleteInput)

export default router;