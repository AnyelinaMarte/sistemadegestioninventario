import Avatar from '@material-ui/core/Avatar';
import {useState, useEffect} from 'react';
import {auth, db} from '../BD/conf';

export default function Cuenta(){
    const [data, setData] = useState("")
    useEffect(()=>{
      auth.onAuthStateChanged(async user=>{
        if(user != null){
          await db.collection('Usuario').doc(user.uid).collection('BD_Usuario').doc('datos_Usuario').get().then(doc =>{
            setData(doc.data().nombreEmpresa)
          })
        }
      })
    },[])

    return(
        <div>
            <Avatar>{data.substring(0,1)}</Avatar>
            <span>{data}</span>
        </div>
    ) 
}