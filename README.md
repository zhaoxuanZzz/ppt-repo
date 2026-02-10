# PPT 资源管理仓库

这是一个基于 Reveal.js 和 GitHub Pages 的在线演示文稿管理系统。所有的演示文稿都以 HTML 格式存储，通过自动化脚本生成索引页面，方便浏览和访问。

## 📁 项目结构

```
ppt-repo/
├── index.html              # 自动生成的索引页（不要手动编辑）
├── .nojekyll              # GitHub Pages 配置
├── package.json           # 项目配置
├── presentations/         # 所有演示文稿目录
│   └── welcome-to-reveal/ # 示例演示文稿
│       ├── index.html     # PPT 文件
│       ├── metadata.json  # 元数据
│       └── thumbnail.png  # 缩略图
├── templates/             # 模板文件
│   ├── presentation-template.html  # PPT 模板
│   ├── metadata-template.json      # 元数据模板
│   └── index-template.html         # 索引页模板
├── scripts/               # 构建脚本
│   └── generate-index.js  # 索引生成脚本
├── assets/                # 共享资源
│   └── css/
│       └── custom.css     # 自定义样式
└── README.md              # 项目说明
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone <你的仓库地址>
cd ppt-repo
```

### 2. 安装依赖

```bash
npm install
```

### 3. 本地预览

```bash
npm run dev
```

访问 http://localhost:8080 查看索引页。

## 📝 添加新的演示文稿

### 方法一：使用模板（推荐）

1. **创建新目录**

```bash
mkdir presentations/my-new-presentation
```

2. **复制模板文件**

```bash
cp templates/presentation-template.html presentations/my-new-presentation/index.html
cp templates/metadata-template.json presentations/my-new-presentation/metadata.json
```

3. **编辑元数据**

编辑 `presentations/my-new-presentation/metadata.json`：

```json
{
  "id": "my-new-presentation",
  "title": "我的新演示文稿",
  "description": "这是一个关于...的演示文稿",
  "author": "你的名字",
  "date": "2026-02-10",
  "tags": ["技术", "教程"],
  "thumbnail": "thumbnail.png",
  "slides": 15,
  "language": "zh-CN",
  "category": "教程"
}
```

4. **编辑 PPT 内容**

编辑 `presentations/my-new-presentation/index.html`，替换模板中的占位符和内容。

5. **添加缩略图**

创建或添加 `thumbnail.png` 文件（推荐尺寸：800x600）。

6. **生成索引**

```bash
npm run build
```

### 方法二：手动创建

直接在 `presentations/` 下创建新目录，包含以下文件：
- `index.html` - PPT 文件
- `metadata.json` - 元数据
- `thumbnail.png` - 缩略图（可选）

## 🛠️ npm 脚本

| 命令 | 说明 |
|------|------|
| `npm run build` | 扫描 presentations/ 目录并生成 index.html |
| `npm run dev` | 启动本地开发服务器（端口 8080） |
| `npm run deploy` | 构建并推送到 GitHub |

## 🌐 GitHub Pages 部署

### 1. 推送到 GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 配置 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. 点击 Save

### 3. 访问网站

几分钟后，你的演示文稿集合将在以下地址可访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

## 🎨 自定义样式

### 全局样式

编辑 `assets/css/custom.css` 可以自定义所有演示文稿的全局样式。

### 单个演示文稿样式

在单个 PPT 的 HTML 文件中添加 `<style>` 标签或引用外部 CSS 文件。

### 索引页样式

编辑 `templates/index-template.html` 可以自定义索引页的外观。修改后需要运行 `npm run build` 重新生成。

## 📚 Reveal.js 使用指南

### 基本导航

- ⬅️➡️ **方向键**：切换幻灯片
- **空格**：下一张幻灯片
- **ESC**：幻灯片概览
- **S**：打开演讲者备注
- **Alt + 点击**：放大内容

### 幻灯片结构

```html
<div class="slides">
    <!-- 水平幻灯片 -->
    <section>内容 1</section>
    
    <!-- 垂直幻灯片组 -->
    <section>
        <section>主题 2</section>
        <section>子主题 2.1</section>
        <section>子主题 2.2</section>
    </section>
</div>
```

### 常用功能

#### 代码高亮

```html
<pre><code class="javascript" data-trim data-line-numbers>
function hello() {
    console.log('Hello!');
}
</code></pre>
```

#### Markdown 支持

```html
<section data-markdown>
    <textarea data-template>
        ## 标题
        - 列表项 1
        - 列表项 2
    </textarea>
</section>
```

#### 片段（逐步显示）

```html
<ul>
    <li class="fragment">第一项</li>
    <li class="fragment">第二项</li>
    <li class="fragment">第三项</li>
</ul>
```

## 🔧 高级配置

### 修改 Reveal.js 配置

在 PPT 的 HTML 文件中修改初始化参数：

```javascript
Reveal.initialize({
    hash: true,
    transition: 'slide',      // 过渡效果：none/fade/slide/convex/concave/zoom
    transitionSpeed: 'fast',  // 速度：default/fast/slow
    controls: true,           // 显示控制按钮
    progress: true,           // 显示进度条
    center: true,             // 垂直居中
    slideNumber: true,        // 显示幻灯片编号
    // ... 更多配置
});
```

### 使用不同主题

修改 HTML 中的主题 CSS 链接：

```html
<!-- 可选主题：black, white, league, beige, sky, night, serif, simple, solarized -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/theme/white.css">
```

## 📖 元数据字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | String | ✅ | 唯一标识符 |
| `title` | String | ✅ | 演示文稿标题 |
| `description` | String | ✅ | 简短描述 |
| `author` | String | ❌ | 作者姓名 |
| `date` | String | ✅ | 日期（YYYY-MM-DD） |
| `tags` | Array | ❌ | 标签列表 |
| `thumbnail` | String | ❌ | 缩略图文件名 |
| `slides` | Number | ❌ | 幻灯片数量 |
| `language` | String | ❌ | 语言代码 |
| `category` | String | ❌ | 分类 |

## 🤝 贡献

欢迎贡献新的演示文稿模板或改进现有功能！

## 📄 许可证

MIT License

## 🔗 相关链接

- [Reveal.js 官方文档](https://revealjs.com/)
- [Reveal.js GitHub](https://github.com/hakimel/reveal.js)
- [GitHub Pages 文档](https://docs.github.com/pages)

---

**提示**：每次添加或修改演示文稿后，记得运行 `npm run build` 更新索引页！
