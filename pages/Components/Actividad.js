import { Divider } from "@material-ui/core";
import {auth, db} from '../../BD/conf';
import {useState, useEffect} from "react";
const fecha =  new Date();
const meses  = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
export default function Actividad(){
    const [state, setState] = useState([])
    useEffect(async ()=>{
        auth.onAuthStateChanged(async user=>{
            if(auth != null){
                await db.collection('Usuario').doc(user.uid).collection('Actividades').onSnapshot(data=>{
                    const DATOS = []
                    data.forEach(d=>{
                        DATOS.push({...d.data(),id:d.id})
                    })
                    setState(DATOS)
                })
    
            }
        })
    },[])
    return(
        <article className="Actividades-main">
            <div>
             <h1>Actividades</h1>
             <span>Fecha de hoy: {fecha.getDate()}/{meses[fecha.getMonth()]}/{fecha.getFullYear()}</span>
            </div>
            <br></br>
            <Divider/>
            <ul>
                {
                   state.lenght === 0?
                   <h1>No hay activdades</h1>:
                   state.map(doc=>
                    <>
                    <li>
                        <div>
                            <h2>{doc.tituloActividad}</h2>
                            <span>Dia reunion: <time datetime={doc.fechaActividad}>{doc.fechaActividad}</time></span>
                            <br></br>
                            <span>Hora: <time datetime={doc.horaActividad}>{doc.horaActividad}</time></span>
                            <p>{doc.descripcionActividad} </p>
                        </div>
                    </li>
                    <Divider/>
                    </>    
                )
                }
            
            </ul>

        </article>
    )
}