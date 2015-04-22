var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');


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
	getCurrent: function(i){
		return _current.current = i;
	},
	getNext: function(i){
		return _current.next = i;
	},
	setCurrent: function(){
		return _current
	}
})


module.exports = CurrentStore;
