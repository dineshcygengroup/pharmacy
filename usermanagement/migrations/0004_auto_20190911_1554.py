# Generated by Django 2.2.5 on 2019-09-11 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0003_auto_20190911_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='last name'),
        ),
    ]
