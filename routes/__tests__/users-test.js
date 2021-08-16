/**
 * This exercises and tests code in server/routes/api/users.js
 * Tests are all passing in my dev environment Jul 9 2021.
 */
const mongoose = require("mongoose");
require('../../models/Users');

const Users = mongoose.model('Users');

const supertest = require("supertest");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// User the router.
const index = require("../index");

// bodyParser is deprecated. 
// It is required in order to get the JSON body parsed.
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

// set up test datastore. Call it JestDB to avoid clashing with other datastores
beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestDB",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

// tear down our test datastore
afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

// Sanity check to see if Jest is working.
it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
})
 
describe('user creation tests', () => {
    test("POST to create user should succeed : POST /api/users/", async () => {
        const testObj = {user : {email: "test@example.com", username: "Hello Person"} };
        await supertest(app).post("/api/users/")
        .send(testObj)
        .expect(200)
        .then((response) => {
            expect(response.body instanceof Object).toBeTruthy();
            expect(response.body.user instanceof Object).toBeTruthy();
            expect(response.body.success).toEqual(true);
            expect(typeof response.body.user._id).toEqual('string');
            expect(response.body.user._id.length).toEqual(24);
            expect(response.body.user.email).toEqual(testObj.user.email);
            expect(response.body.user.username).toEqual(testObj.user.username);
        });
    });
});