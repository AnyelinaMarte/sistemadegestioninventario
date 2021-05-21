import ContainerForm from "./Components/Forms/ContainerForm";
import FormProveedor from "./Components/Forms/FormProveedor";
import {auth,db} from "../BD/conf"
import {addBD, deleteBD} from '../BD/CRUD';
import {useState, useEffect} from 'react';


export default function Proveedor(){
    const [currentId,setcurrentId]=useState('')
    const [datos,setDatos]=useState([])
    const addProveedor=(objeto)=>{
        addBD(currentId,'Proveedor',objeto)
    }
    const deleteProveedor=(id,nombre,correo,telefono,direccion)=>{
        deleteBD('Proveedor',id,{nombre,correo,telefono,direccion})
    }
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if (user!=null){
                db.collection('Usuario').doc(user.uid).collection('Proveedor').onSnapshot(querySnapshot=>{
                    const docs=[]
                    querySnapshot.forEach(doc=>{
                        docs.push({...doc.data(),id:doc.id})
                    })
                    setDatos(docs)
                })
            }
        })

        
    },[])
    return(
        <main>
            <ContainerForm>
                 <FormProveedor addProveedor={addProveedor} currentId={currentId}/>
            </ContainerForm> 
       <table>
           <tr>

                <th>
                    Nombre
                </th>
                <th>
                    Correo
                </th>
                <th>
                    Telefono
                </th>
                <th>
                    Direccion
                </th>

           </tr>
           {datos.map(doc=>
                <tr>
                    <td>
                        {doc.nombreProveedor}
                    </td>
                    <td>
                        {doc.correoProveedor}
                    </td>
                    <td>
                        {doc.telefonoProveedor}
                    </td>
                    <td>
                        {doc.direccionProveedor}
                    </td>
                    <td>
                        <button onClick={()=>setcurrentId(doc.id)}>Actualizar</button>
                    </td>
                    <td>
                        <button onClick={()=>deleteProveedor(doc.id,doc.nombreProveedor,doc.correoProveedor,doc.telefonoProveedor,doc.direccionProveedor)}>Eliminar</button>
                    </td>
                </tr>
           )}
       </table>
            
            
        </main>
    )
}