import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SmsIcon from '@material-ui/icons/Sms';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import CategoryIcon from '@material-ui/icons/Category';
import Link from 'next/link'
import HomeIcon from '@material-ui/icons/Home';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import StorefrontIcon from '@material-ui/icons/Storefront';
import {useState, useEffect} from 'react'; 
import {auth, db} from '../BD/conf';
export default function Menu({children}) {
  const [data, setData] = useState("")
  const handleActive =()=>{
    const active = document.getElementById('active-pedido');
    active.classList.toggle('active-pedido')
  }
  useEffect(()=>{
    auth.onAuthStateChanged(async user=>{
      if(user != null){
        await db.collection('Usuario').doc(user.uid).collection('BD_Usuario').doc('datos_Usuario').get().then(doc =>{
          setData(doc.data().nombreEmpresa)
        })
      }
    })
  },[])
  const handleActiveMenu = ()=>{
    const active = document.getElementById('sub-navbar');
    active.classList.toggle('sub-navbar-active')
  }
  const close =()=>{
    swal({
      title: "¿Esta seguro que quiere salir de la aplicacion?",
      text: " ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        auth.signOut().then(console.log(""));
      } else {
        console.log('close');
      }
    });
  }
  return(
    <main>
      <main className="main-container">
        {children}
      </main>
        <ul className="menu-izquierdo">
          <li><span>General</span></li>
          <li><Link href="/"><a className="icon-1"> <HomeIcon  /> Casa</a></Link></li>
          <li><Link href="/Categoria"><a className="icon-2"> <CategoryIcon /> Categoria</a></Link></li>
          <li><Link href="/Proveedor"><a className="icon-3"> <AirportShuttleIcon/> Proveedor</a></Link></li>
          <li><Link href="/Productos"><a className="icon-3"> <ListAltIcon /> Productos</a></Link></li>
          <li><a className="icon-9" onClick={handleActive} > <StorefrontIcon /> Pedidos</a></li>
          <div className="pedido-div" id="active-pedido">
            <li onClick={handleActive} ><Link href="/Pedido/ListaVenta"><a className="icon-10"> <StoreIcon />Lista de Ventas</a></Link></li>
            <li onClick={handleActive}><Link href="/Pedido/Clientes"><a className="icon-11"> <ShoppingCartIcon />Ventas a Clientes</a></Link></li>
          </div>
          <li><Link href="/Estadisticas"><a className="icon-5"> <ShowChartIcon /> Estadisticas</a></Link></li>
          {/*<li><Link href="/Chats"><a className="icon-6"> <SmsIcon /> Chats</a></Link></li>*/}
          <li><Link href="/Admin"><a className="icon-7"> <SupervisorAccountIcon /> Adiministrador</a></Link></li>
          <li><Link href="/Configuracion"><a className="icon-8"> <SettingsIcon /> Configuracion</a></Link></li>
        </ul>
        <nav className="navBar" >
          <h1><InsertChartIcon/> Sistema de inventario</h1>
          <ul>
            <li>
            <Badge badgeContent={4}  color="secondary" >
              <NotificationsActiveIcon style={{color:'white'}} />
            </Badge>
            </li>
            <li className="avatar" onClick={handleActiveMenu} ><Avatar>{data.substring(0,1)}</Avatar></li>
          </ul>
      </nav>
      <div className="sub-navbar" id="sub-navbar">
        <span>{data}</span>
        <hr></hr>
        <ul>
          <li onClick={handleActiveMenu} ><Link href="/Admin"><a > <SupervisorAccountIcon /> Adiministrador</a></Link></li>
          <li onClick={handleActiveMenu} ><Link href="/Configuracion"><a> <SettingsIcon /> Configuracion</a></Link></li>
        </ul>
        <Button onClick={close} variant="outlined" color="primary" style={{borderRadius:'22px'}} >
          cerrar seccion
        </Button>
      </div>
    </main>
  );
}
