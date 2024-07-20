import 'dotenv/config';
import { get } from 'env-var';



export const envs = {
  port: get('PORT').required().asPortNumber(),
  MONGO_DB_URI: get('MONGO_DB_URI').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MAILER_PASS: get('MAILER_PASS').required().asString(),
  MAILER_USER: get('MAILER_USER').required().asString(),
}
