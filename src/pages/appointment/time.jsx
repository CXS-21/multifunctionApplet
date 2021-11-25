import { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { connect } from "react-redux";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
import MyTimeSelect from "../../components/MyTimeSelect/index";
//INVALID:不可预约的时间段，EXCLUDED：排除的时间段，NOT_BOOKED：可以预约的时间段，BOOKED：已被预约的时间段
const timelist = [
  {
    startTime: "05:00:00",
    endTime: "06:00:00",
    availableTimeStatus: "INVALID",
  },
  {
    startTime: "06:00:00",
    endTime: "07:00:00",
    availableTimeStatus: "INVALID",
  },
  {
    startTime: "05:00:00",
    endTime: "06:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "06:00:00",
    endTime: "07:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "07:00:00",
    endTime: "08:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "08:00:00",
    endTime: "09:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "09:00:00",
    endTime: "10:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "10:00:00",
    endTime: "11:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "11:00:00",
    endTime: "12:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "12:00:00",
    endTime: "13:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  { startTime: "13:00:00", endTime: "14:00:00", availableTimeStatus: "BOOKED" },
  {
    startTime: "14:00:00",
    endTime: "15:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "15:00:00",
    endTime: "16:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "16:00:00",
    endTime: "17:00:00",
    availableTimeStatus: "EXCLUDED",
  },
  {
    startTime: "17:00:00",
    endTime: "18:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  { startTime: "18:00:00", endTime: "19:00:00", availableTimeStatus: "BOOKED" },
  {
    startTime: "19:00:00",
    endTime: "20:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "20:00:00",
    endTime: "21:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "21:00:00",
    endTime: "22:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
  {
    startTime: "22:00:00",
    endTime: "23:00:00",
    availableTimeStatus: "NOT_BOOKED",
  },
];
@connect(({ user }) => ({
  userInfo: user.userInfo,
}))
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
  handleCallback = (timeData) => {
    console.log("timeData: ", timeData);
    Taro.showModal({
      title: "选择的时间段",
      content: `${timeData.reservationTime}`,
      success: function(res) {
        if (res.confirm) {
          console.log("用户点击确定");
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  };
  render() {
    return (
      <View className="container">
        <View className="content">
          <MyTimeSelect
            timelist={timelist}
            handleCallback={(timeData) => {
              this.handleCallback(timeData);
            }}
          ></MyTimeSelect>
        </View>
      </View>
    );
  }
}
