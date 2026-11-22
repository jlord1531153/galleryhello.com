# GalleryHello — 一期 UI 设计文档（可上线展示版）

**版本：** V1.0 · Phase 1 UI  
**项目域名：** `galleryhello.com`  
**目标：** 用最少的页面做出一套完整、可部署、可浏览的英文图库网站。访客从首页进入，能浏览合集、打开详情、查看公开预览，并访问网站说明和政策页面。**一期只做网站展示与 UI，不接入 CPA 解锁、会员、支付或管理后台。**

---

## 1. 一期交付范围：6 个页面 + 404

| 优先级 | 页面 | 路由 | 一期要求 |
|---|---|---|---|
| P0 | **首页 Home** | `/` | 品牌形象、精选合集、最新合集、分类入口 |
| P0 | **探索页 Explore** | `/explore` | 展示全部合集；分类筛选、排序可在前端完成 |
| P0 | **合集详情 Collection Detail** | `/collections/[slug]` | 封面、标题、简介、图片预览、合集信息、相关合集 |
| P0 | **关于我们 About** | `/about` | 说明网站做什么、内容类型、联系渠道 |
| P0 | **隐私政策 Privacy** | `/privacy` | 真实适用的英文隐私政策 |
| P0 | **使用条款 Terms** | `/terms` | 真实适用的英文使用条款 |
| P0 | **404** | `not-found` | 无效地址/失效合集展示返回首页和 Explore 的入口 |

**一期开站不单独做**：分类详情页、搜索结果页、FAQ、联系表单、用户注册登录、收藏、个人中心、解锁任务页、支付页、后台管理、邮件管理页面。分类通过 `/explore?category=...` 实现；联系渠道通过 About/Footer 的有效邮箱链接实现。

> **重要：** 一期的“Locked”仅是视觉预告。未接入解锁功能时，不显示可点击但无结果的“Unlock Now”按钮，不伪造解锁成功、用户数量或任务完成状态。可以展示 `Unlocking coming soon` 提示；二期再替换为真正的操作。

---

## 2. 统一视觉规范

### 2.1 风格定位

**Dark Editorial Gallery / 暗色摄影杂志风**：视觉重心放在 AI 人像、时尚写真和 Cosplay 作品。现代、克制、精致，不做艳丽游戏站、瀑布广告站或 SaaS 后台风。

- 网站语言：**英文**。
- Logo 文案：`GALLERY HELLO.`；`HELLO.` 可用暖棕点缀。
- 品牌短句：`Curated AI Portraits & Visual Stories.`
- 设计关键词：深色底、精致英文标题、竖幅大图、细分割线、少量暖色强调、充足留白。

### 2.2 设计 Token

| 角色 | 建议值 | 用途 |
|---|---|---|
| 主背景 | `#101014` | 全站页面 |
| 表面背景 | `#1B1B22` | 卡片、下拉区域 |
| Hover 背景 | `#272730` | 交互反馈 |
| 主文字 | `#F5F2EF` | 标题、重要信息 |
| 次文字 | `#AAA6AF` | 描述、辅助标签 |
| 强调色 | `#C29B84` | 主操作、选中态、小装饰 |
| 分隔线 | `#33313A` | Header、Footer、卡片边界 |
| 标题字体 | `Playfair Display` / `Georgia` | Hero 与大标题 |
| UI 字体 | `Inter` / `system-ui` | 导航、正文、按钮 |
| 内容最大宽度 | `1280px` | 页面主体 |
| 卡片圆角 | `12px` | 图卡 |
| 主要图片比例 | `3:4` | 图库卡片，统一尺寸 |

**响应式：** 手机 `< 640px` 每行 2 张卡；平板 `640–1023px` 每行 3 张；桌面 `≥ 1024px` 每行 4 张。间距手机 12px、桌面 20px。页面内容左右留白手机 16px、桌面 32px。图片使用固定宽高比容器和 `object-cover`，减少布局跳动。

---

## 3. 公共组件（一期仅做一次，全站复用）

### Header

- 左：`GALLERY HELLO.` Logo，点击返回 `/`。
- 右：`Explore`、`About`；移动端 Logo + 简洁菜单按钮。
- 可做吸顶 Header；滚动时仍保持清楚，不覆盖内容。
- **不放**登录、充值、邮箱转发或未开放的搜索按钮。

### Footer

- 第一行：品牌名 + 简短介绍。
- 导航：`Explore`、`About`、`Privacy Policy`、`Terms of Service`。
- 联系：可正常收件的业务邮箱（地址实际配置后再上线；不要放无效示例地址）。
- 底部：版权年份自动更新；可增加 `AI-generated content` 说明。

### CollectionCard（合集卡片）

- 3:4 封面；Hover 轻微放大或提高亮度。
- 下方：合集标题、分类、图片数量。
- 可选小标签：`New`、`Featured`、`Preview`；不要虚构浏览量。
- 整张卡都可点击，进入 `/collections/[slug]`。

