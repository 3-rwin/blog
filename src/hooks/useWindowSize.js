import { useState, useEffect } from "react";

//Define the custom hook
const useWindowSize = () => {
    // Set the initial state
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        // Call the function once at load time
        handleResize();
        // Continue to fire the handleResize every time the resize event is triggered
        window.addEventListener("resize", handleResize);
        
        // Prevent a memory leak by removing the eventListener
        // Return an anonymous arrow function
        return () => {
            console.log('Runs if a useEffect dependency changes');
            window.removeEventListener("resize", handleResize);
        }
    },[])

    return windowSize;
}

export default useWindowSize;
