import ContainerForm from "../Components/Forms/ContainerForm";
import FormProveedor from "../Components/Forms/FormProveedor";
import {auth,db} from "../BD/conf"
import {addBD, deleteBD} from '../BD/CRUD';
import {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit';

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
    const [buscarProeedor, setbuscarProeedor]= useState([])

    const buscar=(e)=>{
        let proveedores= e.target.value 
        let cantidadletras=proveedores.length
        
       

        let dproveedores= datos.filter(word=>{
            const palabraProveedores=word.nombreProveedor
            const palabraActual=palabraProveedores.substr(0,cantidadletras)
            return palabraActual.toLowerCase() == proveedores.toLowerCase()
        })
        setbuscarProeedor(dproveedores)
    }
    return(
        <main>
           <section className="form-table proveedor">
                    <ContainerForm>
                            <FormProveedor addProveedor={addProveedor} currentId={currentId}/>
                        </ContainerForm> 
                        <hr></hr>
                <input type="search" placeholder="Buscar en lista de Proveedores" name="buscarProveedor"  onChange={buscar}/>
                <div className="scroll-tabla altoP">
                <table>
                    <tr>
                    <th>
                                RNC
                            </th>

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
                            <th>
                                Cedula
                            </th>
                            <th>
                                Editar
                            </th>
                            <th>
                                Eliminar
                            </th>

 
                    </tr>
                    {buscarProeedor.length == 0?
                        datos.map(doc=>
                            <tr>
                            <td>
                                    {doc.rncProveedor}
                                </td>
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
                                    {doc.cedulaProveedor}
                                </td>
                                <td>
                                    <button onClick={()=>setcurrentId(doc.id)}><UpdateIcon color="primary"/></button>
                                </td>
                                <td>
                                    <button onClick={()=>deleteProveedor(doc.id,doc.nombreProveedor,doc.correoProveedor,doc.telefonoProveedor,doc.direccionProveedor)}><DeleteIcon color="secondary"/></button>
                                </td>
                            </tr>
                    ):buscarProeedor.map(doc=>
                            <tr>
                            <td>
                                    {doc.rncProveedor}
                                </td>
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
                                    {doc.cedulaProveedor}
                                </td>
                                <td>
                                    <button onClick={()=>setcurrentId(doc.id)}><UpdateIcon color="primary"/></button>
                                </td>
                                <td>
                                    <button onClick={()=>deleteProveedor(doc.id,doc.nombreProveedor,doc.correoProveedor,doc.telefonoProveedor,doc.direccionProveedor)}><DeleteIcon color="secondary"/></button>
                                </td>
                            </tr>
                    )}
                </table>
                 </div>       
                    
           </section> 
        </main>
    )
}