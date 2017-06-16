var express = require("express");
var router = express.Router();

// Obtener Barbers(reservas)
//PATH /barber
router.get("/", (req,res,next)=>{
    req.db.query("SELECT * FROM barber", (err, results)=>{
        if(err){
            res.send([])
        }
        else{
            res.send(results);
        }
    });
});

// Obtener un Barber(reserva)
//PATH /barber/id
router.get("/:id", (req,res,next)=>{
    let id = req.params.id;
    req.db.query("SELECT * FROM barber WHERE idbarber ="+id, (err, results)=>{
        if(err || results.length == 0){
            res.status(404).send({msg:"La Barber no existe"});
        }
        else{
            res.send(results[0]);
        }
    });
});

//Insertar Barber(reserva)
//PATH /barbers
router.post("/", (req,res,next)=>{
     let body = req.body;
     req.db.query("INSERT INTO barber SET nombre = ?, service = ?, hora = ?, fecha = ?"
     ,[body.nombre, body.service, body.hora, body.fecha], (err, results)=>{
        if(err){
            res.send({success:false});
        }
        else{
            res.send({success:true});
        }
     });
});

//Actualizar Barber(reserva)
//PATH /barbers
router.put("/:id", (req,res,next)=>{
      let body = req.body;
      req.db.query("UPDATE barber SET nombre = ?, service = ?, hora = ?, fecha = ? WHERE idbarber = ?"
      , [body.nombre, body.service, body.hora, body.fecha, req.params.id], (err, results)=> {
         if(err){
            res.send({success:false});
        }
        else{
            res.send({success:true});
        } 
      });
});

//Eliminar Barber(reserva)
//PATH /barbers
router.delete("/:id", (req,res,next)=>{
     res.send({msg:"Entro en Delete"})
     req.db.query("DELETE FROM barber WHERE idbarber = ?", [req.params.id], (err, results)=>{
         if(err){
            res.send({success:false});
        }
        else{
            res.send({success:true});
        } 
     });
});

module.exports = router;