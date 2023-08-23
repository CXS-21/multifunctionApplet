import { View } from "@tarojs/components";
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
