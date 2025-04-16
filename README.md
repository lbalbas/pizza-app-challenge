# Pizza App Challenge 🍕

A fullstack application built for Coding Cloud's technical interview.

## Features

- **Frontend**: 
  - Browse pizza menu
  - Add pizzas to order
  - View order summary
  - Submit orders
- **Backend API**:
  - Pizza management
  - Order processing
  - Data persistence

## Tech Stack

**Frontend**:
- React + TypeScript
- Vite
- Tailwind CSS
- Jest
- React Toastify

**Backend**:
- Node.js + Express
- TypeScript
- Jest
- REST API

## API Endpoints

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/api/pizzas`      | Get all pizzas                  |
| GET    | `/api/pizzas/:id`  | Get a specific pizza by ID      |
| GET    | `/api/orders`      | Get all orders                  |
| POST   | `/api/orders`      | Create a new order              |
| GET    | `/api/orders/:id`  | Get a specific order by ID      |

## Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd pizza-app-challenge
   ```
2. **Install dependencies**:
    ```bash
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file in the `frontend` folder 
  ```bash
	VITE_API_URL=http://localhost:5000
   ```
 ## Running the App
  `npm run dev` starts the development server for both backend and frontend
	   * Frontend:  `http://localhost:5173`
	    * Backend:  `http://localhost:5000`
  ## Testing
  Run all tests with
  ```bash
	npm run test
   ```
   Can also test only the backend/frontend with `npm run test:backend` or  `npm run test:frontend`
