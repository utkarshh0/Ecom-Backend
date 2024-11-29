import { Order } from "../models/orderModel.js"
import { Product } from "../models/productModel.js"


const getAllPlacedOrders = async (req, res) => {

    try{
        const orders = await Order.find()
        return res.status(200).json({orders})
    } catch(err){
        console.error(err)
        return res.status(500).json({ error : 'Error Fetching Orders'})
    }
}

const getAllPlacedOrdersByUser = async (req, res) => {

    try{
        // For normal users, use req.user.id
        let id = req.user.id

        // If the request is from admin, userId will be in req.body
        if (req.user.role === 'admin') {
            id = req.body.userId // Admin passes userId in the body to update any user's profile
        }
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


const cancelOrder = async (req, res) => {
    try {
        const orderId = req.body.orderId  // Get the orderId from the request params

        // Find the order by its ID
        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        // Check if the order is already delivered (so it cannot be cancelled)
        if (order.isDelivered) {
            return res.status(400).json({ error: 'Order has already been delivered and cannot be cancelled' })
        }

        // Delete the order if it's not delivered
        await Order.findByIdAndDelete(orderId)

        return res.status(200).json({ message: 'Order has been successfully cancelled and deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Error cancelling and deleting the order' })
    }
}


export {getAllPlacedOrders, getAllPlacedOrdersByUser, placeOrder, cancelOrder}