#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Promote admin@example.com to admin
python manage.py shell << EOF
from employees.models import Employee
try:
    user = Employee.objects.get(email='admin@example.com')
    user.role = 'admin'
    user.is_staff = True
    user.is_superuser = True
    user.save()
    print('Admin promoted successfully')
except Employee.DoesNotExist:
    Employee.objects.create_superuser(
        email='admin@example.com',
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print('Admin created successfully')
EOF
