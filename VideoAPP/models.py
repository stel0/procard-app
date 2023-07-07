from django.db import models

class Video(models.Model):
    title = models.CharField(max_length=100)
    upload_date = models.DateTimeField(auto_now_add=True)
    file_video = models.FileField(upload_to="videos/")

    def __str__(self):
        return self.title