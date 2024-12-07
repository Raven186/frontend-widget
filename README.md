# Проект: React + TypeScript + Docker

## 📦 Версии пакетов

- **React**: `18.3.1`
- **TypeScript**: `5.7.2`
- **Node.js**: `22.10.1`

Для просмотра полной информации о версиях и зависимостях используйте команду:

bash
pnpm list

🚀 Запуск проекта
1. Установка зависимостей
Перед запуском убедитесь, что все зависимости установлены. Для этого выполните:

pnpm install

2. Запуск в режиме разработки
Чтобы запустить проект в режиме разработки, выполните команду:

pnpm dev
Проект будет доступен по адресу:

🐳 Работа с Docker
1. Сборка и запуск контейнера
Для сборки и запуска проекта в контейнере выполните следующую команду:

MODE=dev PORT=8080 docker-compose up --build -d --remove-orphans

2. Доступ к проекту в контейнере
После успешного запуска проект будет доступен по адресу:

http://localhost:8080

🛠️ Дополнительные команды
Остановка контейнера
Чтобы остановить контейнер, выполните:

docker-compose down

Очистка системы Docker
Для удаления неиспользуемых образов, контейнеров и сетей выполните:

docker system prune -f

🧰 Стек технологий
Frontend: React + TypeScript
State Management: Zustand
HTTP Клиент: Axios
Сборщик: Vite
Стили: Tailwind CSS
Docker: для контейнеризации
📝 Структура проекта
plaintext
Копировать код
📂 client/
 ┣ 📂 public/         # Статические файлы
 ┣ 📂 src/            # Исходный код
 ┃ ┣ 📂 api/         # API запросы
 ┃ ┣ 📂 components/  # Компоненты приложения
 ┃ ┣ 📂 hooks/       # Пользовательские хуки
 ┃ ┣ 📂 styles/      # Файлы стилей
 ┃ ┣ 📜 App.tsx      # Корневой компонент
 ┃ ┗ 📜 main.tsx     # Точка входа
 ┣ 📜 package.json    # Зависимости проекта
 ┣ 📜 pnpm-lock.yaml  # Лок-файл PNPM
 ┗ 📜 vite.config.ts  # Конфигурация Vite