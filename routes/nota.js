const express = require('express');
const router = express.Router();

// Importar el modelo Nota
const Nota = require('../models/nota');

// Middleware Autenticacion
const {verificarAuth, verificarAdministrador} = require('../middlewares/autentication');

// Agregar una Nota
router.post('/nueva-nota', verificarAuth, async(req, res) => {
    const body = req.body;

    body.usuarioId = req.usuario._id;

    try {
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Get con parametros
router.get('/nota/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const notaDB = await Nota.findOne({_id});
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Get con todas las notas
router.get('/nota', verificarAuth, async(req, res) => {

    const usuarioId = req.usuario._id;

    try {
        const notaDB = await Nota.find({usuarioId});
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Delete para eliminar una nota
router.delete('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const notaDb = await Nota.findByIdAndDelete({_id});
      if(!notaDb){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        });
      }
      res.json(notaDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
});

// Put para actualizar una nota
router.put('/nota/:id', async(req, res) => {
    const _id  = req.params.id;
    const body = req.body;

    try {
        const notaDB = await Nota.findByIdAndUpdate(
            _id,
            body,
            {new: true});
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Exportacion del router
module.exports = router;