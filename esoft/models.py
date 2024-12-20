from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


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


class RentalObject(models.Model):
    id = models.AutoField(primary_key=True)
    coordinate_x = models.FloatField(
        validators=[
            MinValueValidator(-90),
            MaxValueValidator(90)
        ]
    )
    coordinate_y = models.FloatField(
        validators=[
            MinValueValidator(-90),
            MaxValueValidator(90)
        ]
    )
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    street = models.ForeignKey('Street', max_length=100, db_column='Улица', blank=True, on_delete=models.CASCADE)
    house = models.ForeignKey('House', max_length=100, db_column='Дом', blank=True, on_delete=models.CASCADE)
    flat = models.ForeignKey('Flat', max_length=100, db_column='Квартира', blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = 'RentalObject'


class City(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)


class Street(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)


class House(models.Model):
    id = models.AutoField(primary_key=True)
    floors_quantity = models.DecimalField(max_digits=999, decimal_places=2, blank=True, null=True)
    rooms_quantity = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)
    square = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)


class Flat(models.Model):
    id = models.AutoField(primary_key=True)
    floor = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    rooms_quantity = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)
    square = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)

class Field(models.Model):
    id = models.AutoField(primary_key=True)
    square = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)