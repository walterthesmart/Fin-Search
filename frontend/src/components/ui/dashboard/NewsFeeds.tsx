import { useNewsData } from "@/hooks/useNewsData";
import { FiExternalLink } from "react-icons/fi";

export function NewsFeeds({ ticker }: { ticker: string }) {
  const { data: news, loading, error } = useNewsData(ticker);

  if (!ticker) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Enter a ticker to view related news</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-black bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Latest News</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {item.source} • {new Date(item.date).toLocaleDateString()}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.sentiment === "positive"
                    ? "bg-green-100 text-green-800"
                    : item.sentiment === "negative"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {item.sentiment}
              </span>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
