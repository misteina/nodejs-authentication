module.exports = function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const verifyPassword = req.body.verifyPassword;

    const validateEmail = require('email-validator');
    const passwordLength = password.trim().length;

    if (validateEmail.validate(email) && passwordLength > 3 && passwordLength < 21 && password === verifyPassword) {
        const testMode = req.header('Test-Mode');
        const file = (typeof testMode === 'undefined') ? './database/db.json' :'./database/test.db.json';
        
        const fs = require('fs');
        let database = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (!(email in database)){
            const bcrypt = require('bcrypt');

            const crypto = require("crypto");

            let cipher = crypto.createCipher('aes-128-cbc', '85jr7f78f');
            let token = cipher.update(email, 'utf8', 'hex');
            token += cipher.final('hex');

            bcrypt.hash(password, 10, function (err, hash) {
                database[email] = {name: name, password: hash, verified: token};

                const fs = require('fs');
                try {
                    fs.writeFileSync(file, database.join(','), 'utf-8');

                    if (typeof testMode !== 'undefined') {
                        database = JSON.parse(fs.readFileSync(file, 'utf8'));
                        if (database[email].password === hash && database[email].name === name && database[email].verified === token){
                            delete database[email];
                            res.json({ success: "You have been successfully registered" });
                        }
                    } else {
                        res.json({ success: "You have been successfully registered" });
                    }
                } catch (error) {
                    res.json({ error: "An error was encountered" });
                }
            });
        } else {
            res.json({error: "You email already exists"});
        }
    } else {
        res.json({ error: "Email or password is not valid" });
    }
}
