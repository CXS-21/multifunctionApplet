import { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import "./index.less";
import MyNavigationBar from "../../components/myNavigationBar/index";
@connect(({ user }) => ({
  userInfo: user.userInfo,
}))
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      BarHeight: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  handleNavBar = (v) => {
    const { BarHeight } = v;
    this.setState({ BarHeight });
  };
  render() {
    return (
      <View className="container">
        <View className="content">
          <MyNavigationBar handleCallback={this.handleNavBar}></MyNavigationBar>
          <View
            className={"infos"}
            style={{
              marginTop: `${this.state.BarHeight + 60}px`,
            }}
          >
            <Text>hello miniapp</Text>
          </View>
        </View>
      </View>
    );
  }
}
