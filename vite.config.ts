import { defineConfig, loadEnv, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import cors from "cors";
import config from "./src/config";

export default defineConfig(({ mode }) => {
  // Загрузка переменных окружения из .env файлов для текущего режима (например, .env, .env.development)
  const env = loadEnv(mode, process.cwd() + "/env", "");

  return {
    plugins: [react()],
    build: {
      outDir: "build", // Указываем директорию для сборки
    },
    server: {
      port: config.PORT,
      host: true,
      configureServer: (server: ViteDevServer) => {
        server.middlewares.use(
          cors({
            origin: process.env.VITE_API_URL,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
            allowedHeaders: [
              "Content-Type",
              "Authorization",
              "Access-Control-Allow-Origin",
              "Access-Control-Allow-Credentials",
              "Access-Control-Allow-Methods",
              "Access-Control-Allow-Headers",
            ],
          })
        );
      },
    },
    resolve: {
      alias: {
        "./": path.resolve(__dirname, "./src"), // Настройка алиасов для пути
      },
    },
    define: {
      // Передача всех переменных окружения в приложение
      "process.env": {
        ...env,
      },
    },
  };
});
