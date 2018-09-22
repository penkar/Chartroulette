import React from 'react'
import App from './app.js'
import {Sidebar} from './components'
import {render} from 'react-dom'

const Body = () => (
	<div className='body'>
		<Sidebar />
		<App />
	</div>
)

render(
	Body(),
	document.getElementById('mount')
)
