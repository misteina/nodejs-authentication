/*const assert = require('chai').assert;

const axios = require('axios');

describe('Email Verification Test', () => {
    it('Accepts valid verification link', () => {
        let result = false;
        axios({
            method: 'post',
            url: 'http://localhost:3000/verify-email',
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
        assert(result === true, 'failed');
    });

    it('Rejects invalid verification link', () => {
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
        assert(result === true, 'failed');
    });
});*/