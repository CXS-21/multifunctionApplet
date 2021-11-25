import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import "./index.less";
import TimeScale from "../../components/TimeScale/index";
const list = [
  {
    appointmentCycle: "1,2,3,4,5,6,7",
    approval: false,
    availableEndTime: "23:00:00",
    availableStartTime: "10:00:00",
    availableTimes: [
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
        availableTimeStatus: "EXCLUDED",
      },
      {
        startTime: "13:00:00",
        endTime: "14:00:00",
        availableTimeStatus: "NOT_BOOKED",
      },
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
        availableTimeStatus: "NOT_BOOKED",
      },
      {
        startTime: "17:00:00",
        endTime: "18:00:00",
        availableTimeStatus: "NOT_BOOKED",
      },
      {
        startTime: "18:00:00",
        endTime: "19:00:00",
        availableTimeStatus: "NOT_BOOKED",
      },
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
    ],
    createdByDate: "2021-11-15 18:56:53",
    createdByName: "蒋春红",
    excludeEndTime: "13:00:00",
    excludeStartTime: "12:00:00",
    facilityCapacityMaxNum: 12,
    facilityInfos: "电视",
    facilityLocation: "居委会",
    facilityStatus: 0, //可预约0，不可预约1
    id: 1069,
    resDesc: "123",
    resImages:
      "https://c.stgame.cn/ww2/upload/office/5c05e28cc8ab5c59cb878b0897105545&WechatIMG917.jpeg",
    resName: "社区活动室",
    resType: 2,
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

  handleAppointment = () => {
    Taro.navigateTo({
      url: "/pages/appointment/time",
    });
  };
  render() {
    return (
      <View className="equipmentReservation-container">
        <View className={"equipmentReservation-content"}>
          <View className={"body"}>
            <View className="title">
              <View className={"titleInfo"}>设施列表</View>
            </View>
            {list &&
              list.length > 0 &&
              list.map((item, index) => {
                if (item.facilityStatus === 1) {
                  return null;
                } else {
                  return (
                    <View className={"item"} key={item.id}>
                      <View className={"item-con"}>
                        <View className={"left"}>
                          <View className={"pic"}>
                            <View>
                              <Image
                                className={"image"}
                                mode={"aspectFill"}
                                src={item.resImages}
                              />
                            </View>
                          </View>
                          <View className={"text"}>
                            <View className={"text1"}>{item.resName}</View>
                            <View className={"text2"}>
                              <View>{`容量: ${item.facilityCapacityMaxNum} 人`}</View>
                            </View>
                          </View>
                        </View>
                        <View className={"right"}>
                          <View
                            className={`Text ${
                              item.facilityStatus === 0 ? "text-top" : "unOk"
                            }`}
                            onClick={() => {
                              this.handleAppointment();
                            }}
                          >
                            预约
                          </View>
                        </View>
                      </View>
                      <TimeScale item={item}></TimeScale>
                    </View>
                  );
                }
              })}
          </View>
        </View>
      </View>
    );
  }
}
