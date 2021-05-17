import DraftsIcon from '@material-ui/icons/Drafts';
import LockIcon from '@material-ui/icons/Lock';
import style from '../styles/Login.module.css';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {useState} from 'react'
export default function Login(){
    const Registro = (
        <div  className={style.containerLogin}>
            <h1 className={style.title}>Registrarse</h1>
            <p className={style.subTitle} >Crear nueva cuenta</p>
            <form className={style.formLogin}>
                <div>
                    <label>
                        <AccountBalanceIcon style={{color:'#3C01F1', fontSize:'30px'}} />
                        <input type="text" placeholder="Ingresa el nombre de la empresa"/>
                    </label>
                </div>
                <div>
                    <label>
                        <DraftsIcon style={{color:'#3C01F1', fontSize:'30px'}} />
                        <input type="email" placeholder="Ingresa tu correo aqui"/>
                    </label>
                </div>
                <div>
                    <label>
                        <LockIcon style={{color:'#3C01F1'}} />
                        <input type="password" placeholder="Ingresa tu contraseña aqui"/>
                    </label>
                </div>
                <div>
                    <label>
                        <LockIcon style={{color:'#3C01F1'}} />
                        <input type="password" placeholder="Confirma tu contraseña aqui"/>
                    </label>
                </div>
                <div>
                    <button>Registrarse</button>
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
                        <input type="email" placeholder="Ingresa tu correo aqui"/>
                    </label>
                </div>
                <div>
                    <label>
                        <LockIcon style={{color:'#3C01F1'}} />
                        <input type="password" placeholder="Ingresa tu contraseña aqui"/>
                    </label>
                </div>
                <div>
                    <button>Iniciar Seccion</button>
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