from django.db import models

class Client(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True,)
    name = models.TextField(db_column='Имя', blank=True)
    surname = models.TextField(db_column='Фамилия', blank=True)
    grand_name = models.TextField(db_column='Отчество', blank=True)
    email = models.CharField(max_length=20, blank=True)
    phone = models.CharField(max_length=12, blank=True)

    class Meta:
        db_table = 'Client'

class Rieltor(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True, blank=True)
    name = models.TextField(db_column='Имя', blank=True)
    surname = models.TextField(db_column='Фамилия', blank=True)
    grand_name = models.TextField(db_column='Отчество', blank=True)
    fee_rate = models.IntegerField(db_column='Доля', blank=True)
    class Meta:
        db_table = 'Rieltor'