import Taro from "@tarojs/taro";
import { Canvas } from "@tarojs/components";
import { useEffect } from "react";
export default (props) => {
  const { markText } = props;
  useEffect(() => {
    drawWatermark();
  }, []);
  const drawWatermark = () => {
    const ctx = Taro.createCanvasContext("watermarkCanvas");
    // 设置绘制文字的样式
    ctx.setFontSize(20);
    ctx.setFillStyle("rgba(0, 0, 0, 0.2)"); // 设置文字颜色和透明度
    // 获取屏幕宽度和高度
    const { windowWidth, windowHeight } = Taro.getSystemInfoSync();
    // 定义水印文本内容和间距
    const watermarkText = markText;
    const textPadding = 0;
    // 计算水印文本的宽度
    const textWidth = ctx.measureText(watermarkText).width;
    // 计算需要绘制的水印数量
    const horizontalCount = Math.ceil(windowWidth / (textWidth + textPadding));
    const verticalCount = Math.ceil(windowHeight / (textWidth + textPadding));
    // 循环绘制水印
    for (let i = 0; i < horizontalCount; i++) {
      for (let j = 0; j < verticalCount; j++) {
        // 计算当前水印的位置
        const x = i * (textWidth + textPadding) + textPadding / 2;
        const y = j * (textWidth + textPadding) + textPadding / 2;

        // 保存当前的绘图上下文状态
        ctx.save();
        // 移动原点到水印位置
        ctx.translate(x, y);
        // 设置倾斜角度
        const angle = 40; // 倾斜角度（单位：度）
        const radian = (Math.PI / 180) * angle; // 转换为弧度
        ctx.rotate(radian);

        // 绘制水印文字
        ctx.fillText(watermarkText, x, y);

        // 恢复绘图上下文状态
        ctx.restore();
      }
    }
    // 绘制完成并显示到Canvas上
    ctx.draw();
  };
  return (
    <Canvas
      canvasId="watermarkCanvas"
      id="watermarkCanvas"
      style="width: 100vw; height: 100vh;position: absolute; top: 0; left: 0; z-index: 999;"
    ></Canvas>
  );
};
