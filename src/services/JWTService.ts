import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_WORD || '';
export function verifyJWT (token: string) {

    try {
        const client = jwt.verify(token, secret)
        return client
        
    } catch(e: any){
        console.log(e)
        return null
    }
        
    
}

export function createJWT(tel: string, password: string) {

    const token = jwt.sign({tel, password}, secret)
    return token

}