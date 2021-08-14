'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    email: String,
    username: String
});

mongoose.model('Users', UsersSchema);
