var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');
var ChartStore = require('./chartstore.js');

var _current = {
	next: 6,
	current: 0
};
var CHANGE_EVENT = 'change';


var CurrentStore = assign({}, EventEmitter.prototype, {
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	setCurrent: function(i){
		_current.current = i;
		this.emitChange();
	},
	setNext: function(){
		_current.next += 1;
		this.emitChange();
	},
	getCurrent: function(){
		return _current.current;
	},
	getNext: function(){
		return _current.next;
	},
	getIndex: function(x){
		var current = _current.current;
		var charts = ChartStore.getAll();
		var idx = charts.indexOf(current);
		return idx
	},
	scroll: function(x){
		var current = _current.current;
		var charts = ChartStore.getAll();
		var idx = charts.indexOf(current);
		var newCurrent = charts[ (idx + x + charts.length) % charts.length ];
		_current.current = newCurrent;
		this.emitChange();
	},
	_onChange: function() {
		var all = ChartStore.getAll();
		if(all.indexOf(_current.current) === -1){
			this.scroll(-1);
		} else {
			this.setCurrent(all[all.length-1])
		}
	}
})


module.exports = CurrentStore;
