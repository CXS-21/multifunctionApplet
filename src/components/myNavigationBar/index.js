import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      BarHeight: "",
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    const system = await Taro.getSystemInfoSync();
    // console.log("system: ", system);
    this.setState({
      BarHeight: system.statusBarHeight,
    });
    const { handleCallback } = this.props;
    let v = this.state;
    handleCallback(v);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View
        className="navBar"
        style={{ paddingTop: `${this.state.BarHeight}px` }}
      >
        <View className="navBarUser">
          <View className={"msg"}></View>
          <Image
            className={"pic"}
            mode={"aspectFit"}
            src={
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
          />
          {/* <View className="username">张三</View> */}
        </View>
        <View className="score">
          <Text className={"t1"}>0</Text>
          <Text className={"t2"}>积分</Text>
        </View>
        <View className="navNullBox"></View>
      </View>
    );
  }
}
