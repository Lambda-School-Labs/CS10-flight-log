# Generated by Django 2.1.1 on 2018-09-27 23:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('flights', '0003_auto_20180927_2011'),
    ]

    operations = [
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=75)),
                ('description', models.CharField(max_length=200)),
                ('license_number', models.CharField(max_length=100)),
                ('ratings', models.CharField(max_length=200)),
                ('photo', models.CharField(max_length=200)),
                ('contact_number', models.CharField(max_length=30)),
                ('contact_email', models.CharField(max_length=100)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
