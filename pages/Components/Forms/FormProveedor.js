import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {db,auth} from '../../../BD/conf';
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';

import {useState, useEffect} from 'react';

export default function FormProveedor(props){
    const valorInicial={
        nombreProveedor :'',
        apellidoProveedor:'',
        correoProveedor:'',
        telefonoProveedor:'',
        direccionProveedor:'',
        cedulaProveedor:'',
        rncProveedor:'',
       } 
       const [valor, setValor]= useState(valorInicial)
       const CampoVacio = ()=>{swal("No se admiten campos Vacios", "No se permite dejar campos vacios", "info") }
    
       const handleChange =(e)=>{
            const {name, value}= e.target
            setValor({...valor,[name]:value})
    
       }
       const [dataProveedor, setdataProveedor]=useState([])
       useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if (user!=null){
                db.collection('Usuario').doc(user.uid).collection('Proveedor').onSnapshot(querySnapshot=>{
                    const docs=[]
                    querySnapshot.forEach(doc=>{
                        docs.push({...doc.data(),id:doc.id})
                    })
                    setdataProveedor(docs)
                })
            }
        })

        
    },[])
       const handleSubmit=(e)=>{
            e.preventDefault()
            if (valor.nombreProveedor != ''){
                if (valor.apellidoProveedor != ''){
                if(valor.correoProveedor != ''){
                    if(valor.telefonoProveedor != ''){
                        if (valor.direccionProveedor != ''){
                            if(valor.cedulaProveedor != ''){
                                if(valor.rncProeedor != ' '){
                            const result = dataProveedor.filter(word=>{
                                return word.correoProveedor.toLowerCase()===valor.correoProveedor.toLowerCase()
                            })
                            if (result.length == 0){
                                const result = dataProveedor.filter(word=>{
                                    return word.telefonoProveedor.toLowerCase()===valor.telefonoProveedor.toLowerCase()
                                }) 
                                if (result.length == 0){
                                    props.addProveedor(valor)
                                    setValor({...valorInicial})
                                }else{swal("Telefono Proveedor", "No se pueden agregar dos campos con el mismo telefono", "info");}

                            }else{swal("Correo Existente ", "No se pueden agregar dos campos con el mismo correo", "info");}
                        } else{CampoVacio() }
                        }  else{CampoVacio() }
                    } else{CampoVacio()}
                } else{CampoVacio() }
            }else{CampoVacio() }    
       }else{CampoVacio() } 
    }   else{CampoVacio() } 
    }
       const getData=(id)=>{
           auth.onAuthStateChanged(async user=>{
               if (user!=null){
                const docu = await  db.collection('Usuario').doc(user.uid).collection('Proveedor').doc(id).get()
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
        <form onSubmit={handleSubmit} className="form-añdir">
        <h2>Registrar Proveedor</h2> 
             
             <div className="input-form">
                 <input onChange={handleChange} value={valor.nombreProveedor} type="text" placeholder="Nombre Proveedor" name="nombreProveedor"/>
                 <input onChange={handleChange} value={valor.apellidoProveedor} type="text" placeholder="Apellido Proveedor" name="apellidoProveedor"/>
                 <input onChange={handleChange} value={valor.correoProveedor} type="text" placeholder="Correo Proveedor" name="correoProveedor"/>
                 <input onChange={handleChange} value={valor.telefonoProveedor} type="text" placeholder="Telefono Proveedor" name="telefonoProveedor" /><br></br>
                 <input onChange={handleChange} value={valor.direccionProveedor} type="text" placeholder="Direccion Proveedor" name="direccionProveedor"/>
                 <input onChange={handleChange} value={valor.cedulaProveedor} type="text" placeholder="Cedula del Proveedor" name="cedulaProveedor"/>
                 <input onChange={handleChange} value={valor.rncProveedor} type="text" placeholder="RNC del Proveedor" name="rncProveedor"/>

             </div>
             <div className="botton-añadir">
             <Button onClick={handleSubmit} variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px', borderRadius:'70px'}}>
                   Añadir Proveedor  <AddCircleIcon style={{fontSize:25, color:'white'}} /> 
                    
                </Button>
             </div>
         </form>
    )
}