import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, makeStyles } from '@material-ui/core';


const useStyle = makeStyles( theme => ({
	container: {
		height: '70vh',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}))

const Spinner = () => {

	const clases = useStyle() 

	return (

		<Box className={ clases.container } >
			<CircularProgress />
			Just a minute, Heroku was sleeping.
		</Box>
	)
}

export default Spinner
