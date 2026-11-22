# Tasks — GalleryHello 一期 UI

Order follows the design doc's development sequence: 公共 Header / Footer / 卡片 → 首页 → Explore → 合集详情 → About / Privacy / Terms → 404 → 响应式与部署验收.

## 1. 设计系统与全局基础

- [x] 1.1 在 `app/globals.css` 用 Tailwind v4 `@theme` 声明全部设计 token：背景 `#101014`、表面 `#1B1B22`、hover `#272730`、主文字 `#F5F2EF`、次文字 `#AAA6AF`、强调 `#C29B84`、分隔线 `#33313A`，并移除脚手架默认的浅色/`prefers-color-scheme` 覆盖
- [x] 1.2 在 `app/layout.tsx` 用 `next/font/google` 注册 Playfair Display（`--font-display`，fallback Georgia）与 Inter（`--font-sans`，fallback system-ui），并接入 `@theme`
- [x] 1.3 建立排版与容器工具：`.container-page`（max-width 1280px，移动 px-4 / 桌面 px-8）、标题层级、`.eyebrow` 次文字大写小标签、`.section-heading` 区块标题
- [x] 1.4 建立图片容器工具：固定 `3:4` aspect-ratio + `object-cover` 的 `.media-3x4`，用于卡片、封面与预览图，防止加载时布局跳动
- [x] 1.5 清理脚手架残留：删除 `public/` 下的 `next.svg`、`vercel.svg`、`file.svg`、`globe.svg`、`window.svg`，删除默认 `app/favicon.ico`（由 `app/icon.tsx` 取代）

## 2. 数据层与本地图片

- [x] 2.1 定义 `lib/types.ts` 的 `Collection` 接口，字段与设计文档一致：`slug`、`title`、`description`、`category`、`coverImage`、`previewImages`、`totalPhotos`、`publishedAt`、`featured?`
- [x] 2.2 编写 `data/collections.json`（6 组合集）与 `data/category.json`（5 个分类，由产品定义：Sweet & Sultry / Office Lady / AI Portraits / Qipao Beauty / JK Fashion）；每组合集具备英文标题、2–3 行英文描述、封面、3 张公开预览图、`publishedAt`、`totalPhotos`，其中 4 组标记 `featured: true`
- [x] 2.3 编写一次性生成脚本，输出 `public/collections/<slug>/` 下的 `cover.jpg`、3 张 `preview-N.jpg` 与 3 张 `locked-N.jpg`，尺寸 3:4（如 900×1200），各合集采用可区分的确定性构图；运行脚本并提交产物
- [x] 2.4 编写 `lib/collections.ts`，导出 `getCollections()`、`getCollectionBySlug(slug)`、`getCategories()`、`getFeaturedCollections()`、`getLatestCollections()`（按 `publishedAt` 倒序）、`getRelatedCollections(slug)`（同分类、排除自身、最多 4 条）
- [x] 2.5 编写 `lib/site-config.ts`，从 `process.env.SITE_CONTACT_EMAIL` 读取联系邮箱（不使用 `NEXT_PUBLIC_`），空值或非邮箱格式返回 `null`；新增 `.env.example` 记录该变量为空值

## 3. 公共组件

