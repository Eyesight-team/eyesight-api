
# Getting started

```bash
npm install
cp .env.example .env
npm run start
```

<br>

## Eyesight API Documentation

### Google OAuth
### - Endpoint: ``` /auth/google ```
### - Method: ``` GET ```
### - Description: Triggers the Google OAuth login flow.

<br>

### Google OAuth Callback
### - Endpoint: ``` /auth/google/calback ```
### - Method: ``` GET ```
### - Description: Handles the callback from Google OAuth login.

### - Response: 
#### For new user:
```
{
  "message": "New user, complete the signup form",
  "redirectTo": "/profile/form",
  "user": { ... },
  "token": "<JWT_TOKEN>"
}
```
#### For existing user:
```
{
  "message": "Login successful",
  "user": { ... },
  "token": "<JWT_TOKEN>"
}
```

<br>

### Facebook OAuth
### - Endpoint: ``` /auth/facebook ```
### - Method: ``` GET ```
### - Description: Triggers the Facebook OAuth login flow.

<br>

### Facebook OAuth Callback
### - Endpoint: ``` /auth/facebook/calback ```
### - Method: ``` GET ```
### - Description: Handles the callback from Facebook OAuth login.

### - Response: 
#### For new user:
```
{
  "message": "New user, complete the signup form",
  "redirectTo": "/profile/form",
  "user": { ... },
  "token": "<JWT_TOKEN>"
}
```
#### For existing user:
```
{
  "message": "Login successful",
  "user": { ... },
  "token": "<JWT_TOKEN>"
}
```

<br>

### Logout
### - Endpoint: ``` /auth/logout```
### - Method: ``` POST ```
### - Header: ``` Authorization ``` : ``` Bearer <JWT_TOKEN> ```

**Response:**
```
{
  "message": "Logout successful"
}
```

<br>

### Showing User Profile
### - Endpoint: ``` /profile```
### - Method: ``` GET ```
### - Header: ``` Authorization ``` : ``` Bearer <JWT_TOKEN> ```

**Response:**
```
{
    "id": " ",
    "email": " ",
    "profilePicture": " ",
    "firstName": " ",
    "lastName": " ",
    "product": " ",
    "phone": " ",
    "dob": " ",
    "companyAddress": " ",
    "companyName": " ",
    "hasDevice": ,
    "jobDesc": " ",
    "isProfileComplete": 
}
```

<br>

### Complete profile form
### - Endpoint: ``` /profile/form```
### - Method: ``` POST ```
### - Header: ``` Authorization ``` : ``` Bearer <JWT_TOKEN> ```
### ``` Content-Type``` : ``` application/json ```

**Body:**
```
{
  "firstName": " ",
  "lastName": " ",
  "dob": " ",
  "phone": " ",
  "companyName": " ",
  "companyAddress": " ",
  "jobDesc": " ",
  "hasDevice": ,
  "product": " "
}
```

**Response:**
```
{
  "message": "Profile completed successfully."
}

```

<br>

### Get History
### - Endpoint: ``` /history```
### - Method: ``` GET```
### - Header: ``` Authorization ``` : ``` Bearer <JWT_TOKEN> ```

**Response:**
```
{
  "message": " ",
  "summary": {
    "totalProducts": ,
    "passedProducts": ,
    "failedProducts": 
  },
  "history": [
    {
      "id": " ",
      "name": " ",
      "testScore":  ,
      "confidence":  ,
      "status": " ",
      "timestamp": " "
    },
    ...
  ]
}
```
<br>

### Get Products
### - Endpoint: ``` /products```
### - Method: ``` GET```
### - Header: ``` Authorization ``` : ``` Bearer <JWT_TOKEN> ```

**Response:**
```
{
  "products": [
    {
      "id": " ",
      "title": " ",
      "description": " ",
      "imageUrl": " ",
      "marketplaceLink": " ",
      "createdAt": " "
    },
    ...
  ]
}
```