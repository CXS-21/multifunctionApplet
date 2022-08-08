import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import dayjs from "dayjs";
import MyWeek from "../../components/MyWeekCalendar";
import "./index.less";

let today = dayjs(new Date()).format("YYYY-MM-DD");

export default (props) => {
  const [current, setCurrent] = useState(today);

  useEffect(() => {
    console.log("周历");
  }, []);

  const onSelectDate = (e) => {
    let selectDay = dayjs(e).format("YYYY-MM-DD");
    setCurrent(selectDay);
  };

  return (
    <View className="container">
      <View className="content">
        <View className="header">
          <MyWeek currentDate={current} onSelectDate={(e) => onSelectDate(e)} />
        </View>
      </View>
    </View>
  );
};
