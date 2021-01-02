import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'


export const PublicRoutes = (props) => {

	const {
		isAuthenticated,
		component: Component,
		...rest
	} = props

	return (

		<Route 
			{...rest} 
			component= { (props) => (
				(!isAuthenticated) 
					? ( <Component {...props} /> )
				 	: ( <Redirect to='/' exact /> )
			)}
		/>			
	)
}

PublicRoutes.prototype = {
	isAuthenticate: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
}