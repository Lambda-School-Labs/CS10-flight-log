from django.contrib import admin
from .models import Flights, Aircraft

class AircraftAdmin(admin.ModelAdmin):
    #trying to alter displayed items on admin page
    list_display = ('man_type', 'tail_number', 'license_type')

admin.site.register(Flights)
# Register your models here.
admin.site.register(Aircraft)
