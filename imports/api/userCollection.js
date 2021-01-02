import { Mongo } from 'meteor/mongo';


const User = new Mongo.Collection('users')

export default User