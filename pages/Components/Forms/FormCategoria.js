import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
export default function FormCategoria(props){
    return(
        <form className="form-añdir">
            <h2>Registrar Categoria</h2>
            <div>
                <label>Descripcíon</label>
                <input type="text" placeholder="Seccion" name="descripcion"/>
            </div>
            <div className="botton-añadir">
                <Button variant="contained" style={{background:'blueviolet', fontWeight:'bold', color:'white', marginTop:'20px'}}>
                    Añadir Categoria <AddCircleIcon/>
                </Button>
            </div>
        </form>
    )
}