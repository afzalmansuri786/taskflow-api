# TaskFlow - Task Management API

A simple task management backend API built with Node.js, Express, TypeScript, MongoDB, and a JSON backup system. This API allows users to create, update, delete, and retrieve tasks with support for status updates and filtering. Tasks are stored in MongoDB, with a backup in a JSON file.

## Features

- **Create Tasks**: Create new tasks with a title, description, and status (default: `pending`).
- **Retrieve Tasks**: Fetch all tasks or filter tasks by title, description, and status.
- **Update Tasks**: Update the status of tasks to `pending` or `completed`.
- **Delete Tasks**: Delete tasks by ID.
- **Backup**: Maintain a backup of tasks in a `tasks.json` file.
- **MongoDB**: Primary data storage for tasks.
- **Error Handling**: Proper error responses for various failure scenarios.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (Package manager)
- [MongoDB](https://www.mongodb.com/) (Local/Remote MongoDB  )

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/afzalmansuri786/taskflow-api.git
   cd taskflow-api
   ```

2. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root of the project with the following environment variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017
   PORT=3000
   DB_NAME=task-manager-api
   ```

## Running the Server

To start the server, use the following command:

```bash
yarn start
```

The server will run on `http://localhost:3000`.

## API Endpoints

### 1. Create a Task

**POST** `/tasks`

Request Body:
```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

Response:
```json
{
  "message": "Task created successfully",
  "task": {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
}
```

### 2. Get All Tasks

**GET** `/tasks`

Response:
```json
[
  {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  },
  ...
]
```

### 3. Get Tasks by Status

**GET** `/tasks/status/:status`

Response:
```json
[
  {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
]
```

### 4. Update Task Status

**PUT** `/tasks/:id`

Request Body:
```json
{
  "status": "completed"
}
```

Response:
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task Description",
    "status": "completed"
  }
}
```

### 5. Delete a Task

**DELETE** `/tasks/:id`

Response:
```json
{
  "message": "Task deleted successfully"
}
```

## Data Persistence & Backup

- **MongoDB** is used as the primary data source for tasks.
- **Tasks are also backed up in a local JSON file** (`tasks.json`) to ensure that task data is preserved even if the system crashes. The file is updated after every create, update, or delete operation.

## Folder Structure

```
├── persistent_data/
│   └── tasks.json                # Backup of tasks in a JSON file (primary data is in MongoDB)
src/
├── configs/
│   ├── db.config.ts            # MongoDB connection configuration
├── modules/
│   ├── task/
│   │   ├── enums/
│   │   │   ├── task.enum.ts     # Task-related enums (e.g., status types)
│   │   ├── interfaces/
│   │   │   ├── task-input.interface.ts # Task input validation interface
│   │   │   ├── task-responses.interface.ts # Task response format interface
│   │   │   ├── task-schema.interface.ts # Task schema interface
│   │   ├── schema/
│   │   │   ├── task.schema.ts    # MongoDB schema for task document
│   │   ├── task.controller.ts    # Task controller (handles API request logic)
│   │   ├── task.routes.ts        # Task API routes
│   │   ├── task.service.ts       # Business logic for handling task operations
│   │   ├── task.service1.ts      # (If there's another service variant or utility)
├── utils/
│   ├── file-utils.ts             # Helper functions for file read/write operations
└── app.ts                        # Main Express app setup
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file for node_modules, .env, etc.
├── package.json                  # Project metadata and dependencies
├── tsconfig.json                 # TypeScript configuration
└── yarn.lock                     # Yarn lock file to ensure consistent installs
```

### Folder Descriptions:

- **`configs/`**: Configuration files for the database and any other services like Multer (if required).
- **`modules/task/`**: Contains logic related to task operations. The controller handles API routes and logic, while the service file contains business logic for CRUD operations.
  - **`enums/`**: Enum files that contain constants or values that the application may rely on, like task statuses.
  - **`interfaces/`**: TypeScript interfaces that define the structure of requests, responses, and schema validation.
  - **`schema/`**: MongoDB schema definition for the task entity.
- **`utils/`**: Helper functions for common operations such as reading and writing to the backup file.
- **`index.ts`**: The entry point for the Express app where routes, middlewares, and the server are initialized.# taskflow-api
# taskflow-api
