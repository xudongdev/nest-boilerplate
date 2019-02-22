import * as dotenv from 'dotenv';

dotenv.config();

export function env(key: string, def: any = null) {
  return process.env[key] || def;
}
