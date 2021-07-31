import FormCliente from '../../Components/Forms/FormCliente';
import ContainerForm from "../../Components/Forms/ContainerForm";

export default function PedidoProveedor(){
    
    return(
        <main>
            <section className="form-table clientes"> 
                <ContainerForm>
                    <FormCliente />
                </ContainerForm>
            </section>
            
        </main>
    )
} 