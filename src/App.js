import React, { useEffect, useState, useRef } from "react";
import "./App.scss";

import useWindowSize from "./hooks/useWindowSize";

import images from "./images/images";
import textContent from "./textContent/textContent";

function App() {
  //Hook to grab window size
  const size = useWindowSize();

  // Ref for parent div and scrolling div
  const app = useRef();
  const scrollContainer = useRef();

  // Configs
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0
  };

  // Run scrollrender once page is loaded.
  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);

  //set the height of the body.
  useEffect(() => {
    setBodyHeight();
  }, [size.height]);

  const [ready, setReady] = useState(true);

  const clickFn = () => { 
    if (ready === true) { 
      console.log(`Click mouseup detected`);
      setReady(false);
      setTimeout(function(){ setReady(true) }, 1000);
    }
  };

  //Set the height of the body to the height of the scrolling div
  const setBodyHeight = () => {
    document.body.style.height = `${
      scrollContainer.current.getBoundingClientRect().height
    }px`;
  };

  // Scrolling
  const skewScrolling = () => {
    //Set Current to the scroll position amount
    data.current = window.scrollY;
    // Set Previous to the scroll previous position
    data.previous += (data.current - data.previous) * data.ease;
    // Set rounded to
    data.rounded = Math.round(data.previous * 100) / 100;

    // Difference between
    const difference = data.current - data.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 7.5;

    //Assign skew and smooth scrolling to the scroll container
    scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg) scale(${1-(Math.abs(skew/50))})`;

    document.body.addEventListener('mouseup', clickFn, true); 

    //loop vai raf
    requestAnimationFrame(() => skewScrolling());
  };

  return (
    <div ref={app} className="App">
      <div ref={scrollContainer} className="scroll">
      <div className="section-headline">
        <h2>
          Moments
        </h2>
      </div>
        {images.map((image, index) => {

          if (index % 2 === 0) {
            return (
              <>
                <div className="section-container">
                  <div key={index} className="img-container">
                    <img src={image} alt={`people ${index}`} />
                  </div>
                  <div className="section-text-right">
                    <p>
                      {textContent[index]}
                    </p>
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="section-container">
                  <div className="section-text-left">
                    <p>
                      {textContent[index]}
                    </p>
                  </div>
                  <div key={index} className="img-container">
                    <img src={image} alt={`people ${index}`} />
                  </div>
                </div>
              </>
            );
          }
        })
        }
      </div>
    </div>
  );
}

export default App;
