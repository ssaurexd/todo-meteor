import React, { useState } from 'react'
import {
	Box, Paper, FormControlLabel, 
	Checkbox, IconButton, withStyles,
	Grid
} from '@material-ui/core' 
import { green } from '@material-ui/core/colors'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

import Task from '../../api/TaskCollection'
import EditTask from './EditTask'


const GreenCheckbox = withStyles({
	root: {
	  color: green[400],
	  '&$checked': {
		color: green[600],
	  },
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />)

const CardTodo = ({ classes, item }) => {

	const [ open, setOpen ] = useState(false)

	const { uid } = useSelector(state => state.user)

	const handleClose = () => {
		
		setOpen(false);
	}

	const handleDelete = () => {

		Swal.fire({
			title: '¿Estas seguro de eliminarlo?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Si, Eliminalo',
			cancelButtonText: 'No, Cancelar'
		}).then((result) => {

			if (result.isConfirmed) {

				const task = Task.findOne({ userId: uid, _id: item._id  })

				/* Si existe la tarea y pertenece al usuario la eliminamos */
				if( task ) {

					Task.remove({ _id: task._id })
					Swal.fire({
						timer: 1000,
						title: 'Tarea eliminada',
						showConfirmButton: false,
						icon: 'success'
					})
				
				} else {

					Swal.fire(
						'Oops! Algo salio mal',
						'No se pudo eliminar',
						'error'
					)
				}
			}
		})
	}

	const handleComplete = () => {

		/* Checar si la tarea existe y es el usuario */
		const todo =  Task.findOne({ userId: uid, _id: item._id })

		if( todo ) {

			Task.update({ _id: item._id }, {
				$set: {
					complete: !todo.complete
				}
			})
		} else {

			Swal.fire(
				'Oops! Algo salio mal',
				'No se pudo eliminar',
				'error'
			)
		}
	}

	return (

		<>
			<EditTask 
				handleClose={ handleClose }
				open={ open }
				task={ item }
			/>

			<Paper elevation={ 2 } className={ classes.paper } >
				<Grid container direction='row' justify='space-between' alignItems='center' wrap='nowrap' >
					<Grid item >
						<FormControlLabel
							control={ <GreenCheckbox checked={ item.complete } onChange={ handleComplete } /> }
						/>
					</Grid>
					<Grid item >
						{ item.description }
					</Grid>

					<Box >
						<Grid container justify='flex-end' wrap='nowrap'  >
							<Grid item >
								<IconButton onClick={ () => setOpen( true ) } >
									<EditIcon />
								</IconButton>
							</Grid>

							<Grid item >
								<IconButton
									onClick={ handleDelete }
								>
									<DeleteIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Paper>
		</>
	)
}

export default CardTodo
