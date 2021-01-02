import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store/store'
import AppRoutes from './pages/AppRoutes'


const App = () => {

	return (

		<Provider store={ store } >
			<AppRoutes />
		</Provider>
	)
}

export default App

