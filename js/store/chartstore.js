var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');


var _charts = {
	next: 6,
	charts: [0,1,2,3,4,5]
};
var CHANGE_EVENT = 'change';


var ChartStore = assign({}, EventEmitter.prototype, {
	getAll: function(){
		return _charts.charts
	},
	getLength: function(){
		return _charts.charts.length
	},
	add: function(){
		_charts.charts.push(_charts.next);
		_charts.next += 1;
		console.log(_charts)
	},
	sub: function(id){
		var idx = _charts.charts.indexOf(id);
		_charts.charts.splice(idx,1);
		console.log(_charts)
	}
})


module.exports = ChartStore;
