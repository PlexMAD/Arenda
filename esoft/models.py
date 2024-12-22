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
    city_name = models.CharField(max_length=100, blank=True, null=True)
    street_name = models.CharField(max_length=100, blank=True, null=True)
    house_number = models.CharField(max_length=100, blank=True, null=True)
    flat_number = models.CharField(max_length=100, blank=True, null=True)

    house_floors_quantity = models.DecimalField(max_digits=999, decimal_places=2, blank=True, null=True)
    house_rooms_quantity = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)
    house_square = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)

    flat_floor = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    flat_rooms_quantity = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)
    flat_square = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)

    field_square = models.DecimalField(max_digits=99, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'RentalObject'

