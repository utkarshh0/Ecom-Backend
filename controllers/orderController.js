import { Order } from '../models/orderModel.js'
import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';

const getAllPlacedOrders = async (req, res) => {

    try{
        const { id } = req.user
        const orders = await Order.find({user : id})

        return res.status(200).json(orders)
    } catch(err){
        console.error(err)
        return res.status(500).json({ error : 'Error Fetching Orders'})
    }
}


const placeOrder = async (req, res) => {
    try {
        const { productId, quantity, shippingAddress, paymentMethod, isPaid, isDelivered } = req.body;
        const userId = req.user.id;

        if (!productId || !quantity || !shippingAddress || !paymentMethod) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the product and populate its seller field with seller's id
        const product = await Product.findById(productId).populate('seller', '_id');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const totalPrice = product.price * quantity;

        const newOrder = new Order({
            user: userId,
            seller: product.seller._id, // Extract the seller's ID from the populated data
            product: productId,
            quantity,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid,
            isDelivered
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating order' });
    }
};




const cancelOrder = (req, res) => {

    res.status(200).json({

        msg : 'Cancel order'
    })

}

export { getAllPlacedOrders, placeOrder, cancelOrder }