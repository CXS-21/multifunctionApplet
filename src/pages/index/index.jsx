import { Component } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import "./index.less";
@connect(({ user }) => ({
  userInfo: user.userInfo,
}))
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      list: [
        {
          id: 1,
          info: "资源预约",
          url: "/pages/appointment/index",
        },
        {
          id: 2,
          info: "一键切换中英文",
          url: "/pages/changeLanguage/index",
        },
        {
          id: 3,
          info: "自定义顶部导航栏",
          url: "/pages/navigationBar/index",
        },
        {
          id: 4,
          info: "周历",
          url: "/pages/week/index",
        },
        {
          id: 5,
          info: "左滑删除",
          url: "/pages/moveLeftDel/index",
        },
        {
          id: 6,
          info: "列表局部加载",
          url: "",
        },
        {
          id: 7,
          info: "视频播放",
          url: "/pages/video/index",
        },
        {
          id: 8,
          info: "图片压缩",
          url: "/pages/img/index",
        },
        {
          id: 9,
          info: "操作菜单",
          url: "/pages/menu/index",
        },
        {
          id: 10,
          info: "交互回调效果",
          url: "/pages/interaction/index",
        },
        {
          id: 11,
          info: "图表集",
          url: "/pages/chart/index",
        },
        {
          id: 12,
          info: "------",
          url: "",
        },
        {
          id: 13,
          info: "------",
          url: "",
        },
        {
          id: 14,
          info: "------",
          url: "",
        },
        {
          id: 15,
          info: "------",
          url: "",
        },
        {
          id: 16,
          info: "------",
          url: "",
        },
      ],
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  handleNav = (item) => {
    Taro.navigateTo({
      url: item.url,
    });
  };
  render() {
    const { list } = this.state;
    return (
      <View className="container">
        <View className="content">
          {list &&
            list.length > 0 &&
            list.map((item) => {
              return (
                <Button
                  key={item.id}
                  className={"item"}
                  onClick={() => {
                    this.handleNav(item);
                  }}
                >
                  <Text>{item.info}</Text>
                </Button>
              );
            })}
          <View
            className="back"
            onClick={() => {
              Taro.pageScrollTo({
                scrollTop: 0,
                duration: 200,
              });
            }}
          >
            <Image src={require("../../assets/back.png")} className={"pic"} />
          </View>
        </View>
      </View>
    );
  }
}
