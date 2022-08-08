import React from "react";
import { View } from "@tarojs/components";
import WeekCalendar from "./calendar";
export default (props) => {
  const { undoTask } = props;

  const onCsSelectDate = (e) => {
    props.onSelectDate(new Date(e));
    console.log("选中的日期:", e);
  };

  return (
    <View>
      <WeekCalendar
        currentDate={props.currentDate}
        onCsSelectDate={onCsSelectDate}
        undoTask={undoTask}
      />
    </View>
  );
};
