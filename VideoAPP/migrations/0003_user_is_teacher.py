# Generated by Django 4.2.3 on 2023-08-11 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VideoAPP', '0002_remove_user_confirm_password_alter_video_file_video'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_teacher',
            field=models.BooleanField(default=False),
        ),
    ]
