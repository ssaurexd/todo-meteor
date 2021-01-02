import { types } from "../types"


const initialState = {
	token: null,
	check: true,
	uid: null,
	name: null,
	loading: false,
	error: null
}

export const userReducer =  ( state = initialState, action ) => {
	
	switch ( action.type ) {

		case types.checkingStart: 

			return {
				...state,
				check: true
			}
		
		case types.checkingSuccess: 

			return {
				...state,
				check: false
			}
		
		/* Login */
		case types.loginStart: 

			return {
				...state,
				loading: true,
				error: null
			}

		case types.loginFail: 

			return {
				...state,
				uid: null,
				error: action.payload,
				loading: false
			}
			
		case types.loginSuccess: 

			return {
				check: false,
				loading: false,
				error: null,
				...action.payload
			}
		
		case types.logout: 

			return {
				...initialState,
				check: false
			}
		
		/* Signup */
		case types.signupStart: 

			return {
				...state,
				loading: true,
				error: null
			}

		case types.signupFail: 

			return {
				...state,
				error: action.payload,
				loading: false,
			}
	
		case types.signupSuccess: 

			return {
				...state,
				error: null,
				loading: false
			}
	
		default:
			return state
	}
}