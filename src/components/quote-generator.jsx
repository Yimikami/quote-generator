import { useState } from "react";
import html2canvas from "html2canvas";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(
    { quote: "", author: "", category: "", description: "" },
  );
  const [image, setImage] = useState("");
  const [tooltip, setTooltip] = useState(false);

  const handleDownloadImage = async () => {
    const card = document.getElementById("card");
    html2canvas(card, {
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "quote-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };
  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://get-quotes-api.p.rapidapi.com/random",
        {
          headers: {
            "x-rapidapi-host": "get-quotes-api.p.rapidapi.com",
            "x-rapidapi-key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          },
        }
      );
      const data = await response.json();
      setQuote(data.quote);
      fetchImage(data.quote.category);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  const fetchImage = async (category) => {
    try {
      setImage("");
      const randomPageNumber = Math.floor(Math.random() * 10) + 1;

      const response = await fetch(
        `https://api.pexels.com/v1/search?page=${randomPageNumber}?per_page=1&query=${category}`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_PEXELS_ACCESS_KEY}`,
          },
        }
      );
      const data = await response.json();
      setImage(data.photos[0]);
    } catch (error) {
      console.error("Failed to fetch image:", error);
    }
  };

  const handleMouseEnter = () => {
    setTooltip(true);
  };

  const handleMouseLeave = () => {
    setTooltip(false);
  };

  const handleClick = () => {
    fetchQuote();
  };

  return (
    <div
      id="card"
      className="max-w-lg mx-auto py-10 px-6 bg-gray-100 rounded-lg"
    >
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
        {image && (
          <div className="relative">
            <img
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              src={image.src.large}
              alt="Visual representation"
              className="w-full h-auto rounded-lg mt-4"
            />
            {tooltip && (
              <tooltip
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-html2canvas-ignore
                className="flex flex-col"
              >
                <span className="text-sm text-gray-600 font-sans py-1 px-2">
                  This{" "}
                  <a
                    href={image.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    photo
                  </a>{" "}
                  was taken by{" "}
                  <a
                    href={image.photographer_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {image.photographer}
                  </a>{" "}
                  on Pexels.
                </span>
                <span
                  data-html2canvas-ignore
                  className="text-xs text-gray-400 font-sans py-1 px-2"
                >
                  Photos provided by{" "}
                  <a
                    href="https://www.pexels.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Pexels
                  </a>
                </span>
              </tooltip>
            )}
          </div>
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
      <div className={quote.quote ? "flex justify-between mt-6" : "mt-6"}>
        <button
          data-html2canvas-ignore
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800"
        >
          {quote.quote ? "Another one!" : "Generate a quote!"}
        </button>
        {quote.quote && (
          <button
            data-html2canvas-ignore
            onClick={handleDownloadImage}
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-800"
          >
            I like this! Download it!
          </button>
        )}
      </div>
    </div>
  );
}
