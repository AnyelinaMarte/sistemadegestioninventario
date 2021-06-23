import {useState, useEffect} from 'react';
import {auth, db} from '../../BD/conf';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Modal from '@material-ui/core/Modal';
import ModalCliente from '../Components/ModalCliente';

export default function ListaVenta(){
    const [data, setData] = useState([])
    useEffect(()=>{
        auth.onAuthStateChanged(async user=>{
            if(user != null ){
               await db.collection('Usuario').doc(user.uid).collection('VentasClientes').onSnapshot(documents=>{
                    const dato = [];
                    documents.forEach(doc => {
                       dato.push({...doc.data(),id:doc.id})
                   });
                   setData(dato);
               })
            }
        })
    },[])
    const [open, setOpen] = useState(false);
    const [id, setID] = useState("");
    const handleOpen = (id) => {
      setOpen(true);
      setID(id)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return(
        <main>
            <table>
                <tr>
                    <th>Nombre Cliente</th>
                    <th>Fecha</th>
                    <th>Ver detalles</th>
                </tr>
                {data.map(doc =>
                    <tr onClick={()=>handleOpen(doc.id)}>
                        <td>{doc.nombreCliente}</td>
                        
                        <td><TrendingFlatIcon/></td>
                    </tr>    
                )}
            </table>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ModalCliente close={handleClose} id={id}/>
            </Modal>
        </main>
    )
}