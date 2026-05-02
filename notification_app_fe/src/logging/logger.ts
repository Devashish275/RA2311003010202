const BASE_URL = "http://20.207.122.201/evaluation-service";

// 🔐 paste your token here
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkcDcwNDlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjM5MCwiaWF0IjoxNzc3NzAxNDkwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNDdiNmU0NDUtMDUyYi00OWU5LWIzZTEtZGUwNTBlZWQ2ZjM0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGV2YXNoaXNoIHBhbmRleSIsInN1YiI6IjE4YmE0ODVkLWJjMjQtNDU5ZC1hNzQyLWFhZDRjN2U0YWJhZiJ9LCJlbWFpbCI6ImRwNzA0OUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImRldmFzaGlzaCBwYW5kZXkiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTAyMDIiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiIxOGJhNDg1ZC1iYzI0LTQ1OWQtYTc0Mi1hYWQ0YzdlNGFiYWYiLCJjbGllbnRTZWNyZXQiOiJQRHltbkd6ZHhHbkdYcmZ3In0.4IBgqCvv-fTBjJJqLrwS9UC076y2ezk4zGR01-yraak";

export const Log = async (
  stack: "frontend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg: "api" | "component" | "hook" | "page" | "state" | "style",
  message: string
) => {
  try {
    await fetch("http://localhost:5000/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_ACCESS_TOKEN`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
};