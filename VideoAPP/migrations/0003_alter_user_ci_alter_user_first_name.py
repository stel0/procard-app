# Generated by Django 4.2.3 on 2023-08-02 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VideoAPP', '0002_remove_user_is_admin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='ci',
            field=models.CharField(max_length=8, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=50),
        ),
    ]
