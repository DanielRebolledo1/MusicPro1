# Generated by Django 4.0.4 on 2022-06-08 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria_Promocional',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre')),
            ],
        ),
    ]
