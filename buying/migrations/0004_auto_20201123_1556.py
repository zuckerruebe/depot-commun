# Generated by Django 3.1.3 on 2020-11-23 15:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buying', '0003_auto_20201123_1539'),
    ]

    operations = [
        migrations.AlterField(
            model_name='depot',
            name='users',
            field=models.ManyToManyField(related_name='depots', to=settings.AUTH_USER_MODEL),
        ),
    ]
