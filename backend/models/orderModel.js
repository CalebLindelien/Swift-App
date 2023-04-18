import mongoose from 'mongoose';

// create a new mongoose schema for the order collection in the database
const orderSchema = new mongoose.Schema(
  {
    // array of objects that contains order items and their details
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        // reference to the Product model
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    // shipping address information for the order
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    // payment method used for the order
    paymentMethod: { type: String, required: true },
    // payment result object containing payment details
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  // add timestamps for created at and updated at fields
  {
    timestamps: true,
  }
);

// create an Order model based on the order schema
const Order = mongoose.model('Order', orderSchema);

export default Order;
