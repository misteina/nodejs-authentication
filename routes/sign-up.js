module.exports = function (req, res) {
    if (req.method === 'GET') {
        res.render('login', function (err, html) {
            res.send(html);
        });
    } else if (req.method === 'POST') {
        const email = req.body.name;
        const password = req.body.password;

        const validateEmail = require('email-validator');
        const passwordLength = password.trim().length;

        if (validateEmail.validate(email) && passwordLength > 3 && passwordLength < 21) {
            const bcrypt = require('bcrypt');

            bcrypt.hash(password, 10, function (err, hash) {
                const fs = require('fs');
                const database = JSON.parse(fs.readFileSync('../database/db.json', 'utf8'));

                database[email] = hash;

                fs.writeFileSync('../database/db.json', database.join(','), 'utf-8');

                res.render('success', { success: "You have been logged In" }, function (err, html) {
                    res.send(html);
                });
            });
        } else {
            res.render('login', { error: "Email or password is not valid" }, function (err, html) {
                res.send(html);
            });
        }
    } else {
        res.direct('/');
    }
}
