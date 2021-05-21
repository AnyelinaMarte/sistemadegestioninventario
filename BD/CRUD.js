import {auth,db} from './conf'
export function addBD(id,nombreBD,valores){

    auth.onAuthStateChanged(async user=>{
        if (user!=null){
            try{
                if (id === ""){
                   await db.collection('Usuario').doc(user.uid).collection(nombreBD).doc().set(valores)
                }
                else{
                    await db.collection('Usuario').doc(user.uid).collection(nombreBD).doc(id).update(valores)
                    
                }
            }

            catch (error){
                console.log(error)
            }

        }
    })
}
export function deleteBD(nombreBD,id,valores){
    auth.onAuthStateChanged(async user=>{
        if (user!=null){
            try{
                await db.collection('Usuario').doc(user.uid).collection(nombreBD).doc(id).delete()
                await db.collection('Usuario').doc(user.uid).collection(`Inactivo-${nombreBD}`).doc().set(valores)

            }
            catch (error){
                console.log(error)

            }
        }
    })
}        
     