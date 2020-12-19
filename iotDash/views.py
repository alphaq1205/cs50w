from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from .models import Fields, Devices, DeviceData
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import FieldsSerializer, DevicesSerializer, DeviceDataSerializer
import socket






# Create your views here.


@csrf_exempt
def fieldTypes_view(request):
    fields = Fields.objects.all().values()
    return JsonResponse(fields, safe=False)


class FieldsView(viewsets.ModelViewSet):
    queryset = Fields.objects.all()
    serializer_class = FieldsSerializer


class DevicesView(viewsets.ModelViewSet):
    
    queryset = Devices.objects.all()
    serializer_class = DevicesSerializer


class DeviceDataView(viewsets.ModelViewSet):
    queryset = DeviceData.objects.all()
    serializer_class = DeviceDataSerializer


@csrf_exempt
def deviceData_view(request, device_id, user_name):
    try:
        devices = Devices.objects.get(pk=device_id)
    except Devices.DoesNotExist:
        return JsonResponse({"error": "Device not found."}, status=404)

    if devices:
        hostname = socket.gethostname()
        ip_address = socket.gethostbyname(hostname)
        if request.method == "POST":
            username = user_name
            deviceID = Devices.objects.get(pk=device_id)
            fieldDataOne = request.POST.get("fieldDataOne")
            fieldDataTwo = request.POST.get("fieldDataTwo")
            fieldDataThree = request.POST.get("fieldDataThree")
            remoteIP = ip_address
            device_data = DeviceData(
                username=username,
                deviceID=deviceID,
                fieldDataOne=fieldDataOne,
                fieldDataTwo=fieldDataTwo,
                fieldDataThree=fieldDataThree,
                remoteIP=remoteIP,

            )
            if(deviceID.user == username):
                device_data.save()
                return JsonResponse({"message": "Data saved successfully."}, status=201)
            else:
                return JsonResponse({"message": "Something went wrong please try agai"})

        if request.method == 'GET':
            deviceData = DeviceData.objects.filter(deviceID=device_id)
            singleData = []
            for x in deviceData:
                if x.username == user_name:
                    singleData.append(x)
            return HttpResponse(singleData)


def index(request):
    return render(request, 'build/index.html')


@csrf_exempt
def login_view(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'You are successfully logged in', 'status': 'true'})
    else:
        return JsonResponse({'message': 'Invalid credentials', 'status': 'false'})


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})


@csrf_exempt
def signin_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        password2 = request.POST["password2"]
        if not password == password2:
            return JsonResponse({'message': 'Password do not match', 'status': 'false'})
        user = User.objects.create_user(
            username=email, email=email, password=password)
        user.save()

        return JsonResponse({'message': 'You have been successfully registered', 'status': 'true'})


@csrf_exempt
def loginCheck_view(request):
    if not request.user.is_authenticated:
        print(request.user)
        return JsonResponse({'message': 'You are not logged in', 'status': 'false'})
    else:
        print(request.user)
        return JsonResponse({'message': 'You are still logged in', 'status': 'true'})
