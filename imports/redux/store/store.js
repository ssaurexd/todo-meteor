import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//Reducers
import { userReducer } from '../reducers/userReducer'


const reducers = combineReducers({
	//mis reducers
	user: userReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware( thunk )
	)
)