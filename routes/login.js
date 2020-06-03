module.exports = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const validateEmail = require('email-validator');
    const passwordLength = password.trim().length;

    if (validateEmail.validate(email) && passwordLength > 3 && passwordLength < 21) {
        let testMode = req.header('Test-Mode');
        let file = (typeof testMode === 'undefined') ? './database/db.json' :'./database/test.db.json';
        
        const fs = require('fs');
        const database = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (email in database) {
            if (database[email].verified === 'yes'){
                const bcrypt = require('bcrypt');
                const hashedPassword = database[email].password;

                bcrypt.compare(password, hashedPassword, function (err, result) {
                    if (result) {
                        let message = `Hello ${database[email].name}, you have been logged in.`;
                        res.json({ success: message });
                    }
                });
            } else {
                res.json({ error: "Your email is not yet verified" });
            }
        } else {
            res.json({ error: "Your are not registered" });
        }
    } else {
        res.json({ error: "Your email or password is not valid" });
    }
}
