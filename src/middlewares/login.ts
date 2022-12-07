import { NextFunction, Request, Response } from "express"
import {JwtPayload} from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
const jwt_hash = process.env.JWT_HASH as string | undefined


interface TokenPayload{
    id: string;
    username: string;
    iat: number;
    exp: number
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({success: false, msg: "Token não fornecido para autorização"})
    }
    try {

        const decode = jwt.verify(token, jwt_hash);
        const {id} = decode as TokenPayload
        req.token = id;
        return next()
    } catch (error) {
        return res.status(401).json({success: false, msg: "Usuário não autorizado"})
    }
}

export default verifyJWT