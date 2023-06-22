
# Workshop jwt : Express/React

### Install dependencies
Install the dependencies project with the command:

```bash
npm run setup
```

### Set environment variables

In the `api` and `front` folder, copy the `.env.sample` file to `.env` and change the environment variables for connect to your local database.

### Database migration
migrate the SQL file `api/database.sql` with the command :
```bash
npm run migrate
```

### Running

You can start the project with the command:

```bash
npm run dev
```

# API

## 1 - User account login
Create a POST route `/users/login` that will allow the connection of a user account.

The route must retrieve a json with the following structure from the request body:

```json
{
  "email": "their email",
  "password": "their password"
}
```
1. If neither the email nor the password are filled in, return a 400 error 'Please specify both email and password'.

2. Create a findByMail method in your model 
- 2.1 If an error occurs during the execution of the SQL query, return an error 500 with the corresponding error message. 
- 2.2 If the result returned is empty, return a 403 'Invalid email' error.

3. If the result is not empty, you will now verify the password using the `verify` method of the _argon2_ module. You can find an example here: [https://github.com/ranisalt/node-argon2#node-argon2](https://github.com/ranisalt/node-argon2#node-argon2).

4. If the password do not match returns a 403 error with the message 'Invalid password'.

5. If the password is valid generate a jsonwebtoken, you will use the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) module to perform the key generation: :
  - install the module
  - use the `sign` method to generate a JWT, using the secret key charred from the environment variables.
  - The _payload_ of the key will be the following json: `json { id: id, role: role }`
  - the expiry date `expiresIn` will be one hour.

6. Send jwt to client in cookie by following the steps below :
  - Add the `credentials: true`option to your cors middleware
  - use `res.cookie()` method with the following parameters : 
    - first params should be a string identifier for retrieve your cookie later, you can define something like `access_token`|| `token`|| `auth_token`
    - second parameters should be the data of the cookie insert the generated jwt here
    - last params should be the options for generating the cookie, be sure to define the `{httpOnly: true}` option

7. Finally return a 200 code with a json with the following structure:

```json
{
  "id": "their id",
  "email": "their email",
  "role": "their role"
}
```

## 2 - Creating authentication middleware
In order to protect your restricted routes you will define a _middleware_ which will retrieve the _token_ from the cookie sent with the request and validate the jwt before allowing access to a controller.

1. Create `auth.js` file into the middlewares directory, this file will contain  the middlewares method for authenticate and authorize access to our restricted routes.
2. Add a authorize method with the `req, res, next` parameters

3. In this method first you'll have to retrieve the cookie via the `req.cookies` object with the key you specified when your generated the cookie, 
example: `const token = req.cookies.access_token`

4. For be able to read the cookies object you'll have to install and apply the `cookie-parser`middleware to your app : 
```js
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

5. If the cookie doesnt exist return a 401 error status

6. If the cookie exist validate and decode the token using the `verify` method from jwt, this method expect 2 parameters (token, secretKey).
example : 
```js
const decoded = jwt.verify(token, proccess.env.JWT_AUTH_SECRET);
```

7. If a error is throw by the verify method return a 401 error status

8. If the token is valid add the user id and role you get from the decoded token into the `req` object
example : 
```js 
req.userId = decoded.id;
req.userRole = decoded.role;
```

9. call the `next` method to pass to the next middleware/controller

10. Import and add the middleware to your restricted routes (put*, delete*, getAllUsers)

# Frontend

## 1 - Create axios services and setup the login

1. Install axios dependencies into the front folder : `cd ./front && npm i axios`

2. Create a `api.js` into the services folder and add the following code : 
```js
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/`,
  withCredentials: true
});

export default api;
```

3. create a `authService.js` file into the services folder and add a login method for calling your api /login route
 - 3.1 Think that the _email_ and _password_ will be sent in the body of the request, you can see an example here: [https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index#//dash_ref_General/Entry/POST%20request/0)

4. In the `Login.jsx` component, import and call your authService login method into the `useEffect` hook

5. If the method return a error status (400, 403) define a error state and show the error into your render

6. If you receive a success status (200) redirect to the home page "/" with the useNavigate hook

## 2 - Create a Auth context and privateRoute
For be able to secure our routes and redirect unauthenticated user without calling our api we will define a auth context with the contextApi

1. Create a `store` folder and add a `AuthContext.jsx` file

2. Create your AuthContext Provider following this tutorial : https://www.freecodecamp.org/news/context-api-in-react/
 - 2.1 import and call `const AuthContext = createContext()` hook
 - 2.2 create a `AuthProvider`component and add the state of the provider with the `useState()` hook, the state structure should be : 
```js
  const [state, setState] = useState({user: null, isAuth: false, isAdmin: false})
``` 
 - 2.3 return `AuthContext.Provider` and set his value props with our state and setState method and wrap into your provider the children props of your component
 exemple : 
 ```js
  function AuthProvider({children}) {
    const [state, setState] = useState({user: null, isAuth: false, isAdmin: false});
    return (
      <AuthContext.Provider value={{state, setState}}>
        ...children
      </AuthContext.Provider>
    )
  }
 ```

3. In your App.jsx (or Router.jsx) add a PrivateRoute component following this tutorial : https://binhtran04.medium.com/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
  - 3.1 Declare a `PrivateRoute` component with the following props : 
  `({Component: component, ...rest})`
  - 3.2 Import `AuthContext` and get his state using `useContext` hook :
  `const { state } = useContext(AuthContext);`
  - 3.3 If `state.isAuth` is false return a `Redirect` component for redirect to the login page :
  `if (!state.isAuth) return <Redirect to="/login" />`
  - 3.4 If `state.isAuth` is true return a Route component following this example :
  ```js
  else
    return <Route {...rest} render={props => <Component {...props} /> } />
  ``` 
  - 3.5 Use your `PrivateRoute` component into your app router for protecting the following routes : (home: "/", users: "/users")

4. Update your Login component for set the state of your AuthProvider when the user logged successfully and test your routes

## 3 - Sky is the limit
Now you have your login implemented in your front end and you have secured the routes your mission if you accept it is to : 

1. Define a service with the methods associated for get all the users and for logout and call your service method into the corresponding page

2. Update your PrivateRoute component with a isAdmin props for restrict access to admin route, for that use the same logic we use for isAuth

3. Use your AuthContext into the Nav component for showing the restricted link to routes instead of the login link if we are authenticated

