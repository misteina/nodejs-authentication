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
            
            const hash = bcrypt.hashSync(password, 10);

            database[email] = { name: name, password: hash, verified: "no" };

            if (typeof testMode === 'undefined'){
                const crypto = require("crypto");

                let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from('4a4c00ed5a40c54ecd5785192dbe0d6c'), Buffer.from('4a4c00ed5a40c54e'));
                let encrypted = cipher.update(email);
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                let token = encrypted.toString('hex');

                const nodemailer = require('nodemailer');

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'auth.testing.0001@gmail.com',
                        pass: 'dhg75yd7f57'
                    }
                });

                let mailOptions = {
                    from: '"Authentication Team" <auth.testing.0001@gmail.com>',
                    to: email,
                    subject: 'You have been registered',
                    text: `Hello ${name}, \r\n\r\nThank you for your registration. \r\n\r\nPlease click on the following link to verify your email address: http://localhost:3000/verify-email/${token} \r\n\r\nAuthentication Team.`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (!error) {
                        fs.writeFileSync(file, JSON.stringify(database, null, '\t'));
                        res.json({ success: "You have been successfully registered. Verify your email address and login" });
                    } else {
                        res.json({ error: "An error was encountered (001)" });
                        console.log(error);
                    }
                });
            } else if ("name" in database[email]){
                try {
                    fs.writeFileSync(file, JSON.stringify(database, null, '\t'));
                    database = JSON.parse(fs.readFileSync(file, 'utf8'));
                    if (email in database){
                        delete database[email];
                        fs.writeFileSync(file, JSON.stringify(database, null, '\t'));
                        res.json({ success: "Registration success" });
                    } else {
                        res.json({ error: "error (001)" });
                    }
                } catch (error) {
                    res.json({ error: "error (002)" });
                }
            }
        } else {
            res.json({error: "Your email already exists"});
        }
    } else {
        res.json({ error: "Email or password not valid" });
    }
}