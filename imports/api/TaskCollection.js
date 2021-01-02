import { Mongo } from 'meteor/mongo';

const Task = new Mongo.Collection('tasks')

export default Task;