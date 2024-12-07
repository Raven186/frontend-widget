# Используем базовый образ с Node.js версии 22
FROM node:22-alpine 

# Устанавливаем глобальные зависимости npm и pnpm
RUN npm install --global npm@10.8.3 pnpm cross-env

# Копируем содержимое текущей директории (контекст сборки) в директорию /app
COPY . /app 

# Устанавливаем рабочую директорию
WORKDIR /app 

# Устанавливаем зависимости
RUN pnpm install 

# Передаем аргумент сборки MODE и запускаем сборку для нужного окружения
ARG MODE=production
RUN cross-env MODE=${MODE} pnpm build 

# Используем lightweight сервер для раздачи статических файлов
RUN npm install -g serve 

# Указываем порт, на котором будет запущен сервер
EXPOSE ${PORT}

# Указываем команду, которая будет выполняться при старте контейнера
CMD ["sh", "-c", "cross-env PORT=${PORT} serve -s dist -l ${PORT}"]
