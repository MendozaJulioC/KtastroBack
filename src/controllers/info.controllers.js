const {dblocal} = require('../config/dbConfig')

const infoCtrl={};

//functions hitos
infoCtrl.getHitosMain = async(req, res)=>{
    try {
        const response = await dblocal.query(`
            select 
                id_hito,
                hito,desc_hito,
                tbl_main_hitos.codintervencion,
                tipo_intervencion,
                dap.tbl_hitos_proyecto.codproyecto,
                dap.tbl_hitos_proyecto.proyecto,
                valorproyecto,
                centro_gestor,
                dep_corto,
                poblacion,
                dap.tbl_hitos_fechas.fecha_proyectada,
                EXTRACT(MONTH FROM fecha_proyectada) AS mes,
                observaciones,
                urlimage
            from dap.tbl_main_hitos
            inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
            inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
            inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
            order by fecha_proyectada
        `)
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  
    } catch (error) {
        console.error('Error getHitos: ', error);
        res.status(403).json({message: "Error consulta getHitos ",error, success: false})
    }
} 


infoCtrl.getHitosMes = async(req, res)=>{
    try {
        const mes = req.params.mes
        const response = await dblocal.query(`
        select 
        id_hito,
        hito,desc_hito,
        tbl_main_hitos.codintervencion,
        tipo_intervencion,
        dap.tbl_hitos_proyecto.codproyecto,
        dap.tbl_hitos_proyecto.proyecto,
        valorproyecto,
        centro_gestor,
        dep_corto,
        poblacion,
        dap.tbl_hitos_fechas.fecha_proyectada,
         EXTRACT(MONTH FROM fecha_proyectada) AS mes,
         EXTRACT(YEAR FROM fecha_proyectada) AS anio,
        observaciones,
        urlimage
        from dap.tbl_main_hitos
        inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
        inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
        inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
                WHERE 
                EXTRACT(MONTH FROM fecha_proyectada) = $1
                order by fecha_proyectada;  
        `,[mes])
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  

    } catch (error) {
        console.error('Error getHitosMes: ', error);
        res.status(403).json({message: "Error consulta getHitosMes ",error, success: false})
    }
}

infoCtrl.getHitoDep = async(req,res)=>{
    try {
        const coddependencia = req.params.cod_dep
        const response = await dblocal.query(`
      	
		  select 
          id_hito,
          hito,desc_hito,
          tbl_main_hitos.codintervencion,
          tipo_intervencion,
          dap.tbl_hitos_proyecto.codproyecto,
          dap.tbl_hitos_proyecto.proyecto,
          valorproyecto,
          centro_gestor,
          dep_corto,
          poblacion,
          dap.tbl_hitos_fechas.fecha_proyectada,
           EXTRACT(MONTH FROM fecha_proyectada) AS mes,
           EXTRACT(YEAR FROM fecha_proyectada) AS anio,
          observaciones,
          urlimage
          from dap.tbl_main_hitos
          inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
          inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
          inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
              
               where centro_gestor= $1
                  order by fecha_proyectada;  
        `,[coddependencia])
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  

        
    } catch (error) {
        console.error('Error getHitosMes: ', error);
        res.status(403).json({message: "Error consulta getHitosMes ",error, success: false})
    }
}

infoCtrl.getHitoDepMes = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dep
        const mes = req.params.mes
        const response = await dblocal.query(`
        select 
        id_hito,
        hito,desc_hito,
        tbl_main_hitos.codintervencion,
        tipo_intervencion,
        dap.tbl_hitos_proyecto.codproyecto,
        dap.tbl_hitos_proyecto.proyecto,
        valorproyecto,
        centro_gestor,
        dep_corto,
        poblacion,
        dap.tbl_hitos_fechas.fecha_proyectada,
         EXTRACT(MONTH FROM fecha_proyectada) AS mes,
                EXTRACT(MONTH FROM fecha_proyectada) AS mes,
                    EXTRACT(YEAR FROM fecha_proyectada) AS anio,
        observaciones,
        urlimage
        from dap.tbl_main_hitos
        inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
        inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
        inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
               
             WHERE 
                EXTRACT(MONTH FROM dap.tbl_hitos_fechas.fecha_proyectada) = $1 and   centro_gestor =$2 ;`, [mes, dependencia])   
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }      
    } catch (error) {
        console.error('Error getHitoDepMes: ', error);
        res.status(403).json({message: "Error consulta getHitoDepMes ",error, success: false})
    }
}

