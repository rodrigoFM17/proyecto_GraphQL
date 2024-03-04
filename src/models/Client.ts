import db from '../db.config'

export default interface Client {
    id: string,
    name: string,
    tel: string,
    password: string
}

export async function getClient(tel: string): Promise< Client | null> {

    try{
        const [client]:any = await db.execute("select * from clients where tel = ?", [tel])
    
        return client[0] 
        
    } catch (e:any) {
        console.log(e)
        return null
    }
}

