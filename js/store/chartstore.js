var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');
var CurrentStore = require('./currentstore.js');


var _charts = {
	next: 6,
	charts: [0,1,2,3,4,5]
};
var CHANGE_EVENT = 'change';


var ChartStore = assign({}, EventEmitter.prototype, {
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	getAll: function(){
		return _charts.charts
	},
	getLength: function(){
		return _charts.charts.length
	},
	add: function(){
		_charts.charts.push(_charts.next);
		_charts.next += 1;
		this.emitChange();
	},
	sub: function(docid){
		document[docid].destroy();
		var id = parseInt(docid.replace('mount',''));
		var idx = _charts.charts.indexOf(id);
		_charts.charts.splice(idx,1);
		this.emitChange();
	}
})


module.exports = ChartStore;
