# 个人资源下载站

这是一个个人资源下载站，包含导航地址、脚本库、工具下载、镜像下载、视频下载和音乐下载等功能。

## 目录结构

```
web/
├── css/               # 样式文件
│   └── style.css      # 主样式文件
├── html/              # HTML文件
│   └── index.html     # 主页面
├── image/             # 图片资源
│   ├── face/          # 用户头像
│   │   ├── admin.png  # 管理员头像
│   │   └── guest.png  # 游客头像
│   └── icon/          # 网站图标
│       └── logo.png   # 网站图标
├── js/                # JavaScript文件
│   ├── config.js      # 配置文件
│   └── main.js        # 主脚本文件
├── resources/         # 资源文件
│   ├── iso/           # 镜像文件
│   ├── music/         # 音乐文件
│   ├── sh/            # 脚本文件
│   ├── tool/          # 工具软件
│   └── video/         # 视频文件
└──
```

## 功能说明

1. **导航地址**：常用网站链接
2. **脚本库**：实用脚本工具
3. **工具下载**：各种软件工具
4. **镜像下载**：系统镜像文件
5. **视频下载**：视频资源
6. **音乐下载**：音乐资源
7. **登录系统**：支持管理员和游客登录
8. **主题切换**：支持亮色和暗色主题

## Docker运行命令

### Docker版本

| 版本号 | 描述 |
|-------|------|
| `latest` | 最新版本（自动匹配系统架构） |
| `auto-latest` | 最新版本（自动匹配系统架构） |
| `amd64-latest` | 最新版本（amd64版） |
| `arm64-latest` | 最新版本（arm64版） |
| `1.0.0` | 1.0.0版（自动匹配系统架构） |
| `auto-1.0.0` | 1.0.0版（自动匹配系统架构） |
| `amd64-1.0.0` | 1.0.0版（amd64版） |
| `arm64-1.0.0` | 1.0.0版（arm64版） |

### 使用Docker run运行

```bash
docker run -d \
  --name personal_download_web \
  -p 8080:80 \
  -v ./web:/web \
  wsxxxstar/personal_download_web:latest
```

### 使用Docker Compose运行

```bash
version: '3'
services:
  web:
    image: wsxxxstar/personal_download_web:latest
    ports:
      - "8080:80"
    volumes:
      - ./web:/web
    restart: always
```

## 默认访问地址

- 本地访问：http://localhost:8080
- 网络访问：http://<服务器IP>:8080

## 默认登录信息

- **管理员**：
  - 用户名：admin
  - 密码：admin

- **游客**：
  - 邀请码：guest

## 配置说明

### config.js 配置

config.js 文件包含了网站的基本配置信息，主要包括以下部分：

#### 1. 网站基本信息
```javascript
const siteName      = "XXX的个人工具箱&音视频下载站";
const ADMIN_USER    = "admin";
const ADMIN_PASS    = "admin";
const INVITE_CODE   = "guest";
```

- **siteName**：网站名称，显示在顶部导航栏
- **ADMIN_USER**：管理员用户名
- **ADMIN_PASS**：管理员密码
- **INVITE_CODE**：游客登录邀请码

#### 2. 图标库配置
```javascript
const icons = [
  "📁","📂","🖥️","💻","📱","🚀","⚙️","🧪","🧰","🔧",
  "🔒","🔑","💾","📊","📈","📉","🗂️","📋","📅","🔔",
  "📢","⚠️","✅","❌","⚡","🔥","🛡️","🌐","📡","💡",
  "🎯","🧩","🧪","🧬","🧮","🖨️","📀","🧲","🧽","🧯",
  "🛠️","🧱","🧨","🎁","🎮","🎲","🎨","🎧","🎤","🎥"
];
```

图标库是一个包含50个emoji图标的数组，索引从0到49。

#### 3. 资源列表配置

- **navList**：导航地址列表
- **scriptList**：脚本库列表
- **toolList**：工具下载列表
- **imgList**：镜像下载列表
- **videoList**：视频下载列表
- **musicList**：音乐下载列表

### 图标库使用方法

图标库的使用非常简单，在资源列表中，通过设置 `icon` 属性来指定使用哪个图标，值为图标在 `icons` 数组中的索引。

例如：
- `icon: "27"` 表示使用 `icons[27]`，即 "🌐" 图标
- `icon: "49"` 表示使用 `icons[49]`，即 "🎥" 图标

### 图标编号表格

| 编号 | 图标 | 编号 | 图标 | 编号 | 图标 | 编号 | 图标 | 编号 | 图标 |
|------|------|------|------|------|------|------|------|------|------|
| 0    | 📁   | 10   | 🔒   | 20   | 📢   | 30   | 🎯   | 40   | 🛠️   |
| 1    | 📂   | 11   | 🔑   | 21   | ⚠️   | 31   | 🧩   | 41   | 🧱   |
| 2    | 🖥️   | 12   | 💾   | 22   | ✅   | 32   | 🧪   | 42   | 🧨   |
| 3    | 💻   | 13   | 📊   | 23   | ❌   | 33   | 🧬   | 43   | 🎁   |
| 4    | 📱   | 14   | 📈   | 24   | ⚡   | 34   | 🧮   | 44   | 🎮   |
| 5    | 🚀   | 15   | 📉   | 25   | 🔥   | 35   | 🖨️   | 45   | 🎲   |
| 6    | ⚙️   | 16   | 🗂️   | 26   | 🛡️   | 36   | 📀   | 46   | 🎨   |
| 7    | 🧪   | 17   | 📋   | 27   | 🌐   | 37   | 🧲   | 47   | 🎧   |
| 8    | 🧰   | 18   | 📅   | 28   | 📡   | 38   | 🧽   | 48   | 🎤   |
| 9    | 🔧   | 19   | 🔔   | 29   | 💡   | 39   | 🧯   | 49   | 🎥   |

## Docker Hub地址

[wsxxstar/personal_download_web](https://hub.docker.com/repository/docker/wsxxstar/personal_download_web/general)

## GitHub地址

[liang-rising-star/personal_download_web](https://github.com/liang-rising-star/personal_download_web)

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

```
MIT License

Copyright (c) 2026 个人资源下载站

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```