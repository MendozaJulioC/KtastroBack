const { dblocal } = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const authRegisterCtrl = {};

//insert user
authRegisterCtrl.authRegister = async (req, res)=>{
    try {
        const {cedula, nom_user, email, password, celular, direccion, rol, gmail}= req.body;
        console.log(req.body);
        let hashPass = await bcrypt.hash(password, 10)
        const response = await dblocal.query(`
        INSERT INTO auth.tbl_usuarios(
            cedula, nom_user, email, password, celular, direccion, rol, gmail)
                VALUES ($1, $2,$3, $4,$5, $6,$7, $8 );`,
                [ cedula, nom_user, email,hashPass,celular,direccion, rol, gmail]);
        res.status(200).json({
            Autor: "jKatastro",
            message: "Usuario registado exitosamente",
            estado : 1
            // data: response.rows
        })
    } catch (error) {
        console.error('Error authRegister: ', error);
        res.status(403).json({message: "Usuario no registrado:  ", error})
    }
}


authRegisterCtrl.getEmail = async(req, res)=>{
    try {
      const email = req.params.email;
      const response = await dblocal.query(` select * from auth.tbl_usuarios where email=$1`, [email]);
      if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }
    } catch (error) {
      console.error('Error getEmail: ', error);
      res.status(403).json({message: "Error consulta email ",error, success: false})
    }
  }

  authRegisterCtrl.getGmail= async(req, res)=>{
    try {
        const gmail = req.params.gmail;
        const response = await dblocal.query(` select * from auth.tbl_usuarios where gmail=$1`, [gmail]);
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }
        
    } catch (error) {
        console.error('Error getGmail: ', error);
        res.status(403).json({message: "Error consulta getGmail ",error, success: false})
    }
  }
module.exports = authRegisterCtrl 