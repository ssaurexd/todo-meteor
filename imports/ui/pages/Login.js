import React from 'react'
import { 
	Box, makeStyles,
	Grid, Paper, Typography
} from '@material-ui/core'
import FormLogin from '../components/FormLogin'


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

const Login = () => {

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
						Administra tus tareas iniciando sesión
					</Typography>

					<Paper
						elevation={ 3 }
						className={ clases.formLogin }
					>
						<FormLogin 
							clases={ clases }
						/>
					</Paper>
				</Box>
			</Grid>
		</div>
	)
}

export default Login
