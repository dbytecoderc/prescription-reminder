# prescription-reminder

[Deployed API on heroku](https://prescription-reminder-app.herokuapp.com)

## Technologies

### Below is a list of technologies used to build this project

`Javascript`

`Nodejs`

`Express`

### Installation

Follow these steps to set up the app.

#### Clone the repo:

`$ git clone https://github.com/dbytecoderc/prescription-reminder.git`

#### Navigate to the project directory:

`$ cd prescription-reminder`

#### Install dependencies

`npm install`

#### Start the application

`npm run start:dev`

#### For signup use the following data format

`POST https://prescription-reminder-app.herokuapp.com/api/v1/auth/signup`

```
{
    "name": "Test user",
    "email": "oparahdc@gmail.com",
    "password": "Password1"
}
```

`NB: Password has to contain a capital letter and a number`

#### For login use the following data format

`POST https://prescription-reminder-app.herokuapp.com/api/v1/auth/login`

```
{
    "email": "oparahdc@gmail.com",
    "password": "Password1"
}
```

#### To create a prescription use the following data format

`POST https://prescription-reminder-app.herokuapp.com/api/v1/prescription/create`

```
{
    "usage": "test usage",
    "duration": "4"
}
```

`NB: You need to add a Bearer token as part of the request`

#### To update a prescription use the following data format

`PATCH https://prescription-reminder-app.herokuapp.com/api/v1/prescription/:prescriptionId`

```
{
    "usage": "test usage",
    "duration": "6"
}
```

#### To verify a prescription use the following data format

`PATCH https://prescription-reminder-app.herokuapp.com/api/v1/prescription/:prescriptionId`

```
{
    "taken": true
}
```

#### To delete a prescription use the following data format

`DELETE https://prescription-reminder-app.herokuapp.com/api/v1/prescription/:prescriptionId`

NB: The cron job that reminds the users of their prescriptions runs every three hours

#### Author: Oparah Dimkpa