- [x] 3.1 编写 `components/layout/header.tsx`：吸顶、`GALLERY HELLO.` Logo（`HELLO.` 用强调色）链接 `/`、导航 `Explore`(`/explore`) 与 `About`(`/about)；移动端为 Logo + 简洁菜单按钮，点击展开同一组导航
- [x] 3.2 编写 `components/layout/footer.tsx`：品牌名 + 简短介绍、导航链接（Explore / About / Privacy Policy / Terms of Service）、自动更新的版权年份、`AI-generated content` 说明；仅在配置了邮箱时渲染 Contact 行
- [x] 3.3 在 `app/layout.tsx` 引入 Header 与 Footer，页面主体使用 flex 撑满剩余高度，使 Footer 稳定贴底
- [x] 3.4 编写 `components/collection/collection-card.tsx`：3:4 封面、标题、分类、图片数量，可选 `New`/`Featured`/`Preview` 标签，hover 轻微放大或提亮，整卡为指向 `/collections/[slug]` 的链接
- [x] 3.5 编写 `components/ui/filter-chip.tsx`（含选中态样式）、`components/ui/empty-state.tsx`（无结果提示 + “View all collections” 操作）、`components/ui/page-title.tsx`（统一标题与说明文字）
- [x] 3.7 编写 `components/collection/collection-grid.tsx`：响应式网格 `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`，间距 `gap-3 lg:gap-5`，数量少时保持正常留白

## 4. 首页 `/`

- [x] 4.1 编写首页 Hero：`CURATED VISUAL COLLECTIONS` eyebrow、品牌短句 `Curated AI Portraits & Visual Stories.`、英文描述、主按钮 `Explore Collections` 指向 `/explore`；不使用视频与全屏轮播
- [x] 4.2 编写 `Featured Collections` 区块：渲染 `getFeaturedCollections()`（4–8 条），区块右上角 `View all` 指向 `/explore`
- [x] 4.3 编写 `Explore by Style` 区块：由 `getCategories()` 渲染分类按钮，跳转 `/explore?category=<slug>`；仅显示存在合集的分类
- [x] 4.4 编写 `Latest Collections` 区块：渲染 `getLatestCollections()`（4–8 条，按发布时间倒序），同样提供 `View all`
- [x] 4.5 确认移动端 Hero 文字缩短、卡片两列排列，不占据整屏

## 5. 探索页 `/explore`

- [x] 5.1 编写 `app/explore/page.tsx`（Server Component）：await `searchParams` 读取 `category`，把完整合集与初始分类传给 Client Component
- [x] 5.2 编写 `components/explore/explore-browser.tsx`（Client Component）：分类筛选行（`All` 默认选中）+ 排序控件（`Newest`、`A–Z`），不提供任何基于热度的排序
- [x] 5.3 实现筛选与排序逻辑：按分类过滤、按发布时间倒序或按标题字母序；切换筛选时用 `history.replaceState` 同步 URL，避免污染历史记录
- [x] 5.4 接入 `CollectionGrid` 渲染结果，并接入 `EmptyState`：无匹配时显示 `No collections found` 与 `View all collections`
- [x] 5.5 验证 `/explore?category=<无效值>` 显示空状态，`/explore?category=<有效值>` 正确高亮对应筛选

## 6. 合集详情 `/collections/[slug]`

- [x] 6.1 编写 `app/collections/[slug]/page.tsx`（Server Component）：await `params` 取 slug，查不到则调用 `notFound()`；用 `PageProps<'/collections/[slug]'>` 标注类型
- [x] 6.2 编写详情页头部：桌面双栏（左侧 3:4 竖幅封面，右侧 eyebrow `COLLECTION / <CATEGORY>`、标题、2–3 行描述、`N Photos · Category` 信息行、`Browse Preview ↓` 按钮），移动端单栏且封面在前
- [x] 6.3 编写 `Preview Gallery` 区块：渲染 3 张公开预览图（3:4），`Browse Preview` 按钮滚动到该区块
- [x] 6.4 编写 `Exclusive Collection` 区块：仅使用独立的 `locked-*.jpg` 占位图 + `Exclusive gallery — unlocking coming soon.` 文案，不含任何可点击解锁按钮、不含进度或用户数量
- [x] 6.5 编写 `components/collection/preview-lightbox.tsx`（Client Component，基于原生 `<dialog>`）：点击预览图打开放大层，支持关闭按钮、Esc 键、点击遮罩三种关闭方式，移动端可关闭且图片不超出视口
- [x] 6.6 编写 `You May Also Like` 区块：渲染 `getRelatedCollections(slug)`（3–4 条），无相关合集时整个区块不渲染
- [x] 6.7 编写 `generateMetadata`：await `params` 后返回该合集独立的 title、description 与 OG 图
- [x] 6.8 验证无效 slug 返回 HTTP 404 并显示 404 页，而非空白页（在 Cache Components 下，页面体内的 `notFound()` 只能产出 404 内容而无法改变状态码，故新增 `proxy.ts` 在响应开始前校验 slug 并以 404 状态改写到 `/_not-found`）

## 7. 关于 / 隐私 / 条款

- [x] 7.1 建立 `components/layout/article-layout.tsx`：约 760px 窄内容列、清晰 H1/H2 层级、行距舒适的英文长文排版，供 About / Privacy / Terms 共用
- [x] 7.2 编写 `/about`：标题 `About Gallery Hello`；内容块 `What You'll Find`（按 `data/category.json` 动态渲染 5 个分类及描述）、`Our Approach`、`Get in Touch`；明确说明作品为 AI 生成；不虚构团队规模与摄影师资历；配置邮箱时渲染 mailto 链接，未配置时不显示占位地址
- [x] 7.3 编写 `/privacy`：包含最后更新日期的英文隐私政策，按实际上线的数据收集、统计、Cookie 与联系邮箱情况撰写；不写入广告/解锁/账号系统收集数据的虚假描述
- [x] 7.4 编写 `/terms`：使用同一长文排版，说明站点使用、AI 生成内容、版权与合理使用、外部链接与免责声明；不描述付费或解锁功能已上线
- [x] 7.5 为三个页面分别配置独立的 title 与 description

## 8. 404 与 SEO

- [x] 8.1 编写 `app/not-found.tsx`：大标题 `Page Not Found`、一句话说明、`Back Home`(`/`) 与 `Explore Collections`(`/explore) 两个可用链接；因在根布局内渲染，自动保留 Header 与 Footer
- [x] 8.2 配置根布局 `metadata`：`metadataBase`、品牌 title 模板、description、OG 默认值，并设置站点语言为英文
- [x] 8.3 编写 `app/icon.tsx`（`ImageResponse` 生成 favicon）与 `app/opengraph-image.tsx`（默认分享图）
- [x] 8.4 编写 `app/robots.ts` 与 `app/sitemap.ts`：sitemap 由 `getCollections()` 生成，包含首页、explore、全部合集详情与三个编辑页

## 9. 验收

- [x] 9.1 运行 `pnpm lint` 与 `pnpm build`（构建会生成 typed-route 类型），确认无错误无告警
- [x] 9.2 运行 `pnpm dev` 走通完整路径：首页 → Explore → 合集详情 → 预览放大层 → About / Privacy / Terms；确认所有可见按钮都能跳转
- [x] 9.3 确认未知路径与失效合集 URL 显示 404 页并保留 Header/Footer
- [x] 9.4 在 375px / 768px / 1280px 三档视口下检查：无横向滚动、无元素重叠、图片比例均为 3:4，网格分别为 2 / 3 / 4 列
- [x] 9.5 确认所有图片 URL 可打开，页面无破图，无虚构占位内容
- [x] 9.6 全站检查不存在可点击但无结果的解锁按钮、登录、收藏、支付、搜索入口
- [x] 9.7 检查页面标题、SEO 描述、OG 图、sitemap、robots 均已配置
- [x] 9.8 在 `galleryhello.com` 部署后实机复检首页、详情页与导航
