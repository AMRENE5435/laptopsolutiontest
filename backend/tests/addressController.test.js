const request = require('supertest')
const app = require('../server')
const Address = require('../models/Address')

describe('Address Controller', () => {
  it('should fetch all addresses', async () => {
    const res = await request(app).get('/api/addresses')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  it('should add a new address', async () => {
    const res = await request(app)
      .post('/api/addresses')
      .send({
        street: '123 Main St',
        city: 'City',
        postalCode: '12345',
        country: 'Country',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body.message).toEqual('Address added successfully')
  })

  it('should update an address', async () => {
    const address = new Address({
      street: '123 Main St',
      city: 'City',
      postalCode: '12345',
      country: 'Country',
    })
    await address.save()

    const res = await request(app)
      .put(`/api/addresses/${address._id}`)
      .send({ city: 'Updated City' })
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('Address updated successfully')
  })
})
