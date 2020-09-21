import React, { useState, useEffect } from "react";

// axios
import axios from "axios";

// react-anime
import Anime from "react-anime";

// react-icons-kit
import { Icon } from "react-icons-kit";
import { quoteLeft } from "react-icons-kit/fa/quoteLeft";
import { facebook } from "react-icons-kit/fa/facebook";
import { twitter } from "react-icons-kit/fa/twitter";
const colors = [
  "-gray-",
  "-red-",
  "-orange-",
  "-yellow-",
  "-green-",
  "-teal-",
  "-blue-",
  "-indigo-",
  "-purple-",
  "-pink-",
];

interface Quote {
  quote: string;
  author: string;
}
function App() {
  const [quote, setQuote] = useState<Quote>();
  const [randomNum, setRandomNum] = useState(0);
  const [randomColor, setRandomColor] = useState("-teal-");

  function random() {
    const numRandom = Math.floor(Math.random() * (colors.length - 2 - 0)) + 0;
    setRandomNum(numRandom);
    setRandomColor(colors[numRandom]);
  }

  useEffect(() => {
    async function getQuotes() {
      const data = await axios
        .get(
          "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        )
        .then((data) => data.data.quotes[randomNum]);
      setQuote(data);
    }
    getQuotes();
  }, [randomNum]);

  console.log(quote);
  return (
    <div
      className={`bg${randomColor}700 h-screen flex justify-center items-center transition duration-700 ease-in-out`}
    >
      <div className="p-8 transition duration-500 ease-in-out bg-white rounded-lg shadow-sm lg:w-1/3">
        <Anime ease="easeOutElastic" delay={100} scale={[.75, .9]} opacity={[0,1]}>
          <p
            className={`py-8 text-2xl text${randomColor}700 transition duration-700 ease-in-out`}
          >
            <Icon
              size={40}
              icon={quoteLeft}
              className={`text${randomColor}700 mr-4 transition duration-700 ease`}
            />
            {quote?.quote}
          </p>
          <p
            className={`mb-8 text-2xl text${randomColor}700 transition duration-700 ease-in-out text-right `}
          >
            -{quote?.author}-
          </p>
        </Anime>
        <div className="flex items-center justify-between">
          {/* social buttons */}
          <div className="flex justify-between">
            <button
              className={`bg${randomColor}700  w-12 h-12 rounded-lg hover:bg${randomColor}900 shadow-sm transition duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none `}
            >
              <Icon
                size={24}
                icon={facebook}
                className={`text${randomColor}200`}
              />
            </button>
            <button
              className={`bg${randomColor}700  w-12 h-12 rounded-lg ml-2 hover:bg${randomColor}900 shadow-sm transition duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none `}
            >
              <Icon
                size={24}
                icon={twitter}
                className={`text${randomColor}200`}
              />
            </button>
          </div>

          {/* new quote button */}
          <button
            onClick={() => random()}
            className={`bg${randomColor}700 text${randomColor}200 p-4 rounded-lg shadow-2x1 font-bold hover:bg${randomColor}900 transform hover:-translate-y-1 hover:scale-110 focus:outline-none transition duration-700 ease-in-out `}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(App);
