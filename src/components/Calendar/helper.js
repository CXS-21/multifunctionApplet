import dayjs from "dayjs";
import dshUtils from "dsh-utils";

export const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

export const swapperArr = [0, 1, 2];

// 获取本周一周对应的日历(computAction为当前前几周或者后几周，可不传)
export const getWeekCalendar = (curenTime = new Date(), computAction = 0) => {
  const currentTime = dayjs(curenTime)
    .add(computAction, "week")
    .format("YYYY-MM-DD");
  const weekStartDay = dayjs(currentTime)
    .startOf("week")
    // .add(1, "d")
    .format("YYYY-MM-DD"); // 获取本周第一天
  const result = [];
  for (let i = 0; i < 7; i++) {
    const temp = dayjs(weekStartDay)
      .add(i, "days")
      .format("YYYY-MM-DD");
    result.push(temp);
  }
  // console.log("result", result);
  return result;
};

// 获取一组二维数组数据([[],[],[]]共三个元素给swaper使用)
export const getSwipeGroup = (swipeGroup, index, currentDate) => {
  const prevIndex = dshUtils.getArrAdj({
    arr: swapperArr,
    currentIndex: index,
    type: "prev",
  });
  const nextIndex = dshUtils.getArrAdj({
    arr: swapperArr,
    currentIndex: index,
    type: "next",
  });
  swipeGroup[prevIndex] = getWeekCalendar(
    currentDate || swipeGroup[index][0],
    -1
  ); // 有时间按照时间给数组，没时间取出当前传入的第一个
  swipeGroup[index] = getWeekCalendar(currentDate || swipeGroup[index][0], 0);
  swipeGroup[nextIndex] = getWeekCalendar(
    currentDate || swipeGroup[index][0],
    1
  );
  return swipeGroup;
};

// 环状数组，current为当前元素。type是看想要下一个还是上一个
export const getArrAdj = (currentIndex, type) => {
  return dshUtils.getArrAdj({ arr: swapperArr, currentIndex, type });
};
