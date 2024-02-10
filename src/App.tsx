import React, { useState, useEffect } from "react"



const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return width;
}


const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 1500);
  }, []);
  return mounted;
}


const App = () => {
  const width = useWindowWidth();
  const mounted = useMounted();

  return (
    <div>
      {`mounted is ${mounted}`} <br/>
      {`width is ${width}`}
    </div>
  )
}


export default App