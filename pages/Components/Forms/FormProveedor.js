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
            props.addProveedor(valor)
            setValor({...valorInicial})
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
             
             <div>
                 <label>Nombre:</label>
                 <input onChange={handleChange} value={valor.nombreProveedor} type="text" placeholder="Seccion" name="nombreProveedor"/><br></br>
                 <label>Correo:</label>
                 <input onChange={handleChange} value={valor.correoProveedor} type="text" placeholder="Seccion" name="correoProveedor"/><br></br>
                 <label>Telefono:</label>
                 <input onChange={handleChange} value={valor.telefonoProveedor} type="text" placeholder="Seccion" name="telefonoProveedor"/><br></br>
                 <label>Direccion:</label>
                 <input onChange={handleChange} value={valor.direccionProveedor} type="text" placeholder="Seccion" name="direccionProveedor"/>
             </div>
             <div className="botton-añadir">
                 <Button onClick={handleSubmit} variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px'}}>
                <AddCircleIcon style={{fontSize:25, color:'green'}} /> 
                     
                 </Button>
             </div>
         </form>
    )
}