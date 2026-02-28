from django.core.management.base import BaseCommand
from employees.models import Employee
from decouple import config

class Command(BaseCommand):
    help = 'Creates admin user from environment variables'

    def handle(self, *args, **options):
        email = config('ADMIN_EMAIL', default='admin@example.com')
        password = config('ADMIN_PASSWORD', default='admin123')
        
        if not Employee.objects.filter(email=email).exists():
            Employee.objects.create_superuser(
                email=email,
                password=password,
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(self.style.SUCCESS(f'Admin user created: {email}'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin user already exists: {email}'))
