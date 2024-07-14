import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { InternalError } from '../../exceptions/InternalError';
import { IPayLoad } from './IPayLoad';

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
    
    public getTokenInfo(token: string) {
        try {
            const format_token = token && token.split(' ')[1]
            if (process.env.JWT_SECRET == undefined) throw new InternalError("Falha ao carregar hash jwt")

            const decodedToken: IPayLoad = jwt.verify(format_token, process.env.JWT_SECRET) as IPayLoad;

            console.log(decodedToken);
            return decodedToken
            // Aqui você pode acessar as informações do token decodificado
            // Por exemplo:
            // const userId = decodedToken.sub; // para acessar o subject (subject é comumente usado para armazenar o ID do usuário)
            // const userName = decodedToken.name; // para acessar o nome do usuário, se estiver presente no token
        } catch (err) {
            throw err
        }
    }
} 