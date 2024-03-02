import db from '../db.config'
import { createJWT, verifyJWT } from '../services/JWTService';

const listAllClients = async (__:void, args: any, context:any) => {
  try {
    const token = context.headers.authorization
    if(verifyJWT(token)){
      const [clients] = await db.execute("select * from clients");
      return clients;
    }

    return 'no tienes acceso'

  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

const getClientByID = async (__: void, args: any, context: any) => {
  try {
    const token = context.headers.authorization
    if(verifyJWT(token)){
      const { id } = args;
      const [clients] = await db.execute("select * from clients where id = ?", [
        id,
      ]);

      return Array.isArray(clients) ? clients[0] : null;
    }
    return null
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

const login = async (__:void, args: any) => {
  try{  

    const {tel, password} = args
    const [clients] = await db.execute("select * from clients where tel = ? && password = ?", [tel, password])
    console.log(clients)
    if(Array.isArray(clients) && clients.length) {
      const token = createJWT(tel, password)
      return token
    }

    return 'usuario o contrasena incorrecto'

  } catch (e: any){
    console.log(e)
    return e.message
  }
}

export default {
    listAllClients,
    getClientByID,
    login
}