### PageTitle / FilterChip / EmptyState

- 统一标题、说明文字、分类按钮、无结果提示。
- 分类筛选必须有真实响应；没有分类数据的入口不显示。

---

## 4. 页面详细 UI

### P01 首页 `/`

**目标：** 一眼看出这是高品质图库，并引导访客进入内容。

**桌面结构：**

```text
┌─────────────────────────────────────────────────────────────┐
│ GALLERY HELLO.                              Explore  About │
├─────────────────────────────────────────────────────────────┤
│ CURATED VISUAL COLLECTIONS                                  │
│ Discover Beautiful Visual Stories.                          │
│ Explore curated AI portraits, cosplay and creative imagery. │
│ [ Explore Collections ]                                     │
├─────────────────────────────────────────────────────────────┤
│ Featured Collections                               View all │
│ [   封面   ] [   封面   ] [   封面   ] [   封面   ]          │
│ 名称/数量    名称/数量    名称/数量    名称/数量             │
├─────────────────────────────────────────────────────────────┤
│ Explore by Style                                            │
│ [AI Portraits] [Cosplay] [Cinematic] [Fashion]             │
├─────────────────────────────────────────────────────────────┤
│ Latest Collections                                 View all │
│ [   封面   ] [   封面   ] [   封面   ] [   封面   ]          │
├─────────────────────────────────────────────────────────────┤
│ Footer  | Explore  About  Privacy  Terms  Contact           │
└─────────────────────────────────────────────────────────────┘
```

- Hero 不需要视频和全屏轮播；突出品牌标题与一个主按钮。
- Featured 建议 4–8 张真实合集卡片。
- Explore by Style 的分类按钮直接跳到 `/explore?category=xxx`。
- Latest 显示 4–8 张，按发布时间倒序。
- 移动端 Hero 文字缩短，卡片两列排列；无需占据整屏的横幅。

### P02 探索页 `/explore`

**目标：** 让用户浏览全部内容并找到感兴趣的合集。

```text
[Explore Collections]
Discover portraits, creative concepts and visual stories.

[All] [AI Portraits] [Cosplay] [Fashion] [Cinematic]
Sort by: [Newest ▾]

[封面] [封面] [封面] [封面]
[封面] [封面] [封面] [封面]

[Load More / Pagination]
```

- `All` 默认选中；分类变化后应只展示对应内容。
- 一期排序最少 `Newest`，有需要再加 `A–Z`；不添加没有真实统计依据的 `Most Popular`。
- 采用 4/3/2 列响应式网格；数量少时也要有正常的留白布局。
- 第一版可使用前端 JSON 数据 + 客户端筛选；列表数量增大后再改服务端分页。
- 空结果显示 `No collections found` 和 `View all collections`。

### P03 合集详情 `/collections/[slug]`

**目标：** 展示一个完整主题，让用户愿意继续浏览。

```text
Home / Explore / Collection Title

┌───────────────────┬─────────────────────────────────┐
│                   │ COLLECTION / AI PORTRAITS       │
│   竖幅主封面       │ Midnight Elegance               │
│       3:4         │ 一段 2–3 行英文介绍             │
│                   │ 12 Photos · AI Portraits        │
│                   │ [Browse Preview ↓]             │
└───────────────────┴─────────────────────────────────┘

Preview Gallery
[公开图 01] [公开图 02] [公开图 03]

Exclusive Collection
[锁定占位] [锁定占位] [锁定占位]
Unlocking coming soon.

You May Also Like
[相关合集] [相关合集] [相关合集]

Footer
```

- 桌面封面与文字双栏；手机单栏，封面在前。
- 图片预览点击后可打开**简单可关闭的放大查看层**（支持返回、Esc 键、手机关闭）；这是一项一期 UI 交互。
- 公开预览展示真实可访问的图片。未解锁区域**只放独立占位封面或低清预览**，不把高清原图嵌入 DOM 后仅用 CSS 模糊。
- 一期未接 CPA 平台，所以提示 `Exclusive gallery — unlocking coming soon`，不出现虚假的解锁按钮或假任务页面。
- 相关合集显示 3–4 项，没有关联内容则隐藏整个区域。
- 找不到 slug 时正确返回 404，而不是空白页面。

### P04 关于页 `/about`

- 标题：`About Gallery Hello`
- 简洁介绍网站是 AI 人像和创意视觉作品集展示平台。
- 内容块：`What You'll Find`（Portraits / Cosplay / Creative Collections）、`Our Approach`、`Get in Touch`。
- 如页面中作品为 AI 生成，应清楚说明；不要虚构团队规模或摄影师资历。
- 联系方式使用真实邮箱 `mailto:` 链接；若邮箱尚未配置，暂时不展示假地址。

### P05 隐私政策 `/privacy`

