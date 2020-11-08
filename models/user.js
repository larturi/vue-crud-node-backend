const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} Rol no valido '
};

const userSchema = new Schema({
    nombre: {type: String, required: [true, 'Nombre obligatorio']},
    email: {
        type: String, 
        required: [true, 'Email obligatorio'],
        unique: true
    },
    password: {type: String, required: [true, 'Password obligatorio']},
    date:{type: Date, default: Date.now},
    role: {type: String, default: 'USER', enum: roles},
    activo: {type: Boolean, default: true}
  });

  userSchema.plugin(uniqueValidator, {message: 'Error: {PATH} debe ser unico'});

  // Ocultar la contraseña
  userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  };
  
  // Convertir a modelo
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;