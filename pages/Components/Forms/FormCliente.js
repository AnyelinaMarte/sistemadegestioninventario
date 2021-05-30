import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {db,auth} from '../../../BD/conf';
import EditIcon from '@material-ui/icons/Edit';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import AddIcon from '@material-ui/icons/Add';

export default function FormCliente(props){
    return(
        <form  className="form-añdir">
            <h2>Nuevo Pedido</h2>  
            <div className="Grid-form-Cliente">
                <div>
                    <input type="text" placeholder="Nombre del cliente" required/>
                </div>
                <div>
                    <input type="text" placeholder="Direccion del cliente" required/>
                </div>
                <div>
                    <input type="text" placeholder="Contacto del cliente" required/>
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
            <div className="search-producto">
                <input type="text"  placeholder="Buscar Productos" name="descripcionCategoria"/>
                <input type="text" placeholder="Unidades" name="descripcionCategoria"/>
                <button>
                    Añadir
                </button>
            </div>
            <div className="botton-añadir">
                <Button variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px', borderRadius:'70px'}}>
                   Añadir Pedido  <AddCircleIcon style={{fontSize:25, color:'white'}} /> 
                    
                </Button>
            </div>
        </form>
    )
}