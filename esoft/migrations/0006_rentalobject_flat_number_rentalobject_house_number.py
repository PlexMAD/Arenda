# Generated by Django 5.1.1 on 2024-12-22 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('esoft', '0005_remove_rentalobject_city_delete_field_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='rentalobject',
            name='flat_number',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='rentalobject',
            name='house_number',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
