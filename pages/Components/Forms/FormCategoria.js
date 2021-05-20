import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {db,auth} from '../../../BD/conf';
import EditIcon from '@material-ui/icons/Edit';
import {useState, useEffect} from 'react';
export default function FormCategoria(props){
    
    return(
        <form  className="form-añdir">
       \<h2>Registrar Categoria</h2> 
            
            <div>
                <label>Descripcíon</label>
                <input  type="text" placeholder="Seccion" name="descripcionCategoria"/>
            </div>
            <div className="botton-añadir">
                <Button onSubmit={manejarEnvio} variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px'}}>
               <AddCircleIcon style={{fontSize:25, color:'green'}} /> 
                    
                </Button>
            </div>
        </form>
    )
}