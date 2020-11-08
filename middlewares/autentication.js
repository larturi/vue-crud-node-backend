// JWT
const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {
    const token = req.get('token');

    jwt.verify(token, 'secret', (error, decoded) => {
        if (error) {
            return res.status(400).json({
                mensaje: 'Token no valido',
                error
            });
        }

        req.usuario = decoded.data;

        next();
    });
};

const verificarAdministrador = (req, res, next) => {
    const role = req.usuario.role;

    if (role === 'ADMIN') {
        next();
    } else {
        return res.status(401).json({
            mensaje: 'El usuario no es ADMIN'
        });
    }
};

module.exports = {
    verificarAuth, 
    verificarAdministrador
};