infoCtrl.getHitoDepAnioMes = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dep
        const mes = req.params.mes
        const anio = req.params.vigencia
        const response = await dblocal.query(`
        select 
            id_hito,
            hito,desc_hito,
            tbl_main_hitos.codintervencion,
            tipo_intervencion,
            dap.tbl_hitos_proyecto.codproyecto,
            dap.tbl_hitos_proyecto.proyecto,
            valorproyecto,
            centro_gestor,
            dep_corto,
            poblacion,
            dap.tbl_hitos_fechas.fecha_proyectada,

            EXTRACT(MONTH FROM fecha_proyectada) AS mes,
            EXTRACT(YEAR FROM fecha_proyectada) AS anio,
            observaciones,
            urlimage
        from dap.tbl_main_hitos
            inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
            inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
            inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito        
        WHERE 
            EXTRACT(MONTH FROM dap.tbl_hitos_fechas.fecha_proyectada) = $1
            and   centro_gestor = $2 
            and  EXTRACT(YEAR FROM fecha_proyectada) = $3
        
        `, [mes,dependencia,anio])
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }       
    } catch (error) {
        console.error('Error getHitos: ', error);
        res.status(403).json({message: "Error consulta getHitos ",error, success: false})
    }
}

infoCtrl.getTotalHitosVigencia = async(req, res)=>{
    try {
        const response = await dblocal.query(`
            SELECT 
                EXTRACT(YEAR FROM dap.tbl_hitos_fechas.fecha_proyectada) AS vigencia,
                COUNT(*) AS conteo
            FROM dap.tbl_main_hitos
                INNER JOIN dap.tbl_tipointervencion 
                    ON tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
                INNER JOIN dap.tbl_hitos_proyecto 
                    ON dap.tbl_hitos_proyecto.codhito = dap.tbl_main_hitos.id_hito
                INNER JOIN dap.tbl_hitos_fechas 
                    ON dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
            GROUP BY EXTRACT(YEAR FROM dap.tbl_hitos_fechas.fecha_proyectada)
            ORDER BY vigencia;
        `)

        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }   
    } catch (error) {
        onsole.error('Error getTotalHitosVigencia: ', error);
        res.status(403).json({message: "Error consulta getTotalHitosVigencia ",error, success: false})
    }
}

infoCtrl.getTotalHitosFechas = async(req, res)=>{
    try {
        const response = await dblocal.query(
        `
            select 
                dap.tbl_hitos_fechas.fecha_proyectada,
                count( EXTRACT(MONTH FROM fecha_proyectada) )
            from dap.tbl_main_hitos
                inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
                inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
                inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
            group by fecha_proyectada
            order by  dap.tbl_hitos_fechas.fecha_proyectada
        `) 
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }   
        
    } catch (error) {
        console.error('Error getTotalHitosFechas: ', error);
        res.status(403).json({message: "Error consulta getTotalHitosFechas ",error, success: false})
    }
}

infoCtrl.getTotalAnioMes = async(req, res)=>{
    try {
        const response = await dblocal.query(
            `
            SELECT
            EXTRACT(YEAR FROM fecha_proyectada) AS year,
            EXTRACT(MONTH FROM fecha_proyectada) AS month,
            COUNT(*) AS count
        FROM dap.tbl_main_hitos
        INNER JOIN dap.tbl_tipointervencion ON tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
        INNER JOIN dap.tbl_hitos_proyecto ON dap.tbl_hitos_proyecto.codhito = dap.tbl_main_hitos.id_hito
        INNER JOIN dap.tbl_hitos_fechas ON dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
        GROUP BY
            EXTRACT(YEAR FROM fecha_proyectada),
            EXTRACT(MONTH FROM fecha_proyectada)
        ORDER BY
            EXTRACT(YEAR FROM fecha_proyectada),
            EXTRACT(MONTH FROM fecha_proyectada);
            `) 
            if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }   
    } catch (error) {
        console.error('Error getTotalHitosFechas: ', error);
        res.status(403).json({message: "Error consulta getTotalHitosFechas ",error, success: false})
    }
}

infoCtrl.getHitoTipo = async(req, res)=>{
    try {
        const response = await dblocal.query(
            `
            select 
            dap.tbl_main_hitos.codintervencion,
            dap.tbl_tipointervencion.tipo_intervencion,
            count (dap.tbl_main_hitos.codintervencion) as total
            from dap.tbl_main_hitos
            inner join dap.tbl_tipointervencion on dap.tbl_tipointervencion.codintervencion =dap.tbl_main_hitos.codintervencion
            group by dap.tbl_main_hitos.codintervencion,
            dap.tbl_tipointervencion.tipo_intervencion
            `) 
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }
    } catch (error) {
        console.error('Error getHitoTipo: ', error);
        res.status(403).json({message: "Error consulta getHitoTipo ",error, success: false}) 
    }
}

