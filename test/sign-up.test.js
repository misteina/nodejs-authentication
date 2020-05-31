/*const assert = require('chai').assert;
const axios = require('axios');

describe('Sign-up Tests', () => {
    it('Sign-up a new user', async () => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:3000/sign-up',
                data: {
                    name: 'Enyinna',
                    email: 'enyinna@test.com',
                    password: '75ty6756',
                    verfiyPassword: '75ty6756'
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("success" in response.data, 'failed');
        } catch(error) {
            assert(false, 'Node server not running');
        }
    });

    it('Rejects invalid credentials', async () => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:3000/sign-up',
                data: {
                    name: '#@*$%',
                    email: '05jtyy5',
                    password: '8uuytdd',
                    verfiyPassword: ''
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("error" in response.data, 'failed');
        } catch (error) {
            assert(false, 'Node server not running');
        }
    });

    it('Prevents duplicate sign-up', async () => {
        try {
            let = response = await axios({
                method: 'post',
                url: 'http://localhost:3000/sign-up',
                data: {
                    name: 'Enyinna',
                    email: 'enyinna@test.com',
                    password: '75ty6756',
                    verfiyPassword: '75ty6756'
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("error" in response.data, 'failed');
        } catch (error) {
            assert(false, 'Node server not running');
        }
    });
});*/