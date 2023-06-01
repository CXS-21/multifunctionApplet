import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import MyWaterMark from "../../components/myWaterMark";
export default () => {
  return (
    <View>
      <View>
        <View>Hello WaterMark!</View>
        <View>Hello WaterMark!</View>
        <View>Hello WaterMark!</View>
        <View>Hello WaterMark!</View>
        <View>Hello WaterMark!</View>
        <View>Hello WaterMark!</View>
      </View>
      <MyWaterMark markText={"Watermark"} />
    </View>
  );
};
