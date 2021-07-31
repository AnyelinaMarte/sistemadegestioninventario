import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
export default function ButtonEstad(props){
    return(
        <article  className={`article-button ${props.color}`}>
            <div className="article-b-icon">{props.Icon}</div>
            <div>
                <h2>{props.title}</h2>
                <p>{props.descripcion}</p>
            </div>
            <div>
                <div className="grafica" onClick={props.click }><span>Ver grafica </span> <ArrowForwardIcon/></div>
            </div>
        </article>
    )
} 