infoCtrl.getHitoVigMes = async(req, res)=>{
    try {
        const anio = req.params.vigencia;
        const mes = req.params.mes;

        const response = await dblocal.query(`
        select 
        id_hito,
        hito,desc_hito,
        tbl_main_hitos.codintervencion,
        tipo_intervencion,
        dap.tbl_hitos_proyecto.codproyecto,
        dap.tbl_hitos_proyecto.proyecto,
        valorproyecto,
        centro_gestor,
        dep_corto,
        poblacion,
        dap.tbl_hitos_fechas.fecha_proyectada,
        EXTRACT(MONTH FROM fecha_proyectada) AS mes,
        EXTRACT(YEAR FROM fecha_proyectada) AS anio,
        observaciones,
        urlimage
    from dap.tbl_main_hitos
        inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
        inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
        inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito        
    WHERE 
        EXTRACT(MONTH FROM dap.tbl_hitos_fechas.fecha_proyectada) = $1
        AND  EXTRACT(YEAR FROM fecha_proyectada) = $2
        `, [mes, anio])
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }   
    } catch (error) {
        console.error('Error getHitoVigMes: ', error);
        res.status(403).json({message: "Error consulta getHitoVigMes ",error, success: false})
        
    }
}

infoCtrl.getHitosDepTotal = async (req, res)=>{
    try {
        const response = await dblocal.query(
            `select 
                dap.tbl_main_hitos.centro_gestor,
                dep_corto,
                count (centro_gestor) as total
            from dap.tbl_main_hitos
            group by dap.tbl_main_hitos.centro_gestor, dep_corto
            `) 
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }
        
    } catch (error) {
        console.error('Error getHitosDepTotal: ', error);
        res.status(403).json({message: "Error consulta getHitosDepTotal ",error, success: false}) 
    }
}

infoCtrl.getCountAnioMesDep = async (req, res)=>{
    try {
        const anio = req.params.vigencia
        const mes = req.params.mes
        const response = await dblocal.query(` 
            select 
        	    dep_corto,
	 	        COUNT(dep_corto)
	        from dap.tbl_main_hitos
            inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
            inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
            inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
            WHERE
			    EXTRACT(YEAR FROM fecha_proyectada)   = $1 AND  
			    EXTRACT(MONTH FROM fecha_proyectada)  = $2
		    GROUP BY dep_corto
            `, [anio, mes]
        )
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  
    } catch (error) {
        console.error('Error getHitoTipo: ', error);
        res.status(403).json({message: "Error consulta getHitoTipo ",error, success: false}) 
    }
}

infoCtrl.getDependenciasNew = async(req, res)=>{
    try {
        const response = await dblocal.query(`select * from dependencias.tbl_newdependencias order by nombre_dep`)
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  

    } catch (error) {
        console.error('Error getDependenciasNew: ', error);
        res.status(403).json({message: "Error consulta getDependenciasNew ",error, success: false}) 
    }
}

infoCtrl.getCountHitosDepVigMes = async(req, res)=>{
try {
    const dependencia = req.params.cod_dep
    const response = await dblocal.query(`
    		
		 select 
         centro_gestor,
        count(centro_gestor),
       EXTRACT(YEAR FROM fecha_proyectada) AS year,
        EXTRACT(MONTH FROM fecha_proyectada) AS month
    
   from dap.tbl_main_hitos
   inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = tbl_main_hitos.codintervencion
   inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
   inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito 
   where centro_gestor= $1
   group by  
       centro_gestor,  
       EXTRACT(YEAR FROM fecha_proyectada) ,
       EXTRACT(MONTH FROM fecha_proyectada) 
   order by 
   centro_gestor,  
       EXTRACT(YEAR FROM fecha_proyectada) ,
       EXTRACT(MONTH FROM fecha_proyectada) 
    
    
    `,[dependencia])
    if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  
} catch (error) {
    console.error('Error getDependenciasNew: ', error);
    res.status(403).json({message: "Error consulta getDependenciasNew ",error, success: false}) 
}

}

infoCtrl.getHitosrelevantes = async(req, res)=>{
    try {
        const response = await dblocal.query(`
        select 
        id_hito,
		idhito,
        hito,
		desc_hito,
        tbl_main_hitos.codintervencion,
        dap.tbl_tipointervencion.tipo_intervencion,
        dap.tbl_hitos_proyecto.codproyecto,
        dap.tbl_hitos_proyecto.proyecto,
        valorproyecto,
        centro_gestor,
        dep_corto,
        poblacion,
        dap.tbl_hitos_fechas.fecha_proyectada,
        EXTRACT(MONTH FROM fecha_proyectada) AS mes,
        EXTRACT(YEAR FROM fecha_proyectada) AS anio,
        observaciones,
        urlimage
        from dap.tbl_main_hitos
       	inner join dap.tbl_tipointervencion on tbl_tipointervencion.codintervencion = dap.tbl_main_hitos.codintervencion
        inner join dap.tbl_hitos_proyecto on dap.tbl_hitos_proyecto.codhito =dap.tbl_main_hitos.id_hito
       	inner join dap.tbl_hitos_fechas on dap.tbl_hitos_fechas.codhito = dap.tbl_main_hitos.id_hito
		inner join dap.tbl_relevantes on dap.tbl_relevantes.idhito =dap.tbl_main_hitos.id_hito
        
        `)
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  
        
    } catch (error) {
        console.error('Error getHitosrelevantes: ', error);
        res.status(403).json({message: "Error consulta getHitosrelevantes ",error, success: false}) 
    }
}






module.exports = infoCtrl;