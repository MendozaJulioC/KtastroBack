const { Router } = require('express');
const routerIndex = Router();

const adminCtrl = require('../controllers/admin.controllers');

//home
routerIndex.get('/',adminCtrl.getHome )



module.exports = routerIndex;