import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {db,auth} from '../../../BD/conf';
import EditIcon from '@material-ui/icons/Edit';
import {useState, useEffect} from 'react';
export default function FormCategoria(props){
   const valorInicial={
    descripcionCategoria:''
   }
   const [valor, setValor]= useState(valorInicial)

   const handleChange =(e)=>{
        const {name, value}= e.target
        setValor({...valor,[name]:value})

   }
   const handleSubmit=(e)=>{
        e.preventDefault()
        props.addCategoria(valor)
        setValor({...valorInicial})
   }
   const getData=(id)=>{
       auth.onAuthStateChanged(async user=>{
           if (user!=null){
            const docu = await  db.collection('Usuario').doc(user.uid).collection('Categoria').doc(id).get()
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
       <h2>Registrar Categoria</h2> 
            
            <div>
                <label>Descripcíon</label>
                <input onChange={handleChange} value={valor.descripcionCategoria} type="text" placeholder="Seccion" name="descripcionCategoria"/>
            </div>
            <div className="botton-añadir">
                <Button onClick={handleSubmit} variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px'}}>
               <AddCircleIcon style={{fontSize:25, color:'green'}} /> 
                    
                </Button>
            </div>
        </form>
    )
}