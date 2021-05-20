
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
export default function Menu({children}) {

  return (
    <main>

        <ul className="menu-izquierdo">
          <li><span>General</span></li>
          <li><Link href="/"><a className="icon-1"> <HomeIcon  /> Casa</a></Link></li>
          <li><Link href="/Categoria"><a className="icon-2"> <CategoryIcon /> Categoria</a></Link></li>
          <li><Link href="/Proveedor"><a className="icon-3"> <AirportShuttleIcon/> Proveedor</a></Link></li>
          <li><Link href="/Productos"><a className="icon-3"> <ListAltIcon /> Productos</a></Link></li>
          <li><Link href="/Stock"><a className="icon-4"> <CategoryIcon /> Stock</a></Link></li>
          <li><Link href="/Estadisticas"><a className="icon-5"> <ShowChartIcon /> Estadisticas</a></Link></li>
          <li><Link href="/Chats"><a className="icon-6"> <SmsIcon /> Chats</a></Link></li>
          <li><Link href="/Admin"><a className="icon-7"> <SupervisorAccountIcon /> Adiministrador</a></Link></li>
          <li><Link href="/Configuracion"><a className="icon-8"> <SettingsIcon /> Configuracion</a></Link></li>
        </ul>
        <nav className="navBar" >
          <h1><InsertChartIcon/> Sistema de inventario</h1>
          <ul>
            {/* <li><img src=""/><span>Usuario Actual</span></li>
            <li></li> */}
          </ul>
      </nav>
      <main className="main-container">
        {children}
      </main>
    </main>
  );
}
