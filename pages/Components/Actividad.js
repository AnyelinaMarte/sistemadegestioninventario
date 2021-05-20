import { Divider } from "@material-ui/core";
const fecha =  new Date();
const meses  = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
export default function Actividad(){
    return(
        <article className="Actividades-main">
            <div>
             <h1>Actividades</h1>
             <span>Fecha de hoy: {fecha.getDate()}/{meses[fecha.getMonth()]}/{fecha.getFullYear()}</span>
            </div>
            <br></br>
            <Divider/>
            <ul>
                <li>
                    <div>
                        <h2>Titulo</h2>
                        <span>Dia reunion: <time datetime="2018-07-07">22/15/2021</time></span>
                        <p>Lorem pixel, formato </p>
                    </div>
                </li>
                <Divider/>
                <li>
                    <div>
                        <h2>Titulo</h2>
                        <span>Dia reunion: <time datetime="2018-07-07">22/15/2021</time></span>
                        <p>Lorem pixel, formato </p>
                    </div>
                </li>
                <Divider/>
                <li>
                    <div>
                        <h2>Titulo</h2>
                        <span>Dia reunion: <time datetime="2018-07-07">22/15/2021</time></span>
                        <p>Lorem pixel, formato </p>
                    </div>
                </li>
                <Divider/>
            </ul>

        </article>
    )
}