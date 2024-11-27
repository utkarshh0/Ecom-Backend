import { Product } from '../models/productModel.js'

const getAllProducts = async (req, res) => {
    try {
        const seller = req.user.id 

        const products = await Product.find({ seller })
        if (!products.length) {
            return res.status(404).json({ message: 'No products found' })
        }

        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error fetching products' })
    }
}

const addProduct = async (req, res) => {
    try {
        const seller = req.user.id 

        const { title, description, price, category, stock } = req.body
        if (!title || !description || !price || !category || !stock) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const product = new Product({ seller, title, description, price, category, stock })
        await product.save()

        res.status(201).json({ message: 'Product added successfully', product })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error adding product' })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' })
        }

        const product = await Product.findOneAndDelete({ _id: productId, seller: req.user.id })
        if (!product) {
            return res.status(404).json({ message: 'Product not found or not owned by you' })
        }

        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error deleting product' })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId, ...updates } = req.body
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' })
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId, seller: req.user.id },
            updates,
            { new: true }
        )
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found or not owned by you' })
        }

        res.status(200).json({ message: 'Product updated successfully', updatedProduct })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error updating product' })
    }
}

export { getAllProducts, addProduct, updateProduct, deleteProduct }
