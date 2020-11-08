const express = require('express');
const router = express.Router();

// Importar el modelo User
const User = require('../models/user');

// Middleware Autenticacion
const {verificarAuth, verificarAdministrador} = require('../middlewares/autentication');

// Importar bcrypt para hashear contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Filtrar campos de PUT
const _ = require('underscore');

// POST - Nuevo Usuario
router.post('/nuevo-usuario', verificarAuth, async(req, res) => {
    const body = {
        nombre:    req.body.nombre,
        email:     req.body.email,
        role:      req.body.role,
    };

    body.password = bcrypt.hashSync(req.body.password, saltRounds);

    try {
        const usuarioDB = await User.create(body);
        res.json(usuarioDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error',
            error
        });
    }
});

// PUT - Actualizar Usuario

router.put('/usuario/:id', [verificarAuth, verificarAdministrador], async(req, res) => {

    const _id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'password', 'activo']);

    if(body.password) {
        body.password = bcrypt.hashSync(body.password, saltRounds);
    }

    try {
        const usuarioDB = await User.findByIdAndUpdate(_id, body, {
            new: true,
            runValidators: true
        });
        return res.json(usuarioDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrió un error',
            error
        });
    }

});

// Exportacion del router
module.exports = router;