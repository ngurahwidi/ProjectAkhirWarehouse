import express from "express"
import {
    getProducts,
    getProductById,
    createProduct,
    createProductWithbarangMasuk,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js"
const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products', createProduct)
router.post('/products/create-with-masuk', createProductWithbarangMasuk);
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router;