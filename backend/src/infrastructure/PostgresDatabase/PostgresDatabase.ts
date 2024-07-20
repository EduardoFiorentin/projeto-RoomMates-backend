import { DataSource } from 'typeorm';
import dotenv from 'dotenv'


dotenv.config()

export class PostgresDatabase {
    private static instance: PostgresDatabase
    
    private connection = new DataSource({
        "type":         "postgres",
        "host":         process.env.POSTGRES_HOST,
        "port":         process.env.POSTGRES_PORT as number|undefined,
        "username":     process.env.POSTGRES_USERNAME,
        "password":     process.env.POSTGRES_PASSWORD,
        "database":     process.env.POSTGRES_DATABASE,
        "synchronize":  false,
        "logging":      false,   
        "entities":     ["./src/entity/**/*.ts"],
        "migrations":   ["./src/migration/**/*.ts"],
        "subscribers":  ["./src/subscriber/**/*.ts"],
    });

    

    private constructor() {}

    public static async getInstance(): Promise<PostgresDatabase> {
        if (!PostgresDatabase.instance) {
            PostgresDatabase.instance = new PostgresDatabase();

            try {
                await PostgresDatabase.instance.connect();
            }
            catch(err) {
                throw err
            }  
        }

        return PostgresDatabase.instance;
    }

    private async connect(): Promise<void> {
        await this.connection.initialize()
        .then(() => {
            console.log(":/ Conexão estabelecida - Database Postgres")
        })
        .catch(err => {
            console.log("/: Não foi possível se conectar ao postgres. \nErro: "+err)
            process.exit(1)
        })

    }

    public getConnection(): DataSource {
        return this.connection;
    }

    // testar
    public closeConnection() {
        this.connection.destroy()
    }
} 