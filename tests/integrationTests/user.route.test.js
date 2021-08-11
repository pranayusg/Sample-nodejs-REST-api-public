const request = require('supertest');
const app = require('../../app');

const data = {
  mail: process.env.TEST_MAIL,
  password: process.env.TEST_PASS,
};

describe('/user/signin', () => {
  test('Test token generation', async () => {
    const res = await request(app).post('/users/signin').send(data);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('/user/decodetoken', () => {
  test('Test token generation', async () => {
    const res = await request(app).post('/users/signin').send(data);

    const decodedTokenRes = await request(app)
      .get('/users/decodetoken')
      .set({
        accept: 'application/json',
        authorization: `Bearer ${res.body.token}`,
      });

    expect(decodedTokenRes.status).toBe(200);
    expect(decodedTokenRes.body.mail).toBe(process.env.TEST_MAIL);
    expect(decodedTokenRes.body).toHaveProperty('tokenDuration');
  });
});
