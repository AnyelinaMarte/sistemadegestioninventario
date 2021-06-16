import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {db,auth} from '../../../BD/conf';
import Link from "next/link";
import EditIcon from '@material-ui/icons/Edit';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';

export default function FormProducto(props){
    const [getProveedor, setGetProveedor] = useState([]);
    const CampoVacio = ()=>{swal("No se admiten campos Vacios", "No se permite dejar campos vacios", "info") }
  const [getCategoria, setGetCategoria] = useState([]);
  const getDataProveedor = () => {
    auth.onAuthStateChanged(async (user) => {
      if(user != null){
        db.collection('Usuario').doc(user.uid).collection('Proveedor').onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push(doc.data());
          });
          setGetProveedor(docs);
        });
      }
    });
  };

  const getDataCategoria = () => {
    auth.onAuthStateChanged(async (user) => {
      if(user != null){
        db.collection('Usuario').doc(user.uid).collection('Categoria').onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push(doc.data());
          });
          setGetCategoria(docs);
        });
      }
    });
  };

  useState(() => {
    getDataProveedor();
    getDataCategoria();
  }, []); 
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var fecha = new Date();
    const diaActual = fecha.getDate()
    const añoActual = fecha.getFullYear()
    const mesActual = meses[fecha.getMonth()];
     const fechaActual = (`${diaActual}/${mesActual}/${añoActual}`)

    const valorInicial={
        descripcionProducto:'',
        categoriaProducto:'',
        proveedorProducto:'',
        precioCProducto:0,
        precioVProducto:0,
        fechaEntrada:fechaActual,
        cantidadEntrante:1,
        salidaProducto:0,
        existenciaProducto:0

       }
       const [valor, setValor]= useState(valorInicial)
    
       const handleChange =(e)=>{
            const {name, value}= e.target
            setValor({...valor,[name]:value})
    
       }
   const [dataProducto, setdataProducto]=useState([])
   useEffect(()=>{
    auth.onAuthStateChanged(user=>{
        if (user!=null){
            db.collection('Usuario').doc(user.uid).collection('Producto').onSnapshot(querySnapshot=>{
                const docs=[]
                querySnapshot.forEach(doc=>{
                    docs.push({...doc.data(),id:doc.id})
                })
                setdataProducto(docs)
            })
        }
    })

    
},[])
      const handleSubmit=(e)=>{
        e.preventDefault()
            if (valor.descripcionProducto != ''){
              if(valor.categoriaProducto != ''){
                if(valor.proveedorProducto != ''){
                  if(valor.precioCProducto != ''){
                    if(valor.precioVProducto != ''){
                      if(valor.cantidadEntrante != ''){
                        const result = dataProducto.filter(word=>{
                          return word.descripcionProducto.toLowerCase()===valor.descripcionProducto.toLowerCase()
                      })
                          if (result.length == 0){
                            valor.existenciaProducto=valor.cantidadEntrante
                            props.addProducto(valor)
                            setValor({...valorInicial})
                          }else{swal("Descripcion Producto Existente ", "No se pueden agregar dos campos con el mismo nombre", "info");}
                      }
                      else{ CampoVacio() }
                    } else{
                      CampoVacio() }
                  } else{CampoVacio()}
                }else{ CampoVacio() }
              }else{CampoVacio()}
            }else{ CampoVacio()}     
      }
       const getData=(id)=>{
           auth.onAuthStateChanged(async user=>{
               if (user!=null){
                const docu = await  db.collection('Usuario').doc(user.uid).collection('Producto').doc(id).get()
            setValor({...docu.data()})   
            }
               
           })
       }
       useEffect(()=>{
            if (props.currentId!=''){
                getData(props.currentId)
            }
            else{
                setValor({...valorInicial})
            }
       },[props.currentId])
    return(
        <form onSubmit={handleSubmit} className="form-producto">
        <h2>Registrar Producto</h2> 
        <div className="regist-producto">
          <fieldset>
             <legend >Descripcion</legend>
                 <input className="input-producto" placeholder="Descripcion del producto" onChange={handleChange} value={valor.descripcionProducto} type="text"  name="descripcionProducto"/>
            </fieldset>
          <fieldset>
             <legend >Categoria</legend>
        {getCategoria.length === 0 ? (
          <Link href="/Categoria">
            <Button variant="container" color="primary">
              Añadir Categoria
            </Button>
          </Link>
        ) : (
          <select
            name="categoriaProducto"
            id="nameCategoria"
            onChange={handleChange}
          >
            <option value="Ninguno">No selecionado</option>
            {getCategoria.map((categoria) => (
              <option value={categoria.descripcionCategoria}>
                {categoria.descripcionCategoria}
              </option>
            ))} 
          </select>
        )}
             </fieldset>
             <fieldset>
             <legend >Proveedor</legend>
        {getProveedor.length === 0 ? (
          <Link href="/Proveedor">
            <Button variant="container" color="primary">
              Añadir Proveedor
            </Button>
          </Link>
        ) : (
          <select
         
            required
            name="proveedorProducto"
            id="nameProveedor"
            onChange={handleChange}
          >
            <option value=" ">No selecionado</option>
            {getProveedor.map((proveedor) => (
              <option value={proveedor.nombreProveedor}>
                {proveedor.nombreProveedor}
              </option>
            ))}
          </select>
        )}
        
             </fieldset>
             </div>
             <div className="grid-sub">
                <fieldset>
                    <legend>Precio Compra</legend>
                    <input onChange={handleChange} value={valor.precioCProducto} type="number" placeholder="Precio Compra" name="precioCProducto"/>
                </fieldset>
                <fieldset>
                    <legend>Precio Venta</legend>
                    <input onChange={handleChange} value={valor.precioVProducto} type="number" placeholder="Precio Venta" name="precioVProducto"/>
                </fieldset>
                <fieldset>
                    <legend>Cantidad Entrante</legend>
                    <input onChange={handleChange} value={valor.cantidadEntrante} type="number" placeholder="Cantidad Entrante" name="cantidadEntrante"/>
                </fieldset>
                
             </div>
             <div className="botton-añadir">
               <Button onClick={handleSubmit} variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px', borderRadius:'70px'}}>
                   Añadir Producto  <AddCircleIcon style={{fontSize:25, color:'white'}} /> 
                    
                </Button>
             </div>
         </form>
    )
}