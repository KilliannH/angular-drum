const express = require('express');
const router = express.Router();

Drummer = require('../model/drummer');

//Do some api stuff from /admin/xxx
router.get('/', (req, res, next) => {
    res.send('I AM ADMIN');
});


router.get('/drummers', (req, res, next) => {
Drummer.getDrummers(function (err, drummers) {
    if(err) {
        throw err;
    }
    res.json(drummers);
    });
});

router.get('/drummers/:_id', function (req, res) {
    Drummer.getDrummerById(req.params._id,function (err, drummers) {
        if(err) {
            throw err;
        }
        res.json(drummers);
    });
});

router.post('/drummers', function (req, res) {
    var drummer = req.body;
    Drummer.addDrummer(drummer, function (err, drummer) {
        if(err) {
            throw err;
        }
        res.json(drummer);
    });
});

router.put('/drummers/:_id', function (req, res) {
    var id = req.params._id;
    var drummer = req.body;

    Drummer.updateDrummer(id, drummer, {}, function (err, drummer) {
        if(err) {
            throw err;
        }
        res.json(drummer);
    });

});

router.delete('/drummers/:_id', function (req, res) {
    var id = req.params._id;

    Drummer.deleteDrummer(id, function (err, drummer) {
        if(err) {
            throw err;
        }
        res.json(drummer);
    });

});

module.exports = router;