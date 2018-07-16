const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
var db;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html')
    db.collection('quotes').find().toArray(function (err, results) {
        console.log(results)
        res.render('index', {
            quotes: results
        })
    });
});
app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Your quote saved to db')
        res.redirect('/')
    })
    console.log(req.body);
});

app.put('/quotes', (req, res) => {
    db.collection('quotes')
        .findOneAndUpdate({
            name: 'Shibin3'
        }, {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        }, {
            sort: {
                _id: -1
            },
            upsert: true
        }, (err, result) => {
            if (err) return res.send(err);

            res.send(result);
            res.redirect('/')
        })
})

MongoClient.connect('mongodb://shibinragh:password123@ds233571.mlab.com:33571/node-crud-express-mongo', (err, client) => {
    if (err) return console.log(err)
    db = client.db('node-crud-express-mongo')
    app.listen(3000, () => {
        console.log('listening on 3000 ' + __dirname);
    });
});
