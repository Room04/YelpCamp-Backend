const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})

describe('Tests auth routes', () => {
   // it('POST /api/auth/register -> creates new user', () => {
   //    return request(app)
   //       .post('/api/auth/register').send({
   //          "username": "verynewname02",
   //          "password": "Password123_"
   //       })
   //       .set('Content-Type', 'application/json')
   //       .expect(200)
   //       .then(response => {
   //          expect(response.body).toEqual(
   //             expect.objectContaining({
   //                status: 0,
   //                user: expect.any(Object)
   //             })
   //          )
   //       })
   // })

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
      done()
   })

   // check for invalid password
   it('POST /api/auth/login -> signs in a user', () => {
      return request(app)
         .post('/api/auth/login').send({
            "username": "heroku",
            "password": "Password123"
         })
         .set('Content-Type', 'application/json')
         .expect(403)
         .then(response => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  status: 1,
                  message: "Invalid password"
               })
            )
         })
      done()
   })

   // test for succesful login
   it('POST /api/auth/login -> signs in a user', () => {
      return request(app)
         .post('/api/auth/login').send({
            "username": "heroku",
            "password": "Password123_"
         })
         .set('Content-Type', 'application/json')
         .expect(200)
         .then(response => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  status: 0,
                  token: expect.any(String)
               })
            )
         })
      done()
   })

   // tests the logout route
   it('POST /api/auth/logout -> Returns Access Denied', () => {
      return request(app)
      .post('/api/auth/logout')
      .expect(401)
      .then(response => {
         expect(response.body).toEqual(
            expect.objectContaining({
               status: 1,
               error: "Access Denied"
            })
         )
      })
   })
})
