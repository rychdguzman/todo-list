Project Overview
Technologies Used
-Next.js: Version 15.2.1
-Material-UI (MUI): UI Framework
-Context API: For state management
-MongoDB: Database solution

Steps to Run the Project

Install Dependencies: Run the following command in the root directory of the project:
bash
-npm install
Set Up Environment Variables:

    Create a .env file in the root directory.

    Add the following environment variable:

    env
    MONGO_URI=<value will be provided via email>

Start the Project:
For development:
bash
-npm run dev

For production:
bash
-npm run build
-npm start

Live Deployment
A deployed version of this project is accessible at: https://todo-list-kappa-mauve.vercel.app/

Project Requirements:

1. Framework: Use the NextJS App Router framework.
2. UI Components: Utilize MUI (Material-UI) components for the user interface: https://mui.com
3. API Endpoints: Implement NextJS API endpoints to retrieve and save tasks.
4. Storage: Any form of storage can be used to save tasks (e.g., local storage, a database, etc.).
5. Responsiveness: Ensure the app is responsive across all devices and screen sizes.
6. Form Validation:
   ◦ When creating new tasks, validate to ensure tasks are not duplicated (use an async API call to check for duplicates).
   ◦ Ensure tasks are not created with empty titles. 7. Validation Errors: Forms must display validation errors.

Detailed Requirements 1. Framework
• Set up a new NextJS project using the App Router framework.
• Ensure the project structure follows NextJS conventions. 2. UI Components
• Install and configure MUI (Material-UI) in the project.
• Use MUI components for building the todo list interface, including forms, buttons, lists, and dialogs. 3. API Endpoints
• Create NextJS API routes to handle CRUD operations for tasks.
◦ GET /api/tasks: Retrieve all tasks.
◦ POST /api/tasks: Create a new task.
◦ PUT /api/tasks/:id: Update an existing task.
◦ DELETE /api/tasks/:id: Delete a task. 4. Storage
• Choose a storage solution for saving tasks. Options include:
◦ Local storage (for a simple implementation).
◦ A database (e.g., MongoDB, PostgreSQL) for a more robust solution.
• Implement the necessary logic to interact with the chosen storage solution. 5. Responsiveness
• Ensure the app is fully responsive using MUI’s responsive design features.
• Test the app on various devices and screen sizes to ensure a consistent user experience. 6. Form Validation
• Implement form validation to check for duplicate tasks and empty titles.
◦ Use an async API call to check for duplicate tasks before creating a new task.
◦ Ensure the task title is not empty before submission.
• Use MUI’s form components and validation features to handle form validation. 7. Validation Errors
• Display validation errors using MUI’s form error handling components.
• Provide clear and user-friendly error messages for validation issues.
Store the completed project in a public Github repository and provide a link to the repository for review
