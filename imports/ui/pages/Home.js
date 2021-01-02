import React, { useEffect, useState } from 'react'
import { 
	Box, Button, Container, 
	Grid, makeStyles, Typography,
	IconButton, Paper, CircularProgress
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import { useTracker } from 'meteor/react-meteor-data'

import { logout } from '../../redux/actions/userActions'
import CardTodo from '../components/CardTodo';
import NewTask from '../components/NewTask';
import Task from '../../api/TaskCollection'


const useStyle = makeStyles( theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		marginTop: '20px',
		marginBottom: '10px'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	grid: {
		flex: 1
	},
	paper: {
		padding: '12px',
		display: 'flex',
		flex: 1
	}
}))

const Home = () => {

	const [ add, setAdd ] = useState(false)
	//const [ loading, setLoading ] = useState(true)

	const dispatch = useDispatch()
	const { name, uid } = useSelector(state => state.user)
	const classes = useStyle()
	const tasks = useTracker( () => Task.find({ userId: uid }, { sort: { createdAt: -1 } }).fetch() ) 
	
	const handleLogOut = () => {
		
		dispatch( logout() )
	}

	return (

		<Container maxWidth='sm' >	
			<Grid container justify='space-between' direction='row'  >
				
				<Box component='span' >
					<Typography variant='h6' >Hola: { name }</Typography>
				</Box>

				<Button	
					onClick={ handleLogOut }
					color='secondary'
				>
					Cerrar Sesión	
				</Button>	
			</Grid>

			{
				add && (

					<NewTask classes={ classes } setAdd={ setAdd } />
				)
			}
			
			<Grid container justify='center' >
				<IconButton color='primary' onClick={ () => setAdd( true ) } >
					<AddIcon color='primary' />
				</IconButton>
			</Grid>
			
			<Grid container direction='column' spacing={ 1 }>
				{
					tasks.length > 0 ? (

						tasks.map( item => (
							<Grid item key={ item._id } >
								<CardTodo 
									classes={ classes }
									item={ item }
								/>
							</Grid>
						))
					) : (
						<Grid item container justify='center' >
							<Grid item >
								<Paper className={ classes.paper } >
									<Typography variant='body1' align='center' color='textPrimary' >
										No hay tareas
									</Typography>
								</Paper>
							</Grid>
						</Grid>
					)
				}
			</Grid>
		</Container>
	)
}

export default Home
