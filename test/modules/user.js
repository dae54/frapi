let mongoose = require('mongoose')
let chai = require('chai')
let user = require('../../modules/users/user.model')

const request = require('supertest')
// const express = require('express')
const app = express()

describe('POST user', function () {
    before((done) => {
        console.log('1')
        done();
    });
    after((done) => {
        console.log('2')
        done();
    })
    it('creating a new user works', function (done) {
        console.log(3)
        request(app).post('/user/register')
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(4)
                expect(body).to.contain.property('firstName');
                expect(body).to.contain.property('lastName');
                expect(body).to.contain.property('email');
                expect(body).to.contain.property('gender');
                expect(body).to.contain.property('phoneNumber');
                expect(body).to.contain.property('physicalAddress');
                done();
                console.log(5)
            })
    });
});