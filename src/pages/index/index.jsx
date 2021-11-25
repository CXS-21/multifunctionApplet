import { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
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
          info: "tab2",
          url: "",
        },
        {
          id: 3,
          info: "tab3",
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
        </View>
      </View>
    );
  }
}
