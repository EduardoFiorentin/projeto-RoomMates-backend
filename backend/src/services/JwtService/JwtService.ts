import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { InternalError } from '../../exceptions/InternalError';

dotenv.config()

export class JwtService {
    private static instance: JwtService;
    private secret: string;

    private constructor(secret: string) {
        this.secret = secret;
        console.log(":/ db: instancia jwtService criada...")
    }

    public static getInstance(): JwtService {
        if (!JwtService.instance) {

            if (!process.env.JWT_SECRET) throw new InternalError("Ocorreu um erro no hash jwt. Contate o suporte técnico!")
            else {
                JwtService.instance = new JwtService(process.env.JWT_SECRET);
            }
        }
        return JwtService.instance;
    }

    public generateToken(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '1h' });
    }

    public validateToken(token: string): boolean {
        try {
            const format_token = token && token.split(' ')[1]
            jwt.verify(format_token, this.secret);
            return true;
        } catch (error) {
            return false;
        }
    }
}