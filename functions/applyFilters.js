function applyFilters(data, query) {
  const { orderId, beginDate, finalDate } = query;

  let result = data;

  if (orderId) {
    result = result.filter(d => d.orderId === parseInt(orderId));
  }

  if ((beginDate && !finalDate) || (!beginDate && finalDate)) {
    throw new Error('Para filtrar por data, informe os dois parâmetros: beginDate e finalDate');
  }

  if (beginDate && finalDate) {
    const bDate = new Date(beginDate);
    const eDate = new Date(finalDate);

    result = result.filter(r => {
      const orderDate = new Date(r.orderDate);
      return orderDate >= bDate && orderDate <= eDate;
    });
  }

  return result;
}

module.exports = { applyFilters };
