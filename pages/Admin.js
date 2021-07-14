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
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const [state, setState] = useState({
      checkedA: true,
      checkedB: true,
      checkedC: true,
      checkedD: true,
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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
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
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Control Actividades"  {...a11yProps(0)} />
                        <Tab label="Control empleados" {...a11yProps(1)} />
                        <Tab label="Agregar Empleados"  {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                    <TabPanel value={value} index={0}>
                      <div>
                          <h1 className="admin-title">Actividades </h1>
                          <div>
                            <form className="form-empleado actividades" >
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Titulo Actividad" variant="outlined" />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Fecha de Actividad" variant="outlined" />
                                  </div>
                                  <div>
                                    <textarea className="textT-Empleado" placeholder="Agrega una descripcion">

                                    </textarea>
                                  </div>
                                 <div className="center-button"><button>Agregar Actividad</button> </div>
                                  
                            </form>
                          </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div>
                          <h1 className="admin-title">Agregar Nuevo Empleado</h1>
                          <div>
                            <form className="form-empleado" >
                              <div className="grid-admin-empleado">
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Nombres *" variant="outlined" />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Apellidos *" variant="outlined" />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Correo *" variant="outlined" />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Contraseña *" variant="outlined" />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Cargo *" variant="outlined" />
                                  </div>
                                  <div>
                                    <TextField style={{width:'100%'}} id="outlined-basic" label="Fecha de entrada *" variant="outlined" />
                                  </div>
                              </div>
                                  <span>Roles del empleado</span>
                                  <div className="grid-check">
                                    <div>
                                        <FormControlLabel control={<Checkbox name="checkedA" />} label="Mantenimiento" />
                                    </div>  
                                    <div>
                                        <FormControlLabel control={<Checkbox name="checkedB" />} label="Pedidos" />
                                    </div>
                                    <div>
                                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Estadistica" />
                                    </div>
                                    <div>
                                        <FormControlLabel control={<Checkbox name="checkedD" />} label="Stock" />
                                    </div>
                                </div>

                                 <div className="center-button"><button>Agregar Empleado</button> </div>
                                  
                            </form>
                          </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </main>
    )
}