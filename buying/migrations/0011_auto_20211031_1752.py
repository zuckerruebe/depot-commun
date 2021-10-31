# Generated by Django 3.1.7 on 2021-10-31 16:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('buying', '0010_auto_20211031_1741'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase',
            name='invoice',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='purchases', to='buying.invoice'),
        ),
    ]