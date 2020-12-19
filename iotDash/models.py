
from django.db import models

# Create your models here.


class Fields(models.Model):
    fieldType = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.fieldType}"


class Devices(models.Model):
    user = models.CharField(max_length=64)
    deviceName = models.CharField(max_length=64)
    fieldTypeOne = models.ForeignKey(
        Fields, on_delete=models.CASCADE, related_name="fieldOne")
    fieldNameOne = models.CharField(max_length=64)
    fieldTypeTwo = models.ForeignKey(
        Fields, on_delete=models.CASCADE, related_name="fieldTwo")
    fieldNameTwo = models.CharField(max_length=64)
    fieldTypeThree = models.ForeignKey(
        Fields, on_delete=models.CASCADE, related_name="fieldThree")
    fieldNameThree = models.CharField(max_length=64)
    description = models.CharField(max_length=64)
    enable = models.BooleanField(max_length=64)
    response = models.BooleanField(max_length=64)

    def __str__(self):
        return f"'user: '{self.user}'  deviceName: '{self.deviceName}'  fieldTyeOne '{self.fieldTypeOne}'  fieldNameOne: '{self.fieldNameOne}'   fieldTypeTwo: '{self.fieldTypeTwo}'   fieldNameTwo: '{self.fieldNameTwo}'   fieldTypeThree '{self.fieldTypeThree}'  fieldNameThree: '{self.fieldNameThree}'   description: '{self.description}'   enable: '{self.enable}'  response: '{self.response}"


class DeviceData(models.Model):
    username = models.CharField(max_length=64)
    deviceID = models.ForeignKey(
    Devices, on_delete=models.CASCADE, related_name="Device")
    fieldDataOne = models.CharField(max_length=64)
    fieldDataTwo = models.CharField(max_length=64)
    fieldDataThree = models.CharField(max_length=64)
    date = models.DateTimeField(auto_now_add=True)
    remoteIP = models.FloatField()

    def __str__(self):
        return f"'user: '{self.username}'  deviceID: '{self.deviceID}'  fieldDataOne '{self.fieldDataOne}'   fieldTypeTwo: '{self.fieldDataTwo}'   fieldDataThree '{self.fieldDataThree}'   Date: '{self.date}'  remote IP: '{self.remoteIP}"


""" CREATE TABLE devices(
   id  INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   deviceName TEXT NOT NULL,
   fieldTypeOne TEXT,
   fieldNameOne TEXT,
   fieldTypeTwo TEXT,
   fieldNameTwo TEXT,
   fieldTypeThree TEXT,
   fieldNameThree TEXT,
   description TEXT,
   enable TEXT,
   response TEXT
); """


""" 
    CREATE TABLE fields(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fieldType TEXT NOT NULL
    );

    CREATE TABLE devices(
   id  INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   deviceName TEXT NOT NULL,
   fieldTypeOne TEXT,
   fieldNameOne TEXT,
   fieldTypeTwo TEXT,
   fieldNameTwo TEXT,
   fieldTypeThree TEXT,
   fieldNameThree TEXT,
   description TEXT,
   enable TEXT,
   response TEXT
)

 """
