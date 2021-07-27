import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';  
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {auth, db} from '../BD/conf';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const [state, setState] = useState({
      mantenimiento:false,
      pedidos:false,
      estadisticas:false,
      stock:false
    });
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index} 
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
export default function Admin(){
  const valorInicial={
    nombreProveedor :'',
    apellidoProveedor:'',
    correoProveedor:'',
    telefonoProveedor:'',
    direccionProveedor:'',
    cedulaProveedor:'',
    rncProveedor:'',
    fechapedidoProveedor:'',
    descripcionPedidos:''
   } 
  const valorInicialActividades={
    tituloActividad:'',
    fechaActividad:'',
    horaActividad:'',
    descripcionActividad:''
  }
  const [valorA, setvalorA]= useState(valorInicialActividades)
  const [valor, setValor]= useState(valorInicial)
  const handleChangeActividad=(e)=>{
    const {name, value}= e.target
    setvalorA({...valorA,[name]:value})
  }
  const handleSubmitActividades=(e)=>{
    e.preventDefault()
            auth.onAuthStateChanged(async user=>{
              if (user != null){
                  await db.collection('Usuario').doc(user.uid).collection('Actividades').doc().set(valorA)
            setvalorA({...valorInicialActividades})
                 
              }
            })
    
    }
  
  const handleChange =(e)=>{
    const {name, value}= e.target
    setValor({...valor,[name]:value})
   
}
const handleSubmit=(e)=>{
e.preventDefault()
        auth.onAuthStateChanged(async user=>{
          if (user != null){
              await db.collection('Usuario').doc(user.uid).collection('PedidosProveedores').doc().set(valor)
              setValor({...valorInicial})
              
          }
        })

}
    const [value, setValue] = useState(0);

    const handleChanges = (event, newValue) => {
      setValue(newValue);
    };
    const [getProveedor, setgetProveedor] = useState([])
    const getDataProveedor = () => {
      auth.onAuthStateChanged(async (user) => {
        if(user != null){
          db.collection('Usuario').doc(user.uid).collection('Proveedor').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push(doc.data());
            });
            setgetProveedor(docs);
          });
        }
      });
    };
    useState(() => {
      getDataProveedor();
    }, []); 
    const llenarCampos =(objeto)=>{
     setValor({...objeto})

    }
    const valorControlEmpleados = {
      nombreEmpleado:"",
      apellidoEmpleado:"",
      cedulaEmpleado:"",
      telefonoEmpleado:"",
      correoEmpleado:"",
      direccionEmpleado:"",
      fechaEntrada:"",
      checkEstadistica:false,
      checkStock:false,
      checkManeteminento:false,
      checkVentas:false,
      passowordEmpleados:"",
    }
    const [valorCE, setValorCE]=useState(valorControlEmpleados)
    const onChangeControlEmpleados=(e)=>{
      const {name, value}= e.target
      setValorCE({...valorCE,[name]:value})
    }
    const submitControlEmpleado = (e)=>{
      e.preventDefault()
      auth.onAuthStateChanged(async user =>{
        if(user!=null){
          await db.collection("Empresas-Usuario").doc().set({correo:valorCE.correoEmpleado, contraseña:valorCE.passowordEmpleados,idEmpresa:user.uid })
          await db.collection("Usuario").doc(user.uid).collection("Empleados-empresa").doc().set(valorCE)

          setValor({...valorControlEmpleados})

        }
      })
    }
    return(
        <main>
            <div>
                <h1>Cuenta</h1>
            </div>
            <div>
            <div>
                <AppBar position="static" style={{background:'white'}}>
                    <Tabs
                        value={value}
                        onChange={handleChanges}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Control Actividades"  {...a11yProps(0)} />
                        <Tab label="Control de Empleados" {...a11yProps(1)} />
                        <Tab label="Agregar Pedidos a Proveedores"  {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                    <TabPanel value={value} index={0}>
                      <div>
                          <h1 className="admin-title">Actividades </h1>
                          <div>
                            <form className="form-empleado actividades" onSubmit={handleSubmitActividades} >
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Titulo Actividad" variant="outlined" name="tituloActividad" onChange={handleChangeActividad} value={valorA.tituloActividad} />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic"  variant="outlined" type="date" name="fechaActividad" onChange={handleChangeActividad} value={valorA.fechaActividad}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic"  variant="outlined" type="time" name="horaActividad" onChange={handleChangeActividad} value={valorA.horaActividad}/>
                                  </div>
                                  <div>
                                    <textarea className="textT-Empleado" placeholder="Agrega una descripcion" name="descripcionActividad" onChange={handleChangeActividad} value={valorA.descripcionActividad}>

                                    </textarea>
                                  </div>
                                 <div className="center-button"><button onClick={handleSubmitActividades}>Agregar Actividad</button> </div>
                                  
                            </form>
                          </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <div>
                          <h1 className="admin-title">Control de empleados </h1>
                          <div>
                            <form className="form-empleado actividades" onSubmit={submitControlEmpleado} >
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Nombre de Empleados" variant="outlined" name="nombreEmpleado" onChange={onChangeControlEmpleados} value={valorCE.nombreEmpleado}  />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Apellido de Empleados" variant="outlined" name="apellidoEmpleado" onChange={onChangeControlEmpleados} value={valorCE.apellidoEmpleado} />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Cedula de Empleados" variant="outlined" name="cedulaEmpleado" onChange={onChangeControlEmpleados} value={valorCE.cedulaEmpleado}  />
                                  </div>

            
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Telefono de Empleado" variant="outlined" name="telefonoEmpleado" onChange={onChangeControlEmpleados} value={valorCE.telefonoEmpleado}  />
                                  </div>
                                  
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Direccion de Empleado" variant="outlined" name="direccionEmpleado" onChange={onChangeControlEmpleados} value={valorCE.direccionEmpleado} />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic"  variant="outlined" type="date" name="fechaEntrada" onChange={onChangeControlEmpleados} value={valorCE.fechaEntrada} />
                                  </div>
                                  <hr></hr>
                                  <h3>Permisos del empleado</h3>
                                  <div>
                                      <div >
                                        <input onClick={()=>valorCE.checkEstadistica==true? valorCE.checkEstadistica=false : valorCE.checkEstadistica=true} type="checkbox"/>
                                        <span>Estadistica</span>
                                      </div>
                                      <div>
                                        <input onClick={()=>valorCE.checkStock==true? valorCE.checkStock=false : valorCE.checkStock=true} type="checkbox"/>
                                        <span>Stock</span>
                                      </div>
                                      <div>
                                        <input onClick={()=>valorCE.checkManeteminento==true? valorCE.checkManeteminento=false : valorCE.checkManeteminento=true}  type="checkbox"/>
                                        <span>Mantenimiento</span>
                                      </div>
                                      <div>
                                        <input onClick={()=>valorCE.checkVentas==true?valorCE.checkVentas=false :valorCE.checkVentas=true}  type="checkbox"/>
                                        <span>Ventas  </span>
                                      </div>

                                  </div>
                                  <hr></hr>
                                  <h3>Datos para inicio de seccion</h3>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Correo de Empleado" variant="outlined" name="correoEmpleado" value={valorCE.correoEmpleado} onChange={onChangeControlEmpleados}  />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic"  variant="outlined" type="password" name="passowordEmpleados" value={valorCE.passowordEmpleados} onChange={onChangeControlEmpleados} />
                                  </div>
                                  
                                  
                                 <div className="center-button"><button onClick={submitControlEmpleado}>Añadir empleado</button> </div>
                                  
                            </form>
                          </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div>
                          <h1 className="admin-title">Agregar Nuevo Pedido</h1>
                          <div>
                            <form className="form-empleado" onSubmit={handleSubmit}>
                            <select style={{width:'100%' ,height:'35px', margin:'5px 5px 10px 0px'}}>
                            <option value=" ">No selecionado</option>
                              {getProveedor.map(proveedor => 
                                <option value={proveedor.cedulaProveedor } onChange={()=>setValor({...proveedor})}>
                                
                                  {proveedor.cedulaProveedor}
                                </option>
                              )}
                            </select>
                              <div className="grid-admin-empleado">
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Nombre Proveedor *" variant="outlined" name="nombreProveedor" onChange={handleChange} value={valor.nombreProveedor}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Apellido Proveedor*" variant="outlined" name="apellidoProveedor" onChange={handleChange} value={valor.apellidoProveedor}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Cedula Proveedor *" variant="outlined" name="cedulaProveedor" onChange={handleChange} value={valor.cedulaProveedor}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Direccion *" variant="outlined" name="direccionProveedor" onChange={handleChange} value={valor.direccionProveedor}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Correo *" variant="outlined" name="correoProveedor" onChange={handleChange} value={valor.correoProveedor}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Telefono *" variant="outlined" name="telefonoProveedor" onChange={handleChange} value={valor.telefonoProveedor}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="RNC *" variant="outlined" name="rncProveedor" onChange={handleChange} value={valor.rncProveedor}/>
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic"  variant="outlined" type="date"  name="fechapedidoProveedor" onChange={handleChange} value={valor.fechapedidoProveedor}/>
                                    
                                  </div>
                                  </div>
                                  <br></br>
                                  <div>
                                    <textarea className="textT-Empleado" placeholder="Agrega los productos que necesita para su proxima entrega" name="descripcionPedidos" onChange={handleChange} value={valor.descripcionPedidos}>

                                    </textarea>
                                  </div>
                                  
                                
                             
                                 

                                 <div className="center-button"><button onClick={handleSubmit}>Enviar Pedido</button> </div>
                                  
                            </form>
                          </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </main>
    )
}