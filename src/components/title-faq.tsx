'use client';

import { useEffect ,useState } from "react";

const useDeviceSize = () => {

    const [width, setWidth] = useState(0)
  
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    }
  
    useEffect(() => {
      handleWindowResize();
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
  
    return width
}
  
export default function FaqTitle(){
    const width = useDeviceSize();
    return(
        <>{width<768?<h2 className="md:text-[5vw] text-[8vw] text-center">Pregunta <br /> frecuentes</h2>:<h2 className="md:text-[5vw] text-[8vw] text-center">Pregunta frecuentes</h2>}</>
    )
}