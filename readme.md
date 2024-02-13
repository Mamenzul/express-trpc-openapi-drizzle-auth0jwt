# Teammate Finder API

This is the readme file for the "teammate-finder-api" project. Below is an overview of the project structure and how to set it up.

## Project Details

**Package Information:**
- **Name**: teammate-finder-api
- **Version**: 1.0.0
- **License**: ISC

**Description:** Modern Typescript TRPC API + openapi with Drizzle ORM and AUTH0 JWT for mobile app.

**Author:** Brettes Victor

## Project Execution
Authorization middleware (express-oauth2-jwt-bearer) is used to verify the Access Token against Auth0.
CORS middleware is enabled to handle cross-origin requests.
The TRPC (The TypeScript Remote Procedure Call) and OpenAPI routes are protected with the Auth0 JWT verification middleware.
Swagger UI is available at the root ("/") for API documentation.

### Scripts
- Build: npm run build - Runs the TypeScript compiler to build the project.
- Development: npm run dev - Starts the development server.
- Start: npm start - Starts the production server.
- Generate: npm run generate - Generates code using Drizzle Kit with the specified schema.

### Environment Variables

Make sure to set the following environment variables:

- `PGHOST`: Hostname for the PostgreSQL database.
- `PGDATABASE`: Name of the PostgreSQL database.
- `PGUSER`: PostgreSQL username.
- `PGPASSWORD`: PostgreSQL password.
- `ENDPOINT_ID`: Neon endpoint ID
- `AUDIENCE`: Auth0 audience for JWT verification.
- `ISSUERBASEURL`: Auth0 issuer base URL for JWT verification.
- `TOKENSIGNINALG`: Algorithm used for JWT token signing.

### Project Structure
src/index.ts: Main entry point of the application.
src/api/root.js: API routes definition.
src/api/trpc.js: TRPC context creation.
src/openapi.js: OpenAPI document generation.
drizzle: Migration scripts folder (commented out in the code).



