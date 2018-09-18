from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from datetime import date

class Flights(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=200)
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    no_instument_app = models.BooleanField(default=False)
    no_ldg = models.FloatField(default=0.0)
    cross_country = models.FloatField(default=0.0)
    pic = models.FloatField(default=0.0)
    dual_rec = models.FloatField(default=0.0)
    actual_instr = models.FloatField(default=0.0)
    sim_instr = models.FloatField(default=0.0)
    day = models.FloatField(default=0.0)
    night = models.FloatField(default=0.0)
    airports_visited = models.CharField(max_length=100, default="Airports")
    fly_date = models.DateField(default=date.today, blank=True)
    snippet = models.TextField(blank=True, default="snippet")
    tail_number = models.CharField(max_length=25, default="Tail Number")
    license_type = models.CharField(max_length=40, default="Aircraft")
    man_type = models.CharField(max_length=200, default="Manufacturer")
    # uncomment if instructor fields end up being needed
    # intsr_name = models.CharField(max_length=50)
    # intsr_num = models.PositiveSmallIntegerField()


    class Meta:
        verbose_name_plural = "flights"

    def __str__(self):
        return self.name


class Aircraft(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    man_type = models.CharField(max_length=200)
    tail_number = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    license_type = models.CharField(max_length=40, default="Aircraft")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Aircraft"

    def __str__(self):
        return f'<{self.__class__.__name__}: {self.man_type} {self.license_type}>'

# Aircraft SEL
    # Single-engine land
    # Single-engine sea
    # Multi-engine land
    # Multi-engine sea
