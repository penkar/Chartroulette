var CLogic = require('../chartlogic.js');
var ChartStore = require('../store/chartstore.js');
var CurrentStore = require('../store/currentstore.js');

var Nav = React.createClass({
	displayName: 'Nav',
	render: function(){
		return React.createElement('div', null,
			React.createElement('button', {onClick:this.onClick, value: 'Prev', className:"pure-button pure-button-primary"}, 'Prev'),
			React.createElement('button', {onClick:this.onClick, value: 'Add', className:"pure-button button-success"}, 'Add'),
			React.createElement('button', {onClick:this.onClick, value: 'Sub', className:"pure-button button-error"}, 'Sub'),
			React.createElement('button', {onClick:this.onClick, value: 'Add Data', className:"pure-button button-success"}, 'Add Data'),
			React.createElement('button', {onClick:this.onClick, value: 'Next', className:"pure-button pure-button-primary"}, 'Next')
		);
	},
	onClick: function(event){
		switch(event.target.value){
			case 'Prev':
				CurrentStore.scroll(-1);
				break;
			case 'Add':
				ChartStore.add();
				CurrentStore.setNext();
				break;
			case 'Sub':
				var id = document.getElementsByClassName('current')[0].id
				CurrentStore.scroll(-1);
				ChartStore.sub(id)
				break;
			case 'Next':
				CurrentStore.scroll(1);
				break;
			case 'Add Data':
				var id = document.getElementsByClassName('current')[0].id;
				document[id].addSeries(CLogic.randomData());
				break;
			default:
		}
	}
});

module.exports = Nav