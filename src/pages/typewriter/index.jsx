import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import MyTypewriter from "../../components/MyTypewriter";
import "./index.less";

const outputTextEnglish = `In the vibrant underwater city of Coralville, Sharky the tooth-brushing shark was a beloved superhero.
With a sparkling smile and a gleaming toothbrush, Sharky made sure every sea creature had clean and healthy teeth.
Each morning, Sharky would swim through the coral streets, stopping at schools to teach young fish the importance of oral hygiene.
When a villainous group of cavity-causing crabs threatened the city, Sharky's powerful brushing skills saved the day, leaving their teeth sparkling and plaque-free.
From that day on, every fish in Coralville brushed their teeth with enthusiasm, inspired by their aquatic superhero, Sharky.`;

const outputTextChinese = `通过对大量营销数据的分析和挖掘，为营销策略制定提供有力支持，实现精准营销；结合智能语音和语言理解技术，提高客户服务效率，提升用户体验；利用内容生成和语言理解能力，实现智能营销文案创作和创意生成，提升品牌传播效果，助力营销领域实现更高效、智能的运营管理。`;
export default () => {
  return (
    <View className="myTypewriter_container">
      <View>打字机效果：</View>
      <MyTypewriter originalText={outputTextEnglish} />
      <MyTypewriter originalText={outputTextChinese} />
    </View>
  );
};
