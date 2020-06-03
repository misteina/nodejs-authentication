module.exports = function (req, res) {
    const token = req.body.token;

    const testMode = req.header('Test-Mode');
    const file = (typeof testMode === 'undefined') ? './database/db.json' : './database/test.db.json';

    const crypto = require("crypto");

    try {
        let encryptedText = Buffer.from(token, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from('4a4c00ed5a40c54ecd5785192dbe0d6c'), Buffer.from('4a4c00ed5a40c54e'));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        let email = decrypted.toString();

        const fs = require('fs');
        let database = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (email in database) {
            if (typeof testMode === 'undefined') {
                database[email].verified = 'yes';
                try {
                    fs.writeFileSync(file, JSON.stringify(database));
                    res.json({ success: "Your email is successfully verified" });
                } catch (error) {
                    res.json({ error: "An error was encountered" });
                }

            } else {
                res.json({ success: "Your email is successfully verified. Please click <a href=\"/login\">here</> to login" });
            }
        } else {
            res.json({ error: "Your verification link is invalid" });
        }
    } catch (error) {
        res.json({ error: "Your verification link is invalid" });
    }
}