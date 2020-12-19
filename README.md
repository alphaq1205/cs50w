# IOT Dashboard

This is a iot-Dashboard. Through this application a user can track his IOT devices data on realtime basis. This web application is divided into three parts first one is frontend part, Second one is backend part and last part contain api's through which a user can post his IOT device data on realtime basis.

I believe This project satisfies the distinctiveness and complexity requirements because I have used React Js, Jsx, Javascript, CSS, Bootstrap for the frontend and used Restful API's created using Django in backend which handles all the data manuplation with the database(sqlite3) which make this project more complex than other projects i have done through out this course so far. I have followed a professional way to build any web application by keeping frontend and backend separately.

**Note**
- User of this repository have to ititate backend and frontend separately in order to see the web application working because frontend part is created by using react js cli (Mentioned below) and backend part is built using Django cli. Thankyou

## Frontend

React Js is used to create frontend part of this project. Frontend and Backend part are totally different the only way these two parts are connected to each other is by API's. The transfer of data takes place by API's created at backend. The frontend part contains following pages:

* #### Front Page
    This is the front page of the application asks for two options login and register a user can choose any of the path on  the basis of dependency.

* #### Login/Signup Page
    Through login and signup page any user can create account and login to our dashboard.

* #### Login and Register
    A user can register and login to the application.

* #### Homepage
    Homepage contain all the devices list created by a particular user. A user can navigate to device data page or can migrate to details page of or can edit or delete the particular added device.

* #### Add new device
    User can create a new device. A user can set up to 3 sensors in a single device.

* #### Device data
    In this page a user can track all the realtime data of devices added by that user.

* #### Single device data
    A user can navigate to single device data page through homepage. A user can choose to track the data of particular device from the list of devices added by user.

**Note**
- Detail page can only be accessed if a device is enabled. User can enable the device from edit device page.

* #### Detail page
    A user can choose to see the detail of particular device from the list of devices added by user present on homepage. Detail page general data which a user provide at the time of creating new device but there are two more fields which plays a important role which are:
    1. Read Device Data
    - In this particular field a GET API is provided by the backend. User can track all his devices data through that particular GET API.

    2. Write Device Data
    - In this particular field a POST API is provided by the backend. User can post the data to "Write device data API" no matter from which application user is posting data.
    - User can track the posted data through our dashboard.

**Note**
- Detail page can only be accessed if a device is enabled. User can enable the device from edit device page.

* #### Edit device data
    A user can navigate to edit device data page through homepage. A user can choose to edit the details of particular device.


### How to initiate
In the frontend directory, you can run:

**In your terminal, cd into the frontend directory.**

#### `npm install`

Install all the npm modules used in the react application of frontend part.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Backend
- Django is used to create the backend. Backend contain all the GET, POST, UPDATE and DELETE API's. SQLite is used in backend to maintain and store the data. Backend is connected to frontend part through RESTful API's.

### How to initiate
In your terminal, cd into the iotDashboard directory.
Run python manage.py makemigrations iotDashboard to make migrations for the iotDashboard app.
Run python manage.py migrate to apply migrations to your database.

- Libraries used in backend:
1. [django-cors-headers](https://pypi.org/project/django-cors-headers)
2. [rest_framework](https://www.django-rest-framework.org)


3. Read and Write Data API:
This the last part of this application which joins a IOT Device to our frontend part through the read and write device data API's. This part contain two API's: 
1. Read Device Data
- This GET API is provided by the backend. User can track all his devices data through this particular GET API.

## Read And Write Device Data
- This is a POST API which is provided by the backend. User can post the data to "Write device data API" no matter from which application user is posting data.
- User can track the posted data through our dashboard.




