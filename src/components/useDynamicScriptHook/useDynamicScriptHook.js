import React, { useRef, useState, useCallback, useEffect } from "react";

const useDynamicScriptHook = ({ scriptUrl, scriptId, callback }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.id = scriptId;
      document.body.appendChild(script);

      script.onload = () => {
        if (callback) {
          callback();
        }
      };
    }

    if (existingScript && callback) {
      setIsLoaded(true);
      callback();
    }

    return () => {
      if (existingScript && callback) {
        existingScript.remove();
      }
    };
  }, [scriptUrl, scriptId]);

  return [isLoaded, setIsLoaded];
};

export default useDynamicScriptHook;
