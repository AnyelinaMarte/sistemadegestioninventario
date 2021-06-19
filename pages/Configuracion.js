import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Modal from '@material-ui/core/Modal';
import {useState, useEffect} from 'react';
import {auth, db} from '../BD/conf';
import swal from 'sweetalert';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
export default function Configuracion(){
    const [open, setOpen] =useState(false);
    const valorActualizar = {
        direccion:'',
        nombre:'',
        correo:''
    }
    const [valor, setValor] = useState(valorActualizar);
    const handleChange =(e)=>{
        const {name, value}= e.target
        setValor({...valor,[name]:value})
   }
    const actualizarConfiguracion = (e)=>{
        e.preventDefault()
        auth.onAuthStateChanged(async user =>{
            if(user != null){
                if(valor.nombre != ''){
                   console.log('hola')
                   await db.collection('Usuario').doc(user.uid).collection('BD_Usuario').doc('datos_Usuario').update({nombreEmpresa:valor.nombre});
                   console.log('hola')
                   swal("Nombre de la empresa actualizado correctamente", ": )", "success");
                   setOpen(false)
                }
                if(valor.direccion != ''){
                   await db.collection('Usuario').doc(user.uid).collection('BD_Usuario').doc('datos_Usuario').update({direccionEmpresa:valor.direccion});
                   swal("Direccion de la empresa actualizado correctamente", ": )", "success");
                   setOpen(false)
                    
                }
                if(valor.correo != ''){
                    const userData = auth.currentUser;
                    if(userData != null ){
                        userData.updateEmail(valor.correo).then(function() {
                            swal("Correo de la empresa actulizado correctamente", ": )", "success");
                            setOpen(false)
                          }).catch(function(error) {
                            console.log(error)
                          });
                    }
                    
                }
            }
        })
    }

    const updateSettings = (e)=>{
        e.preventDefault();
        const ncontraseña = document.getElementById('n-contraseña').value;
        const ccontraseña = document.getElementById('c-contraseña').value;
        auth.onAuthStateChanged(async user =>{
            if(user != null){ 
                if(ncontraseña !=  '' ){
                   if(ccontraseña === ncontraseña){
                        var userData = auth.currentUser;
                        if(userData != null){
                            userData.updatePassword(ccontraseña).then(function() {
                                swal("Contraseña cambiada correctamente ", ": )", "success");
                                setOpen(false)
                            }).catch(function(error) {
                                if(error.code === 'auth/requires-recent-login'){
                                    swal('Seguridad: Al parecer ha durado mucho tiempo para iniciar seccion, por favor cierre la seccion y vuelva abrirla, antes de cambiar', '', 'info')
                                }
                          });
                   }
                }else{ swal("Contraseña no coinciden", "La contraseña no coinciden", "error");  }

                }
            }
        })
    }

    const general = (
        <div className="form-configuracion">
            <h1>Actualizar datos de la empresa</h1>
            <form>
                <input type="text" placeholder="Cambiar nombre de la empresa" onChange={handleChange} name="nombre"/>
                <br></br>
                <input type="text" placeholder="Cambiar direccion de la empresa" onChange={handleChange} name="direccion" />
                <br></br>
                <input type="email" placeholder="Cambiar correo de la empresa" onChange={handleChange} name="correo"/>
                <br></br>
                <button onClick={actualizarConfiguracion} >Actualizar</button>
            </form>
        </div>
    )
    const contraseña = (
        <div className="form-configuracion">
            <h1>Actualizar contraseña</h1>
            <form>
                <input type="password" id="n-contraseña" placeholder="Nueva contraseña" />
                <br></br>
                <input type="password" id="c-contraseña" placeholder="Repetir contraseña" />
                <br></br>
                <button onClick={updateSettings}>Actualizar</button>
            </form>
        </div>
    )
    const [body, setBody] = useState(general);
    const handleClose = ()=>{
        setOpen(false);
    }
    const openAdmin = ()=>{
        setOpen(true);
        setBody(general)
    }
    const openContraseñas = ()=>{
        setOpen(true);
        setBody(contraseña)
    }
    const [userData, setUserData] = useState("")
    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            if(user != null){
                await db.collection('Usuario').doc(user.uid).collection('BD_Usuario').doc('datos_Usuario').get().then(doc =>{
                setUserData(doc.data().nombreEmpresa)
                })
            }
        })

    },[])
    return(

        <main>
            <h1 className="settign-config">Bienvenido al centro de configuraciones {userData}</h1>
            <section className="settings">
                <div onClick={openAdmin}> 
                    <PersonIcon style={{fontSize:50}} />
                    <br></br>
                    <span>General</span>
                </div>
                 <div onClick={openContraseñas}> 
                    <LockIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Contraseña</span>
                </div>
            </section>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <>
                <button onClick={()=>setOpen(false)} className="close-modal">X</button>
                {body}
                </>
            </Modal>
        </main>
    )
}