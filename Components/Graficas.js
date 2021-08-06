import { Bar } from 'react-chartjs-2';
import {auth,db} from "../BD/conf";
import {useState, useEffect} from 'react';

export function GraficaVentaSemanal(){
  var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
const fecha= new Date()
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
const data={
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
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

    return(
        <article className="barras-ventasSemanal">
                <h1>Venta Mensual</h1>
                <time>{ano}</time>
                <Bar data={data} options={options} />
        </article>
    )
}