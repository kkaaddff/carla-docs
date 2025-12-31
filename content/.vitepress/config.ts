import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// CARLA GitHub 仓库基础 URL
const CARLA_GITHUB_BASE =
  "https://github.com/carla-simulator/carla/blob/master";

export default withMermaid(
  defineConfig({
    // GitHub Pages 基础路径配置
    // 如果仓库名称是 username.github.io，base 应该是 "/"
    // 如果仓库名称是其他名称（如 carla-docs），base 应该是 "/仓库名称/"
    // 例如：base: "/carla-docs/",
    base: "/",

    title: "CARLA 文档",
    description: "CARLA 自动驾驶仿真平台技术文档",
    lang: "zh-CN",

    themeConfig: {
      logo: "/logo.svg",

      nav: [
        { text: "首页", link: "/" },
        { text: "快速入门", link: "/教程与示例/快速入门" },
        { text: "核心概念", link: "/核心概念/核心概念" },
        { text: "API 参考", link: "/API参考/API参考" },
        { text: "高级功能", link: "/高级功能/高级功能" },
      ],

      sidebar: {
        "/": [
          {
            text: "开始",
            items: [
              { text: "项目概述", link: "/项目概述" },
              { text: "安装与部署", link: "/安装与部署" },
              { text: "故障排除", link: "/故障排除" },
            ],
          },
          {
            text: "教程与示例",
            collapsed: false,
            items: [
              { text: "教程概览", link: "/教程与示例/教程与示例" },
              { text: "快速入门", link: "/教程与示例/快速入门" },
              {
                text: "交通场景生成与管理",
                collapsed: true,
                items: [
                  {
                    text: "概览",
                    link: "/教程与示例/交通场景生成与管理/交通场景生成与管理",
                  },
                  {
                    text: "交通生成",
                    link: "/教程与示例/交通场景生成与管理/交通生成",
                  },
                  {
                    text: "车辆高级控制",
                    link: "/教程与示例/交通场景生成与管理/车辆高级控制",
                  },
                  {
                    text: "交通管理器",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/教程与示例/交通场景生成与管理/交通管理器/交通管理器",
                      },
                      {
                        text: "交通管理器模式",
                        link: "/教程与示例/交通场景生成与管理/交通管理器/交通管理器模式",
                      },
                      {
                        text: "参数配置",
                        link: "/教程与示例/交通场景生成与管理/交通管理器/参数配置",
                      },
                      {
                        text: "核心功能",
                        link: "/教程与示例/交通场景生成与管理/交通管理器/核心功能",
                      },
                    ],
                  },
                ],
              },
              {
                text: "传感器集成与数据处理",
                collapsed: true,
                items: [
                  {
                    text: "概览",
                    link: "/教程与示例/传感器集成与数据处理/传感器集成与数据处理",
                  },
                  {
                    text: "传感器数据同步",
                    link: "/教程与示例/传感器集成与数据处理/传感器数据同步",
                  },
                  {
                    text: "摄像头传感器",
                    link: "/教程与示例/传感器集成与数据处理/摄像头传感器",
                  },
                  {
                    text: "激光雷达传感器",
                    link: "/教程与示例/传感器集成与数据处理/激光雷达传感器",
                  },
                  {
                    text: "雷达传感器",
                    link: "/教程与示例/传感器集成与数据处理/雷达传感器",
                  },
                  {
                    text: "IMU与GNSS传感器",
                    link: "/教程与示例/传感器集成与数据处理/IMU与GNSS传感器",
                  },
                ],
              },
              {
                text: "高级场景与自定义功能",
                collapsed: true,
                items: [
                  {
                    text: "概览",
                    link: "/教程与示例/高级场景与自定义功能/高级场景与自定义功能",
                  },
                  {
                    text: "使用Scenic定义复杂驾驶场景",
                    link: "/教程与示例/高级场景与自定义功能/使用Scenic定义复杂驾驶场景",
                  },
                  {
                    text: "创建与使用语义标签",
                    link: "/教程与示例/高级场景与自定义功能/创建与使用语义标签",
                  },
                  {
                    text: "相机路径插值与动态视角控制",
                    link: "/教程与示例/高级场景与自定义功能/相机路径插值与动态视角控制",
                  },
                  {
                    text: "自定义车辆动力学与悬挂系统",
                    link: "/教程与示例/高级场景与自定义功能/自定义车辆动力学与悬挂系统",
                  },
                  {
                    text: "集成第三方服务（以Inverted AI为例）",
                    link: "/教程与示例/高级场景与自定义功能/集成第三方服务（以Inverted AI为例）",
                  },
                ],
              },
            ],
          },
          {
            text: "核心概念",
            collapsed: false,
            items: [
              { text: "概览", link: "/核心概念/核心概念" },
              {
                text: "世界管理",
                collapsed: true,
                items: [
                  { text: "概览", link: "/核心概念/世界管理/世界管理" },
                  { text: "仿真控制", link: "/核心概念/世界管理/仿真控制" },
                  { text: "天气与光照", link: "/核心概念/世界管理/天气与光照" },
                  {
                    text: "环境对象管理",
                    link: "/核心概念/世界管理/环境对象管理",
                  },
                ],
              },
              {
                text: "地图系统",
                collapsed: true,
                items: [
                  { text: "概览", link: "/核心概念/地图系统/地图系统" },
                  {
                    text: "OpenDRIVE集成",
                    link: "/核心概念/地图系统/OpenDRIVE集成",
                  },
                  { text: "路点导航", link: "/核心概念/地图系统/路点导航" },
                  { text: "道路拓扑", link: "/核心概念/地图系统/道路拓扑" },
                ],
              },
              {
                text: "参与者管理",
                collapsed: true,
                items: [
                  { text: "概览", link: "/核心概念/参与者管理/参与者管理" },
                  {
                    text: "静态物体管理",
                    link: "/核心概念/参与者管理/静态物体管理",
                  },
                  {
                    text: "车辆控制",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/参与者管理/车辆控制/车辆控制",
                      },
                      {
                        text: "基础车辆操作",
                        link: "/核心概念/参与者管理/车辆控制/基础车辆操作",
                      },
                      {
                        text: "车辆动力学配置",
                        link: "/核心概念/参与者管理/车辆控制/车辆动力学配置",
                      },
                      {
                        text: "车辆灯光与部件控制",
                        link: "/核心概念/参与者管理/车辆控制/车辆灯光与部件控制",
                      },
                    ],
                  },
                  {
                    text: "行人模拟",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/参与者管理/行人模拟/行人模拟",
                      },
                      {
                        text: "行人基础控制",
                        link: "/核心概念/参与者管理/行人模拟/行人基础控制",
                      },
                      {
                        text: "行人动画与骨架控制",
                        link: "/核心概念/参与者管理/行人模拟/行人动画与骨架控制",
                      },
                      {
                        text: "行人行为管理",
                        link: "/核心概念/参与者管理/行人模拟/行人行为管理",
                      },
                    ],
                  },
                ],
              },
              {
                text: "传感器系统",
                collapsed: true,
                items: [
                  { text: "概览", link: "/核心概念/传感器系统/传感器系统" },
                  {
                    text: "雷达传感器",
                    link: "/核心概念/传感器系统/雷达传感器",
                  },
                  {
                    text: "摄像头传感器",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/传感器系统/摄像头传感器/摄像头传感器",
                      },
                      {
                        text: "RGB摄像头",
                        link: "/核心概念/传感器系统/摄像头传感器/RGB摄像头",
                      },
                      {
                        text: "深度与语义分割摄像头",
                        link: "/核心概念/传感器系统/摄像头传感器/深度与语义分割摄像头",
                      },
                      {
                        text: "后期处理与特殊效果",
                        link: "/核心概念/传感器系统/摄像头传感器/后期处理与特殊效果",
                      },
                    ],
                  },
                  {
                    text: "激光雷达传感器",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/传感器系统/激光雷达传感器/激光雷达传感器",
                      },
                      {
                        text: "基础激光雷达",
                        link: "/核心概念/传感器系统/激光雷达传感器/基础激光雷达",
                      },
                      {
                        text: "语义激光雷达",
                        link: "/核心概念/传感器系统/激光雷达传感器/语义激光雷达",
                      },
                      {
                        text: "性能与优化",
                        link: "/核心概念/传感器系统/激光雷达传感器/性能与优化",
                      },
                    ],
                  },
                  {
                    text: "IMU与GNSS传感器",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/传感器系统/IMU与GNSS传感器/IMU与GNSS传感器",
                      },
                      {
                        text: "IMU传感器",
                        link: "/核心概念/传感器系统/IMU与GNSS传感器/IMU传感器",
                      },
                      {
                        text: "GNSS传感器",
                        link: "/核心概念/传感器系统/IMU与GNSS传感器/GNSS传感器",
                      },
                    ],
                  },
                  {
                    text: "其他传感器",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/传感器系统/其他传感器/其他传感器",
                      },
                      {
                        text: "碰撞传感器",
                        link: "/核心概念/传感器系统/其他传感器/碰撞传感器",
                      },
                      {
                        text: "车道入侵传感器",
                        link: "/核心概念/传感器系统/其他传感器/车道入侵传感器",
                      },
                      {
                        text: "障碍物检测传感器",
                        link: "/核心概念/传感器系统/其他传感器/障碍物检测传感器",
                      },
                    ],
                  },
                ],
              },
              {
                text: "交通管理",
                collapsed: true,
                items: [
                  { text: "概览", link: "/核心概念/交通管理/交通管理" },
                  {
                    text: "行为参数配置",
                    link: "/核心概念/交通管理/行为参数配置",
                  },
                  {
                    text: "交通信号灯协调",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/交通管理/交通信号灯协调/交通信号灯协调",
                      },
                      {
                        text: "信号灯状态管理",
                        link: "/核心概念/交通管理/交通信号灯协调/信号灯状态管理",
                      },
                      {
                        text: "信号灯组协调",
                        link: "/核心概念/交通管理/交通信号灯协调/信号灯组协调",
                      },
                      {
                        text: "控制模式配置",
                        link: "/核心概念/交通管理/交通信号灯协调/控制模式配置",
                      },
                    ],
                  },
                  {
                    text: "交通车辆控制",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/核心概念/交通管理/交通车辆控制/交通车辆控制",
                      },
                      {
                        text: "车辆状态管理",
                        link: "/核心概念/交通管理/交通车辆控制/车辆状态管理",
                      },
                      {
                        text: "路径规划与导航",
                        link: "/核心概念/交通管理/交通车辆控制/路径规划与导航",
                      },
                      {
                        text: "行为决策逻辑",
                        link: "/核心概念/交通管理/交通车辆控制/行为决策逻辑",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            text: "API 参考",
            collapsed: false,
            items: [
              { text: "概览", link: "/API参考/API参考" },
              {
                text: "Python API",
                collapsed: true,
                items: [
                  { text: "概览", link: "/API参考/Python API/Python API" },
                  {
                    text: "客户端连接",
                    link: "/API参考/Python API/客户端连接",
                  },
                  { text: "蓝图系统", link: "/API参考/Python API/蓝图系统" },
                  {
                    text: "世界管理",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/API参考/Python API/世界管理/世界管理",
                      },
                      {
                        text: "世界同步",
                        link: "/API参考/Python API/世界管理/世界同步",
                      },
                      {
                        text: "地图交互",
                        link: "/API参考/Python API/世界管理/地图交互",
                      },
                      {
                        text: "实体生成",
                        link: "/API参考/Python API/世界管理/实体生成",
                      },
                      {
                        text: "观察者控制",
                        link: "/API参考/Python API/世界管理/观察者控制",
                      },
                    ],
                  },
                  {
                    text: "角色控制",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/API参考/Python API/角色控制/角色控制",
                      },
                      {
                        text: "通用角色控制",
                        link: "/API参考/Python API/角色控制/通用角色控制",
                      },
                    ],
                  },
                  {
                    text: "传感器接口",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/API参考/Python API/传感器接口/传感器接口",
                      },
                      {
                        text: "传感器管理",
                        link: "/API参考/Python API/传感器接口/传感器管理",
                      },
                      {
                        text: "传感器数据处理",
                        link: "/API参考/Python API/传感器接口/传感器数据处理",
                      },
                      {
                        text: "传感器同步机制",
                        link: "/API参考/Python API/传感器接口/传感器同步机制",
                      },
                    ],
                  },
                ],
              },
              {
                text: "C++ API",
                collapsed: true,
                items: [
                  { text: "概览", link: "/API参考/C++ API/C++ API" },
                  { text: "C++ 客户端", link: "/API参考/C++ API/C++ 客户端" },
                  { text: "车辆控制", link: "/API参考/C++ API/车辆控制" },
                  {
                    text: "世界管理",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/API参考/C++ API/世界管理/世界管理",
                      },
                      {
                        text: "世界状态管理",
                        link: "/API参考/C++ API/世界管理/世界状态管理",
                      },
                      {
                        text: "地图系统",
                        link: "/API参考/C++ API/世界管理/地图系统",
                      },
                      {
                        text: "调试与可视化",
                        link: "/API参考/C++ API/世界管理/调试与可视化",
                      },
                    ],
                  },
                  {
                    text: "角色系统",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/API参考/C++ API/角色系统/角色系统",
                      },
                      {
                        text: "角色基础",
                        link: "/API参考/C++ API/角色系统/角色基础",
                      },
                      {
                        text: "蓝图系统",
                        link: "/API参考/C++ API/角色系统/蓝图系统",
                      },
                      {
                        text: "属性管理",
                        link: "/API参考/C++ API/角色系统/属性管理",
                      },
                    ],
                  },
                  {
                    text: "传感器系统",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/API参考/C++ API/传感器系统/传感器系统",
                      },
                      {
                        text: "传感器基础",
                        link: "/API参考/C++ API/传感器系统/传感器基础",
                      },
                      {
                        text: "传感器类型",
                        link: "/API参考/C++ API/传感器系统/传感器类型",
                      },
                      {
                        text: "数据流处理",
                        link: "/API参考/C++ API/传感器系统/数据流处理",
                      },
                    ],
                  },
                ],
              },
              {
                text: "ROS2 接口",
                collapsed: true,
                items: [
                  { text: "概览", link: "/API参考/ROS2接口/ROS2接口" },
                  {
                    text: "ROS2架构设计",
                    link: "/API参考/ROS2接口/ROS2架构设计",
                  },
                  {
                    text: "坐标系与转换",
                    link: "/API参考/ROS2接口/坐标系与转换",
                  },
                  {
                    text: "可视化与调试",
                    link: "/API参考/ROS2接口/可视化与调试",
                  },
                  {
                    text: "消息订阅系统",
                    link: "/API参考/ROS2接口/消息订阅系统",
                  },
                  {
                    text: "消息发布系统",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/API参考/ROS2接口/消息发布系统/消息发布系统",
                      },
                      {
                        text: "时钟发布器",
                        link: "/API参考/ROS2接口/消息发布系统/时钟发布器",
                      },
                      {
                        text: "摄像头发布器",
                        link: "/API参考/ROS2接口/消息发布系统/摄像头发布器",
                      },
                      {
                        text: "激光雷达发布器",
                        link: "/API参考/ROS2接口/消息发布系统/激光雷达发布器",
                      },
                      {
                        text: "IMU发布器",
                        link: "/API参考/ROS2接口/消息发布系统/IMU发布器",
                      },
                      {
                        text: "GNSS发布器",
                        link: "/API参考/ROS2接口/消息发布系统/GNSS发布器",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            text: "高级功能",
            collapsed: false,
            items: [
              { text: "概览", link: "/高级功能/高级功能" },
              { text: "渲染选项", link: "/高级功能/渲染选项" },
              {
                text: "同步模式",
                collapsed: true,
                items: [
                  { text: "概览", link: "/高级功能/同步模式/同步模式" },
                  {
                    text: "时间步进控制",
                    collapsed: true,
                    items: [
                      {
                        text: "固定时间步进",
                        link: "/高级功能/同步模式/时间步进控制/固定时间步进",
                      },
                    ],
                  },
                  {
                    text: "数据同步机制",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/高级功能/同步模式/数据同步机制/数据同步机制",
                      },
                      {
                        text: "时间戳系统",
                        link: "/高级功能/同步模式/数据同步机制/时间戳系统",
                      },
                      {
                        text: "多传感器同步",
                        link: "/高级功能/同步模式/数据同步机制/多传感器同步",
                      },
                      {
                        text: "数据采集协调",
                        link: "/高级功能/同步模式/数据同步机制/数据采集协调",
                      },
                    ],
                  },
                  {
                    text: "性能优化",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/高级功能/同步模式/性能优化/性能优化",
                      },
                      {
                        text: "批量操作优化",
                        link: "/高级功能/同步模式/性能优化/批量操作优化",
                      },
                      {
                        text: "流式传输配置",
                        link: "/高级功能/同步模式/性能优化/流式传输配置",
                      },
                      {
                        text: "资源管理",
                        link: "/高级功能/同步模式/性能优化/资源管理",
                      },
                    ],
                  },
                ],
              },
              {
                text: "交通管理器",
                collapsed: true,
                items: [
                  { text: "概览", link: "/高级功能/交通管理器/交通管理器" },
                  {
                    text: "交通管理器架构设计",
                    link: "/高级功能/交通管理器/交通管理器架构设计",
                  },
                  {
                    text: "分布式管理",
                    link: "/高级功能/交通管理器/分布式管理",
                  },
                  {
                    text: "参数配置系统",
                    link: "/高级功能/交通管理器/参数配置系统",
                  },
                  {
                    text: "车辆行为控制",
                    link: "/高级功能/交通管理器/车辆行为控制",
                  },
                ],
              },
              {
                text: "录制与回放",
                collapsed: true,
                items: [
                  { text: "概览", link: "/高级功能/录制与回放/录制与回放" },
                  {
                    text: "录制机制",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/高级功能/录制与回放/录制机制/录制机制",
                      },
                    ],
                  },
                  {
                    text: "回放系统",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/高级功能/录制与回放/回放系统/回放系统",
                      },
                    ],
                  },
                  {
                    text: "文件格式",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/高级功能/录制与回放/文件格式/文件格式",
                      },
                    ],
                  },
                  {
                    text: "数据分析",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/高级功能/录制与回放/数据分析/数据分析",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            text: "扩展与集成",
            collapsed: false,
            items: [
              { text: "概览", link: "/扩展与集成/扩展与集成" },
              {
                text: "ROS2 集成",
                collapsed: true,
                items: [
                  { text: "概览", link: "/扩展与集成/ROS2集成/ROS2集成" },
                  { text: "通信架构", link: "/扩展与集成/ROS2集成/通信架构" },
                  {
                    text: "消息类型",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/扩展与集成/ROS2集成/消息类型/消息类型",
                      },
                      {
                        text: "传感器数据消息",
                        link: "/扩展与集成/ROS2集成/消息类型/传感器数据消息",
                      },
                      {
                        text: "车辆控制消息",
                        link: "/扩展与集成/ROS2集成/消息类型/车辆控制消息",
                      },
                      {
                        text: "事件检测消息",
                        link: "/扩展与集成/ROS2集成/消息类型/事件检测消息",
                      },
                    ],
                  },
                  {
                    text: "配置与部署",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/扩展与集成/ROS2集成/配置与部署/配置与部署",
                      },
                      {
                        text: "DDS配置",
                        link: "/扩展与集成/ROS2集成/配置与部署/DDS配置",
                      },
                      {
                        text: "可视化配置",
                        link: "/扩展与集成/ROS2集成/配置与部署/可视化配置",
                      },
                      {
                        text: "构建系统集成",
                        link: "/扩展与集成/ROS2集成/配置与部署/构建系统集成",
                      },
                    ],
                  },
                ],
              },
              {
                text: "自定义传感器开发",
                collapsed: true,
                items: [
                  {
                    text: "概览",
                    link: "/扩展与集成/自定义传感器开发/自定义传感器开发",
                  },
                  {
                    text: "传感器架构概述",
                    link: "/扩展与集成/自定义传感器开发/传感器架构概述",
                  },
                  {
                    text: "蓝图系统集成",
                    link: "/扩展与集成/自定义传感器开发/蓝图系统集成",
                  },
                  {
                    text: "自定义传感器实现",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/扩展与集成/自定义传感器开发/自定义传感器实现/自定义传感器实现",
                      },
                      {
                        text: "自定义传感器数据模型设计",
                        link: "/扩展与集成/自定义传感器开发/自定义传感器实现/自定义传感器数据模型设计",
                      },
                      {
                        text: "传感器数据序列化实现",
                        link: "/扩展与集成/自定义传感器开发/自定义传感器实现/传感器数据序列化实现",
                      },
                    ],
                  },
                  {
                    text: "传感器数据流",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/扩展与集成/自定义传感器开发/传感器数据流/传感器数据流",
                      },
                      {
                        text: "流媒体协议",
                        link: "/扩展与集成/自定义传感器开发/传感器数据流/流媒体协议",
                      },
                      {
                        text: "性能优化",
                        link: "/扩展与集成/自定义传感器开发/传感器数据流/性能优化",
                      },
                    ],
                  },
                  {
                    text: "Python API暴露",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/扩展与集成/自定义传感器开发/Python API暴露/Python API暴露",
                      },
                      {
                        text: "绑定实现机制",
                        link: "/扩展与集成/自定义传感器开发/Python API暴露/绑定实现机制",
                      },
                      {
                        text: "数据转换策略",
                        link: "/扩展与集成/自定义传感器开发/Python API暴露/数据转换策略",
                      },
                    ],
                  },
                ],
              },
              {
                text: "插件系统",
                collapsed: true,
                items: [
                  { text: "概览", link: "/扩展与集成/插件系统/插件系统" },
                  { text: "插件创建", link: "/扩展与集成/插件系统/插件创建" },
                  { text: "功能扩展", link: "/扩展与集成/插件系统/功能扩展" },
                  { text: "构建配置", link: "/扩展与集成/插件系统/构建配置" },
                ],
              },
              {
                text: "第三方工具集成",
                collapsed: true,
                items: [
                  {
                    text: "概览",
                    link: "/扩展与集成/第三方工具集成/第三方工具集成",
                  },
                  {
                    text: "ANSYS 集成",
                    link: "/扩展与集成/第三方工具集成/ANSYS 集成",
                  },
                  {
                    text: "Docker 部署集成",
                    link: "/扩展与集成/第三方工具集成/Docker 部署集成",
                  },
                  {
                    text: "Synkrotron 集成",
                    collapsed: true,
                    items: [
                      {
                        text: "概览",
                        link: "/扩展与集成/第三方工具集成/Synkrotron 集成/Synkrotron 集成",
                      },
                      {
                        text: "OASIS Sim 仿真平台集成",
                        link: "/扩展与集成/第三方工具集成/Synkrotron 集成/OASIS Sim 仿真平台集成",
                      },
                      {
                        text: "OASIS Data 数据平台集成",
                        link: "/扩展与集成/第三方工具集成/Synkrotron 集成/OASIS Data 数据平台集成",
                      },
                      {
                        text: "API与部署集成",
                        link: "/扩展与集成/第三方工具集成/Synkrotron 集成/API与部署集成",
                      },
                      {
                        text: "高级工具集成",
                        link: "/扩展与集成/第三方工具集成/Synkrotron 集成/高级工具集成",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            text: "工具与实用程序",
            collapsed: false,
            items: [
              { text: "概览", link: "/工具与实用程序/工具与实用程序" },
              { text: "Docker工具", link: "/工具与实用程序/Docker工具" },
              {
                text: "Python实用工具",
                link: "/工具与实用程序/Python实用工具",
              },
              { text: "开发实用工具", link: "/工具与实用程序/开发实用工具" },
              { text: "构建工具", link: "/工具与实用程序/构建工具" },
              {
                text: "设置与配置工具",
                link: "/工具与实用程序/设置与配置工具",
              },
              { text: "资源导入工具", link: "/工具与实用程序/资源导入工具" },
            ],
          },
        ],
      },

      socialLinks: [
        { icon: "github", link: "https://github.com/carla-simulator/carla" },
      ],

      footer: {
        message: "CARLA 自动驾驶仿真平台技术文档",
        copyright: "Copyright © 2024",
      },

      search: {
        provider: "local",
        options: {
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              noResultsText: "无法找到相关结果",
              resetButtonTitle: "清除查询条件",
              footer: {
                selectText: "选择",
                navigateText: "切换",
              },
            },
          },
        },
      },

      outline: {
        label: "页面导航",
        level: [2, 3],
      },

      docFooter: {
        prev: "上一页",
        next: "下一页",
      },

      lastUpdated: {
        text: "最后更新于",
      },

      returnToTopLabel: "回到顶部",
      sidebarMenuLabel: "菜单",
      darkModeSwitchLabel: "主题",
      lightModeSwitchTitle: "切换到浅色模式",
      darkModeSwitchTitle: "切换到深色模式",
    },

    // Mermaid 配置
    mermaid: {
      // Mermaid 主题配置
    },
    mermaidPlugin: {
      class: "mermaid",
    },

    // Markdown 配置
    markdown: {},
  })
);
