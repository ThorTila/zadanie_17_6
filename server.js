var express = require('express'),
    app = express(),
    port = 3000;

app.set('view engine', 'pug');

app.set('views','./views');

app.use(express.static('assets'));

app.get('/', function (req, res) {
    res.render('login');
});

app.get('/auth/google', function(req, res){
    let warning = true;
    if (req.query.name && req.query.pass) {
        warning = false;
        const data = {
            name: req.query.name,
            pass: req.query.pass
        };
        res.render('logged', {
            name: data.name,
            pass: data.pass
        });
    } else {
        res.render('login', {
            warning: warning
        })
    }
});

var server = app.listen(port, function() {
    console.log('Serwer nasłuchuje na http://localhost:' + port);
});

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});