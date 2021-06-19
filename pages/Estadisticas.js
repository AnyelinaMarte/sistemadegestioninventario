import { Bar,Pie, Line } from 'react-chartjs-2';

import {auth,db} from "../BD/conf";
import {useState, useEffect} from 'react';

export default function Estadisticas(){
    const valuesProductosMasVendidos={ 
        descripcionP1:'',
        cantidadVP1:0,
        descripcionP2:'',
        cantidadVP2:0,
        descripcionP3:'',
        cantidadVP3:0,
        descripcionP4:'',
        cantidadVP4:0,
        descripcionP5:'',
        cantidadVP5:0,
    }
    const valuesProductosMenosVendidos={ 
        descripcionPM1:'',
        cantidadVPM1:0,
        descripcionPM2:'',
        cantidadVPM2:0,
        descripcionPM3:'',
        cantidadVPM3:0,
        descripcionPM4:'',
        cantidadVPM4:0,
        descripcionPM5:'',
        cantidadVPM5:0,
    }
    const [productosMasV, setproductosMasV]= useState(valuesProductosMasVendidos);
    const [datosInforme, setdatosInforme]= useState([]);
    const [productosMenosV, setproductosMenosV]= useState(valuesProductosMenosVendidos);
    const[descripcionE, setdescripcionE]= useState([])
    const[cantidadE, setcantidadE]= useState([])
    const[descripcionEA, setdescripcionEA]= useState([])
    const[cantidadEA, setcantidadEA]= useState([])

    const documentos=[] 
   const fecha= new Date()
   var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
 var totalMes=[]
 var [mesTotal, setmesTotal]=useState([])
   const ano= fecha.getFullYear() + ''
   useEffect(()=>{
    auth.onAuthStateChanged(async (user) => {
        if(user != null){
            meses.forEach(mes=>{
                db.collection('Usuario').doc(user.uid).collection('VentasMes').doc(ano).collection(mes).onSnapshot(Snapshot=>{
                    let total=0
                    Snapshot.forEach(datoG=>{
                        datoG.data().productosCliente.forEach(d=>{
                            total+= d.totalUnitario
                        })
                    })
                    totalMes.push(total)
                })

            })
        }
    })
    setmesTotal(totalMes)

   },[])

     useEffect(()=>{
    auth.onAuthStateChanged(async (user) => {
        if(user != null){
           
            
    
         await  db.collection('Usuario').doc(user.uid).collection('Producto').orderBy("salidaProducto", "desc").get().then(data=>{
             
            data.forEach(dataInforme=>{
                
                documentos.push({...dataInforme.data()})
              })
              setdatosInforme(documentos)
              if (documentos.length >= 10)

              {
                
                setproductosMasV({ 
                descripcionP1:documentos[0].descripcionProducto,
                cantidadVP1:documentos[0].salidaProducto,
                descripcionP2:documentos[1].descripcionProducto,
                cantidadVP2:documentos[1].salidaProducto,
                descripcionP3:documentos[2].descripcionProducto,
                cantidadVP3:documentos[2].salidaProducto,
                descripcionP4:documentos[3].descripcionProducto,
                cantidadVP4:documentos[3].salidaProducto,
                descripcionP5:documentos[4].descripcionProducto,
                cantidadVP5:documentos[4].salidaProducto,
                })
                const n = documentos.length;
            setproductosMenosV({ 
                descripcionPM1:documentos[n-1].descripcionProducto,
                cantidadVPM1:documentos[n-1].salidaProducto,
                descripcionPM2:documentos[n-2].descripcionProducto,
                cantidadVPM2:documentos[n-2].salidaProducto,
                descripcionPM3:documentos[n-3].descripcionProducto,
                cantidadVPM3:documentos[n-3].salidaProducto,
                descripcionPM4:documentos[n-4].descripcionProducto,
                cantidadVPM4:documentos[n-4].salidaProducto,
                descripcionPM5:documentos[n-5].descripcionProducto,
                cantidadVPM5:documentos[n-5].salidaProducto,
            })
            let cantidadExistencia=[]
            let descripcionExistencia=[]
            let descripcionEAgotados=[]
            let cantidadEAgotados =[]
            documentos.map(doc=>{
                descripcionExistencia.push(doc.descripcionProducto)
                cantidadExistencia.push(doc.existenciaProducto)
                
                if(doc.existenciaProducto <= 25){
                    descripcionEAgotados.push(doc.descripcionProducto)
                    cantidadEAgotados.push(doc.existenciaProducto)
                }
            })
            setdescripcionE(descripcionExistencia)
            setcantidadE(cantidadExistencia)
            setdescripcionEA(descripcionEAgotados)
            setcantidadEA(cantidadEAgotados)

               
            }
           
         
            }) 

        }
         })
    
    },  [])
   
    const data1={
        labels:[productosMasV.descripcionP1, productosMasV.descripcionP2,productosMasV.descripcionP3,productosMasV.descripcionP4,productosMasV.descripcionP5],
        datasets:[{
            label:'Productos mas vendidos (Unidades)',
            backgroundColor:'#83BAFF',
            borderColor:'#2B2B2B',
            borderWidth:2,
            hoverBackgroundColor:'#00E1FF',
            hoverborderColor:'#83BAFF',
            data:[productosMasV.cantidadVP1,productosMasV.cantidadVP2,productosMasV.cantidadVP3,productosMasV.cantidadVP4,productosMasV.cantidadVP5]
        }]
    };
    const data2={
        labels:[productosMenosV.descripcionPM1,productosMenosV.descripcionPM2,productosMenosV.descripcionPM3,productosMenosV.descripcionPM4,productosMenosV.descripcionPM5],
        datasets:[{
            label:'Productos menos Vendidos (Unidades)',
            backgroundColor:'#83BAFF',
            borderColor:'#2B2B2B',
            borderWidth:2,
            hoverBackgroundColor:'#00E1FF',
            hoverborderColor:'#83BAFF',
            data:[productosMenosV.cantidadVPM1,productosMenosV.cantidadVPM2,productosMenosV.cantidadVPM3,productosMenosV.cantidadVPM4,productosMenosV.cantidadVPM5],
            
    
        }] 
    };
    const data5={
        labels:descripcionEA,
        datasets:[{
            label:'Productos Agotados (menos de 25 U Existencias)',
            backgroundColor:'#83BAFF',
            borderColor:'#2B2B2B',
            borderWidth:2,
            hoverBackgroundColor:'#00E1FF',
            hoverborderColor:'#83BAFF',
            data:cantidadEA,
            
    
        }] 
    };
    const data4={
        labels:meses,
        datasets:[{
            label:'Ganancias Mensuales $',
            backgroundColor:'#83BAFF',
            borderColor:'#2B2B2B',
            borderWidth:2,
            hoverBackgroundColor:'#00E1FF',
            hoverborderColor:'#83BAFF',
            data:mesTotal,
            
    
        }] 
    };
    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    const data3={
        labels:descripcionE,
        datasets:[{
            tittle:'Existencia de Productos',
            label:'Existencia de Productos (Unidades)',
            backgroundColor:colorArray,
            borderColor:'#2B2B2B',
            borderWidth:2,
            hoverBackgroundColor:'rgb(253,237,236)',
            hoverborderColor:'#83BAFF',
            data:cantidadE,
            borderRadius:'10px',
            
        }] 
    };
    const opciones={
        maintainAspectRatio:false,
         responsive:true 
      
       }
       
      
        return(
         <>
      
      <h1 >Estadisticas</h1>
    
    { datosInforme.length >= 10 ?<>
      <div id="informe1" >
      
      <Bar
          data={data1}
          width='100%'
          height='325px'
          options={opciones}
          />
      </div>
      <div  >
    <Bar
        data={data2}
        width='100%'
        height='325px'
        options={opciones}  
        />
    </div>
    <div>
    <Pie
        data={data3}
        width='100%'
        height='325px'
       
        options={opciones}  
     />
     </div>
     <div  >
    <Bar
        data={data5}
        width='100%'
        height='325px'
        options={opciones}  
        />
    </div>
     <div>
    <Line
        data={data4}
        width='100%'
        height='325px'
       
        options={opciones}  
     />
    
     </div>
      </>:<h1 >NO HAY SUFICIENTES PRODUCTOS REGISTRADOS PARA GENERAR UN INFORME</h1>
    }
    </>
        )
    }