import FormCliente from '../Components/Forms/FormCliente';
import ContainerForm from "../Components/Forms/ContainerForm";
export default function PedidoProveedor(){
    return(
        <main>
            <section className="form-table clientes"> 
                <ContainerForm>
                    <FormCliente/>
                </ContainerForm>
                <table>
                    <tr>
                        <th>Codigo</th>
                        <th>Cliente</th>
                        <th>Direccion</th>
                        <th>Contactos</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                    <tr>

                    </tr>
                </table>
            </section>
        </main>
    )
}