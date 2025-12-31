# API 与部署集成

> **引用文件**
> **本文档中引用的文件**

- [ecosys_synkrotron.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/ecosys_synkrotron.md)
- [build_docker.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/build_docker.md)
- [start_quickstart.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/start_quickstart.md)
- [adv_synchrony_timestep.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/adv_synchrony_timestep.md)
- [foundations.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/foundations.md)
- [CarlaSettings.h](https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.h)
- [CarlaSettings.cpp](https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.cpp)
- [Client.cpp](https://github.com/carla-simulator/carla/blob/ue5-dev/PythonAPI/carla/src/Client.cpp)
- [Release.Dockerfile](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Docker/Release.Dockerfile)
- [Deploy.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/Deploy.sh)
- [Environment.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/Environment.sh)
- [BuildUtilsDocker.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/BuildUtilsDocker.sh)
- [InstallPrerequisites.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/SetupUtils/InstallPrerequisites.sh)
- [CarlaSetup.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/CarlaSetup.sh)

## 目录

1. [介绍](#介绍)
2. [项目结构](#项目结构)
3. [核心组件](#核心组件)
4. [架构概述](#架构概述)
5. [详细组件分析](#详细组件分析)
6. [依赖分析](#依赖分析)
7. [性能考虑](#性能考虑)
8. [故障排除指南](#故障排除指南)
9. [结论](#结论)

## 介绍

本文档旨在为 Synkrotron API 与 CARLA 仿真器的集成及部署提供全面的技术指南。文档详细阐述了如何通过 RESTful 或 WebSocket 接口实现 OASIS 平台与 CARLA 仿真器的通信，并重点描述了容器化部署方案，包括 Docker 镜像的构建、Kubernetes 编排配置，以及在云环境或本地服务器上的无缝部署。涵盖了网络配置、资源分配、安全性设置和监控集成等内容，确保集成系统的稳定性和可扩展性。

**本文档中引用的文件**

- [ecosys_synkrotron.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/ecosys_synkrotron.md)

## 项目结构

CARLA 项目采用模块化设计，主要包含 CMake、Docs、Examples、Import、LibCarla、PythonAPI、Ros2Native、Unreal、Util 等核心目录。其中，LibCarla 是核心 C++库，提供底层 API；PythonAPI 提供 Python 绑定，便于脚本开发；Unreal 目录包含基于 Unreal Engine 5 的仿真环境；Util 目录包含 Docker 和部署工具。这种结构支持从底层开发到高层应用的完整开发流程。

```mermaid
graph TD
subgraph "核心模块"
LibCarla[LibCarla]
PythonAPI[PythonAPI]
Unreal[Unreal]
end
subgraph "工具与配置"
Util[Util]
CMake[CMake]
end
subgraph "文档与示例"
Docs[Docs]
Examples[Examples]
end
LibCarla --> PythonAPI
LibCarla --> Unreal
Util --> LibCarla
Util --> PythonAPI
Docs --> LibCarla
Docs --> PythonAPI
Examples --> PythonAPI
```

**图表来源**

- [LibCarla](https://github.com/carla-simulator/carla/blob/ue5-dev/LibCarla)
- [PythonAPI](https://github.com/carla-simulator/carla/blob/ue5-dev/PythonAPI)
- [Unreal](https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal)
- [Util](https://github.com/carla-simulator/carla/blob/ue5-dev/Util)

**本节来源**

- [LibCarla](https://github.com/carla-simulator/carla/blob/ue5-dev/LibCarla)
- [PythonAPI](https://github.com/carla-simulator/carla/blob/ue5-dev/PythonAPI)
- [Unreal](https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal)
- [Util](https://github.com/carla-simulator/carla/blob/ue5-dev/Util)

## 核心组件

CARLA 的核心组件包括客户端-服务器架构、同步模式、流媒体系统和多 GPU 支持。客户端通过 RPC 端口（默认 2000）与服务器通信，流媒体端口（默认 2001）用于传感器数据传输。同步模式确保仿真步进与客户端处理同步，避免数据溢出。流媒体系统基于 TCP 实现高效数据传输，多 GPU 支持通过 Primary-Secondary 架构实现分布式渲染。

**本节来源**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.h#L82-L90" target="_blank">CarlaSettings.h</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/adv_synchrony_timestep.md#L139-L159" target="_blank">adv_synchrony_timestep.md</a>
- [LibCarla/source/carla/streaming](https://github.com/carla-simulator/carla/blob/ue5-dev/LibCarla/source/carla/streaming)

## 架构概述

CARLA 采用客户端-服务器架构，支持多种部署模式。OASIS 平台作为客户端，通过 API 与 CARLA 服务器通信。在容器化部署中，CARLA 服务器运行在 Docker 容器内，通过 Kubernetes 进行编排管理。网络配置确保 RPC 和流媒体端口的可达性，资源分配优化 GPU 和 CPU 使用，安全性通过网络隔离和访问控制实现。

```mermaid
graph TB
subgraph "OASIS平台"
Client[API客户端]
WebUI[Web界面]
end
subgraph "CARLA仿真器"
Server[CARLA服务器]
Sensors[传感器系统]
Physics[物理引擎]
end
subgraph "部署环境"
Docker[Docker容器]
Kubernetes[Kubernetes编排]
Cloud[云基础设施]
end
Client --> Server
WebUI --> Client
Server --> Sensors
Server --> Physics
Docker --> Server
Kubernetes --> Docker
Cloud --> Kubernetes
```

**图表来源**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.h#L82-L90" target="_blank">CarlaSettings.h</a>
- [build_docker.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/build_docker.md)
- [Deploy.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/Deploy.sh)

**本节来源**

- [CarlaSettings.h](https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.h)
- [build_docker.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/build_docker.md)
- [Deploy.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/Deploy.sh)

## 详细组件分析

### API 集成分析

Synkrotron 的 OASIS 平台通过 CARLA 的 Python API 与仿真器集成。API 提供丰富的功能，包括场景管理、传感器配置、车辆控制和数据获取。客户端通过`carla.Client`连接到服务器，使用`world`对象管理仿真环境，通过`blueprint`系统创建和配置实体。

```mermaid
sequenceDiagram
participant OASIS as OASIS平台
participant CARLA as CARLA服务器
participant Client as Python客户端
OASIS->>Client : 发送API请求
Client->>CARLA : 连接(RPC端口2000)
CARLA-->>Client : 连接确认
Client->>CARLA : 获取世界对象
CARLA-->>Client : 世界对象
Client->>CARLA : 配置同步模式
CARLA-->>Client : 配置确认
loop 仿真循环
Client->>CARLA : world.tick()
CARLA-->>Client : 仿真步进确认
Client->>CARLA : 获取传感器数据
CARLA-->>Client : 传感器数据流(端口2001)
end
```

**图表来源**

- [Client.cpp](https://github.com/carla-simulator/carla/blob/ue5-dev/PythonAPI/carla/src/Client.cpp)
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.h#L99-L100" target="_blank">CarlaSettings.h</a>
- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/adv_synchrony_timestep.md#L147-L156" target="_blank">adv_synchrony_timestep.md</a>

**本节来源**

- [Client.cpp](https://github.com/carla-simulator/carla/blob/ue5-dev/PythonAPI/carla/src/Client.cpp)
- [CarlaSettings.h](https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.h)
- [adv_synchrony_timestep.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/adv_synchrony_timestep.md)

### 容器化部署分析

CARLA 提供 Docker 支持，便于在云环境或本地服务器上部署。`Release.Dockerfile`定义了基础镜像和依赖，`Deploy.sh`脚本自动化构建和推送流程。部署方案支持 GPU 直通，确保仿真性能。Kubernetes 配置实现高可用性和弹性伸缩。

```mermaid
flowchart TD
A[编写Dockerfile] --> B[构建Docker镜像]
B --> C[推送镜像到仓库]
C --> D[Kubernetes部署]
D --> E[服务发现]
E --> F[负载均衡]
F --> G[监控与日志]
G --> H[自动伸缩]
subgraph "Docker构建"
A
B
C
end
subgraph "Kubernetes编排"
D
E
F
G
H
end
```

**图表来源**

- [Release.Dockerfile](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Docker/Release.Dockerfile)
- [Deploy.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/Deploy.sh)
- [BuildUtilsDocker.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/BuildUtilsDocker.sh)

**本节来源**

- [Release.Dockerfile](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Docker/Release.Dockerfile)
- [Deploy.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/Deploy.sh)
- [BuildUtilsDocker.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/BuildUtilsDocker.sh)

## 依赖分析

CARLA 的依赖关系复杂，涉及操作系统、GPU 驱动、Python 包和网络配置。`InstallPrerequisites.sh`脚本自动化安装系统依赖，`requirements.txt`管理 Python 依赖。Docker 部署隔离了环境依赖，提高了部署的可移植性。Kubernetes 编排依赖于容器运行时和网络插件。

```mermaid
graph TD
A[操作系统] --> B[Ubuntu 22.04]
A --> C[Windows 11]
B --> D[NVIDIA驱动550+]
C --> E[NVIDIA驱动560+]
D --> F[GPU支持]
E --> F
F --> G[CARLA服务器]
H[Python 3] --> I[pip3 20.3+]
I --> J[pygame, numpy]
J --> K[PythonAPI]
K --> G
L[网络] --> M[端口2000, 2001]
M --> G
G --> N[Docker]
N --> O[Kubernetes]
```

**图表来源**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/start_quickstart.md#L16-L32" target="_blank">start_quickstart.md</a>
- [InstallPrerequisites.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/SetupUtils/InstallPrerequisites.sh)
- [requirements.txt](https://github.com/carla-simulator/carla/blob/ue5-dev/requirements.txt)

**本节来源**

- [start_quickstart.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/start_quickstart.md)
- [InstallPrerequisites.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/SetupUtils/InstallPrerequisites.sh)
- [requirements.txt](https://github.com/carla-simulator/carla/blob/ue5-dev/requirements.txt)

## 性能考虑

CARLA 的性能受 GPU、CPU、内存和网络带宽影响。同步模式下，客户端处理速度必须匹配仿真步进。流媒体系统优化 TCP 传输，减少延迟。容器化部署需合理分配资源，避免资源争用。监控系统实时跟踪性能指标，及时发现瓶颈。

**本节来源**

- <a href="https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.h#L114-L115" target="_blank">CarlaSettings.h</a>
- [LibCarla/source/carla/streaming](https://github.com/carla-simulator/carla/blob/ue5-dev/LibCarla/source/carla/streaming)
- [adv_synchrony_timestep.md](https://github.com/carla-simulator/carla/blob/ue5-dev/Docs/adv_synchrony_timestep.md)

## 故障排除指南

常见问题包括连接失败、同步模式异常、传感器数据丢失和性能下降。检查网络配置，确保端口开放；验证 GPU 驱动版本；监控资源使用情况；使用日志诊断问题。Docker 部署中，检查容器日志和资源限制。

**本节来源**

- [CarlaSettings.cpp](https://github.com/carla-simulator/carla/blob/ue5-dev/Unreal/CarlaUnreal/Plugins/Carla/Source/Carla/Settings/CarlaSettings.cpp)
- [Environment.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/Util/Tools/Environment.sh)
- [CarlaSetup.sh](https://github.com/carla-simulator/carla/blob/ue5-dev/CarlaSetup.sh)

## 结论

Synkrotron API 与 CARLA 的集成提供了强大的自动驾驶仿真能力。通过 RESTful 或 WebSocket 接口，OASIS 平台能够高效控制和监控 CARLA 仿真器。容器化部署方案确保了系统的可移植性和可扩展性，适用于从本地开发到云规模部署的各种场景。遵循本文档的指南，可以实现稳定、高效的集成系统。
