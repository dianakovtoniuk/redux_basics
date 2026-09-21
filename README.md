# Redux Basics

Practice repository from the Ultimate Redux course by Code with Mosh. The first part is plain Redux, the second is the same ideas rebuilt with Redux Toolkit and a small React app.

## redux_basics

The classic Redux setup written by hand: action types, action creators, a reducer and a store, bundled with webpack.

```bash
cd redux_basics
npm install
```

## redux_toolkit

A bug tracker built with Redux Toolkit.

Features:
- Slices for bugs, projects and team members
- `loadBugs` thunk and a memoized `getUnresolvedBugs` selector
- Custom middleware: `api` syncs changes to the server, `toast` handles error actions
- Unit tests with Vitest
- React UI with a Resolve button next to each bug
- Express backend with an in-memory bugs API

### Running the project

Start the backend on port 5000:

```bash
cd redux_toolkit/backend
npm install
node server.js
```

Start the frontend on port 5173:

```bash
cd redux_toolkit
npm install
npm run dev
```

Run the tests:

```bash
npm test
```

### API

- `GET /api/users` returns all users
- `GET /api/bugs` returns all bugs
- `GET /api/bugs/:id` returns one bug
- `POST /api/bugs` creates a bug
- `PATCH /api/bugs/:id` updates a bug
- `DELETE /api/bugs/:id` deletes a bug

Data is stored in memory, so it resets when the backend restarts.

## Stack

JavaScript, React, Redux, Redux Toolkit, React Redux, Vite, Vitest, Express, webpack
