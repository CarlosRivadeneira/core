# Generated by Django 4.1.1 on 2023-01-06 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GastApp', '0002_alter_category_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('budget', models.FloatField()),
                ('category', models.CharField(max_length=266)),
            ],
        ),
    ]
