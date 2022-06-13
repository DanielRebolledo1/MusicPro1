# Generated by Django 4.0.4 on 2022-06-08 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('idUsuario', models.AutoField(primary_key=True, serialize=False, verbose_name='Id del usuario')),
                ('emailUsuario', models.CharField(max_length=100, unique=True, verbose_name='Email del usuario')),
                ('nombreUsuario', models.CharField(max_length=50, verbose_name='Nombre del usuario')),
                ('apellidoUsuario', models.CharField(max_length=50, verbose_name='Apellido del usuario')),
                ('contrasenaUsuario', models.CharField(max_length=20, verbose_name='Contraseña del usuario')),
            ],
        ),
    ]
