import Avatar from '@material-ui/core/Avatar';
export default function CardEmpleados(props){
    return(
        <article>
            <Avatar>{props.avatar}</Avatar>
            <span>{props.nombre}</span>
            <span>Puesto actual: {props.puesto} </span>
            <span>Ultima vez: {props.ultimoPuesto}</span>
            <a>Ver mas</a>
        </article>
    )
} 