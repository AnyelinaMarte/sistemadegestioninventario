import DraftsIcon from '@material-ui/icons/Drafts';
import LockIcon from '@material-ui/icons/Lock';
import RoomIcon from '@material-ui/icons/Room';
import style from '../styles/Login.module.css';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {useState} from 'react';
import {auth, db} from '../BD/conf';
export default function Login(){
    const  datosUsuario=(e)=>{
        e.preventDefault()
        const nombreEmpresa = document.getElementById('nombre_Empresa').value;
        const correoAdmin = document.getElementById('correo_Admin').value;
        const claveAdmin = document.getElementById('clave_Admin').value;
        const direccionEmpresa = document.getElementById('direccion_Empresa').value;
        auth.createUserWithEmailAndPassword(correoAdmin,claveAdmin)
        .then(async Usuario=>{
            
            await auth.onAuthStateChanged(async User=>{
                if (User != null){
            await db.collection('Usuario').doc(User.uid).collection('BD_Usuario').doc('datos_Usuario').set({nombreEmpresa, direccionEmpresa})}
            }) 
        })
 
    }
    const datosInicio=(e)=>{
        e.preventDefault()
        const correoUsuario= document.getElementById('correoInicio').value;
        const claveUsuario= document.getElementById('claveInicio').value;

        auth.signInWithEmailAndPassword(correoUsuario, claveUsuario)


    }

    const Registro = (
        <div  className={style.containerLogin}>
            <h1 className={style.title}>Registrarse</h1>
            <p className={style.subTitle} >Crear nueva cuenta</p>
            <form className={style.formLogin}>
                <div>
                    <label>
                        <AccountBalanceIcon style={{color:'#3C01F1', fontSize:'30px'}} />
                        <input type="text" id="nombre_Empresa" placeholder="Ingresa el nombre de la empresa"/>
                    </label>
                </div>
                <div>
                    <label>
                        <DraftsIcon style={{color:'#3C01F1', fontSize:'30px'}} />
                        <input type="email" id="correo_Admin" placeholder="Ingresa tu correo aqui"/>
                    </label>
                </div>
                <div>
                    <label>
                        <RoomIcon style={{color:'#3C01F1', fontSize:'30px'}} />
                        <input type="text" id="direccion_Empresa" placeholder="Ingresa la direccion de la empresa"/>
                    </label>
                </div>
                <div>
                    <label>
                        <LockIcon style={{color:'#3C01F1'}} />
                        <input type="password" id="clave_Admin" placeholder="Ingresa tu contraseña aqui"/>
                    </label>
                </div>
                <div>
                    <label>
                        <LockIcon style={{color:'#3C01F1'}} />
                        <input type="password"  placeholder="Confirma tu contraseña aqui"/>
                    </label>
                </div>
                <div>
                    <button onClick={datosUsuario}>Registrarse</button>
                </div>
                <div>
                    <a onClick={()=>setBody(login)}>¿Ya tienes una cuenta?<br></br>Incia seccion aquí</a>
                </div>
            </form>
        </div>
    )
    const login = (
        <div  className={style.containerLogin}>
            <h1 className={style.title}>Inicio de Seccion</h1>
            <p className={style.subTitle} >Ingresa en tu cuenta</p>
            <form className={style.formLogin}>
                <div>
                    <label>
                        <DraftsIcon style={{color:'#3C01F1', fontSize:'30px'}} />
                        <input type="email" id="correoInicio" placeholder="Ingresa tu correo aqui"/>
                    </label>
                </div>
                <div>
                    <label>
                        <LockIcon style={{color:'#3C01F1'}} />
                        <input type="password" id="claveInicio" placeholder="Ingresa tu contraseña aqui"/>
                    </label>
                </div>
                <div>
                    <button onClick={datosInicio}>Iniciar Seccion</button>
                </div>
                <div>
                    <a onClick={()=>setBody(Registro)}>¿A un no tienes una cuenta?<br></br>Registrate aquí</a>
                </div>
            </form>
        </div>
    )
    const [body, setBody] = useState(login);
    return(
        <main className={style.gridLogin}>
            <div>
                <div className={style.svgLogin}>
                    <div>
                        <img src="/login-1.svg"/>
                    </div>
                </div>
            </div>
           <div>
            <img className={style.userImg} src="/user.svg"/>
             {body}
           </div>
 
        </main>
    )
}
