const express = require('express');
const router = express.Router();

// JWT
const jwt = require('jsonwebtoken');

// Importar el modelo User
const User = require('../models/user');

// Importar bcrypt para hashear contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async(req, res) => {

    const body = req.body;

    try {
        // Evaluo email
        const usuarioDB = await User.findOne({email: body.email});
        if(!usuarioDB) {
            return res.status(400).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        // Evaluo contraseña
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        // Generar Token
        const token = jwt.sign({
            data: usuarioDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30}); // Expira en 30 días
  

        res.json({
            usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Ocurrió un error',
            error
        });
    }
});

// Exportacion del router
module.exports = router;