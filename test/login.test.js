const assert = require('chai').assert;
const axios = require('axios');

describe('Login Tests', () => {
    it('Logs in a registered user', async () => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email: 'enyinna@test.com',
                    password: '75ty6756'
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("success" in response.data, 'failed');
        } catch (error) {
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
                url: 'http://localhost:3000/login',
                data: {
                    email: 'turii85u3yr',
                    password: ''
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

    it('Reject unregistered user login', async () => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email: 'brian@test.com',
                    password: 't7y7rruur'
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

    it('Reject login if email unverified', async () => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email: 'peter@test.com',
                    password: '75ty6756'
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