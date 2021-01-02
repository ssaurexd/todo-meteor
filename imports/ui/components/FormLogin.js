import React from 'react'
import { useHistory } from 'react-router'
import {
	TextField, Button, Box
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { useFormik } from 'formik'
import yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

import { login } from '../../redux/actions/userActions'


const FormLogin = ({ clases }) => {
	
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: values => {
			
			handleLogin( values )
		},
		validationSchema: yup.object({
			email: yup.string().required('El email es requerido').email('Ingresa un email valido'),
			password: yup.string().required('La contraseña es requerida'),
		})
	})
	const history = useHistory()
	const dispatch = useDispatch()
	const { loading, error } = useSelector(state => state.user)

	const handleLogin = ({ email, password }) => {

		dispatch( login( email, password ) )
	}

	return (

		<>
			{
				error !== null && (
					
					<Alert severity='error' >{ error }</Alert>
				)
			}

			<form onSubmit={ formik.handleSubmit } >
				<TextField 
					id='email'
					label="Email"
					variant="outlined"
					fullWidth={ true }
					placeholder="Ingresa un correo electronico"
					margin="dense"
					color='primary'
					value={ formik.values.email }
					onChange={ formik.handleChange }
					error={ formik.errors.email ? true : false }
					helperText={ formik.errors.email ? formik.errors.email : false }
				/>

				<TextField 
					id='password'
					label="Contraseña"
					variant="outlined"
					fullWidth={ true }
					placeholder="Ingresa tu contraseña"
					margin="dense"
					type='password'
					color='primary'
					value={ formik.values.password }
					onChange={ formik.handleChange }
					error={ formik.errors.password ? true : false }
					helperText={ formik.errors.password ? formik.errors.password : false }
				/>

				<Box className={ clases.cuenta } >
					¿Aún no tienes una cuenta?  
					<Box component="span"> 
						<Button
							onClick={ () => history.push('/signup') }
							color='primary'
						>
							Registrate aqui 
						</Button>
					</Box> 
				</Box>

				<Button
					variant='contained'
					color='primary'
					fullWidth={ true }
					disableElevation
					type='submit'
					disabled={ formik.errors.email || formik.errors.password || loading ? true : false }
				>
					Iniciar Sesión
				</Button>
			</form>
		</>
	)
}

export default FormLogin
