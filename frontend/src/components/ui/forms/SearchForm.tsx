import { FiSearch } from "react-icons/fi";

interface SearchFormProps {
  onSearch: (ticker: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const ticker = formData.get("ticker") as string;
    if (ticker) {
      onSearch(ticker.toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="ticker"
          className="block w-full p-4 pl-10 text-sm text-gray-100 border border-gray-600 rounded-lg bg-[#0F0F12] focus:outline-none caret-white"
          placeholder="Enter stock ticker (e.g., AAPL, MSFT)"
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}
