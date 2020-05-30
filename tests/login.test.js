const expect = require('chai').expect;

const axios = require('axios');

describe('Checking ability to login...', () => {
    it('Logs in a registered user', () => {
        let result = false;
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                email: 'enyinna@test.com',
                password: '75ty6756'
            },
            headers: { 'Test-Mode': 'Yes' }
        }).then(function (response) {
            result = response;
        }).catch(function (error) {
            return;
        });
        expect(result).to.be(true);
    });

    it('Rejects invalid credentials', () => {
        let result = false;
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                email: 'turii85u3yr',
                password: ''
            },
            headers: { 'Test-Mode': 'Yes' }
        }).then(function (response) {
            result = response;
        }).catch(function (error) {
            return;
        });
        expect(result).to.be(true);
    });

    it('Checks unregistered user', () => {
        let result = false;
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                email: 'enyinna@test.com',
                password: '75ty6756'
            },
            headers: { 'Test-Mode': 'Yes' }
        }).then(function (response) {
            result = response;
        }).catch(function (error) {
            return;
        });
        expect(result).to.be(true);
    });

    it('Checks if email is unverified', () => {
        let result = false;
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                email: 'enyinna@test.com',
                password: '75ty6756'
            },
            headers: { 'Test-Mode': 'Yes' }
        }).then(function (response) {
            result = response;
        }).catch(function (error) {
            return;
        });
        expect(result).to.be(true);
    });
});