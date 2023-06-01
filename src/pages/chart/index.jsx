// import { useState, useEffect } from "react";
// import Taro from "@tarojs/taro";
// import { View, Text, Button, Image } from "@tarojs/components";
// import UCharts from "../../utils/u-charts";
// import "./index.less";
// var UChartsInstance = {};
// let ctx = Taro.createCanvasContext("RimlrZoQjHnUgCBNatZjZiBTwMLGLAbu");

// export default (props) => {
//   const [current, setCurrent] = useState("");
//   const [cWidth, setCWidth] = useState(750);
//   const [cHeight, setCHeight] = useState(500);
//   const [pixelRatio, setPixelRatio] = useState(1);

//   useEffect(() => {
//     const sysInfo = Taro.getSystemInfoSync();
//     let pixelRatio = 1;
//     //这里的第一个 750 对应 css .charts 的 width
//     let cWidth = (750 / 750) * sysInfo.windowWidth;
//     //这里的 500 对应 css .charts 的 height
//     let cHeight = (500 / 750) * sysInfo.windowWidth;
//     //注意：[支付宝小程序]如果需要在高 DPR（devicePixelRatio）下取得更细腻的显示，需要先将 canvas 用属性设置放大，用样式缩小，例如：
//     // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY){
//     //   pixelRatio = sysInfo.pixelRatio;
//     //   cWidth = cWidth * pixelRatio;
//     //   cHeight = cHeight * pixelRatio;
//     // }
//     setCWidth(cWidth);
//     setCHeight(cHeight);
//     setPixelRatio(pixelRatio);
//     getServerData();
//   }, []);

//   useEffect(() => {
//     getServerData();
//   }, [cWidth, cHeight, pixelRatio]);

//   const getServerData = () => {
//     //模拟从服务器获取数据时的延时
//     // setTimeout(() => {
//     //   //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
//     //   let res = {
//     //     series: [
//     //       {
//     //         data: [
//     //           { name: "一班", value: 50 },
//     //           { name: "二班", value: 30 },
//     //           { name: "三班", value: 20 },
//     //           { name: "四班", value: 18 },
//     //           { name: "五班", value: 8 },
//     //         ],
//     //       },
//     //     ],
//     //   };

//     // }, 500);
//     drawCharts(
//       "RimlrZoQjHnUgCBNatZjZiBTwMLGLAbu",
//       (series = [
//         {
//           data: [
//             { name: "一班", value: 50 },
//             { name: "二班", value: 30 },
//             { name: "三班", value: 20 },
//             { name: "四班", value: 18 },
//             { name: "五班", value: 8 },
//           ],
//         },
//       ])
//     );
//   };
//   const drawCharts = (id, data) => {
//     UChartsInstance[id] = new UCharts({
//       type: "pie",
//       context: ctx,
//       width: cWidth,
//       height: cHeight,
//       series: data.series,
//       pixelRatio: pixelRatio,
//       animation: true,
//       background: "#FFFFFF",
//       color: [
//         "#1890FF",
//         "#91CB74",
//         "#FAC858",
//         "#EE6666",
//         "#73C0DE",
//         "#3CA272",
//         "#FC8452",
//         "#9A60B4",
//         "#ea7ccc",
//       ],
//       padding: [5, 5, 5, 5],
//       enableScroll: false,
//       extra: {
//         pie: {
//           activeOpacity: 0.5,
//           activeRadius: 10,
//           offsetAngle: 0,
//           labelWidth: 15,
//           border: false,
//           borderWidth: 3,
//           borderColor: "#FFFFFF",
//         },
//       },
//     });
//   };

//   const tap = (e) => {
//     UChartsInstance[e.target.id].touchLegend(e);
//     UChartsInstance[e.target.id].showToolTip(e);
//   };
//   return (
//     <View className="container">
//       <View className="content">
//         <UCharts
//           // {...canvasProps}
//           canvas-id="RimlrZoQjHnUgCBNatZjZiBTwMLGLAbu"
//           id="RimlrZoQjHnUgCBNatZjZiBTwMLGLAbu"
//           class="charts"
//           onTouchEnd={tap}
//         />
//       </View>
//     </View>
//   );
// };

import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Canvas, Button } from "@tarojs/components";
import uCharts from "../../utils/u-charts";
import "./index.less";
var uChartsInstance = {};
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cWidth: 750,
      cHeight: 500,
      pixelRatio: 1,
    };
  }

  componentDidMount() {
    const sysInfo = Taro.getSystemInfoSync();
    let pixelRatio = 1;
    //这里的第一个 750 对应 css .charts 的 width
    let cWidth = (750 / 750) * sysInfo.windowWidth;
    //这里的 500 对应 css .charts 的 height
    let cHeight = (500 / 750) * sysInfo.windowWidth;
    //注意：[支付宝小程序]如果需要在高 DPR（devicePixelRatio）下取得更细腻的显示，需要先将 canvas 用属性设置放大，用样式缩小，例如：
    // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY){
    //   pixelRatio = sysInfo.pixelRatio;
    //   cWidth = cWidth * pixelRatio;
    //   cHeight = cHeight * pixelRatio;
    // }
    this.setState({ cWidth, cHeight, pixelRatio }, () => this.getServerData());
  }

  getServerData = () => {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
        series: [
          {
            data: [
              { name: "一班", value: 50 },
              { name: "二班", value: 30 },
              // { name: "三班", value: 20 },
              // { name: "四班", value: 18 },
              // { name: "五班", value: 8 },
            ],
          },
        ],
      };
      this.drawCharts("RimlrZoQjHnUgCBNatZjZiBTwMLGLAbu", res);
    }, 500);
  };

  drawCharts = (id, data) => {
    const { cWidth, cHeight, pixelRatio } = this.state;
    let ctx = Taro.createCanvasContext(id);
    uChartsInstance[id] = new uCharts({
      type: "pie",
      context: ctx,
      width: cWidth,
      height: cHeight,
      series: data.series,
      pixelRatio: pixelRatio,
      fontSize: 16,
      animation: true,
      background: "#FFFFFF",
      color: [
        "#1890FF",
        "#91CB74",
        "#FAC858",
        "#EE6666",
        "#73C0DE",
        "#3CA272",
        "#FC8452",
        "#9A60B4",
        "#ea7ccc",
      ],
      padding: [5, 5, 5, 5],
      enableScroll: false,
      extra: {
        pie: {
          activeOpacity: 0.5,
          activeRadius: 10,
          offsetAngle: 0,
          labelWidth: 15,
          border: false,
          borderWidth: 3,
          borderColor: "#FFFFFF",
        },
      },
    });
  };

  tap = (e) => {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
  };

  render() {
    //注意：[支付宝小程序]如果需要在高 DPR（devicePixelRatio）下取得更细腻的显示，需要先将 canvas 用属性设置放大，用样式缩小，例如：
    // const { cWidth, cHeight, pixelRatio } = this.state;
    // let canvasProps = {};
    // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY){
    //   canvasProps = { width: cWidth, height: cHeight };
    // }
    return (
      <View>
        <Canvas
          // {...canvasProps}
          canvas-id="RimlrZoQjHnUgCBNatZjZiBTwMLGLAbu"
          id="RimlrZoQjHnUgCBNatZjZiBTwMLGLAbu"
          class="charts"
          onTouchEnd={this.tap}
        />
        <Button
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/chart/pie",
            })
          }
        >
          饼图
        </Button>
      </View>
    );
  }
}
