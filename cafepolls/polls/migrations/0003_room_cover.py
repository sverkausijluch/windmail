# Generated by Django 4.1.7 on 2023-04-08 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_group_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='cover',
            field=models.ImageField(blank=True, upload_to='rooms/covers'),
        ),
    ]