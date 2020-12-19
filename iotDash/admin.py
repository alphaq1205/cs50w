from django.contrib import admin

from .models import Devices, Fields, DeviceData
# Register your models here.

admin.site.register(Devices)
admin.site.register(Fields)
admin.site.register(DeviceData)