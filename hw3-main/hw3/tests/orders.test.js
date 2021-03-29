//Orders.test.js
//Author: Haley Welliver

//used old tests as reference
var fs = require('fs');

test('test selectEvent', () => {

	//makes the JSON array from orders file into a string
	var orderSample = fs.readFileSync('routes/orders.js');

	//testing that the JSON object from orders file is not NULL:
	expect(orderSample).toEqual(expect.anything()); 
});