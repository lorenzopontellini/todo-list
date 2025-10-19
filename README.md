# Node.js Express Tasks & Users API

A RESTful API boilerplate for user management and task tracking with JWT authentication, built using Node.js, Express, TypeScript, and Prisma ORM.

## Features

- User registration and login with password hashing and JWT authentication
- Authenticated CRUD on user’s tasks
- Authenticated user info retrieval and profile update
- Input validation via Zod schemas
- Authentication middleware

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM (with PostgreSQL/MySQL)
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- Zod (input validation)
- Jest & Supertest (unit testing)

## Getting Started

1. **Clone the repository**
```
git clone <repo-url>
```

2. **Install dependencies**
```
npm install
```

3. **Set up environment variables**
Create a `.env` file and add your config:
```
DATABASE_URL=postgres://...
JWTSECRET=your_jwt_secret
PORT=3000
```

4. **Run database migrations (Prisma)**
```
npx prisma migrate dev
```

5. **Start the development server**
```
npm run dev
```

## Project Structure

- `/controllers`: business logic
- `/routes`: API endpoints definition
- `/schema`: input/output validation
- `/middlewares`: authentication and other middlewares
- `/test`: unit tests
- `/utils`: helpers

## Main Endpoints

| Method | Endpoint      | Description                     | Auth Required |
| ------ | ------------- | ------------------------------- | -------------- |
| POST   | /auth/register| Register new user               | NO             |
| POST   | /auth/login   | Login, returns JWT              | NO             |
| GET    | /users/me     | Get current user info           | YES            |
| PATCH  | /users/me     | Update user’s name              | YES            |
| POST   | /tasks        | Create a new task               | YES            |
| GET    | /tasks        | List user’s tasks               | YES            |
| GET    | /tasks/:id    | Get a single user’s task        | YES            |
| PUT    | /tasks/:id    | Update a user’s task            | YES            |
| DELETE | /tasks/:id    | Delete a user’s task            | YES            |

## Authentication

After login, all protected routes require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Testing

- Install `Jest` and `Supertest`
```
npm install --save-dev jest supertest @types/jest @types/supertest
```

- Unit tests are located in the `/test` folder.
- Run all tests with:
```
npm test
```

## Postman Collection

A ready-to-import Postman collection is included as `Tasks & Users API.postman_collection.json`, containing a full demo flow for:
- Registration and login
- Task CRUD
- User info and update

Set the collection environment variable `token` after a successful `/auth/login`.

## Possible Improvements

- Implement refresh token flow for more secure session handling
- Add rate-limiting and advanced logging (e.g., with Winston)
- Integrate Swagger/OpenAPI documentation
- Expanded test coverage and CI/CD integration
- Improved error handling and message localization
