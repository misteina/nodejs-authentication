module.exports = function (req, res) {
    let crypto = require("crypto");
    let value = crypto.createHash("RIPEMD160").update("peter@test.com85jr7f78f").digest("hex");
    res.send(value);
}