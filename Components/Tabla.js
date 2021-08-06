import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
export default function Tabla(props){
    return(
        <section>
        <div>
            <h1>Lista de {props.tituloTabla}</h1>
            <button>Descargar <VerticalAlignBottomIcon/> </button>
        </div>
       <div className="tabla">
       <div>
           <form><input type="text" placeholder={`Buscar en ${props.tituloTabla}`}/></form>
       </div>
        <table> 
                <thead>
                        <tr className="titulos-table" >
                            {
                                props.titulo.map(th=>
                                    <th>{th}</th>
                                )
                            }
                        </tr>
                </thead>
                <tbody>
                    {props.cuerpo.map(tb=>
                        <tr>
                            <td>{tb[props.dato1]}</td>
                            <td>{tb[props.dato2]}</td>
                            <td>{tb[props.dato3]}</td>
                            <td>{tb[props.dato4]}</td>
                            <td>{tb[props.dato5]}</td>
                            <td><DeleteIcon /></td>
                            <td><EditIcon/> </td>
                        </tr>
                    )}
                </tbody>
            </table>
       </div>
        </section>
    )
}