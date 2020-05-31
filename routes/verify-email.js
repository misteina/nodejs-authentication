module.exports = function (req, res) {
    const token = req.params.token;

    const testMode = req.header('Test-Mode');
    const file = (typeof testMode === 'undefined') ? './database/db.json' : './database/test.db.json';

    const crypto = require("crypto");

    let decipher = crypto.createDecipher('aes-128-cbc', "85jr7f78f");
    let email = decipher.update(token, 'hex', 'utf8');
    email += decipher.final('utf8');

    const fs = require('fs');
    let database = JSON.parse(fs.readFileSync(file, 'utf8'));

    if (email in database){
        if (typeof testMode === 'undefined'){
            database[email].verified = 'yes';

            fs.writeFileSync(file, database.join(','), 'utf-8');

            res.json({ success: "Your email is successfully verified" });
        } else {
            res.json({ success: "Your email is successfully verified" });
        }
    } else {
        res.json({error: "Your verification link is invalid"});
    }
}