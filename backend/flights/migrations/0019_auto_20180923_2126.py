# Generated by Django 2.1.1 on 2018-09-23 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0018_auto_20180921_1425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aircraft',
            name='license_type',
            field=models.CharField(choices=[('Airplane SEL', 'SEL'), ('Airplane SES', 'SES'), ('Airplane MEL', 'MEL'), ('Airplane MES', 'MES')], default='Airplane SEL', max_length=40),
        ),
    ]
