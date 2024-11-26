import { Order } from '../models/orderModel.js'

const getAllPlacedOrders = (req, res) => {

    res.status(200).json({

        msg : 'All placed order'
    })
}


const placeOrder = (req, res) => {

    res.status(200).json({

        msg : 'Placed order'
    })
}

const cancelOrder = (req, res) => {

    res.status(200).json({

        msg : 'Cancel order'
    })

}

export { getAllPlacedOrders, placeOrder, cancelOrder }