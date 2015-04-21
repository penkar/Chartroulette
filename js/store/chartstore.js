var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');


var _charts = [0,1,2,3,4,5];
var CHANGE_EVENT = 'change';


var ChartStore = assign({}, EventEmitter.prototype, {
	getAll: function(){
		return _charts
	},
	getLength: function(){
		return _charts.length
	},
	add: function(){
		console.log('stuff')
		return ''
	},
	sub: function(id){
		return ''
	}
})


module.exports = ChartStore;
