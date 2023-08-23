import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";

export default (props) => {
  const { originalText = "", destination = "" } = props;
  const [text, setText] = useState("");
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < originalText.length - 1) {
        setText((prevText) => prevText + originalText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [originalText, destination]);
  return <View>{text}</View>;
};
