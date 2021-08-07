import { useEffect, useState } from "react"
import { auth, db } from "../BD/conf"

export default function ModalListaEmpleados(props){
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
    return( 
        <main className="modalEmpleados-main" >
            <div className="data-main">
                <div>
                    <h3>Nombre: <span>{data.nombreEmpleado}</span></h3>
                    <h3>Apellido:<span>{data.apellidoEmpleado}</span></h3>
                </div>
                <div>
                    <h3>Correo: <span>{data.correoEmpleado}</span></h3>
                    <h3>Telefono: <span>{data.telefonoEmpleado}</span></h3>
                </div>
                <div>
                    <h3>Direccion:<span>{data.direccionEmpleado}</span></h3>
                    <h3>Fecha entrada: <span>{data.fechaEntrada}</span></h3>
                </div>
                <div>
                    <h3>Cedula: <span>{data.cedulaEmpleado}</span></h3>
                </div>

            </div>
            <div>
                <h3>Roles del empleado</h3>
                <ol>
                    {data.checkEstadistica==true? <li>Estadistica</li>:<span></span>}
                    {data.checkStock==true? <li>Control Stock</li>:<span></span>}
                    {data.checkManeteminento==true? <li>Mantenimiento</li>:<span></span>}
                </ol>
            </div>
            <div className="button-modal-lista">
                <button onClick={props.close} >Cerrar</button>
               
            </div>
        </main>
    )
}