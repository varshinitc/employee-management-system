#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Create default admin if doesn't exist
echo "from employees.models import Employee; Employee.objects.filter(email='admin@example.com').update(role='admin', is_staff=True, is_superuser=True) if Employee.objects.filter(email='admin@example.com').exists() else Employee.objects.create_superuser(email='admin@example.com', password='admin123', first_name='Admin', last_name='User')" | python manage.py shell
