import { useState } from "react";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState([
    { quote: "", author: "", category: "", description: "" },
  ]);

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://get-quotes-api.p.rapidapi.com/random",
        {
          headers: {
            "x-rapidapi-host": "get-quotes-api.p.rapidapi.com",
            "x-rapidapi-key":
              "9d2dfca34amshb4ab95286aef93cp1e4241jsn13418077cce0",
          },
        }
      );
      const data = await response.json();
      setQuote(data.quote);
      console.log("Quote fetched:", quote.quote);
      console.log("Author fetched:", quote.author);
      console.log("Category fetched:", quote.category);
      console.log("Description fetched:", quote.description);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  const handleClick = () => {
    fetchQuote();
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        {quote.quote
          ? "Here's a quote for you!"
          : "Welcome to Quote Generator!"}
      </h1>
      <div className="text-gray-700 space-y-4">
        {quote.category ? (
          <h2 className="text-2xl font-semibold">
            A glimpse into {quote.category}...
          </h2>
        ) : (
          <p className="text-md">Click the button to generate a quote!</p>
        )}
        {quote.quote && (
          <p className="text-xl italic">
            &quot;{quote.quote}&quot; -{" "}
            <span className="font-semibold">{quote.author}</span>
          </p>
        )}
        {quote.description && (
          <p className="text-md">
            Insight: <span className="font-light">{quote.description}</span>
          </p>
        )}
      </div>
      <button
        onClick={handleClick}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition ease-in-out duration-150"
      >
        {quote.quote ? "Another one!" : "Generate a quote!"}
      </button>
    </div>
  );
}
