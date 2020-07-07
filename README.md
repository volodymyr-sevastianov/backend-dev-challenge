# Backend Dev Challenge
Before running application you must sure that you've installed all necessary software:

[Node](https://nodejs.org/uk/download/current/): v14.5.0

[NPM](https://nodejs.org/uk/download/current/): v6.14.5

### (Optional) - you can use local [mongodb server](https://www.mongodb.com/try/download/community) instead of it

[Docker](https://www.docker.com/get-started): v19.03.8

[docker-compose](https://docs.docker.com/compose/install/): v1.25.5

## Installation
Run this commands to install all required packages:
``` 
npm i

docker-compose up   - (optional)
```

# Configuration
To configure app copy `.env.example` and name it `.env`. Or here another copy:
```
CSV_DELIMITER=| # character that used to separate columns in CSV
SOURCE_FILE_PATH= # path to csv file

DB_HOST=localhost # database host from compose file or not
DB_PORT=27017 # database port
DB_NAME=backend-dev-challenge # database name

# you cant get it at IMAP and SMTP configuration on your email service
SMTP_HOST=smtp.ethereal.email 
SMTP_PORT= 
SMTP_SECURE= 
SMTP_SERVICE=
SMTP_USER=
SMTP_PASSWORD=

FROM_EMAIL=test@mail.com
```
If you are used to Gmail and want to use it SMTP just specify:
```
SMTP_SERVICE=gmail
SMTP_USER=yourmail@gmail.com
SMTP_PASSWORD=your16DigitAppPassword
``` 
You can get app password [here](https://myaccount.google.com/apppasswords). (2-step authentication needed)

## Start
Run this command to run app:
``` 
npm run start
```
## Development
Run this command to run app with monitor:
```
npm run start:dev
```
## Test
```
npm run test
```
## Build
Run this command to build source code with babel:
```
npm run build
```
# Development steps
1. Init repository, create `.gitignore`, `npm init`.
2. Set up `prettier`, `eslint`, `babel`, etc.
3. Create folder structure, `index.js` and `app.js` files.
4. Install `packages`.
5. Create `.env`
6. Create needed configs wrappers.
7. Create `models`, set up `validation`.
8. Create `services` for DB, SMTP and CSV converter.
9. Create `cron-manager` and `cron`.
10. Create `business services`.
11. Unit testing.
12. Manual testing.
13. Update readme.

