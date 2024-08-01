const { Router } = require('express');
const inforouter = Router() ;
const infoCtrl = require('../controllers/info.controllers')

inforouter.get('/api/dap/hitos',infoCtrl.getHitosMain)


inforouter.get('/api/dap/hitos',infoCtrl.getHitosMain)
        .get('/api/dap/hitos/mes/:mes', infoCtrl.getHitosMes)
        .get('/api/dap/hitos/dependencias/:cod_dep', infoCtrl.getHitoDep)
        .get('/api/dap/hitos/mes/:mes/dependencias/:cod_dep', infoCtrl.getHitoDepMes)
        .get('/api/dap/hitos/mes/:mes/dependencias/:cod_dep/vigencia/:vigencia', infoCtrl.getHitoDepAnioMes)
        .get('/api/dap/total/hitos', infoCtrl.getTotalHitosVigencia)
        .get('/api/dap/total/hitos/fecha', infoCtrl.getTotalHitosFechas)
        .get('/api/dap/hitos/hitomesanio', infoCtrl.getTotalAnioMes)
        .get('/api/dap/hitos/tipo', infoCtrl.getHitoTipo)
        .get('/api/dap/hitos/totaldep', infoCtrl.getHitosDepTotal)
        .get('/api/dap/hitos/vigencia/:vigencia/mes/:mes', infoCtrl.getHitoVigMes)
        .get('/api/dap/cuentahitos/vigencia/:vigencia/mes/:mes', infoCtrl.getCountAnioMesDep)
        .get('/api/dap/dependencias', infoCtrl.getDependenciasNew )
        .get('/api/dap/dependencia/count/:cod_dep', infoCtrl.getCountHitosDepVigMes)
        .get('/api/dap/hitosrelevantes', infoCtrl.getHitosrelevantes)


module.exports = inforouter  