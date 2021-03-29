//neworder.js
//Author: Haley Welliver

var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

/* USE users listing. */
router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(data);
});

/* POST users listing. */
router.post('/', function(req, res, next) {   

    //variables to store live data from page (user selected quantity, topping, notes)
    const quantity = req.body.quantity;
    const topping = req.body.toppings;
    const notes = req.body.notes;
    
    //performing sql commands on the cheesecake db
    dbms.dbquery("SELECT MAX(ORDERID) FROM ORDERS;")
        .then(function(dbRes) {
            return dbRes[0]["MAX(ORDERID)"];
        })

        //making sure there are no duplicate order ids
        //increments each ORDERID by 1
        .then(function(orderIDincrement){
            return orderIDincrement + 1;
        })

        //creating an INSERT sql statement for new cheesecake orders on July 15
        //takes into account user selected quantity, topping, and notes from page
        .then(function(orderid){
            console.log(req.body);
            console.log('INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) VALUES (70, \'JUL\', 15, ${quantity}, ${topping}, ${notes})');
            return dbms.dbquery(`INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) VALUES (${orderid}, "JUL", 15, ${quantity}, '${topping}', "${notes}")`);
        })
});

module.exports = router;