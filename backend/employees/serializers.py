from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = Employee
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'phone', 
                  'department', 'position', 'salary', 'role', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = Employee.objects.create_user(**validated_data)
        employee.set_password(password)
        employee.save()
        return employee
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class EmployeeProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 
                  'department', 'position', 'role', 'date_joined']
        read_only_fields = ['id', 'email', 'role', 'date_joined']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Employee
        fields = ['email', 'password', 'first_name', 'last_name', 'phone', 
                  'department', 'position']
    
    def create(self, validated_data):
        employee = Employee.objects.create_user(**validated_data)
        return employee
