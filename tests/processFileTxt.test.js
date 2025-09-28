const request = require('supertest');
const app = require('../index');
const path = require('path');
const txtFile = path.join(__dirname, '../files_example/data_1.txt');

describe('POST /processFile', () => {
  it('retornar erro 400 se não receber nenhum arquivo', async () => {
    const res = await request(app).post('/processFile');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Arquivo não foi enviado!');
  });

  it('processar um arquivo e retornar JSON dos dados', async () => {
    const res = await request(app)
      .post('/processFile')
      .attach('file', txtFile);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('user_id');
  },50000);

  it('filtrar por orderId', async () => {
    const res = await request(app)
      .post('/processFile?orderId=123')
      .attach('file', txtFile);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const orderIds = res.body
      .flatMap(user => user.orders)   
      .map(order => order.order_id);

    expect(orderIds.every(id => id === 123)).toBe(true); 
  });

  it('filtrar por data', async () => {
    const res = await request(app)
      .post('/processFile?beginDate=2021-03-25&finalDate=2021-03-25')
      .attach('file', txtFile);

    const beginDate = new Date('2021-03-25');
    const finalDate = new Date('2021-03-25');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const orders = res.body.flatMap(user => user.orders);
    const validDates = orders.every(order => {
      const orderDate = new Date(order.date);
      return orderDate >= beginDate && orderDate <= finalDate;
    });

    expect(validDates).toBe(true);
  });

  it('retornar erro ao enviar arquivo inválido', async () => {
    const res = await request(app)
      .post('/processFile')
      .attach('file', Buffer.from(''), 'arquivo.txt')
      .expect(400); 

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/Arquivo inválido: vazio/i);
  });
});