import Order from "../model/orderModel.js";
import User from "../model/userModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items found in order" });
    }

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    
    await User.findByIdAndUpdate(userId, { cartData: {} });

    
    return res.status(201).json({ message: "Order Placed", order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order Place error", error });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "userOrders error", error });
  }
};


// For Admin 
export  const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders error"})
        
    }
}

export const updateStatus = async (req ,res) => {
    try {
        const {orderId , status} = req.body
        await Order.findByIdAndUpdate(orderId , { status })
        return res.status(201).json({message:"Status Updated"})
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
}
