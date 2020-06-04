module.exports = function (req, res) {
    const token = req.body.token;
    
    const testMode = req.header('Test-Mode');

    const crypto = require("crypto");

    try {
        let encryptedText = Buffer.from(token, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from('4a4c00ed5a40c54ecd5785192dbe0d6c'), Buffer.from('4a4c00ed5a40c54e'));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        let email = decrypted.toString();

        const file = (typeof testMode === 'undefined') ? './database/db.json' : './database/test.db.json';

        const fs = require('fs');
        let database = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (email in database) {
            if (typeof testMode === 'undefined') {
                if (database[email].verified === 'no') {
                    database[email].verified = 'yes';
                    try {
                        fs.writeFileSync(file, JSON.stringify(database, null, '\t'));
                        res.json({ success: "Your email is successfully verified (001)" });
                    } catch (error) {
                        res.json({ error: "An error was encountered (001)" });
                    }
                } else {

                    res.json({ error: "Unauthourized action" });
                }
            } else if (email === 'peter@test.com') {
                res.json({ success: "Your email is successfully verified (001)" });
            }
        } else {
            res.json({ error: "Your verification link is invalid (001)" });
        }
    } catch (error) {
        res.json({ error: "Your verification link is invalid (003)" });
    }
}