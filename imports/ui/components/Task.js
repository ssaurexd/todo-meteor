import React from 'react'
import Button from '@material-ui/core/Button'
import Tasks from '../../api/TaskCollection'


const Task = () => {
	
	const handleAddTask = () => {

		try {
			
			Tasks.insert({
				title: 'Ejemplo',
				description: 'Checando la conexion con mi base de mongo'
			}, { selector: { type: 'simple' } })
		} catch (error) {
			
			console.log( error )
		}

		//const tasks = Tasks.find()

		//console.log( tasks );
	}

	return (
		
		<Button
			onClick={ handleAddTask }
			color="secondary"
			variant="contained"
		>
			Add Task
		</Button>
	)
}

export default Task
