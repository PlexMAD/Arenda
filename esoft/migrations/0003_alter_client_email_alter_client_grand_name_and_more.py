# Generated by Django 5.1.1 on 2024-12-18 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('esoft', '0002_client_email_client_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='email',
            field=models.EmailField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='client',
            name='grand_name',
            field=models.CharField(blank=True, db_column='Отчество', max_length=100),
        ),
        migrations.AlterField(
            model_name='client',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='client',
            name='name',
            field=models.CharField(blank=True, db_column='Имя', max_length=100),
        ),
        migrations.AlterField(
            model_name='client',
            name='phone',
            field=models.CharField(blank=True, max_length=15),
        ),
        migrations.AlterField(
            model_name='client',
            name='surname',
            field=models.CharField(blank=True, db_column='Фамилия', max_length=100),
        ),
        migrations.AlterField(
            model_name='rieltor',
            name='fee_rate',
            field=models.DecimalField(blank=True, db_column='Доля', decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='rieltor',
            name='grand_name',
            field=models.CharField(blank=True, db_column='Отчество', max_length=100),
        ),
        migrations.AlterField(
            model_name='rieltor',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rieltor',
            name='name',
            field=models.CharField(blank=True, db_column='Имя', max_length=100),
        ),
        migrations.AlterField(
            model_name='rieltor',
            name='surname',
            field=models.CharField(blank=True, db_column='Фамилия', max_length=100),
        ),
    ]
