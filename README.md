# Academic Connect Portal

A role-based web portal that connects students with assigned faculty mentors. Each role gets its own dashboard, and the portal handles academic record tracking, issue reporting, meeting scheduling, and notices.

Built with Node.js and Express in a layered MVC structure — routes, controllers, middlewares, and Mongoose models are separated rather than kept in a single file.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB (Mongoose ODM) |
| Views | EJS (server-side rendering) |
| Sessions | express-session + connect-mongo |
| Config | dotenv |

## Features

- **Three-role access model** — admin, teacher, and student, each routed to a different dashboard on login
- **Mentor assignment** — students are linked to a faculty mentor, modelled as a self-reference on the user collection
- **Academic records** — marks, attendance, and extracurricular notes stored per student
- **Issue reporting** — students raise issues; mentors view and respond
- **Meeting scheduling** — mentor–mentee meetings recorded against user accounts
- **Notice board** — announcements published to users
- **Search** — look up users and records within the portal
- **Profile management** — users maintain their own details and bio

## Project Structure

```
config/         database connection
controllers/    request handling and business logic
middlewares/    authentication and access checks
models/         Mongoose schemas
routes/         route definitions, split by feature
views/          EJS templates
public/         static assets
index.js        application entry point
```

Routes are split into ten feature files — auth, profile, dashboard, search, static, admin, user, issue, meeting, notice — each mounted in `index.js`.

## Running Locally

**Prerequisites:** Node.js 18+ and a running MongoDB instance.

```bash
git clone https://github.com/priteshdolai-code/academic-connect-portal.git
cd academic-connect-portal
npm install

cp .env.example .env     # then fill in your own values

npm run dev              # nodemon, with auto-reload
# or
npm start
```

The app runs on `http://localhost:3000` by default.

### Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `SESSION_SECRET` | Secret used to sign the session cookie |
| `PORT` | Port to listen on (defaults to 3000) |

## Design Notes

**Why sessions rather than JWT.** The portal renders its pages server-side with EJS, so there is no separate frontend client holding a token. A signed session cookie fits that shape better than a bearer token. Sessions are stored in MongoDB via `connect-mongo` rather than in process memory, so logins survive a server restart.

**Modelling mentors as a self-reference.** Rather than a separate mentor collection, a student document carries a `teacher` field referencing another user. Mentors and students share the same login and profile behaviour and differ only by role, so one collection avoided duplicating that logic. The trade-off is that role-specific fields such as `academic` sit on every user document whether or not they apply.

**Splitting routes by feature.** Each area has its own route file mounted in `index.js`. With ten route files, this keeps the entry point readable and makes it obvious where any given endpoint lives.

## Known Limitations

- **Passwords are stored and compared in plain text.** They should be hashed with bcrypt at registration and verified with `bcrypt.compare` at login. This is the first thing to fix.
- **Duplicate session middleware.** `index.js` calls `app.use(session(...))` twice; the second call overrides the first, which discards the MongoStore and reverts to the default in-memory session store. The two configurations should be merged into one.
- **No automated tests.**
- **Limited input validation** — request bodies are largely trusted.
- **Not deployed** — runs locally only.
