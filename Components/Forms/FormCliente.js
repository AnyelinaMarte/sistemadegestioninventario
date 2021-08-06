import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {db,auth} from '../../BD/conf';
import EditIcon from '@material-ui/icons/Edit';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import AddIcon from '@material-ui/icons/Add';
import {addBDPedido} from '../../BD/CRUD';
export default function FormCliente(props){
    let productoC={
        descripionProducto:'', 
        unidadesProducto: 0,
        precioUnitario:0,
        precioTotal:0,

    } 
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var fecha = new Date();
  
    const valorInicial={
        nombreCliente:'',
        direccionCliente:'',
        contactoCliente:'',
        fechaVenta:{dia:fecha.getDate(),mes:meses[fecha.getMonth()],ano:fecha.getFullYear()} ,
        productosCliente:[],
   }
   const [producto, setProducto]= useState(productoC)
   const [valor, setValor]= useState(valorInicial)
   const [datosproducto, setdatosProducto]= useState([])
   const [buscarProducto, setbuscarProducto]= useState([])
   
      useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if (user!=null){
                db.collection('Usuario').doc(user.uid).collection('Producto').onSnapshot(querySnapshot=>{
                    const docs=[]
                    querySnapshot.forEach(doc=>{
                        docs.push({...doc.data(),id:doc.id})
                    })
                    setdatosProducto(docs)
                })
            }
        })

        
    },[])
    const buscar=(e)=>{
        let productos= e.target.value 
        let cantidadletras=productos.length
        
       

        let dproducto= datosproducto.filter(word=>{
            const palabraProducto=word.descripcionProducto
            const palabraActual=palabraProducto.substr(0,cantidadletras)
            return palabraActual.toLowerCase() == productos.toLowerCase()
        })
        setbuscarProducto(dproducto)
    }
    const clickBuscar=(descripionProducto,unidades, preciounitario,id,salida)=>{
      

        setProducto({ 
            descripionProducto:descripionProducto, 
            unidadesProducto: 0,
            precioUnitario:preciounitario,
            id:id,
            totalUnitario:0,
            unidades:unidades,//existencia
            salida:salida,//salida del producto general
            })

 
    }
    const agregarProducto=(e)=>{
        e.preventDefault()
        
        const inputUnidades= document.getElementById('uProductoS').value

        if  (parseInt(inputUnidades) >= 1 && parseInt(inputUnidades) <= parseInt(producto.unidades)){
              const result = valor.productosCliente.filter(word=>{
                          return word.descripionProducto.toLowerCase()===producto.descripionProducto.toLowerCase()
                      })
                          if (result.length == 0){
                            producto.unidadesProducto=parseInt(inputUnidades)
                            producto.totalUnitario = parseInt( inputUnidades) * parseInt( producto.precioUnitario)
                            producto.salida = parseInt( producto.salida) + parseInt( inputUnidades)
                            producto.unidades= parseInt( producto.unidades) - parseInt( inputUnidades)
                            
                            valor.productosCliente.push({...producto})
                            setValor({
                                nombreCliente:valor.nombreCliente,
                                direccionCliente:valor.direccionCliente,
                                contactoCliente:valor.contactoCliente,
                                productosCliente:valor.productosCliente,
                                fechaVenta:{dia:fecha.getDate(),mes:meses[fecha.getMonth()],ano:fecha.getFullYear()}
                                
                                })
                          }else{swal("Descripcion Producto Existente ", "No se pueden agregar dos campos con el mismo nombre", "info");}
                      }
            
        else{
            console.log('Mal')
        }

    }
     const handleChange =(e)=>{
        const {name, value}= e.target
        setValor({...valor,[name]:value})
   }
   const handleSubmit=(e)=>{
        e.preventDefault()
        const ano= fecha.getFullYear() + ''
        const mes= meses[fecha.getMonth()]
        
        addBDPedido(valor,ano,mes)
        setValor({...valorInicial})
   }
   
   const eliminar=(descripcion)=>{
        for (var i =0; i<valor.productosCliente.length; i++){

            if (valor.productosCliente[i].descripionProducto==descripcion){
              
                 valor.productosCliente.splice(i,1)
                 console.log(i)
                 setValor({
                    nombreCliente:valor.nombreCliente,
                    direccionCliente:valor.direccionCliente,
                    contactoCliente:valor.contactoCliente,
                    productosCliente:valor.productosCliente,
                    fechaVenta:{dia:fecha.getDate(),mes:meses[fecha.getMonth()],ano:fecha.getFullYear()} ,

                    
                    })
            }
        }
      
   }
          
    return(
        <>
        <form  className="form-añdir">
            <h2>Nuevo Pedido</h2>  
            <div className="Grid-form-Cliente">
                <div>
                    <input type="text" onChange={handleChange}  placeholder="Nombre del cliente" name="nombreCliente" required/>
                </div>
                <div>
                    <input type="text" onChange={handleChange} placeholder="Direccion del cliente" name="direccionCliente" required/>
                </div>
                <div>
                    <input type="text" onChange={handleChange} placeholder="Contacto del cliente" name="contactoCliente" required/>
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
            <div className="search-producto">
                <input type="text"  placeholder="Buscar Productos" name="buscarProductoS" value={producto.descripcionProducto} onChange={buscar}/>
                <input type="number" placeholder="Unidades" name="unidadesProductoS" id="uProductoS" min="1"/>
                <button onClick={agregarProducto}>
                    Añadir
                </button>
                <div>
                {buscarProducto.map(doc=>

                <tr className="form-cliente-tr" onClick={()=>clickBuscar(doc.descripcionProducto,doc.existenciaProducto,doc.precioVProducto, doc.id,doc.salidaProducto)}>
                    <td>
                        {doc.descripcionProducto}
                    </td> 
                </tr>     
                 )}
                </div>
            </div>
            <div className="botton-añadir">
                <Button onClick={handleSubmit} variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px', borderRadius:'70px'}}>
                   Añadir Pedido  <AddCircleIcon style={{fontSize:25, color:'white'}} /> 
                    
                </Button>
            </div>
        </form>
         <table >
                    <tr>
                        <th>Descripcion</th>
                        <th>Unidades</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                        
                        
                    </tr>

                    {valor.productosCliente.map(doc=>
                     <tr>
                        <td>
                        {doc.descripionProducto}
                        </td>
                        <td>
                        {doc.unidadesProducto}
                        </td>
                        <td>
                        {doc.precioUnitario}
                        </td>
                         <td>
                        {doc.precioUnitario * doc.unidadesProducto}
                        </td>

                        <td>
                        <button onClick={()=>eliminar(doc.descripionProducto)}>Eliminar</button>
                        </td>
                    </tr>
                    )}
                   
                </table>
    </>
    )
}