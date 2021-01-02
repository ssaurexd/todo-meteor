import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useSelector } from 'react-redux'
import Task from '../../api/TaskCollection'
import Swal from 'sweetalert2'


const NewTask = ({ classes, setAdd }) => {
	
	const { uid } = useSelector(state => state.user)
	const [ description, setDescription ] = useState('')

	const handleNew = ( e ) => {
		
		e.preventDefault()
		
		Task.insert({
			userId: uid,
			description,
			complete: false,
			createdAt: Date.now()
		})

		Swal.fire({
			timer: 1000,
			title: 'Tarea creada',
			icon:'success',
			showConfirmButton: false
		})

		setDescription('')
		setAdd( false )
	} 

	return (

		<form onSubmit={ e => handleNew( e ) } >
			<Paper className={ classes.root } >
					<InputBase
						className={classes.input}
						placeholder="Nueva tarea"
						inputProps={{ 'aria-label': 'Nueva tarea' }}
						value={ description }
						onChange={ e => setDescription( e.target.value ) }
						required
					/>

					<IconButton 
						type="submit" 
						className={classes.iconButton} 
						aria-label="search" 
					>
						<SendIcon />
					</IconButton>
			</Paper>
		</form>
	)
}

export default NewTask
