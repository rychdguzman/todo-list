import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export async function PUT(request, { params }) {
  const body = await request.json();
  const { status } = body;
  const { taskId } = await params;

  if (!taskId || !status) {
    return new Response(
      JSON.stringify({ message: "Missing taskId or status" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("TodoList");

    const filter = { _id: ObjectId.createFromHexString(taskId) };
    const update = { $set: { status: status } };

    const result = await db.collection("Task").updateOne(filter, update);
    console.log("Matched Count:", result.matchedCount);
    console.log("Modified Count:", result.modifiedCount);

    await client.close();

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Successfully updated task",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating task:", error.message);

    return new Response(
      JSON.stringify({
        message: "An error occurred while updating task.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request, context) {
  const { taskId } = await context.params;

  if (!taskId) {
    return new Response(JSON.stringify({ message: "Missing taskId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    console.log("Received Task ID for deletion:", taskId);

    if (!ObjectId.isValid(taskId)) {
      return new Response(
        JSON.stringify({ message: "Invalid taskId format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("TodoList");

    const filter = { _id: new ObjectId(taskId) }; // Correctly use ObjectId with "new"

    const result = await db.collection("Task").deleteOne(filter);

    await client.close();

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Successfully deleted task" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting task:", error.message);

    return new Response(
      JSON.stringify({
        message: "An error occurred while deleting the task.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
