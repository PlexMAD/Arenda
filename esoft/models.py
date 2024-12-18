from django.db import models


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, db_column='Имя', blank=True)
    surname = models.CharField(max_length=100, db_column='Фамилия', blank=True)
    grand_name = models.CharField(max_length=100, db_column='Отчество', blank=True)
    email = models.EmailField(max_length=255, blank=True)
    phone = models.CharField(max_length=15, blank=True)

    class Meta:
        db_table = 'Client'


class Rieltor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, db_column='Имя', blank=True)
    surname = models.CharField(max_length=100, db_column='Фамилия', blank=True)
    grand_name = models.CharField(max_length=100, db_column='Отчество', blank=True)
    fee_rate = models.DecimalField(max_digits=5, decimal_places=2, db_column='Доля', blank=True, null=True)

    class Meta:
        db_table = 'Rieltor'
