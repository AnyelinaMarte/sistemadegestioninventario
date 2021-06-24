import {useState, useEffect} from 'react';
import {auth, db} from '../../BD/conf';
export default function ModalCliente(props){
    const [data, setData] =useState({})
    const [TOTAL, setTOTAL] =useState(0)
    useEffect(()=>{
        auth.onAuthStateChanged(async user=>{
            if(user != null ){
               await db.collection('Usuario').doc(user.uid).collection('VentasClientes').doc(props.id).get().then(documents=>{
                    setData(documents.data())
                    let total = 0 
                    documents.data().productosCliente.forEach( d => {
                        total+=d.totalUnitario
                    })
                    setTOTAL(total)
               })
            }
        })
    },[])
    return(
       <div>
           {
               Object.keys(data).length === 0 ?
               <h1 className="white">Datos cargando..</h1>
               : <section className="Modal-Cliente">

               <div className="Modal-Cliente-Grid">
                   <button className="close-modal" onClick={props.close} >Cerrar</button>
                   <div>
                      <div>
                           <h4>Nombre del Cliente</h4><span>{data.nombreCliente}</span>
                      </div>
                      <div>
                           <h4>Contacto del Cliente</h4><span>{data.contactoCliente}</span>
                      </div>
                   </div>
   
                 <div>
                       <div><h4>Fecha de venta</h4><span>{`${data.fechaVenta.dia}/${data.fechaVenta.mes}/${data.fechaVenta.ano}`}</span></div>
                       <div><h4>Direccion Cliente</h4><span>{data.direccionCliente}</span></div>
                 </div>
               </div>
               <table>
                   <tr>
                       <th>Descripcion Producto</th>
                       <th>Precio Unitario</th>
                       <th>Unidades</th>
                       <th>Total</th>
                   </tr>
                   {data.productosCliente.map(producto=>
                       <tr>
                           <td>{producto.descripionProducto}</td>
                           <td>{producto.precioUnitario}</td>
                           <td>{producto.unidadesProducto}</td>
                           <td>$ {producto.totalUnitario}</td>
                       </tr>    
                        )}
                        <tr className="total-modal">
                            <td>Total</td>
                            <td>$ {TOTAL}</td>
                        </tr>
               </table>
           </section>
           }

       </div>
    )
}