# Generated by Django 3.1.7 on 2021-10-31 16:41

from django.conf import settings
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('buying', '0009_auto_20211031_1636'),
    ]

    operations = [
        migrations.AlterField(
            model_name='depot',
            name='users',
            field=models.ManyToManyField(related_name='depots', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]