<img align="right" height="350" src="https://firebasestorage.googleapis.com/v0/b/codedex-io.appspot.com/o/community%2Fcheckpoint-project%2Fpost%2F1fLD7qAxvEC6ahdE6xNZ%2FMOV%20to%20GIF%20conversion.gif?alt=media&token=969213c9-e9e4-44b3-8f93-86e50f732c14"  />

This is a simple Quote Generator application built with React. It fetches random quotes and corresponding images, displays them on the screen, and allows users to download the quote card as an image.

### Features

- Fetches a random quote from an API
- Fetches a random image based on the quote's category from Pexels
- Displays the quote and image in a card format
- Allows users to download the quote card as an image

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/quote-generator.git
   ```

2. Navigate to the project directory:
   ```sh
   cd quote-generator
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Copy the `.env.example` file to `.env` and add your API keys:

```sh
cp .env.example .env
```

```sh
VITE_X_RAPIDAPI_KEY=your_rapidapi_key
VITE_PEXELS_ACCESS_KEY=your_pexels_access_key
```


## Usage

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgements

- Quotes API: [RapidAPI/eimaam](https://rapidapi.com/eimaam/api/get-quotes-api/)
- Images API: [Pexels](https://www.pexels.com/)