- 英文长文阅读排版：窄内容区（约 760px）、清晰 H1/H2、最后更新日期。
- 内容必须按实际上线的数据收集、统计、Cookie、联系邮箱等情况填写。
- **不直接使用虚假的通用条款**；如果尚未接入广告/解锁/账号系统，不要提前写成已实际收集这些数据。

### P06 使用条款 `/terms`

- 与隐私页共用文章排版组件。
- 说明站点使用、AI 生成内容、版权与合理使用、外部链接及免责声明等实际适用事项。
- 未提供付费或解锁服务前，不写成这些功能已上线。

### 404 页面

- 大标题：`Page Not Found`
- 一句话说明；两个真实可用的链接：`Back Home` / `Explore Collections`。
- 保留 Header 与 Footer，避免视觉断层。

---

## 5. 一期导航与页面跳转

```text
首页 /
 ├─ Header Explore ───────────> /explore
 ├─ Hero Explore Collections ─> /explore
 ├─ 分类快捷入口 ──────────────> /explore?category=...
 ├─ Featured/Latest 卡片 ─────> /collections/[slug]
 └─ Footer ───────────────────> /about /privacy /terms

/explore
 └─ 任意合集卡片 ──────────────> /collections/[slug]

/collections/[slug]
 ├─ Browse Preview ──────────> 当前页预览区
 ├─ 预览图片 ────────────────> 图片放大层
 └─ 相关合集 ────────────────> 其他合集详情
```

**验收规则：** 一期前台所有可点击按钮都必须有真实结果；未实现的功能不显示可操作入口。

---

## 6. 一期内容准备（没有后端也能部署）

- 准备 **6–12 组合集**作为初始内容；每组至少有：`slug`、英文标题、英文描述、分类、封面、3 张可公开的预览图、发布时间、显示用总图片数（须与实际内容计划一致）。
- 图片可使用已建的 Cloudflare R2 公共桶，也可初期用项目 `public/` 文件夹；不要使用失效图床地址。
- 配置有意义的首页标题、每个合集独立的 `title` / `description` 与 OG 图。
- 分类先控制在 3–5 个，避免内容数量少却出现大量空分类。
- 不要求 D1、管理后台、用户登录、CPA 回调或私有图片鉴权上线。

**推荐 UI 数据结构（只说明页面需要哪些字段）：**

```ts
interface Collection {
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  previewImages: string[];
  totalPhotos: number;
  publishedAt: string;
  featured?: boolean;
}
```

---

## 7. 一期明确不做的功能（二期再讨论）

| 功能 | 一期处理 |
|---|---|
| CPAlead / Offerwall 解锁 | 不接，详情页只放未开放提示 |
| 解锁成功 / 回调 / 授权 | 不做，不展示假成功页 |
| 用户登录 / 收藏 / 历史 | 不做，不显示相关入口 |
| 付费订阅 / Patreon 支付 | 不做；若需品牌外链后续单独决定 |
| 管理后台 / 图库上传 | 不做，先用 JSON 手工维护 |
| 搜索结果独立页面 | 不做，先靠探索页分类筛选 |
| 分类独立详情页 | 不做，统一在 Explore 过滤 |
| 邮箱转发前台页面 | 不做；邮箱转发属于域名服务配置，与图库 UI 无关 |
| 后台数据统计 / 图表 | 不做 |

---

## 8. 一期 UI 上线验收清单

- [ ] `/` 首页不是空页，Logo、Hero、合集卡片都已完成。
- [ ] `/explore` 可以浏览全部合集，分类筛选有实际效果。
- [ ] `/collections/[slug]` 详情页有封面、简介、公开图片、相关内容。
- [ ] 预览大图可以打开、关闭，手机上可正常使用。
- [ ] `/about`、`/privacy`、`/terms` 有真实英文内容。
- [ ] 失效合集 URL 和未知路径显示 404。
- [ ] PC、平板、手机均无横向滚动、重叠和图片比例异常。
- [ ] Header、Footer 和所有可见按钮都能正常跳转。
- [ ] 未上线的解锁功能不出现误导性可点击按钮。
- [ ] 所有图片 URL 都可打开，页面没有破图或虚假占位内容。
- [ ] 配置 favicon、页面标题、SEO 描述、OG 分享图、sitemap/robots（按需要）。
- [ ] 部署到 `galleryhello.com` 后实机检查首页、详情页和导航。

---

## 9. 一期完成的最终效果

**一个已经具备品牌风格、可公开访问的英文 AI 图片画廊网站。** 访客能够完整走通“首页 → 探索页 → 合集详情 → 图片预览”，且 About / Privacy / Terms / 404 等基础页面齐全。**不要求一期上线真正解锁或任何管理后台。**

> 开发顺序：公共 Header / Footer / 卡片 → 首页 → Explore → 合集详情 → About / Privacy / Terms → 404 → 响应式与部署验收。
