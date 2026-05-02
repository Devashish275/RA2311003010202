import React, { useEffect, useState } from "react";
import { Log } from "./logging/logger";
import "./App.css";

interface Notification {
  ID: string;
  Type: "Placement" | "Event" | "Result";
  Message: string;
  timestamp: string;
}

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Log("frontend", "info", "page", "App mounted");
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      Log("frontend", "info", "api", "Fetching notifications from proxy");

      const response = await fetch("http://localhost:5000/notifications");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data.notifications || !Array.isArray(data.notifications)) {
        throw new Error("Invalid response format");
      }

      const typeOrder: Record<string, number> = {
        Placement: 1,
        Event: 2,
        Result: 3
      };

      const sorted = (data.notifications as Notification[])
        .sort((a: Notification, b: Notification) => {
          const typeDiff =
            (typeOrder[a.Type] || 999) - (typeOrder[b.Type] || 999);
          if (typeDiff !== 0) return typeDiff;
          return (
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime()
          );
        })
        .slice(0, 10);

      setNotifications(sorted);
      Log(
        "frontend",
        "info",
        "api",
        `Successfully loaded ${sorted.length} notifications`
      );
      setLoading(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      Log("frontend", "error", "api", `Fetch failed: ${errorMsg}`);
      setError(errorMsg);
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📋 Top 10 Campus Notifications</h1>

      {loading && <p>⏳ Loading notifications...</p>}

      {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}

      {!loading && !error && notifications.length === 0 && (
        <p>No notifications found.</p>
      )}

      {!loading && !error && notifications.length > 0 && (
        <div>
          <p>
            <strong>Total: {notifications.length} notifications</strong>
          </p>
          {notifications.map((notif, index) => (
            <div
              key={notif.ID}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "5px",
                backgroundColor:
                  notif.Type === "Placement"
                    ? "#e3f2fd"
                    : notif.Type === "Event"
                    ? "#fff3e0"
                    : "#f3e5f5"
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>
                {index + 1}. {notif.Type}
              </h3>
              <p style={{ margin: "5px 0" }}>
                <strong>Message:</strong> {notif.Message}
              </p>
              <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
                <strong>ID:</strong> {notif.ID}
              </p>
              <p style={{ margin: "5px 0", fontSize: "0.85em", color: "#999" }}>
                <strong>Time:</strong>{" "}
                {new Date(notif.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;