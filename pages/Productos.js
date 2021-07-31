import ContainerForm from "../Components/Forms/ContainerForm";
import FormProducto from "../Components/Forms/FormProducto";
import {auth,db} from "../BD/conf"
import {addBD, deleteBD} from '../BD/CRUD';
import {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit';

export default function Productos(){
    const [currentId,setcurrentId]=useState('')
    const [datos,setDatos]=useState([])
    const addProducto=(objeto)=>{
        addBD(currentId,'Producto',objeto)
    } 
    const deleteProducto=(id,Descripcion,categoriaP,proveedorP,precioC,precioV,cantidadE,salidaP,existencia)=>{
        deleteBD('Producto',id,{Descripcion,categoriaP,proveedorP,precioC,precioV,cantidadE,salidaP,existencia})
    }
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if (user!=null){
                db.collection('Usuario').doc(user.uid).collection('Producto').onSnapshot(querySnapshot=>{
                    const docs=[]
                    querySnapshot.forEach(doc=>{
                        docs.push({...doc.data(),id:doc.id})
                    })
                    setDatos(docs)
                })
            }
        })

        
    },[])
return (
    <main>
        <section className="form-table producto">
        <ContainerForm>
         <FormProducto addProducto={addProducto} currentId={currentId}/>
    </ContainerForm> 
<table>
   <tr>

        <th>
            Descripcion
        </th>
        <th>
            Categoria
        </th>
        <th>
            Proveedor
        </th>
        
        <th>
            Precio Compra
        </th>
        <th>
            Precio Venta
        </th>
        <th>
            Fecha Entrada
        </th>
        <th>
            Entrada
        </th>
        <th>
            Salida
        </th>
        <th>
            Existencia
        </th>
        <th>
            Editar
        </th>
        <th>
            Eliminar
        </th>

   </tr>
   {datos.map(doc=>
        <tr>
            <td>
                {doc.descripcionProducto}
            </td>
            <td>
                {doc.categoriaProducto}
            </td>
            <td>
                {doc.proveedorProducto}
            </td>
            <td>
                {doc.precioCProducto}
            </td>
            <td>
                {doc.precioVProducto}
            </td>
            <td>
                {doc.fechaEntrada}
            </td>
            <td>
                {doc.cantidadEntrante}
            </td>
            <td>
                {doc.salidaProducto}
            </td>
            <td>
                {doc.existenciaProducto}
            </td>
            <td>
                <button onClick={()=>setcurrentId(doc.id)}><UpdateIcon color="primary"/></button>
            </td>
            <td>
                <button onClick={()=>deleteProducto(doc.id,doc.descripcionProducto,doc.categoriaProducto,doc.proveedorProducto,doc.precioCProducto,doc.precioVProducto,doc.cantidadEntrante,doc.salidaProducto,doc.existenciaProducto)}><DeleteIcon color="secondary"/></button>
            </td>
        </tr>
   )}
</table>

        </section>
    
    </main>
)
}