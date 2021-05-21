import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {db,auth} from '../../../BD/conf';
import EditIcon from '@material-ui/icons/Edit';
import {useState, useEffect} from 'react';

export default function FormProveedor(props){
    const valorInicial={
        nombreProveedor :'',
        correoProveedor:'',
        telefonoProveedor:'',
        direccionProveedor:''
       }
       const [valor, setValor]= useState(valorInicial)
    
       const handleChange =(e)=>{
            const {name, value}= e.target
            setValor({...valor,[name]:value})
    
       }
       const handleSubmit=(e)=>{
            e.preventDefault()
            if (valor.nombreProveedor != ''){
                if(valor.correoProveedor != ''){
                    if(valor.telefonoProveedor != ''){
                        if (valor.direccionProveedor != ''){
                            props.addProveedor(valor)
                            setValor({...valorInicial})
                        }
                        else{ console.log("No puede dejar la direccion vacia") }
                    } else{console.log("No puede dejar el telefono vacio") }
                } else{ console.log("No puede dejar el correo vacio") }
            }else{console.log("No puede dejar el nombre vacio") }    
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
                 <input onChange={handleChange} value={valor.correoProveedor} type="text" placeholder="Correo Proveedor" name="correoProveedor"/><br></br>
                 <input onChange={handleChange} value={valor.telefonoProveedor} type="text" placeholder="Telefono Proveedor" name="telefonoProveedor"/>
                 <input onChange={handleChange} value={valor.direccionProveedor} type="text" placeholder="Direccion Proveedor" name="direccionProveedor"/>
             </div>
             <div className="botton-añadir">
             <Button onClick={handleSubmit} variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px', borderRadius:'70px'}}>
                   Añadir Proveedor  <AddCircleIcon style={{fontSize:25, color:'white'}} /> 
                    
                </Button>
             </div>
         </form>
    )
}