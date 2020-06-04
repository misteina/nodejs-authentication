const assert = require('chai').assert;
const axios = require('axios');

describe('Email Verification Test', () => {
    it('Accepts valid verification link', async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/verify-email',
                data: {
                    token: '70664b32a9980691f936458da7c48a5d',
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

    it('Rejects invalid verification link', async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/verify-email',
                data: {
                    token: '86494b32a3420691f046774da7c49fh3',
                },
                headers: { 'Test-Mode': 'Yes' }
            });
            assert("error" in response.data, 'failed');
        } catch (error) {
            if (typeof error.response !== 'undefined'){
                assert(false, error.response.data);
            } else {
                assert(false, 'Node server not running');
            }
        }
    });
});