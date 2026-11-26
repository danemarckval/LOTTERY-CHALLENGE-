
import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({
      success: false,
      message: "Database configuration missing"
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`SELECT 1`;

    return res.status(200).json({
      success: true,
      message: "LOTTERY CHALLENGE database connected"
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
}
