import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
export default function Tabla(props){
    return(
        <>
        <table>
            <thead>
                <tr>
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
        </>
    )
}