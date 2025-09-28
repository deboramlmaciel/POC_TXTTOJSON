function formatResponse(data) {
  const users = new Map();

  data.forEach(d => {
    const {
      userId,
      name,
      orderId,
      productId,
      productValue,
      orderDate
    } = d;

    if (!users.has(userId)) {
      users.set(userId, {
        user_id: userId,
        name: name,
        orders: []
      });
    }

    const user = users.get(userId);

    let order = user.orders.find(p => p.order_id === orderId);

    if (!order) {
      order = {
        order_id: orderId,
        total: 0,
        date: orderDate,
        products: []
      };
      user.orders.push(order);
    }

    order.products.push({
      product_id: productId,
      value: productValue.toFixed(2)
    });

    order.total = (parseFloat(order.total) + parseFloat(productValue)).toFixed(2);
  });

  return Array.from(users.values());
}

module.exports = { formatResponse };