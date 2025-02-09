"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/services/api/config";

export function ApiTest() {
  const [status, setStatus] = useState<string>("Testing API connection...");

  useEffect(() => {
    const testConnection = async () => {
      console.log("Attempting to connect to:", `${API_BASE_URL}/test`);
      try {
        const response = await fetch(`${API_BASE_URL}/test`, {
          mode: "cors",
          credentials: "include",
        });
        console.log("Response received:", response);
        if (response.ok) {
          const data = await response.json();
          setStatus(`API Connected: ${data.message}`);
        } else {
          setStatus(`API Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Detailed API Test Error:", error);
        setStatus(
          `Connection failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 m-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">API Connection Status</h2>
      <p
        className={
          status.includes("Connected") ? "text-green-600" : "text-red-600"
        }
      >
        {status}
      </p>
    </div>
  );
}
