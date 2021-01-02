import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import Task from '../../api/TaskCollection';


const EditTask = ({ task, open, handleClose }) => {

	const [ description, setDescription ] = useState('')

	const { uid } = useSelector(state => state.user)

	const handleEditTask = () => {

		/* Comprobar si es el usuario y existe la tarea */
		const taskToEdit = Task.findOne({ _id: task._id, userId: uid })

		if( taskToEdit ) {

			Task.update({ _id: taskToEdit._id }, {
				$set: {
					description
				}
			})

			Swal.fire({
				timer: 2000,
				title: 'Tarea editada',
				showConfirmButton: false,
				icon: 'success'
			})

			handleClose()
		} else {

			Swal.fire(
				'Oops! Algo salio mal',
				'No se pudo eliminar',
				'error'
			)
		}
	}

	useEffect( () => {

		setDescription( task.description )
	}, [ ])

	return (

		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Editar tarea</DialogTitle>

				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="decription"
						label="Tarea"
						type="text"
						fullWidth
						value={ description }
						onChange={ e => setDescription( e.target.value ) }
					/>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClose} color="secondary">
					Cancelar
				</Button>
				<Button onClick={ handleEditTask } color="primary" variant='contained' disableElevation >
					Editar
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default EditTask
