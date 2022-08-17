const request = require('supertest')
const app = require('../index')

describe('Tests auth routes', () => {
   it('POST /api/auth/register -> creates new user', () => {
      return request(app)
         .post('/api/auth/register').send({
            "username": "verynewname02",
            "password": "Password123_"
         })
         .set('Content-Type', 'application/json')
         .expect(200)
         .then(response => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  status: 0,
                  user: expect.any(Object)
               })
            )
         })
   })

   it('POST /api/auth/register -> returns 400 response', () => {
      return request(app)
         .post('/api/auth/register')
         .expect('Content-Type', /json/)
         .expect(400)
         .then(response => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  status: 1,
                  error: expect.any(String)
               })
            )
         })
   })

   it('POST /api/auth/login -> signs in a user', () => {
      return request(app)
         .post('/api/auth/login').send({
            "username": "verynewname04",
            "password": "Password123_"
         })
         .set('Content-Type', 'application/json')
         .expect(200)
         .then(response => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  status: 1,
                  message: "Logged in"
               })
            )
         })
   })
})