#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py createadmin
python manage.py makeadmin admin@example.com || echo "Admin promotion skipped"
