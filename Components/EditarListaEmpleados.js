import { useEffect, useState } from "react"
import { auth, db,dbSecondary, authSecondary } from "../BD/conf"
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

export default function EditarListaEmpleados(props){
    const [data, setData] = useState({})
    const DATO = []
    useEffect(()=>{
        auth.onAuthStateChanged(async user=>{
            if(user != null){
                await db.collection("Usuario").doc(user.uid).collection("Empleados").doc(props.id).get().then(dat=>{
                    DATO.push(dat.data())
                    

                })
                setData(DATO[0])

                
            }
        })
    },[])
    const valorControlEmpleados = {
        nombreEmpleado:data.nombreEmpleado,
        apellidoEmpleado:data.apellidoEmpleado,
        cedulaEmpleado:data.cedulaEmpleado,
        telefonoEmpleado:data.telefonoEmpleado,
        correoEmpleado:data.correoEmpleado,
        direccionEmpleado:data.direccionEmpleado,
        fechaEntrada:data.fechaEntrada,
        checkEstadistica:data.checkEstadistica,
        checkStock:data.checkStock,
        checkManeteminento:data.checkManeteminento,
        checkVentas:"   ",
        passowordEmpleados:data.passowordEmpleados,
        User_ID:data.User_ID
      }
    const [valorCE, setValorCE]=useState(valorControlEmpleados)
    const onChangeControlEmpleados=(e)=>{
        const {name, value}= e.target
        setValorCE({...valorCE,[name]:value})
        console.log(valorCE)
      }
    const submitControlEmpleado = (e)=>{
        e.preventDefault()
        auth.onAuthStateChanged(async user =>{
          if(user!=null){
              await dbSecondary.collection("Usuario").doc(data.User_ID).set({Empresa_ID:user.uid, checkManeteminento:valorCE.checkManeteminento,checkStock:valorCE.checkStock, checkEstadistica:valorCE.checkEstadistica})
              await db.collection("Usuario").doc(user.uid).collection("Empleados").doc(props.id).update(valorCE)
              if(valorCE.correoEmpleado != ""){
                const userData = authSecondary.currentUser;
                if(userData != null ){
                    userData.updateEmail(valorCE.correoEmpleado).then(function() {
                        swal("Correo de la empresa actulizado correctamente", ": )", "success");
                        setOpen(false)
                      }).catch(function(error) {
                        console.log(error)
                      });
                }
              }
              if(valorCE.passowordEmpleados != ""){
                var userData = authSecondary.currentUser;
                if(userData != null){
                    userData.updatePassword(valorCE.passowordEmpleados).then(function() {
                        swal("Contraseña cambiada correctamente ", ": )", "success");
                        setOpen(false)
                    }).catch(function(error) {
                        if(error.code === 'auth/requires-recent-login'){
                            swal('Seguridad: Al parecer ha durado mucho tiempo para iniciar seccion, por favor cierre la seccion y vuelva abrirla, antes de cambiar', '', 'info')
                        }
                  });
                }
              }
              setValor({...valorControlEmpleados})
          }
        })
      }
    return( 
        <form onSubmit={submitControlEmpleado} className="modalEmpleados-main editar-listaempleados" >
            <div className="data-main">
                <div>
                    <h3>Nombre: <span><input name="nombreEmpleado" placeholder={data.nombreEmpleado}/></span></h3>
                    <h3>Apellido:<span><input name="apellidoEmpleado" placeholder={data.apellidoEmpleado}/> </span></h3>
                </div>
                <div>
                    <h3>Telefono: <span><input name="telefonoEmpleado" placeholder={data.telefonoEmpleado}/></span></h3>
                </div>
                <div>
                    <h3>Direccion:<span> <input name="direccionEmpleado" placeholder={data.direccionEmpleado}/> </span></h3>
                    <h3>Fecha entrada: <span> <input name="fechaEntrada" placeholder={data.fechaEntrada}/> </span></h3>
                </div>
                <div>
                    <h3>Cedula: <span><input name="cedulaEmpleado" placeholder={data.cedulaEmpleado}/></span></h3>
                </div>

            </div>
            
            <h3>Permisos del empleado</h3>
            <div>
                <div >
                    <input onClick={()=>valorCE.checkEstadistica==true? valorCE.checkEstadistica=false : valorCE.checkEstadistica=true} type="checkbox"/>
                    <span>Estadistica</span>
                </div>
                <div>
                    <input onClick={()=>valorCE.checkStock==true? valorCE.checkStock=false : valorCE.checkStock=true} type="checkbox"/>
                    <span>Stock</span>
                </div>
                <div>
                    <input onClick={()=>valorCE.checkManeteminento==true? valorCE.checkManeteminento=false : valorCE.checkManeteminento=true}  type="checkbox"/>
                    <span>Mantenimiento</span>
                </div>
            </div>
            <hr></hr>
            <h3>Datos para inicio de seccion</h3>
            <div>
                <TextField style={{width:'100%'}} id="outlined-basic" label="Correo de Empleado" variant="outlined" name="correoEmpleado" value={valorCE.correoEmpleado} onChange={onChangeControlEmpleados}  />
            </div>
            <div>
                <TextField style={{width:'100%'}} id="outlined-basic"  variant="outlined" type="password" name="passowordEmpleados" value={valorCE.passowordEmpleados} onChange={onChangeControlEmpleados} />
            </div>
            
            <div className="button-modal-lista">
                <button onClick={props.close}>Cerrar</button>
                <button onClick={submitControlEmpleado}>Editar</button>
            </div>
        </form>
    )
}