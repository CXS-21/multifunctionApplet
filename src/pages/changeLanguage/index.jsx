import { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import "./index.less";
import Language from "../../components/Language";
@connect(({ user }) => ({
  userInfo: user.userInfo,
}))
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      content: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {
    let content = Taro.getStorageSync("content");
    this.setState({
      content,
    });
    Taro.setNavigationBarTitle({
      title: content.title,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { content } = this.state;
    return (
      <View className="container">
        <View className="content">
          <Language></Language>
          <View className={"infos"}>
            <Text>{content.info}</Text>
          </View>
        </View>
      </View>
    );
  }
}
