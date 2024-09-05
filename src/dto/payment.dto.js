class PaymentProduct {
  constructor(data) {
    this.price_data = {
      product_data: { name: data.product_id.title },
      currency: "usd",
      unit_amount: Math.round(data.product_id.price * 100), // Plataforma cobra en centavos de dolar
    };

    this.quantity = data.quantity;
  }
}

export default PaymentProduct;
