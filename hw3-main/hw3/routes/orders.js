//orders.js
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
   var month = req.body.month;

   //query to get plain cheesecake quantity for month clicked
   dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE MONTH='" + month + "' AND TOPPING='plain'").then(function(cheesecakeData){
      var quantity = cheesecakeData[0]["SUM(QUANTITY)"]
      console.log("quantity: " + quantity);
      if(!quantity){
         quantity = 0;
      }
      data[0]["quantity"] = quantity;
    
   //query to get cherry cheesecake quantity for month clicked
   }).then(function(){
      return dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE TOPPING='cherry' AND MONTH='"+ month+ "';");
   }).then(function(cheesecakeData){
      var quantity = cheesecakeData[0]["SUM(QUANTITY)"]
      if (!quantity){
         quantity = 0;
      }
      data[1]["quantity"] = quantity;

   //query to get chocolate cheesecake quantity for month clicked
   }).then(function(){
      return dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE TOPPING='chocolate' AND MONTH='"+ month+ "';");
   }).then(function(cheesecakeData){
      var quantity = cheesecakeData[0]["SUM(QUANTITY)"]
      if (!quantity){
         quantity = 0;
      }
      data[2]["quantity"] = quantity;
   }).then(function(){
      console.log(data);
      res.json(data);
   });
});

 //initial JSON object
 var data = [
   {
      "topping": "plain", 
      "quantity": 0
   },
   {
      "topping": "cherry", 
      "quantity": 0
   },
   {
      "topping": "chocolate", 
      "quantity": 0
   }
 ];

module.exports = router;