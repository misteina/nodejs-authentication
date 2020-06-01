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

            let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from('4a4c00ed5a40c54ecd5785192dbe0d6c'), Buffer.from('4a4c00ed5a40c54e'));
            let encrypted = cipher.update(email);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            let token = encrypted.toString('hex');

            bcrypt.hash(password, 10, function (err, hash) {
                database[email] = {name: name, password: hash, verified: token};

                let written = false;
                try {
                    if (typeof testMode === 'undefined'){
                        fs.writeFileSync(file, database.join(','), 'utf-8');
                        written = true;
                    }
                } catch (error) {
                    res.json({ error: "An error was encountered" });
                }

                if (written && typeof testMode === 'undefined'){
                    const nodemailer = require('nodemailer');

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'authtest@gmail.com',
                            pass: 'dhg75yd7f57'
                        }
                    });

                    let mailOptions = {
                        from: 'authtest@gmail.com',
                        to: email,
                        subject: 'You have been registered',
                        text: `Hello ${name}, thank you for your registration. Please click on the following link to verify your email address http://localhost:3000/verify-email/${token}`
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    res.json({ success: "You have been successfully registered" });
                } else if (!written && typeof testMode !== 'undefined'){
                    res.json({ success: "You have been successfully registered" });
                }
            });
        } else {
            res.json({error: "Your email already exists"});
        }
    } else {
        res.json({ error: "Email or password not valid" });
    }
}
