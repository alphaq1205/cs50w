from django.urls import path, include
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('field', views.FieldsView)
router.register('devices', views.DevicesView)
router.register('deviceData', views.DeviceDataView)
#router.register('test/(?P<id>\d+)',views.TestView, basename="test")

urlpatterns = [
    path('', include(router.urls)),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.signin_view, name="register"),
    path("deviceData/<str:user_name>/<int:device_id>",
         views.deviceData_view, name="deviceData"),
    path('loginCheck', views.loginCheck_view, name='loginCheck'),
    path('fields', views.fieldTypes_view, name='fields')
]
