import ContainerForm from "../Components/Forms/ContainerForm";
import FormCategoria from "../Components/Forms/FormCategoria";
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
   const [buscarCategoria, setbuscarCategoria]= useState([])

    const buscar=(e)=>{
        let categorias= e.target.value 
        let cantidadletras=categorias.length
        
       

        let dcategoria= datos.filter(word=>{
            const palabraCategoria=word.descripcionCategoria
            const palabraActual=palabraCategoria.substr(0,cantidadletras)
            return palabraActual.toLowerCase() == categorias.toLowerCase()
        })
        setbuscarCategoria(dcategoria)
    }
    return(
        <main>
            <section  className="form-table categoria"> 
                <ContainerForm>
                    <FormCategoria addCategoria={addCategoria} currentId={currentId}/>
                </ContainerForm> 
                <hr></hr>
                <input type="search"  placeholder="Buscar en lista de Categorias" name="buscarCategoria"  onChange={buscar}/>
                <div className="scroll-tabla alto">

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
                    
                    {buscarCategoria.length == 0?
                    datos.map(doc=>
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
                    ):buscarCategoria.map(doc=>
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
                        
                </div>       
            </section>
        </main>
    )
}