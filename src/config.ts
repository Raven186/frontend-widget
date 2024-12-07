import packageJson from "../package.json";

export enum CONFIG_MODE {
  DEV = "DEV",
  TEST = "TEST",
  PROD = "PROD",
}

export interface IConfig {
  MODE: CONFIG_MODE;
  PORT: number;
  URL: string;
  BACKEND_URL: string;
  API_KEY: string;
}

const config: IConfig = {
  MODE: process.env.MODE as CONFIG_MODE,
  PORT: Number(process.env.PORT) ?? 8080,
  URL: String(process.env.REACT_APP_URL),
  BACKEND_URL: String(process.env.VITE_API_URL),
  API_KEY: String(process.env.VITE_API_KEY),
};

console.log(`Exchange widget: v.${packageJson.version}, ${config.MODE}`);

export default config;
