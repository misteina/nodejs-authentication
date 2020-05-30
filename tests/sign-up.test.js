const expect = require('chai').expect;

const axios = require('axios');

describe('Checking ability to sign-up...', () => {
    it('Sign-up a new user', () => {
        let result = false;
        axios({
            method: 'post',
            url: 'http://localhost:3000/sign-up',
            data: {
                name: 'Enyinna',
                email: 'enyinna@test.com',
                password: '75ty6756',
                verfiyPassword: '75ty6756'
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
            url: 'http://localhost:3000/sign-up',
            data: {
                name: '#@*$%',
                email: '05jtyy5',
                password: '8uuytdd',
                verfiyPassword: ''
            },
            headers: { 'Test-Mode': 'Yes' }
        }).then(function (response) {
            result = response;
        }).catch(function (error) {
            return;
        });
        expect(result).to.be(true);
    });

    it('Prevents duplicate sign-up', () => {
        let result = false;
        axios({
            method: 'post',
            url: 'http://localhost:3000/sign-up',
            data: {
                name: 'Enyinna',
                email: 'enyinna@test.com',
                password: '75ty6756',
                verfiyPassword: '75ty6756'
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