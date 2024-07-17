import 'dotenv/config';
import { get } from 'env-var';



export const envs = {
    port: get('PORT').required().asPortNumber(),
    MONGO_DB_URI: get('MONGO_DB_URI').required().asString(),
}
