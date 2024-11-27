import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    user : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'User' },
    orderItems : [
        {
            product : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'Product' },
            quantity : { type : Number, required : true }
        }
    ],
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false }, 
    isDelivered: { type: Boolean, default: false }
})

export const Order = mongoose.model('Order', orderSchema)