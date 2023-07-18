from django.db import models

class Video(models.Model):
    title = models.CharField(max_length=100)
    upload_date = models.DateTimeField(auto_now_add=True)
    file_video = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.title
    
class User(models.Model):
    name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    ci = models.CharField(max_length=256)
    mail = models.CharField(max_length=256)
    genre = models.CharField(max_length=256)
    password = models.CharField(max_length=256)
    confirm_password = models.CharField(max_length=256)

    def __str__(self):
        return f"{self.name} {self.last_name} - {self.ci}"