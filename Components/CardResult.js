import CircularProgress from '@material-ui/core/CircularProgress';
export default function CardResult(props){
    return(
        <div className="card-result" title="PROMEDIO CALCULADO RESPECTO A LAS VENTAS ANTERIORES">
            <div className="grid-result">
                <div>
                   <CircularProgress variant="determinate" value={props.value} style={{color:'blue', width:'80px'}}/>
                </div>
                <div>
                    <span>{props.value} %</span>
                    <p>{props.titulo}</p>
                </div>
            </div>
        </div>
    )
} 