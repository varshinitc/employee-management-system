# Employee Management System

## Quick Start

### Backend
```bash
cd backend
source venv/bin/activate
python manage.py createsuperuser  # First time only
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```

## Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

## Features
- JWT Authentication
- Role-based access (Admin/Employee)
- CRUD operations
- Protected routes
