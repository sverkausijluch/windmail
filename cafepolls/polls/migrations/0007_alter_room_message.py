# Generated by Django 4.1.7 on 2023-05-03 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0006_alter_answer_text_alter_profile_post_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='message',
            field=models.TextField(max_length=5000),
        ),
    ]
