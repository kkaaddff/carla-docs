# 使用 Scenic 定义复杂驾驶场景

> **引用文件**
> **本文档引用的文件**

- [tuto_G_scenic.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md)
- [ts_traffic_simulation_overview.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/ts_traffic_simulation_overview.md)
- [python_api.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/python_api.md)

## 目录

1. [简介](#简介)
2. [Scenic 语言基础](#scenic语言基础)
3. [创建复杂驾驶场景](#创建复杂驾驶场景)
4. [Scenic 与 CARLA 集成](#scenic与carla集成)
5. [最佳实践与调试](#最佳实践与调试)
6. [性能优化与常见问题](#性能优化与常见问题)

## 简介

Scenic 是一种领域特定的概率编程语言，专门用于为机器人和自动驾驶汽车等网络物理系统建模环境。在 CARLA 仿真环境中，Scenic 允许用户通过单个场景定义生成多个多样化的场景模拟。这种基于概率的场景定义方法特别适用于创建复杂的交通场景和路线，为自动驾驶代理在 CARLA 排行榜上的评估做准备。

Scenic 提供了专门针对 CARLA 模拟器的域，使得 Scenic 脚本能够在 CARLA 模拟器上顺利执行。通过 Scenic，用户可以轻松地创建和构造场景定义，包括定义交通参与者、特定交互行为和环境约束等复杂场景。

**Section sources**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L1-L22" target="_blank">tuto_G_scenic.md</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/ts_traffic_simulation_overview.md#L52-L56" target="_blank">ts_traffic_simulation_overview.md</a>

## Scenic 语言基础

### 语法与核心概念

Scenic 语言的核心在于其声明式语法，允许用户以自然的方式描述场景。Scenic 使用概率分布来定义场景元素的位置、行为和其他属性，从而生成多样化的场景变体。

在 Scenic 中，场景定义通常包括以下几个关键部分：

- **参数定义**：设置地图参数和使用的模型
- **常量定义**：定义场景中使用的常量值
- **行为定义**：定义交通参与者的行为模式
- **场景设置**：定义场景的初始状态和约束条件

Scenic 的语法设计使得场景定义既直观又强大，用户可以通过简单的语句描述复杂的场景逻辑。

### 行为规范

Scenic 提供了丰富的行为库，允许用户定义交通参与者的各种行为。在 CARLA 环境中，这些行为包括：

- **FollowLaneBehavior**：使车辆沿车道行驶
- **SetBrakeAction**：设置刹车动作
- **SetThrottleAction**：设置油门动作
- **SetSteeringAction**：设置转向动作

这些行为可以通过组合和中断条件来创建复杂的交互逻辑。例如，一个车辆可以被定义为沿车道行驶，但当与前方车辆的距离小于某个阈值时，立即执行刹车动作。

**Section sources**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L23-L33" target="_blank">tuto_G_scenic.md</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L71-L92" target="_blank">tuto_G_scenic.md</a>

### 概率分布

Scenic 使用概率分布来引入场景的多样性。常见的概率分布包括：

- **Uniform**：均匀分布，用于在指定范围内随机选择值
- **Range**：范围分布，用于定义数值的上下限
- **Normal**：正态分布，用于模拟自然现象中的随机性

这些概率分布可以应用于各种场景元素，如车辆位置、速度、方向等，从而生成多样化的场景实例。

### 空间关系

Scenic 提供了强大的空间关系定义能力，允许用户精确描述场景元素之间的相对位置。常见的空间关系操作包括：

- **on**：表示某物体位于另一物体上
- **following**：表示某物体沿特定方向跟随另一物体
- **at**：表示某物体位于特定位置
- **withinDistanceTo**：表示某物体与另一物体的距离在指定范围内

这些空间关系操作使得用户能够以直观的方式描述复杂的场景布局。

**Section sources**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L94-L102" target="_blank">tuto_G_scenic.md</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L108-L127" target="_blank">tuto_G_scenic.md</a>

## 创建复杂驾驶场景

### 场景定义步骤

创建一个复杂的驾驶场景通常遵循以下步骤：

1. **设置地图参数和模型**：定义使用的地图文件和 CARLA 地图名称
2. **定义常量**：设置场景中使用的各种常量值
3. **定义行为**：创建交通参与者的行为模式
4. **生成道路网络**：基于 OpenDRIVE 文件生成道路网络
5. **设置场景**：定义场景的初始状态和约束条件
6. **设置终止条件**：定义场景结束的条件

### 实际示例

以下是一个典型的 Scenic 场景定义示例，描述了一个前车因道路上的障碍物而突然减速，后车需要紧急刹车以避免碰撞的场景：

```scenic
## SET MAP AND MODEL
param map = localPath('assets/Town10_NG.xodr')
param carla_map = 'Town10_NG'
model srunner.scenic.models.model

## CONSTANTS
EGO_MODEL = "vehicle.lincoln.mkz"
EGO_SPEED = 7
EGO_BRAKING_THRESHOLD = 12

LEAD_CAR_SPEED = 8
LEADCAR_BRAKING_THRESHOLD = 15

BRAKE_ACTION = 1.0

## DEFINING BEHAVIORS
behavior EgoBehavior(speed=10):
    try:
        do FollowLaneBehavior(speed)
    interrupt when withinDistanceToAnyCars(self, EGO_BRAKING_THRESHOLD):
        take SetBrakeAction(BRAKE_ACTION)

behavior LeadingCarBehavior(speed=10):
    try:
        do FollowLaneBehavior(speed)
    interrupt when withinDistanceToAnyObjs(self, LEADCAR_BRAKING_THRESHOLD):
        take SetBrakeAction(BRAKE_ACTION)

## DEFINING SPATIAL RELATIONS
lane = Uniform(*network.lanes)

## SET THE SCENE
obstacle = Trash on lane.centerline

leadCar = new Car following roadDirection from obstacle for Range(-60, -50),
        with behavior LeadingCarBehavior(LEAD_CAR_SPEED)

ego = new Car following roadDirection from leadCar for Range(-15, -10),
        with blueprint EGO_MODEL,
        with behavior EgoBehavior(EGO_SPEED)

require (distance to intersection) > 80

## SET TERMINATION CONDITION
terminate when ego.speed < 0.1 and (distance to obstacle) < 30
```

这个示例展示了如何使用 Scenic 定义一个包含多个交通参与者、特定交互行为和环境约束的复杂场景。

**Section sources**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L36-L141" target="_blank">tuto_G_scenic.md</a>

### 多交通参与者场景

Scenic 特别擅长创建包含多个交通参与者的复杂场景。通过组合不同的行为模式和空间关系，可以创建各种复杂的交通场景，如：

- **交叉路口场景**：多个车辆在交叉路口相遇，需要遵守交通规则
- **变道场景**：车辆在高速公路上变道，需要考虑周围车辆的位置和速度
- **行人过街场景**：行人从人行横道过街，车辆需要礼让
- **紧急车辆场景**：救护车或消防车执行紧急任务，其他车辆需要让行

这些场景可以通过定义不同的行为模式和约束条件来实现，从而生成多样化的测试场景。

## Scenic 与 CARLA 集成

### 集成方式

Scenic 场景与 CARLA 仿真环境的集成主要通过以下方式实现：

1. **模型声明**：在 Scenic 脚本中声明使用 CARLA 特定的模型
2. **参数配置**：设置 CARLA 相关的参数，如地图名称、仿真模式等
3. **执行命令**：使用 Scenic 命令行工具执行场景

集成的关键是使用`srunner.scenic.models.model`模型，这个模型包含了在 CARLA 上运行场景所需的所有实用工具。

### 加载与执行

要运行 Scenic 定义的场景，需要按照以下步骤操作：

1. **启动 CARLA 服务器**：确保 CARLA 服务器正在运行
2. **执行 Scenic 命令**：使用 scenic 命令行工具执行场景脚本

```scenic
scenic path/to/scenic/script.scenic --simulate --2d
```

执行后，会弹出一个 pygame 窗口，场景将反复播放，每次都在脚本设定的约束范围内生成唯一的场景。要停止场景生成，可以在终端中按`ctrl + C`。

### 参数配置

Scenic 提供了多种参数来配置仿真模拟，包括：

- **map**：指定 OpenDRIVE 文件路径，用于生成道路网络信息
- **carla_map**：指定 CARLA 地图名称，如果定义了此参数，Scenic 将加载地图的所有资产（建筑物、树木等）
- **--simulate**：启用仿真模式
- **--2d**：使用 2D 渲染模式

这些参数可以根据具体需求进行调整，以实现不同的仿真效果。

**Section sources**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L145-L158" target="_blank">tuto_G_scenic.md</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L40-L51" target="_blank">tuto_G_scenic.md</a>

## 最佳实践与调试

### 场景模板设计

为了提高场景的可复用性，建议采用以下最佳实践：

- **模块化设计**：将常用的场景元素和行为模式定义为可复用的模块
- **参数化**：使用参数来定义场景的可变部分，提高场景的灵活性
- **层次化**：将复杂的场景分解为多个层次，每个层次负责特定的功能
- **文档化**：为场景定义添加详细的注释和文档，便于理解和维护

通过这些实践，可以创建出既灵活又易于维护的场景模板。

### 调试技巧

调试 Scenic 脚本时，可以采用以下技巧：

- **逐步验证**：从简单的场景开始，逐步增加复杂性，确保每个部分都能正常工作
- **日志输出**：添加详细的日志输出，帮助追踪场景执行过程中的问题
- **可视化调试**：使用 2D 模式进行调试，可以更清晰地观察场景元素的位置和行为
- **边界测试**：测试场景在各种边界条件下的表现，确保鲁棒性

这些技巧可以帮助快速定位和解决 Scenic 脚本中的问题。

### Python API 结合使用

Scenic 可以与 CARLA 的 Python API 结合使用，实现更复杂的场景控制和数据处理。通过 Python API，可以：

- **动态调整场景参数**：在运行时根据需要调整场景参数
- **获取仿真数据**：从仿真中获取各种传感器数据和车辆状态
- **实现复杂逻辑**：使用 Python 编写复杂的控制逻辑和决策算法
- **数据后处理**：对仿真结果进行分析和可视化

这种结合使用的方式可以充分发挥 Scenic 和 Python 各自的优势，创建出更加复杂和真实的驾驶场景。

**Section sources**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L7-L10" target="_blank">tuto_G_scenic.md</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/python_api.md#L453-L594" target="_blank">python_api.md</a>

## 性能优化与常见问题

### 性能优化技巧

为了提高 Scenic 场景的执行效率，可以采用以下优化技巧：

- **减少不必要的计算**：避免在场景定义中进行复杂的数学计算
- **合理使用概率分布**：避免使用过于复杂的概率分布，影响仿真性能
- **优化场景复杂度**：根据实际需求调整场景的复杂度，避免过度复杂的场景定义
- **使用合适的仿真模式**：根据需求选择合适的仿真模式，如 2D 模式通常比 3D 模式更快

这些优化技巧可以帮助提高场景的执行效率，缩短仿真时间。

### 常见问题解决方案

在使用 Scenic 定义复杂驾驶场景时，可能会遇到一些常见问题，以下是相应的解决方案：

- **场景生成失败**：检查 Scenic 脚本的语法是否正确，确保所有必需的参数都已正确定义
- **性能问题**：简化场景定义，减少不必要的计算和复杂的概率分布
- **行为不符合预期**：仔细检查行为定义和中断条件，确保逻辑正确
- **集成问题**：确保 CARLA 服务器正在运行，并且 Scenic 和 CARLA 的版本兼容

通过这些解决方案，可以有效应对使用 Scenic 时可能遇到的各种问题。

**Section sources**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L18-L20" target="_blank">tuto_G_scenic.md</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/tuto_G_scenic.md#L152-L158" target="_blank">tuto_G_scenic.md</a>
