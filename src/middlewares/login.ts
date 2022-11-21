import { NextFunction, Request, Response } from "express"
import {JwtPayload} from 'jsonwebtoken';
const jwt = require('jsonwebtoken')

export interface CustomRequest extends Request {
    token: string | JwtPayload
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('Authorization')?.replace("Bearer ","")
    if(!token){
        return res.status(401).json({erro: "Usuário não autorizado"})
    }
    try {

        const decode = jwt.verify(token, 's3nh4C0MPR1D4');
        (req as CustomRequest).token = decode
        next()
    } catch (error) {
        return res.status(401).json({erro: "Usuário não autorizado"})
    }
}

export default verifyJWT