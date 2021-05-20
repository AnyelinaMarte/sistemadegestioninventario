import Button from '@material-ui/core/Button'
import Link from 'next/link';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CardResult from './Components/CardResult';
import Actividad from './Components/Actividad';
import {GraficaVentaSemanal} from './Components/Graficas'
export default function Home() {
  return (
    <section>
      <article className="grid-index">
        <div>
          <p className="descripcion-general">Descripcion General</p>
          <h1 className="h1-descripcion-general">Buenos dias Yariely Marte</h1>
          <p className="descripcion-general-p">Esto es lo que está sucediendo con tu  negocio hoy</p>
        </div>
        <div className="button-estadistica">
          <Button variant="contained" style={{background:'#5664D2',fontWeight:'bold', borderRadius:'70px'}}>
            <Link href="/Estadisticas"><a>Ver estadisticas </a></Link>
          </Button>
        </div>
      </article>
     <div className="grid-promedios">
       <div>
        <CardResult value={70} titulo="Promedio Ventas Semanal" />
       </div>
       <div>
        <CardResult value={30} titulo="Ventas de hoy" />
       </div>
     </div>
     <Actividad/>

     <GraficaVentaSemanal/>
    </section>
  )
}
