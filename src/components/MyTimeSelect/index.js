import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      firstSelect: "",
      nextSelect: "",
      reservationTime: "",
      startTime: "",
      endTime: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  isBetween = (index) => {
    const { firstSelect, nextSelect } = this.state;
    if (firstSelect === "") {
      return false;
    }
    if (nextSelect === "") {
      return index === firstSelect;
    }
    if (nextSelect !== "" && firstSelect !== "") {
      if (nextSelect > firstSelect) {
        return index >= firstSelect && index <= nextSelect;
      }
      return index >= nextSelect && index <= firstSelect;
    }
  };
  judgeIndexValid = (start, end) => {
    let { timelist } = this.props;
    let newArr = timelist.slice(start, end + 1);
    let flag = true;
    for (let v of newArr) {
      if (v.availableTimeStatus === "BOOKED") {
        Taro.showToast({
          title: "所选时间段包含已预约时间",
          icon: "none",
        });
        flag = false;
        break;
      }
      if (v.availableTimeStatus === "EXCLUDED") {
        Taro.showToast({
          title: "所选时间段包含无法预约时间",
          icon: "none",
        });
        flag = false;
        break;
      }
    }
    return flag;
  };
  handleSelectTime = (index) => {
    console.log("index: ", index);
    const { firstSelect, nextSelect } = this.state;
    const { timelist } = this.props;
    if (timelist && timelist.length > 0) {
      if (timelist[index].availableTimeStatus == "BOOKED") {
        Taro.showToast({
          title: "当前时间已被预订",
          icon: "none",
        });
        return;
      }
      if (timelist[index].availableTimeStatus == "EXCLUDED") {
        Taro.showToast({
          title: "当前时间无法预约",
          icon: "none",
        });
        return;
      }
      if (firstSelect === index) {
        this.setState({
          firstSelect: "", //取消
        });
        return;
      }
      if (nextSelect === index) {
        this.setState({
          nextSelect: "", //取消
        });
        return;
      }
      if (firstSelect === "") {
        this.setState({
          firstSelect: index, //首次选择
          nextSelect: "", //当取消首次选择后，再次点击首次索引时其余选择置空。
        });
        return;
      }
      if (firstSelect !== "" && nextSelect !== index) {
        let start, end;
        if (index > firstSelect) {
          //正选
          start = firstSelect;
          end = index;
        } else if (index < firstSelect) {
          //反选
          start = index;
          end = firstSelect;
        }
        if (this.judgeIndexValid(start, end)) {
          this.setState({
            nextSelect: index,
          });
        }
        return;
      }
    }
  };
  handleTimeConfirm = () => {
    const { firstSelect, nextSelect } = this.state;
    const { timelist } = this.props;
    if (firstSelect === "") {
      Taro.showToast({
        title: "请选择预约时间",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    // let startTime = {
    //     hour: 0,
    //     minute: 0,
    //     second: 0,
    //     nano: 0,
    //   },
    //   endTime = {
    //     hour: 0,
    //     minute: 0,
    //     second: 0,
    //     nano: 0,
    //   }
    if (nextSelect === "") {
      // startTime.hour = timelist[firstSelect].startTime.split(':')[0]
      // endTime.hour = timelist[firstSelect].endTime.split(':')[0]
      this.setState(
        {
          startTime: timelist[firstSelect].startTime,
          endTime: timelist[firstSelect].endTime,
          reservationTime: `${timelist[firstSelect].startTime.substr(
            0,
            5
          )}-${timelist[firstSelect].endTime.substr(0, 5)}`,
        },
        () => {
          this.handleTimeData();
        }
      );
    } else {
      if (firstSelect < nextSelect) {
        this.setState(
          {
            startTime: timelist[firstSelect].startTime,
            endTime: timelist[nextSelect].endTime,
            reservationTime: `${timelist[firstSelect].startTime.substr(
              0,
              5
            )}-${timelist[nextSelect].endTime.substr(0, 5)}`,
          },
          () => {
            this.handleTimeData();
          }
        );
      } else {
        this.setState(
          {
            startTime: timelist[nextSelect].startTime,
            endTime: timelist[firstSelect].endTime,
            reservationTime: `${timelist[nextSelect].startTime.substr(
              0,
              5
            )}-${timelist[firstSelect].endTime.substr(0, 5)}`,
          },
          () => {
            this.handleTimeData();
          }
        );
      }
    }
  };
  handleTimeData = () => {
    const { reservationTime, startTime, endTime } = this.state;
    const { handleCallback } = this.props;
    let timeData = {
      reservationTime: reservationTime,
      startTime: startTime,
      endTime: endTime,
    };
    handleCallback(timeData);
  };
  render() {
    const { timelist } = this.props;
    return (
      <View className={"myTimeSelectContainer"}>
        <View className={"myTimeSelectContent"}>
          <View className={"myTimeSelectContentTitle"}>
            <Text>预约时间段</Text>
            <Text>(多选)</Text>
          </View>
          <View className={"myTimeSelectContentCon"}>
            {timelist &&
              timelist.length > 0 &&
              timelist.map((item, index) => {
                if (item.availableTimeStatus === "INVALID") {
                  return null;
                }
                let cls = `myTimeSelectContentConItem ${
                  item.availableTimeStatus === "BOOKED" ||
                  item.availableTimeStatus === "EXCLUDED"
                    ? "ban"
                    : ""
                }`;
                if (this.isBetween(index)) {
                  cls += " current";
                }
                return (
                  <View
                    className={cls}
                    key={index}
                    onClick={() => {
                      this.handleSelectTime(index);
                    }}
                  >
                    {item.startTime.substr(0, 5)}-{item.endTime.substr(0, 5)}
                  </View>
                );
              })}
          </View>
          {/* 非定位 */}
          {/* <View className={'submit'}>
            <View className={'submitCon'}>确认提交</View>
          </View> */}
        </View>
        {/* 定位 */}
        <View className={"submit"}>
          <View
            className={"submitCon"}
            onClick={() => {
              this.handleTimeConfirm();
            }}
          >
            确认选择
          </View>
        </View>
      </View>
    );
  }
}
