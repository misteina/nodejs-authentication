const assert = require('chai').assert;
const axios = require('axios');

describe('Sign-up Tests', () => {
    it('Sign-up a new user', async () => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:3000/sign-up',
                data: {
                    name: 'Susan',
                    email: 'susan@test.com',
                    password: '75ty6756',
                    verifyPassword: '75ty6756'
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("success" in response.data, 'failed');
        } catch(error) {
            if (typeof error.response !== 'undefined') {
                assert(false, error.response.data);
            } else {
                assert(false, 'Node server not running');
            }
        }
    });

    it('Reject invalid credentials', async () => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:3000/sign-up',
                data: {
                    name: '#@*$%',
                    email: '05jtyy5',
                    password: '8uuytdd',
                    verifyPassword: ''
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("error" in response.data, 'failed');
        } catch (error) {
            if (typeof error.response !== 'undefined') {
                assert(false, error.response.data);
            } else {
                assert(false, 'Node server not running');
            }
        }
    });

    it('Prevent duplicate sign-up', async () => {
        try {
            let = response = await axios({
                method: 'post',
                url: 'http://localhost:3000/sign-up',
                data: {
                    name: 'Enyinna',
                    email: 'enyinna@test.com',
                    password: '75ty6756',
                    verifyPassword: '75ty6756'
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("error" in response.data, 'failed');
        } catch (error) {
            if (typeof error.response !== 'undefined') {
                assert(false, error.response.data);
            } else {
                assert(false, 'Node server not running');
            }
        }
    });
});