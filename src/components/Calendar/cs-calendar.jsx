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
  const { undoTask } = props;
  // console.log("undoTask: ", undoTask);
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
      const swipeType = isLeftAction ? "next" : "prev";

      //   //   更新当前激活的day，即下一周的这天也要高亮
      //       const afterDay = getActiveDay(swipeType);
      //       setActiveDayFn(afterDay);

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

  // 箭头点击事件
  const arrowClick = (val) => {
    // 设置swiperIndex+1，即切换下一个swiperItem
    const nextSwiperIndex = getArrAdj(swipeIndex, val);
    setSwipeIndex(nextSwiperIndex);
    setClickArrowType(val);
  };
  const msgInfos = (date) => {
    return (
      <View className={"tips"}>
        {undoTask &&
          undoTask[date] &&
          undoTask[date].map((v) => {
            return (
              <View
                //隐藏会议模块
                className={`day-point-item ${v.type === "工作" ? "c1" : "c2"}`}
                // className={`day-point-item ${v.type === "工作" ? "c1" : ""}`}
              ></View>
            );
          })}
      </View>
    );
  };
  return (
    <View className="cs-calendar">
      {/* 头部title */}
      <View className="at-calendar__controller">
        {/* <View
          className="controller__arrow controller__arrow--left"
          onClick={() => {
            arrowClick("prev");
          }}
        /> */}
        <Text className="controller__info">
          {dayjs(activeDay).format("YYYY年MM月")}
        </Text>
        {/* <View
          className="controller__arrow controller__arrow--right"
          onClick={() => {
            arrowClick("next");
          }}
        /> */}
      </View>

      {/* 渲染周 */}
      <View className="week-days">
        {weekDays &&
          weekDays.map((item, index) => {
            return <View className="week-day">{item}</View>;
          })}
      </View>

      {/* 渲染天 */}
      <Swiper
        className="my-swiper"
        circular
        current={swipeIndex}
        onChange={swiperChange}
      >
        {swipeGroup &&
          swipeGroup.map((week, index) => {
            return (
              <SwiperItem className="my-swiper-item" key={index}>
                {week &&
                  week.map((day, index) => {
                    // const isCurrenDay = dayjs(activeDay).isSame(day, "day");
                    // const classNames = [
                    //   "day",
                    //   isCurrenDay ? "selected" : "",
                    //   day === nowDate ? "es" : "",
                    // ];
                    return (
                      <View>
                        <View
                          key={index}
                          // className={classNames}
                          className={`day${
                            dayjs(props.currentDate).isSame(day, "day")
                              ? " selected"
                              : ""
                          } ${day === nowDate ? "es" : ""}`}
                          onClick={() => {
                            dayClick(day);
                          }}
                          // onClick={() => {
                          //   dayClick(day);
                          // }}
                        >
                          {dayjs(day).format("D")}
                        </View>
                        <View className={"day-point"}>
                          {msgInfos(day)}
                          {/* {undoTask &&
                              undoTask.map((v, i) => {
                                console.log("v: ", v);

                                return (
                                  <View
                                    key={i}
                                    className={`day-point-item ${
                                      v.type === "工作" ? "c1" : ""
                                    }`}
                                  ></View>
                                );
                              })} */}
                          {/* {type === "政务" ? (
                              <View className={"day-point-item c1"}></View>
                            ) : null}
                            {type === "服务" ? (
                              <View className={"day-point-item c2"}></View>
                            ) : null}
                            {type === "提醒" ? (
                              <View className={"day-point-item c3"}></View>
                            ) : null} */}
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
