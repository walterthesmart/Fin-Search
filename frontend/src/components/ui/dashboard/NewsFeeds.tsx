import { FiExternalLink } from "react-icons/fi";

interface NewsFeedsProps {
  ticker: string;
}

export function NewsFeeds({ ticker }: NewsFeedsProps) {
  const news = [
    {
      id: 1,
      title: "Sample news headline about the company",
      source: "Financial Times",
      url: "#",
      sentiment: "positive",
      date: "2024-02-08",
    },
    // Add more mock news items
  ];

  if (!ticker) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Enter a ticker to view related news</p>
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
