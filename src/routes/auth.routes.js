const { Router } = require('express');
const routerAuth= Router();
const authRegisterCtrl = require('../controllers/auth.controllers')


//route para resgistrar usuarios
routerAuth.post('/api/auth/register/', authRegisterCtrl.authRegister)
.get('/api/auth/validate/email/:email', authRegisterCtrl.getEmail)
.get('/api/auth/validate/gmail/:gmail', authRegisterCtrl.getGmail)



module.exports = routerAuth;