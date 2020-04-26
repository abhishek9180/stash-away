const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 5000;

const STASH_AWAY_DATA = './data/stash-away.data.json';
const VTSMX_BOND_DATA = './data/vtsmx-bond.data.json';
const VTSMX_STOCK_DATA = './data/vtsmx-stock.data.json';

app.set('port', port);
const server = http.createServer(app);

app.use(express.json());

// Set CORS for local
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'DEV') {
    app.use(cors());
}

// place after html routes to restrice access of html files directly
app.use(express.static(path.join(__dirname, 'client', 'dist', 'StashAwayAssignment')));

app.use('/api/*', function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.get('/api/stash-away-stock', (req, res) => {
    readJsonFile(STASH_AWAY_DATA).then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(error.code).send(error);
    })
});

app.get('/api/vtsmx-stock', (req, res) => {
    readJsonFile(VTSMX_STOCK_DATA).then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(error.code).send(error);
    })
});

app.get('/api/vtsmx-bond', (req, res) => {
    readJsonFile(VTSMX_BOND_DATA).then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(error.code).send(error);
    })
});

// Handle invalid routes
app.use('*', (req, res) => {
    res.status(404).send('Not found');
})


// read fileway
function readJsonFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function(err, data) {
            // Check for errors 
            if (err) {
                const errorObj = {
                    code: 500,
                    type: 'database',
                    message: 'Error in reading file.',
                    description: err
                }
                return reject(errorObj);
            }
            try {
                console.log("file read");
                // Converting to JSON 
                return resolve(JSON.parse(data)) 
            } catch(error) {
                const errorObj = {
                    code: 500,
                    type: 'database',
                    message: 'Error in parsing file.',
                    description: error
                }
                return reject(errorObj);
            }
        }); 
    });
}

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`open url http://localhost:${port}`);
})

