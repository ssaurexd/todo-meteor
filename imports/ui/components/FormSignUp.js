import React, { } from 'react'
import { useHistory } from 'react-router'
import {
	TextField, Button, Box
} from '@material-ui/core'
import { useFormik } from 'formik'
import yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { signup } from '../../redux/actions/userActions'


const FormSignUp = ({ clases }) => {
	
	const dispatch = useDispatch()
	const { loading, error } = useSelector(state => state.user)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			name: ''
		},
		onSubmit: values => {
			handleSignUp( values )
		},
		validationSchema: yup.object({
			email: yup.string().required('El email es requerido').email('Ingresa un email valido'),
			password: yup.string().required('La contraseña es requerida'),
			name: yup.string().required('El nombre es obligatorio')
		})
	})
	const history = useHistory()

	const handleSignUp = ( values ) => {

		const { name, password, email } = values

		dispatch( signup( name, password, email ) )
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
					id='name'
					label="Nombre"
					variant="outlined"
					fullWidth={ true }
					placeholder="Ingresa un nombre"
					margin="dense"
					color='primary'
					value={ formik.values.name }
					onChange={ formik.handleChange }
					error={ formik.errors.name ? true : false }
					helperText={ formik.errors.name ? formik.errors.name : false }
				/>
				
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
					¿Ya tienes una cuenta?  
					<Box component="span"> 
						<Button
							onClick={ () => history.push('/login') }
							color='primary'
						>
							Iniciar Sesión
						</Button>
					</Box> 
				</Box>

				<Button
					variant='contained'
					color='primary'
					fullWidth={ true }
					disableElevation
					type='submit'
					disabled={ formik.errors.email || formik.errors.password || formik.errors.name || loading ? true : false }
				>
					Registrarse
				</Button>
			</form>
		</>
	)
}

export default FormSignUp

