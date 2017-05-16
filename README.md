# dowjones-project
dowjones share visualization project in react

#### 地址 https://github.com/superSamChow/dowjones-project.git

#### 运行 

first, `npm install`

开发模式： `npm start`

生产模式： 暂无

## 技术栈

  1. webpack2.x （一不小心就用了2.x，发现各种不适应啊！）
  2. react + redux + react-router + react-router-redux (我想知道为何react全家桶里有这么多套餐😭)
  3. ant-design （好用！）
  4. plottablejs
  5. express

## client/src目录简介
      ├── app.js                        # 项目入口
      ├── app.scss
      ├── components                    # 展示型组件
      │   ├── Detail                    # 详细数据页相关
      │   │   ├── DateRange.js
      │   │   ├── DetailListRedux.js
      │   │   ├── Details.js
      │   │   ├── DowjonesChart.js
      │   └── Home                      # 列表页相关
      │       ├── PreviewList.js
      │       └── PreviewListRedux.js
      ├── containers                    # 后期添加devtool
      ├── index.tpl.html                # html模板
      ├── layouts                       # 布局组件
      │   └── Frame.js 
      ├── redux                         # redux
      │   ├── configureStore.js         # store配置
      │   ├── middleware                # 自定义middleware
      │   │   └── redux-composable-fetch.js
      │   └── reducers.js               # 全局reducer
      ├── routes                        # 路由管理
      │   └── index.js
      ├── styles                        
      ├── utils                         # 工具函数等
      │   └── chart.js 
      └── views                         # 容器组件和redux
          ├── Detail.js
          ├── Detail.scss
          ├── DetailRedux.js
          ├── Home.js
          ├── Home.scss
          └── HomeRedux.js

