import db from '../db.config'

const listAllClients = async () => {
  try {
    const [clients] = await db.execute("select * from clients");
    return clients;
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

const getClientByID = async (__: void, args: any) => {
  try {
    const { id } = args;
    const [clients] = await db.execute("select * from clients where id = ?", [
      id,
    ]);
    return Array.isArray(clients) ? clients[0] : "error";
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

export default {
    listAllClients,
    getClientByID
}