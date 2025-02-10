import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/services/api/config";

export function ApiTest() {
  const [status, setStatus] = useState<string>("Testing API connection...");
  const [isVisible, setIsVisible] = useState(true);

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
          // Wait 2 seconds after successful connection before starting fade out
          setTimeout(() => {
            setIsVisible(false);
          }, 2000);
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

  if (!isVisible) return null;

  return (
    <div
      className={`
        p-4 m-4 bg-gray-700 rounded-lg shadow
        transition-opacity duration-500 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <h2 className="text-lg text-white font-semibold mb-2">API Connection Status</h2>
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
