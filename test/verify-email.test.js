/*const assert = require('chai').assert;
const axios = require('axios');

describe('Email Verification Test', () => {
    it('Accepts valid verification link', async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/verify-email/' + token,
                headers: { 'Test-Mode': 'Yes' }
            });
            assert(success in response.data, 'failed');
        } catch (error) {
            assert(false, error.response.data);
        }
    });

    it('Rejects invalid verification link', async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/verify-email/' + token,
                headers: { 'Test-Mode': 'Yes' }
            });
            assert(success in response.data, 'failed');
        } catch (error) {
            assert(false, error.response.data);
        }
    });
});*/