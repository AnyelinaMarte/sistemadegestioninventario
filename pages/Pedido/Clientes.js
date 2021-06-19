import FormCliente from '../Components/Forms/FormCliente';
import ContainerForm from "../Components/Forms/ContainerForm";
import {useState, useEffect} from 'react';
import {auth, db} from '../../BD/conf';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
export default function PedidoProveedor(){
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
    return(
        <main>
            <section className="form-table clientes"> 
                <ContainerForm>
                    <FormCliente />
                </ContainerForm>
            </section>
            <table>
                <tr>
                    <th>Nombre Cliente</th>
                    <th>Fecha</th>
                    <th>Monto pagado</th>
                    <th>Ver detalles</th>
                </tr>
                {data.map(doc =>
                    <tr>
                        <td>{doc.nombreCliente}</td>
                        <td></td>
                        <td></td>
                        <td><TrendingFlatIcon/></td>
                    </tr>    
                )}
            </table>
        </main>
    )
}