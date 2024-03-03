import db from '../db.config'
import { createJWT, verifyJWT } from '../services/JWTService';
import { createID } from '../services/CreateIDService';
import { hashPassword } from '../services/EncryptPasswordService';

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
//Mutaciones
const registerclient = async(__:void, args: any) => {
  try {
    const auxPassword = args.password;
    const idClient = createID();
    const encyptPassword = await hashPassword(auxPassword);
    console.log("Id: "+idClient, "Password: "+encyptPassword);
    const client = {
      id: idClient,
      name: args.name,
      tel: args.tel,
      password: encyptPassword
    }
    const result = await db.query("INSERT INTO library.clients (id,name,tel,password) VALUES (?,?,?,?)",
      [client.id, client.name, client.tel, client.password ]);

    console.log(result);
    return client;
  } catch (e: any) {
    console.log(e)
    return e.message;
  }
}

const updateTel = async(__:void, args: any) =>{
  try {
    const {id, tel} = args;
    const client = {
      id: id,
      tel: tel
    }
    const result = await db.query("UPDATE library.clients SET tel = ? WHERE id = ?",
      [tel, id]);
    console.log(result);
    return client;
  }  catch (e: any) {
    console.log(e)
    return e.message;
  }
}

export default {
    listAllClients,
    getClientByID,
    login,
    registerclient,
    updateTel
}