import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrivateRoutes = (props) => {

	const {
		isAuthenticated,
		component: Component,
		...rest
	} = props

	return (
		<Route 
			{...rest} 
			component= { (props) => (
				(isAuthenticated) 
					? ( <Component {...props} /> )
				 	: ( <Redirect to='/login' exact /> )
			)}
		/>			
	)
}

PrivateRoutes.prototype = {
	isAuthenticate: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
}