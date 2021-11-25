import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";
const timeRange = {
  "0": "00",
  "1": "01",
  "2": "02",
  "3": "03",
  "4": "04",
  "5": "05",
  "6": "06",
  "7": "07",
  "8": "08",
  "9": "09",
  "10": "10",
  "11": "11",
  "12": "12",
  "13": "13",
  "14": "14",
  "15": "15",
  "16": "16",
  "17": "17",
  "18": "18",
  "19": "19",
  "20": "20",
  "21": "21",
  "22": "22",
  "23": "23",
};
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { item } = this.props;
    return (
      <View className="scheduleBox">
        {item.availableTimes &&
          item.availableTimes.length > 0 &&
          item.availableTimes.map((v, i, arr) => {
            if (v.availableTimeStatus) {
              let origin = Number(arr[0].startTime.split(":")[0]);
              let start = Number(v && v.startTime && v.startTime.split(":")[0]);
              let end = Number(v && v.endTime && v.endTime.split(":")[0]);
              let duration = end - start;
              let lastIndex = arr.length - 1;
              let length = arr.length;
              return (
                <View
                  style={{
                    left: `${((start - origin) / length) * 100}%`,
                    width: `${(duration / length) * 100}% `,
                  }}
                  key={i}
                  className={"scheduleBoxTimeBox"}
                >
                  <View
                    className={`scheduleBoxTimeColor 
                            ${
                              v.availableTimeStatus !== "NOT_BOOKED"
                                ? "activity"
                                : ""
                            }
                            ${i === lastIndex ? "timeColorBorderR" : ""}
                            ${i === 0 ? "timeColorBorderL" : ""}
                            `}
                  ></View>
                  <View className={"scheduleBoxTimeText"}>
                    {i === lastIndex ? (
                      <>
                        <Text
                          style={{
                            transform: "translateX(-50%)",
                          }}
                        >
                          {timeRange[start]}
                        </Text>
                        <Text>{timeRange[end]}</Text>
                      </>
                    ) : (
                      <Text
                        style={{
                          transform: "translateX(-50%)",
                        }}
                      >
                        {timeRange[start]}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }
          })}
      </View>
    );
  }
}
