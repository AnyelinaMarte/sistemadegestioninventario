import "../styles/globals.css";
import { auth } from "../BD/conf";
import Head from "next/head";
import { useState } from "react";
import CorreoVerificado from "./CorreoVerificado";
import Login from "./Login";
function MyApp({ Component, pageProps }) {
  const [userName, setuserName] = useState(null);
  return (
    <>
      <Head>
        <title>Sistema de Gestion de Inventario</title>
      </Head>
      {auth.onAuthStateChanged((user) => {
        setuserName(user);
       
      })}
      {userName ? (
        userName.emailVerified === true ? (
          <Component {...pageProps} />
        ) : (
          <CorreoVerificado />
         
        )
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
