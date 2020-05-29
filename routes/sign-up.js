module.exports = function (req, res) {
    if (req.method === 'GET'){
        res.render('sign-up')
    } else if (req.method === 'POST'){

    } else {
        res.redirect('/')
    }
}
