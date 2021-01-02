import React from 'react'
import { 
	Box, makeStyles,
	Grid, Paper, Typography
} from '@material-ui/core'
import FormSignUp from '../components/FormSignUp'


const useStyle = makeStyles( theme => ({
	container: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '70vh',
		width: '100%',
		boxSizing: 'content-box'
	},
	formLogin: {
		padding: '25px',
		marginTop: '10px',
		width: 'auto',
		height: 'auto'
	},
	cuenta: {
		marginTop: '12px',
		marginBottom: '12px'
	}
}))

const SignUp = () => {

	const clases = useStyle()

	return (

		<div className={ clases.container } >
			<Grid 
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Box >
					<Typography variant="h4" component="h4" color="textSecondary">
						Registrate para poder crear tareas
					</Typography>

					<Paper
						elevation={ 3 }
						className={ clases.formLogin }
					>
						<FormSignUp
							clases={ clases }
						/>
					</Paper>
				</Box>
			</Grid>
		</div>
	)
}

export default SignUp
