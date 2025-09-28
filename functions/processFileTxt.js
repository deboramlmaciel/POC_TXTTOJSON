function processFile(content) {
  const raws = content.split('\n').map(l => l.trimEnd()).filter(l => l.length > 0);
  const data = raws.map(processLine);
  return data;
}

function processLine(line) {
  const userId = line.substr(0, 10).trimStart().replace(/^0+/, '');
  const name = line.substr(10, 45).trim();
  const orderId = line.substr(55, 10).trimStart().replace(/^0+/, '');
  const productId = line.substr(65, 10).trimStart().replace(/^0+/, '');
  const productValueRaw = line.substr(75, 12);
  const orderDateRaw = line.substr(87, 8);

  const productValue = parseFloat((parseInt(productValueRaw) / 100).toFixed(2));
  const orderDate = `${orderDateRaw.substr(0,4)}-${orderDateRaw.substr(4,2)}-${orderDateRaw.substr(6,2)}`;

  return {
    userId: parseInt(userId),
    name,
    orderId: parseInt(orderId),
    productId: parseInt(productId),
    productValue,
    orderDate
  };
}

module.exports = { processFile };