# 1ST Shop Mini App

Мини-приложение магазина одежды для Telegram с фронтендом на React + Tailwind и бэкендом на Django + Jazzmin.

## Быстрый старт

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r ../requirements.txt
python manage.py migrate
python manage.py runserver
```

API будет доступен на `http://localhost:8000/api/...`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

По умолчанию фронт обращается к API на `http://localhost:8000/api`.

## Мок-данные

Если API недоступен, фронтенд автоматически переключается на мок-данные, чтобы интерфейс не пустовал.
