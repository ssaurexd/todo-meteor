import { types } from "../types"
import User from '../../api/userCollection'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Swal from 'sweetalert2'


const checkingStart = () => {
	
	return {
		type: types.checkingStart
	}
}
const checkingSuccess = () => {
	
	return {
		type: types.checkingSuccess
	}
}

const loginStart = () => {

	return {
		type: types.loginStart
	}
}
const loginSuccess = ( uid, name, token ) => {

	localStorage.setItem('token', token)

	return {
		type: types.loginSuccess,
		payload: {
			uid,
			name,
			token
		}
	}
}
const loginFail = ( error ) => {
	return {
		type: types.loginFail,
		payload: error
	}
}

const signupStart = () => {

	return {
		type: types.signupStart
	}
}
const signupSuccess = () => {

	return {
		type: types.signupSuccess
	}
}
const signupFail = ( error ) => {
	return {
		type: types.signupFail,
		payload: error
	}
}

export const logout = () => {

	localStorage.clear()

	return {
		type: types.logout
	}
}


export const login = ( email, password ) => {

	return async ( dispatch ) => {

		dispatch( loginStart() )

		try {
			
			const user = User.findOne({ email })

			if( !user ) {

				return dispatch( loginFail( 'El usuario no existe' ) )
			}

			const passwordIsCorrect = bcrypt.compareSync( password, user.password )

			if( !passwordIsCorrect ) {

				return dispatch( loginFail('La contraseña es incorrecta') )
			}

			const token = jwt.sign({
				name: user.name,
				uid: user._id
			}, 'ALGOSECRETOXD')

			return dispatch( loginSuccess( user._id, user.name, token ) )

		} catch ( error ) {
			
			console.log( error )
		}
	}
}

export const signup = ( name, password, email ) => {

	return async ( dispatch ) => {

		dispatch( signupStart() )

		try {
			
			const user = User.findOne({ email })

			if( user ) {

				return dispatch( signupFail('Ese email ya está siendo usado.') )
			}

			const salt = bcrypt.genSaltSync()
			const encryptedPass = bcrypt.hashSync( password, salt )
			const userId = User.insert({
				email,
				password: encryptedPass,
				name,
				createdAt: Date.now()
			})
			const newUser = User.findOne({ _id: userId })

			Swal.fire({
				timer: 2500,
				title: 'Te has registrado correctamente',
				icon: 'success',
				showCloseButton: false
			})

			const token = jwt.sign({
				name: newUser.name,
				uid: newUser._id
			}, 'ALGOSECRETOXD')

			dispatch( signupSuccess() )
			dispatch( loginSuccess( userId, newUser.name, token ) )
		} catch (error) {
			
		}
	}
}

export const checking = () => {
	
	const token = localStorage.getItem('token')	|| null
	
	return async ( dispatch ) => {

		dispatch( checkingStart() )

		if( token === null ) {

			return dispatch( checkingSuccess() )
		}

		const { uid, name } = jwt.decode( token, {}, 'ALGOSECRETOXD' )
		
		dispatch( checkingSuccess() )
		
		dispatch( loginSuccess( uid, name, token ) )
	}
}