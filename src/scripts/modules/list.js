var dataUtils = require("utils.dataUtil")

function say(msg){
	console.log(dataUtils.ttt());
	return "module/list.js" + msg;	
}

module.exports = say;