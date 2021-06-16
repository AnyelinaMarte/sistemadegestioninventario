import ContainerForm from "./Components/Forms/ContainerForm";
import FormCategoria from "./Components/Forms/FormCategoria";
import {auth,db} from "../BD/conf"
import {addBD, deleteBD} from '../BD/CRUD';
import {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit';
export default function Categoria(){
    const [currentId,setcurrentId]=useState('')
    const [datos,setDatos]=useState([])
    const addCategoria=(objeto)=>{
        addBD(currentId,'Categoria',objeto)
    } 
    const deleteCategoria=(id,Descripcion)=>{
        deleteBD('Categoria',id,{Descripcion})
    } 
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if (user!=null){
                db.collection('Usuario').doc(user.uid).collection('Categoria').onSnapshot(querySnapshot=>{
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
            <section  className="form-table categoria"> 
                <ContainerForm>
                    <FormCategoria addCategoria={addCategoria} currentId={currentId}/>
                </ContainerForm> 

                <table>
                    <tr>

                            <th>
                                Descripcion
                            </th>
                            <th>
                                Editar
                            </th>
                            <th>
                                Eliminar
                            </th>

                    </tr>
                    
                    {datos.map(doc=>
                    <>
                            <tr>
                                <td>
                                    {doc.descripcionCategoria}
                                </td>
                                <td>
                                    <button onClick={()=>setcurrentId(doc.id)}><UpdateIcon color="primary"/></button>
                                </td>
                                <td>
                                    <button onClick={()=>deleteCategoria(doc.id,doc.descripcionCategoria)}><DeleteIcon color="secondary"/></button>
                                </td>
                            </tr>
                    </>
                    )}
                </table>
                        
                        
            </section>
        </main>
    )
}