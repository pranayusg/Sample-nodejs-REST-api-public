const request = require('supertest');
const app = require('../../app');

const data = {
  mail: process.env.TEST_MAIL,
  password: process.env.TEST_PASS,
};

const country = 'India';

describe('/covid/country/name', () => {
  test('Test covid endpoint with query parameter', async () => {
    const res = await request(app).post('/users/signin').send(data);
    const covidRes = await request(app)
      .get(`/covid/country/name?country=${country}`)
      .set({
        accept: 'application/json',
        authorization: `Bearer ${res.body.token}`,
      });

    expect(covidRes.status).toBe(200);
    expect(covidRes.body.country).toBe(country);
    expect(covidRes.body).toHaveProperty('infected');
  });
});

describe('/covid/country/name/:name', () => {
  test('Test covid endpoint with path parameter', async () => {
    const res = await request(app).post('/users/signin').send(data);
    const covidRes = await request(app)
      .get(`/covid/country/name/${country}`)
      .set({
        accept: 'application/json',
        authorization: `Bearer ${res.body.token}`,
      });

    expect(covidRes.status).toBe(200);
    expect(covidRes.body.country).toBe(country);
    expect(covidRes.body).toHaveProperty('infected');
  });
});
