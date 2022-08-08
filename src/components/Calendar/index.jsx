import React, { useState, useEffect } from "react";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import CsCalendar from "./cs-calendar";
// import { AtCalendar } from "taro-ui";
export default (props) => {
  // console.log("props45: ", props);
  const { undoTask } = props;

  //   const [showBigCa, setShowBigCa] = useState(false);
  //   const onSelectDate = (e) => {
  //     props.onSelectDate(new Date(e.value.start));
  //   };
  const onCsSelectDate = (e) => {
    props.onSelectDate(new Date(e));
    console.log("选中的日期:", e);
  };
  //   const downarrClick = (type) => {
  //     console.log(3);
  //     setShowBigCa(type);
  //   };
  return (
    <View>
      <CsCalendar
        currentDate={props.currentDate}
        onCsSelectDate={onCsSelectDate}
        undoTask={undoTask}
      />

      {/* {showBigCa ? (
        <AtCalendar
          currentDate={props.currentDate}
          onSelectDate={onSelectDate}
        />
      ) : (
        <CsCalendar
          currentDate={props.currentDate}
          onCsSelectDate={onCsSelectDate}
        />
      )} */}
      {/* 展开全部日历 */}
      {/* <View className="downarr">
        {showBigCa ? (
          <Image
            src={require("../../assets/uparr.png")}
            onClick={() => {
              downarrClick(false);
            }}
          />
        ) : (
          <Image
            src={require("../../assets/downarr.png")}
            onClick={() => {
              downarrClick(true);
            }}
          />
        )}
      </View> */}
    </View>
  );
};
