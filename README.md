# Eyesight API Documentation

## Authentication

### Google OAuth
### GET /auth/google
`localhost:8080/auth/google`

**Body:**
```
{
    "message": "New user, complete the signup form",
    "redirectTo": "/profile/form",
    "user": {
        "id": "your_id",
        "email": "yourmail@gmail.com",
        "firstName": "First",
        "lastName": "Last",
        "isProfileComplete": false,
        "profilePicture": " "
    },
    "token": " "
}
```
<br>

### Facebook Oauth
### GET /auth/facebook
`localhost:8080/auth/facebook`

**Body:**
```
{
    "message": "New user, complete the signup form",
    "redirectTo": "/profile/form",
    "user": {
        "id": "your_id",
        "email": "yourmail@facebook.com",
        "firstName": "First",
        "lastName": "Last",
        "isProfileComplete": false,
        "profilePicture": " "
    },
    "token": " "
}
```

<br>

### Complete the Profile Form
### POST /profile/form
`localhost:8080/profile/form`

**Body:**
```
{"message":"Profile completed successfully."}
```

<br>

### Showing User Profile
### GET /profile
`localhost:8080/profile`

**Body:**
```
{
    "message": "Login successful",
    "user": {
        "id": "yourid",
        "email": "yourmail@gmail.com",
        "profilePicture": " ",
        "firstName": "First",
        "lastName": "Name",
        "product": "Produk A",
        "phone": "yourphone",
        "dob": "yourdatepfbirth",
        "companyAddress": "yourcompanyaddress",
        "companyName": "yourcompanyname",
        "hasDevice": true/false,
        "jobDesc": " ",
        "isProfileComplete": true
    },
    "token": " "
}
```

<br>

### Showing History
### GET /history
`localhost:8080/history`

**Body:**

```
{"message":"History fetched successfully","summary":{"totalProducts": ,"passedProducts": ,"failedProducts": },"history":[{"id":"# ","name":" ","testScore": ,"confidence": ,"status":" ","timestamp":" "}]}
```

<br>

### Showing Products
### GET /products
`localhost:8080/products`

**Body**

```
{
  "products": [
    {
      "id": "productid",
      "title": "product title",
      "description": "product description",
      "imageUrl": "https://storage.googleapis.com/<your-bucket>/<image-file>.jpg",
      "marketplaceLink": "product-link",
      "createdAt": " "
    }
  ]
}

```