import React, { useState, useEffect } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import {
  weekDays,
  getSwipeGroup,
  getArrAdj,
  getWeekCalendar,
  swapperArr,
} from "./helper";
import "./style.less";
import dayjs from "dayjs";
import dshUtils from "dsh-utils";

export default (props) => {
  // const { undoTask } = props;
  let undoTask = {
    "2022-08-02": [
      {
        type: "工作",
      },
    ],
    "2022-08-03": [
      {
        type: "会议",
      },
    ],
  };
  const [activeDay, setActiveDay] = useState(props.currentDate); //当前高亮的天
  const [swipeGroup, setSwipeGroup] = useState([
    getWeekCalendar(props.currentDate, -1),
    getWeekCalendar(props.currentDate, 0),
    getWeekCalendar(props.currentDate, 1),
  ]); // swapper内容(3个周板面)
  const [swipeIndex, setSwipeIndex] = useState(1); //当前swipeIndex

  // console.log("swipeIndex: ", swipeGroup[swipeIndex]);
  const [currentWeek, setCurrentWeek] = useState(swipeGroup[swipeIndex]); //当前周

  const [clickArrowType, setClickArrowType] = useState("");
  const [nowDate, setNowDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  useEffect(() => {
    syncSwipeGroup("haveCurrentDate");
    setActiveDay(props.currentDate);
  }, [props.currentDate]);

  const setActiveDayFn = (val) => {
    props.onCsSelectDate(val);
    setActiveDay(val);
  };

  // 设置swapper内容
  const syncSwipeGroup = (current = swipeIndex, isTouch) => {
    // 点击和触摸和默认props初始化
    if (isTouch) {
      const res = getSwipeGroup(swipeGroup, current);
      setSwipeGroup([...res]);
    } else {
      if (current === "haveCurrentDate") {
        const res = getSwipeGroup(swipeGroup, swipeIndex, props.currentDate);
        setSwipeGroup([...res]);
      } else {
        const res = getSwipeGroup(swipeGroup, current);
        setSwipeGroup([...res]);
      }
    }
  };

  // 天点击事件
  const dayClick = (val) => {
    setActiveDayFn(val);
  };

  // 日历current变化事件
  const swiperChange = (val) => {
    const { current, source } = val.detail;
    if (source === "touch") {
      // touch为滑动，否则为点击直接改变index
      setSwipeIndex(current);

      const isLeftAction = dshUtils.isLeftSlide({
        arr: swapperArr,
        oldIndex: swipeIndex,
        newIndex: current,
      });
      // 更新当前激活的day，即下一周的这天也要高亮
      const swipeType = isLeftAction ? "next" : "prev";
      const afterDay = getActiveDay(swipeType);
      setActiveDayFn(afterDay);

      syncSwipeGroup(current, true); // 一旦变化就应该更新日历元素据，即swipeGroup
    } else {
      // 更新当前激活的day，即下一周的这天也要高亮
      const afterDay = getActiveDay(clickArrowType);
      setActiveDayFn(afterDay);
      syncSwipeGroup(current); // 一旦变化就应该更新日历元素据，即swipeGroup
    }
  };

  // 更新当前active Day（比如在点击箭头或者滑动的时候触发）
  const getActiveDay = (val) => {
    // 更新当前激活的day，即下一周的这天也要高亮
    const fnName = val === "prev" ? "subtract" : "add";
    const afterDay = dayjs(activeDay)[fnName](7, "day");
    return afterDay;
  };

  const renderMsgPoints = (date) => {
    return (
      <View className={"tips"}>
        {undoTask &&
          undoTask[date] &&
          undoTask[date].map((v) => {
            return (
              <View
                className={`day_point_item ${v.type === "工作" ? "c1" : "c2"}`}
              ></View>
            );
          })}
      </View>
    );
  };
  return (
    <View className="week_calendar">
      {/* title */}
      <View className="week_title">
        <Text>{dayjs(activeDay).format("YYYY年MM月")}</Text>
      </View>

      {/* 周 */}
      <View className="week_days_box">
        {weekDays &&
          weekDays.map((item, index) => {
            return (
              <View className="week_day" key={index}>
                {item}
              </View>
            );
          })}
      </View>

      {/* 天 */}
      <Swiper
        className="my_swiper_box"
        circular
        current={swipeIndex}
        onChange={swiperChange}
      >
        {swipeGroup &&
          swipeGroup.map((week, index) => {
            return (
              <SwiperItem className="my_swiper_item" key={index}>
                {week &&
                  week.map((day, index) => {
                    const classNames = [
                      "day",
                      dayjs(props.currentDate).isSame(day, "day")
                        ? " selected"
                        : "",
                      day === nowDate ? "nowDate" : "",
                    ];
                    return (
                      <View>
                        <View
                          key={index}
                          className={classNames}
                          onClick={() => {
                            dayClick(day);
                          }}
                        >
                          {dayjs(day).format("D")}
                        </View>
                        <View className={"day_point"}>
                          {renderMsgPoints(day)}
                        </View>
                      </View>
                    );
                  })}
              </SwiperItem>
            );
          })}
      </Swiper>
    </View>
  );
};
