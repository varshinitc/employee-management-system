# Deployment Guide

## Backend - Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `varshinitc/employee-management-system`
4. Configure:
   - **Name**: employee-management-api
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`
   - **Start Command**: `gunicorn employee_management.wsgi:application`
5. Add Environment Variables:
   - `SECRET_KEY`: (auto-generate or use random string)
   - `DEBUG`: `False`
   - `PYTHON_VERSION`: `3.11.6`
   - `ALLOWED_HOSTS`: `your-app-name.onrender.com`
6. Create PostgreSQL Database:
   - Click "New +" → "PostgreSQL"
   - Name: `employee_db`
   - Copy the "Internal Database URL"
7. Add to Web Service Environment Variables:
   - `DATABASE_URL`: (paste the Internal Database URL)
8. Deploy!
9. After deployment, open Shell and run:
   ```bash
   python manage.py createsuperuser
   ```

**Your backend URL**: `https://your-app-name.onrender.com`

## Frontend - Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New" → "Project"
3. Import `varshinitc/employee-management-system`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-name.onrender.com/api`
6. Deploy!

**Your frontend URL**: `https://your-app-name.vercel.app`

## Final Step - Update CORS

1. Go back to Render dashboard
2. Open your Web Service
3. Add Environment Variable:
   - `CORS_ALLOWED_ORIGINS`: `https://your-app-name.vercel.app`
4. Save and redeploy

## Test Deployment

1. Visit your Vercel URL
2. Register a new account
3. Login with admin credentials (created in Render shell)
4. Test CRUD operations

✅ Done!
