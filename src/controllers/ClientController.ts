import db from '../db.config'
import { createJWT, verifyJWT } from '../services/JWTService';
import { createID } from '../services/CreateIDService';
import { hashPassword, validatePassword } from '../services/EncryptPasswordService';
import { sendMessage } from '../services/SendMessageService';
import { getClient } from '../models/Client';


const listAllClients = async (__:void, args: any, context:any) => {
  try {
    const token = context.headers.authorization
    const error = verifyJWT(token)
    if(error)
    throw error
    const [clients] = await db.execute("select * from clients");
    return clients;

  } catch (e: any) {
    console.log(e);
    return e
  }
};

const getClientByID = async (__: void, args: any, context: any) => {
  try {
    const token = context.headers.authorization
    const error = verifyJWT(token)
    if(error)
    throw error
      const { id } = args;
      const [clients] = await db.execute("select * from clients where id = ?", [
        id,
      ]);

      return Array.isArray(clients) ? clients[0] : null;
  } catch (e: any) {
    console.log(e);
    return e
  }
};

const login = async (__:void, args: any, context: any) => {
  try{  
    const token = context.headers.authorization
    const error = verifyJWT(token)
    if(error)
    throw error
    const {tel, password} = args

    const client = await getClient(tel)

    if(client && await validatePassword(password,client.password)){
      return createJWT(tel, password)
    } 
    
    return 'usuario o contrasena incorrecto'

  } catch (e: any){
    console.log(e)
    return e
  }
}
//Mutaciones
const registerclient = async(__:void, args: any, context: any) => {
  try {
    // const token = context.headers.authorization
    // const error = verifyJWT(token)
    // if(error)
    // throw error
    const auxPassword = args.password;
    const idClient = createID();
    const encyptPassword = await hashPassword(auxPassword);
    
    const client = {
      id: idClient,
      name: args.name,
      tel: args.tel,
      password: encyptPassword
    }
    const result = await db.query("INSERT INTO library.clients (id,name,tel,password) VALUES (?,?,?,?)",
      [client.id, client.name, client.tel, client.password ]);
    sendMessage(client.id);
    console.log(result);
    return client;
  } catch (e: any) {
    console.log(e)
    return e
  }
}

const updateTel = async(__:void, args: any, context: any) =>{
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
    return e
  }
}

export default {
    listAllClients,
    getClientByID,
    login,
    registerclient,
    updateTel
}