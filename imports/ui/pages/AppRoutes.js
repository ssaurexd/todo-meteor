import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'

import { checking } from '../../redux/actions/userActions'
import '../styles/app.css'
import Spinner from '../components/Spinner'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'


const AppRoutes = () => {
	
	const dispatch = useDispatch()
	const { uid, check } = useSelector(state => state.user)

	useEffect( () => {

		dispatch( checking() )

	}, [ dispatch ] )

	if( check ) {

		return <Spinner />
	}

	return (

		<Router >
			<Switch>
				<PrivateRoutes Route 
					path="/"
					exact
					component={ Home }
					isAuthenticated={ !!uid }
				/>
				
				<PublicRoutes
					path="/login"
					exact
					isAuthenticated={ !!uid }
					component={ Login }
				/>
				
				<PublicRoutes
					path="/signup"
					exact
					isAuthenticated={ !!uid }
					component={ SignUp }
				/>
			</Switch>
		</Router>
	)
}

export default AppRoutes
