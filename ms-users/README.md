# Ms-Usrs 

## Requirements

```bash
Docker
Docker Composer
Node LTS, >= 18, NPM
```
### Local Development Setup

#### 1. Install dependencies

```bash
npm i 
```

#### 2. Build and Run the Services

```bash
docker-compose up --build -d
```

#### 3. Create Database and run migrations

```bash
npx prisma init
npx prisma generate 
npx prisma migrate dev
```

if all it's ok, you will in console this message. 

![image](https://github.com/maximilianokaizen/mate/assets/148482605/ca84f625-de33-414f-b2ee-f8366487532e)

A new user was created. And is.. John Wick!

#### 4. Run mate with 

```bash
npm run dev
```

#### 5. Other commands

```bash
npm run build
npm run test
npm run lint
```


## CURL commands to test 

## Create User CURL

```bash
curl -X POST http://localhost:3000/v1/users -H "Content-Type: application/json" -d '{
"uuid": "",
"name": "John",
"userName": "johndoe12356",
"lastName": "Doe",
"email": "johndoe4556@example.com",
"password": "P@ssw0rd123",
"active": true,
"createdAt": "2022-01-30T12:00:00Z",
"amount": 2500.00
}'
```

```bash
curl -X POST http://localhost:3030/v1/users -H "Content-Type: application/json" -d '{
"uuid": "",
"name": "Juan Maximiliano",
"lastName": "Rossi",
"userName": "maxirossi",
"email": "maximilianokaizen@gmail.com",
"password": "P@ssw0rd123",
"active": true,
"createdAt": ""
}'
```

## Get all users CURL

```bash
curl -X GET http://localhost:3030/v1/users
```

## Get user by UUID

```bash
curl -X GET http://localhost:3030/v1/users/e2fbadaf-7f56-4a47-86d8-439e655369d8
```

## Delete user (soft delete)

```bash
curl -X DELETE http://localhost:3030/v1/users/e2fbadaf-7f56-4a47-86d8-439e655369d8
```

## Update User

```bash
curl -X PUT http://localhost:3030/v1/users/2e771f88-eff2-45da-8d39-090365dbc09d -H "Content-Type: application/json" -d '{
"name": "John",
"lastName": "Doe",
"password": "P@ssw0rd123",
"active": false
}'
```

## Auth User

```bash
curl -X POST http://localhost:3030/v1/users/authenticate -H "Content-Type: application/json" -d '{
"email": "maximilianokaizen@gmail.com",
"password": "P@ssw0rd123"
}'
```
