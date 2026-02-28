from django.core.management.base import BaseCommand
from employees.models import Employee

class Command(BaseCommand):
    help = 'Promote user to admin'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='User email to promote')

    def handle(self, *args, **options):
        email = options['email']
        try:
            user = Employee.objects.get(email=email)
            user.role = 'admin'
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully promoted {email} to admin'))
        except Employee.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'User {email} not found'))
