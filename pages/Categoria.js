import ContainerForm from "./Components/Forms/ContainerForm";
import FormCategoria from "./Components/Forms/FormCategoria";
import Tabla from './Components/Tabla';

const tituloTabla = [
    'Id','Descripcion'
]
const datosTabla = [
    {id:1, descripcion: 'Limpieza' },
    {id:2, descripcion: 'Enlatado' },
]
export default function Categoria(){
    return(
        <main>
            <ContainerForm>
                 <FormCategoria/>
            </ContainerForm>

            <Tabla titulo={tituloTabla} cuerpo={datosTabla} dato1={'id'} dato2={'descripcion'}/>
            
        </main>
    )
}