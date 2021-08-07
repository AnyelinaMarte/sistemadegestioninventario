import { auth, db, dbSecondary } from "../BD/conf";
import { useState, useEffect } from "react";
import Modal from '@material-ui/core/Modal';
import ModalListaEmpleados from "../Components/ModalListaEmpleados";
import EditarListaEmpleados from "../Components/EditarListaEmpleados"
export default function ListaEmpleados(){
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [openEditar, setOpenEditar] = useState(false)
    const [idEmpleado, setIdEmpleado] = useState(false)
    useEffect(()=>{
        auth.onAuthStateChanged(async user=>{
            if(user != null){
                await db.collection("Usuario").doc(user.uid).collection("Empleados").onSnapshot(dato =>{
                    const DATA = [];
                    dato.forEach(doc=>{
                        DATA.push({...doc.data(), id:doc.id})
                    })
                    setData(DATA)
                })
            }
        })
    },[]) 
    const openModal = (id)=>{
        setIdEmpleado(id)
        setOpen(true)
    }
    const closeModal = ()=>{
        setOpen(false)
    }
    const openModalEditar = (id)=>{
        setIdEmpleado(id)
        setOpenEditar(true)
    }
    const closeModalEditar = ()=>{
        setOpenEditar(false)
    }
    return(
        <>
        <div className="admin-control" >
            <table>
                    <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            

                    </tr>
                    
                        {data.map(d=>
                            <tr>
                                <td>{d.nombreEmpleado}</td>
                                <td>{d.apellidoEmpleado}</td>
                                <td>{d.telefonoEmpleado}</td>
                                <td>{d.direccionEmpleado}</td>
                                <td onClick={()=>openModal(d.id)} className="editar-adimn">Ver</td>
                                {/*<td onClick={()=>openModalEditar(d.id)} className="editar-adimn">Editar</td>*/}
                            </tr>
                        )}
                </table>

        </div>
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className="main-lista-empleados">
                <ModalListaEmpleados close={closeModal} id={idEmpleado}/>
            </div>
        </Modal>
        <Modal
            open={openEditar}
            onClose={closeModalEditar}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className="main-lista-empleados">
                <EditarListaEmpleados close={closeModalEditar} id={idEmpleado}/>
            </div>
        </Modal>
        </>
    )
}