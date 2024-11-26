import { Product } from '../models/productModel.js'

const getAllProducts = (req, res) => {

    res.status(200).json({
        msg : 'Seller\'s All Products'
    })
}

const addProduct = (req, res) => {

    res.status(200).json({
        msg : 'Add Product'
    })
}

const deleteProduct = (req, res) => {

    res.status(200).json({
        msg : 'Delete Product'
    })
}

const updateProduct = (req, res) => {
    
    res.status(200).json({
        msg : 'Update Product Details'
    })
}

export { getAllProducts, addProduct, updateProduct, deleteProduct }