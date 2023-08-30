import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import MyPrivacyPop from "../../components/MyPrivacyPop";
import "./index.less";

export default () => {
  return (
    <View className="myPrivacyData_container">
      <MyPrivacyPop />
    </View>
  );
};
