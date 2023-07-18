# Generated by Django 4.2.3 on 2023-07-18 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('last_name', models.CharField(max_length=256)),
                ('ci', models.CharField(max_length=256)),
                ('mail', models.CharField(max_length=256)),
                ('genre', models.CharField(max_length=256)),
                ('password', models.CharField(max_length=256)),
                ('confirm_password', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('file_video', models.FileField(upload_to='videos/')),
            ],
        ),
    ]
