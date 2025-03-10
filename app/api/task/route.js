import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

//Function thats check a value if empty
const validateInput = (data) => {
  return !data || data.trim() === "";
};

//Handle the POST request, creating new task and store to db
export async function POST(request) {
  const body = await request.json();
  const { title, status, category, description } = body;

  if (
    validateInput(title) ||
    validateInput(status) ||
    validateInput(category) ||
    validateInput(description)
  ) {
    return new Response(JSON.stringify({ message: "Invalid input." }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  const newTask = { title, status, category, description };

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("TodoList");

    const existingTask = await db.collection("Task").findOne({
      title: { $regex: `^${title}$`, $options: "i" },
    });
    if (existingTask) {
      return new Response(
        JSON.stringify({ message: "Task title already exists." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await db.collection("Task").insertOne(newTask);
    newTask._id = result.insertedId;

    return new Response(
      JSON.stringify({ message: "Successfully created task.", task: newTask }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error.message);

    return new Response(
      JSON.stringify({ message: "An error occurred.", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    if (client) {
      client.close();
    }
  }
}

// Handle GET requests, retrieve all task from db
export async function GET() {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("TodoList");

    const tasks = await db
      .collection("Task")
      .find()
      .sort({ _id: -1 })
      .toArray();

    await client.close();

    return new Response(
      JSON.stringify({
        message: `Successfully fetched ${tasks.length} tasks`,
        tasks: tasks,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching tasks:", error.message);

    return new Response(
      JSON.stringify({
        message: "An error occurred while fetching tasks.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
