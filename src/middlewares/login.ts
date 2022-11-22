import { NextFunction, Request, Response } from "express"
import {JwtPayload} from 'jsonwebtoken';
const jwt = require('jsonwebtoken')

interface TokenPayload{
    id: string;
    username: string;
    iat: number;
    exp: number
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({erro: "Usuário não autorizado"})
    }
    try {

        const decode = jwt.verify(token, 's3nh4C0MPR1D4');
        const {id} = decode as TokenPayload
        req.token = id;
        return next()
    } catch (error) {
        return res.status(401).json({erro: "Usuário não autorizado"})
    }
}

export default verifyJWT