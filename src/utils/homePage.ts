import image1 from '@/assets/images/homePage/1.png';
import image2 from '@/assets/images/homePage/2.png';
import image3 from '@/assets/images/homePage/3.png';
import image4 from '@/assets/images/homePage/4.png';
import image5 from '@/assets/images/homePage/5.png';
import image6 from '@/assets/images/homePage/6.png';
import image7 from '@/assets/images/homePage/7.png';
import image8 from '@/assets/images/homePage/8.png';

//#region 改变文本
export const locale_zh: any = {
  "attributes": {
    "Link Block": "链接块",
    "Quote": "引用",
    "Text section": "文本部分",
    "1 Column": "一列",
    "2 Columns": "两列",
    "3 Columns": "三列",
    "2 Columns 3/7": "两列 3/7",
    "Text": "文本",
    "Link": "链接",
    "Image": "图片",
    "Video": "视频",
    "Map": "地图",
    "Faq": "常见问题",
    "Heading": "标题",
    "Paragraph": "段落",
    "List": "列表",
    "Divider": "分隔线",
    "Button": "按钮",
    "Slider": "滑块",
    "Progress Bar": "进度条",
    "Checkbox": "复选框",
    "Radio": "单选框",
    "Input": "输入框",
    "Select": "下拉框",
    "Textarea": "文本区域"
  },

  changed: {
    "Basic": "基础",
    "Text": "文本",
    "Custom": "自定义",
    "Media": "媒体",
    "Form": "表单"
  }
}

export const updataText = (list: any) => {
  list.forEach((item: any) => {
    // 替换块的文字
    // attributes里有的label只有文字有点是html代码片段
    if (item.attributes.label?.includes('gjs-block-label')) {
      const match = item.attributes.label?.match(/<div class="gjs-block-label">\s*(.*?)\s*<\/div>/);
      item.attributes.label = item.attributes.label?.replace(new RegExp(match[1], 'g'), locale_zh.attributes[match[1]]);
    } else {
      item.attributes.label = locale_zh.attributes[item.attributes.label] ?? item.attributes.label;
    }
    // 替换类别的文字
    if (item.changed?.category?.attributes?.label) {
      item.changed.category.attributes.label = locale_zh.changed?.[item.changed.category.attributes.label] ?? item.changed.category.attributes.label;
    }
  });
};

//#endregion


//#region 添加自定义块
const footerHtml = `
<div>
<style>

    * {
      padding: 0;
      margin: 0;
    }

    ul {
      list-style: none;
    }


    .w80auto {
      display: block;
      width: 80%;
      margin: auto;
    }

    .f-right {
      float: right;
    }

    .fx-b {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .fx-e {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    .fx-s {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .fx-t {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .divp {
      padding: 80px 0;
    }

    .title {
      margin: 25px;
      font-weight: normal;
      text-align: center;
    }

    .titlep {
      padding: 25px;
      font-size: 20px;
      font-weight: normal;
      text-align: center;
    }

    .bgf {
      background-color: #fff;
    }

    .hui {
      color: #979797;
    }

    .divm {
      padding: 50px 0;
    }


    footer {
      background-color: #3b3b3b;
    }

    footer > div {
      padding: 20px 0;
    }

    footer > div ul {
      color: #8d8d8d;
    }

    footer > div ul li {
      padding: 5px 0;
    }

    footer > div ul li img {
      height: 20px;
    }

    footer > div ul li:nth-child(1) {
      padding: 20px 0;
      color: #fff;
    }

    .foot {
      background-color: #242424;
    }

    .foot p {
      padding: 10px 0;
      color: #8d8d8d;
      text-align: center;
    }

        </style>
<footer>
  <div class="fx-s w80auto">
    <ul>
      <li>友情链接</li>
      <li>小米开放平台</li>
      <li>小米1oT开发者平台</li>
      <li>小米生态云</li>
      <li>小米商城</li>
    </ul>
    <ul>
      <li>开发支持</li>
      <li>文档中心</li>
      <li>常见问题</li>
      <li>小爱同学论坛</li>
    </ul>
    <ul>
      <li>技能开放平台</li>
      <li>首页</li>
      <li>控制台</li>
      <li>新手指南</li>
    </ul>
    <ul>
      <li>语音服务开放平台</li>
      <li>首页</li>
      <li>控制台</li>
      <li>新手指南</li>
    </ul>
    <ul>
      <li>联系我们</li>
      <li>邮箱：xiaoai(@xiaomi..com</li>
      <li>
        小爱同学微博
        <img
          alt=""
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ1ODY4OTM0NDEyMTFFNzk5OENEOTE4NkYzOUQ5QkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDQ1ODY4OTI0NDEyMTFFNzk5OENEOTE4NkYzOUQ5QkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MTc1QTM2ODQxQzMxMUU3OTk4Q0Q5MTg2RjM5RDlCRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MTc1QTM2OTQxQzMxMUU3OTk4Q0Q5MTg2RjM5RDlCRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvXKHycAABh8SURBVHja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"
        />
      </li>
      <li>
        小爱同学微信
        <img
          alt=""
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ1ODY4OTc0NDEyMTFFNzk5OENEOTE4NkYzOUQ5QkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDQ1ODY4OTY0NDEyMTFFNzk5OENEOTE4NkYzOUQ5QkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MTc1QTM3MDQxQzMxMUU3OTk4Q0Q5MTg2RjM5RDlCRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MTc1QTM3MTQxQzMxMUU3OTk4Q0Q5MTg2RjM5RDlCRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrtuMd4AABPXSURBVHja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"
        />
      </li>
    </ul>
  </div>
</footer>
<div class="foot">
  <p>小米科技|京1CP证110507号|京1CP备10046444号|京公网安备11010802020134号</p>
</div>
</div>
`

const wxHtml = `<body>
<style type="text/css">
    * {
        margin:0;
        padding:0;
    }    /* 通配符 删除浏览器默认值 */
    ul {
        list-style:none;   /* 取消项目符号样式 */
    }
    body {
        overflow-x:hidden;
        background-color:rgba(250,250,250,1);
        font-family: 'Helvetica Neue', 'Helvetica', 'Microsoft Yahei', sans-serif;/* 字体集 */
    }
    @media (min-width: 601px){ /* >=601的设备*/


    .top_info {
      width: 100%;
      height: 600px;
      position: relative;

    }

    .top_info:after {
        background-color: #2aae67;
        content: '';
        width: 160%;
        height: 650px;
        position: absolute;
        left: -30%;
        top: 0;
        z-index: -1;
        border-radius: 0 0 50% 50%;
    }
    .top_info .top-text {
        height: 130px;
        width: 620px;
        margin-top: 40px;
        margin-right: auto;
        margin-left: auto;
        font-size: 0.87em;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #f2f2f2;
        line-height: 32px;
        color: #f2f2f2;
        padding-top: 18px;
        text-align: justify;

    }
    .top_info .round_div_all {
        height: 120px;
        width: 700px;
        margin-right: auto;
        margin-left: auto;
        padding-top: 5px;
        display: -webkit-flex;/* 定义内部为弹性布局 */
        display: flex;    /* 定义内部为弹性布局 */
        flex-wrap: wrap;    /* 让弹性盒元素在需要的时候拆列 */
        justify-content: space-around;    /* （横轴）方向上均匀排列每个元素 */
    }
    .mian01 {
        width: 850px;
        margin-top: 40px;
        margin-right: auto;
        margin-left: auto;
        padding-top: 40px;
        padding-bottom: 40px;
        overflow: hidden;     /* 防止塌陷 */
        display: -webkit-flex;/* 定义内部为弹性布局 */
        display: flex;    /* 定义内部为弹性布局 */
        flex-wrap: wrap;    /* 让弹性盒元素在需要的时候拆列 */
        justify-content: space-around;    /* （横轴）方向上均匀排列每个元素 */
    }
    .square_div {
        float: left;
        height: 160px;
        width: 180px;
        margin-top: 30px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px 5px rgba(152,152,152,0.07);/* 设置一个阴影 颜色 透明度 */
        cursor: pointer;   /* 鼠标在此处的效果为“小手”样式 */
        margin-right: auto;
        margin-left: auto;
    }
    }
    @media (max-width: 600px){ /*响应式 <=600的设备使用如下css样式表 */


    .top_info {
      width: 100%;
      height: 750px;
      background-color: #2aae67;
      border-bottom-left-radius: 60% 15%;
      border-bottom-right-radius: 60% 15%;
    }
    .top_info .top-text {
        height: 130px;
        width: 80%;
        margin-top: 40px;
        margin-right: auto;
        margin-left: auto;
        font-size: 0.87em;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #f2f2f2;
        line-height: 32px;
        color: #f2f2f2;
        padding-top: 18px;
        text-align: justify;

    }
    .top_info .round_div_all {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
        padding-top: 40px;
        display: -webkit-flex;/* 定义内部为弹性布局 */
        display: flex;    /* 定义内部为弹性布局 */
        flex-wrap: wrap;    /* 让弹性盒元素在需要的时候拆列 */
        justify-content: space-around;    /* （横轴）方向上均匀排列每个元素 */
    }
    .mian01 {
        width: 90%;
        margin-right: auto;
        margin-left: auto;
        text-align:center;
        padding-top: 40px;
        padding-bottom: 40px;
        overflow: hidden;     /* 防止塌陷 */
        display: -webkit-flex;/* 定义内部为弹性布局 */
        display: flex;    /* 定义内部为弹性布局 */
        flex-wrap: wrap;    /* 让弹性盒元素在需要的时候拆列 */
        justify-content: space-around;    /* （横轴）方向上均匀排列每个元素 */
    }
    .square_div {
        float: left;
        height: 142px;
        width: 160px;
        margin-top: 30px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px 5px rgba(152,152,152,0.07);/* 设置一个阴影 颜色 透明度 */
        cursor: pointer;   /* 鼠标在此处的效果为“小手”样式 */
        margin-right: auto;
        margin-left: auto;
    }
    }

    .top_info .login {
        height: 22px;
        width: 45px;
        margin-top: 1%;
        float: left;
        margin-left: 91%;
        font-size: 0.9em;
        letter-spacing:3px;
    }
    .top_info .logo {
        height: 64px;
        width: 200px;
        margin-right: auto;
        margin-left: auto;
        padding-top: 120px;
    }
    .top_info .logo img:hover {
    opacity : 0.8;
    }
    .top_info .round_div_all .round_div {
        float: left;
        height: 110px;
        width: 110px;
        margin-top: 30px;
        border-radius: 50%;
        background-color: #39b472;
        cursor: pointer;   /* 鼠标在此处的效果为“小手”样式 */
        margin-left: 25px;
        margin-right: 25px;
    }
    .top_info .round_div_all .round_div:hover {

        background-color: #4aba7e;
        transition-duration: 0.3s;/* 缩放的过渡时间 */
    }
    .top_info .round_div_all .round_div .r-s01 {
        height: 40px;
        width: 40px;
        margin-top: 20px;
        margin-right: auto;
        margin-left: auto;
    }
    .top_info .round_div_all .round_div .r-s02 {
        height: 25px;
        width: 90px;
        margin-top: 10px;
        margin-right: auto;
        margin-left: auto;
        font-size: 0.8em;
        color: #f2f2f2;
        text-align: center;
    }




    .square_div:hover {
        -webkit-transform:scale(1.11,1.11);
        -moz-transform:scale(1.11,1.11);
        -transform:scale(1.11,1.11);
        transition-duration: 0.5s;/* 缩放的过渡时间 */
    }
    .square_div .s-s01 {
        height: 43px;
        width: 43px;
        margin-top: 38px;
        margin-right: auto;
        margin-left: auto;
    }
    .square_div .s-s02 {
        height: 25px;
        width: 120px;
        margin-top: 18px;
        margin-right: auto;
        margin-left: auto;
        font-size: 0.9em;
        color: #1a1a1a;
        text-align: center;
    }
    .down {
        background-color: #ffffff;
        text-align: center;
        height: 50px;
        width: 100%;
        padding-top: 40px;
        padding-bottom: 40px;
        margin-top: 40px;
    }
    .f82 {
        font-size: 0.82px;
        color: #4c4c4c;
        line-height: 28px;
        letter-spacing:1px;
    }
    .f75 {
        font-size: 0.75px;
        color: #a0a2a0;
        line-height: 30px;
        letter-spacing:1px;
    }


    a:link {
        color: #ffffff;
        text-decoration: none;
    }
    a:visited {
        text-decoration: none;
        color: #ffffff;
    }
    a:hover {
        text-decoration: none;
        color: #ececec;
    }
    a:active {
        text-decoration: none;
    }
    .banquan {
        height: 36px;
        width: 1000px;
        margin-right: auto;
        margin-left: auto;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #f2f2f2;
        background-image: url(http://cdn.psdhtml.cn/wx_images/wx_lxidw7.svg);
        background-color: #FFF;
    }
    </style>
<!-- 此源码由 http://www.psdhtml.cn/ 大设计师论坛独家编写，禁止转售 -->
<div class="top_info">
<div class="login"><a href="#">登录</a></div>
<div class="logo"><a href="http://www.psdhtml.cn/index.php?c=thread&fid=18?wx01sy" target="_blank"><img src="http://cdn.psdhtml.cn/wx_images/logo.png" width="200" height="64"></a></div>
<div class="top-text">我们支持跨通信运营商、跨操作系统平台通过网络快速发送免费（需消耗少量网络流量）语音短信、视频、图片和文字，同时，也可以使用通过共享流媒体内容的资料和基于位置的社交插件“摇一摇”、“圈子”、”公众平台“、”语音记事本“等服务插件。</div>
<div class="round_div_all">
<div class="round_div">
<div class="r-s01"><a href="http://www.psdhtml.cn/index.php?c=thread&fid=18?wx01sy" target="_blank"><img src="http://cdn.psdhtml.cn/wx_images/icon01.png" width="40" height="40"></a></div>
<div class="r-s02">Android</div>
</div>

<div class="round_div">
<div class="r-s01"><a href="http://www.psdhtml.cn/index.php?c=thread&fid=18?wx01sy" target="_blank"><img src="http://cdn.psdhtml.cn/wx_images/icon02.png" width="40" height="40"></a></div>
<div class="r-s02">IOS</div>
</div>

<div class="round_div">
<div class="r-s01"><a href="http://www.psdhtml.cn/index.php?c=thread&fid=18?wx01sy" target="_blank"><img src="http://cdn.psdhtml.cn/wx_images/icon03.png" width="40" height="40"></a></div>
<div class="r-s02">Windows</div>
</div>

<div class="round_div">
<div class="r-s01"><a href="http://www.psdhtml.cn/index.php?c=thread&fid=18?wx01sy" target="_blank"><img src="http://cdn.psdhtml.cn/wx_images/icon04.png" width="40" height="40"></a></div>
<div class="r-s02">Harmony OS</div>
</div>
</div>
</div>

<div class="mian01">

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_01.svg" width="43" height="43"></div>
<div class="s-s02">We支付</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_02.svg" width="43" height="43"></div>
<div class="s-s02">公Z号</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_03.svg" width="43" height="43"></div>
<div class="s-s02">小程序</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_04.svg" width="43" height="43"></div>
<div class="s-s02">视频号助手</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_05.svg" width="43" height="43"></div>
<div class="s-s02">小游戏</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_06.svg" width="43" height="43"></div>
<div class="s-s02">小商店</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_07.svg" width="43" height="43"></div>
<div class="s-s02">表情开放平台</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_08.svg" width="43" height="43"></div>
<div class="s-s02">搜一搜开放平台</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_09.svg" width="43" height="43"></div>
<div class="s-s02">红包封面</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_10.svg" width="43" height="43"></div>
<div class="s-s02">对话开放</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_11.svg" width="43" height="43"></div>
<div class="s-s02">服务平台</div>
</div>

<div class="square_div">
<div class="s-s01"><img src="http://cdn.psdhtml.cn/wx_images/icon_svg_12.svg" width="43" height="43"></div>
<div class="s-s02">在线学堂</div>
</div>
</div>

<footer class="down"><span class="f82">We安全 | 服务条款 | 使用规范 | 客服中心 | 隐私保护指引</span><br>
<span class="f75">Copyright © 1998-2022 All Rights Reserved.</span></footer>
<div class="banquan"><a href="http://www.psdhtml.cn/index.php?c=thread&fid=18?wx01sy" target="_blank"><img src="http://cdn.psdhtml.cn/wx_images/wx_lxidw7.svg" width="1000" height="36"></a></div>
</body>
`

const BCHtml1 = `<body>
 <style type="text/css">
 * {

  margin: 0;
  padding: 0;
}

.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-between {
  display: flex;
  justify-content: space-around;
}
.page {
  margin-bottom: 7.5rem;
}
.group_5 {

  width: 100%;

  background-image: linear-gradient(
    180deg,
    rgba(237, 244, 255, 1) 0,
    rgba(255, 255, 255, 1) 100%
  );
}

.block_4 {

  margin-top: 198px;
    margin-left: 11.25rem;
}

.box_10 {
  height: 5.494rem;
  margin-top: 1.92rem;
}

.text_36 {

  color: rgba(51, 51, 51, 1);
  font-size: 3rem;
  font-family: Source Han Sans CN-Bold;
  font-weight: 700;

  white-space: nowrap;

}

.text_37 {
  width: 21.227rem;

    color: rgba(119, 119, 119, 1);
    font-size: 1.5rem;
    font-family: Source Han Sans CN-Medium;
    font-weight: 500;

    margin-top: 1rem;
}
.text-click {
  cursor: pointer;
}


.text_38 {
  background-color: rgba(32, 141, 255, 1);
  border-radius: 4px;

  margin-top: 2rem;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 1.125rem;
  font-family: Source Han Sans CN-Medium;
  font-weight: 500;
  white-space: nowrap;
  display: inline-block;
    width: 128px;
    padding: 10px;
    text-align: center;
}

.image_11 {
  width: 32.5rem;
  height: 32.5rem;
}




    </style>
     <div class="page flex-col">
      <div class="group_5 flex-col">
        <div class="block_4 flex-row justify-between">
          <div class="box_10 flex-col">
            <span class="text_36">有偿问卷在家远程办公也能轻松赚钱</span>
            <span class="text_37">做完问卷即得奖励</span>



          </div>
         <img
         class="image_11"
         referrerpolicy="no-referrer"
         src=
         />
        </div>
      </div>
    </div>







</body>
`

const BCHtml2 = `<body>
 <style type="text/css">
  * {

    margin: 0;
    padding: 0;

  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .justify-between {
    display: flex;
    justify-content: space-between;
  }

.text-group-1 {
  padding-top: 4rem;
  margin-bottom: 4rem;
}


  .block_1 {
    width: 100%;
  }

  .box_5 {
    background-color: rgba(248, 249, 251, 1);
    width: 100%;
    text-align: center;
    padding-bottom: 4rem;
  }
  .box-5-margin {
    margin-bottom: 7.5rem;
  }

 .group_2 {
  display: flex;
  justify-content: center;
 }

  .text_7 {


    overflow-wrap: break-word;
    color: rgba(119, 119, 119, 1);
    font-size: 1.75rem;
    font-family: Source Han Sans CN-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;

  }

  .text_8 {

    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 3rem;
    font-family: Source Han Sans CN-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;

  }



  .box_6 {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 8px;
     width: 21.25rem;
    height: 23.75rem;
    padding: 2.25rem 1.5rem 2.625rem 1.5rem;
  }
.box-margin {
  margin: 0 2rem;
}
  .image_5 {
    width: 7.5rem;
    height:  7.5rem;
  }



  .text_9 {

    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 1.5rem;
    font-family: Source Han Sans CN-Medium;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    margin: 1.5rem 0 1.5rem 0;

  }

  .text_10 {

    height: 1.28rem;
    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 1rem;
    font-family: Source Han Sans CN-Regular;
    font-weight: 500;
    text-align: left;
    margin-top: 0.427rem;
  }

  .text-wrapper_2 {
    border: 1px solid rgba(68, 157, 250, 1);
    width: 6rem;
    height: 2.125rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto;
    margin-top: 2.5rem;
  }

  .text_11 {

    overflow-wrap: break-word;
    color: rgba(68, 157, 250, 1);
    font-weight: 500;
    font-family: PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 0.427rem;
  }


  .group_5 {
    position: absolute;
    left: 0;
    top: -0.533rem;
    width: 51.2rem;
    height: 21.334rem;
  }




    </style>
 <div class="box-5-margin">
  <div class="box_5 ">
    <div class="text-group_4 text-group-1">
      <span class="text_8">简单三步即可填问卷赚钱</span>

    </div>

    <div class="group_2">
      <div class="box_6">

        <img class="image_5" referrerpolicy="no-referrer"

           src=
          />
        <div class="text-group_5 flex-col justify-between">
          <span class="text_9">注册</span>
          <span class="text_10">
            任何人都可以参加，注册步骤简单只需要30秒
          </span>

        </div>

      </div>
      <div class="box_6 box-margin">
        <img class="image_5" referrerpolicy="no-referrer"
             src= />
        <div class="text-group_5 flex-col justify-between">
          <span class="text_9">问卷</span>
          <span class="text_10">
            将在问卷列表中收到问卷，请如实认真回答，并且您所回答内容是匿名的，请放心
          </span>

        </div>

      </div>
      <div class="box_6">
        <img class="image_5" referrerpolicy="no-referrer"      src=
         />
        <div class="text-group_5 flex-col justify-between">
          <span class="text_9">佣金</span>
          <span class="text_10">
            将在问卷列表中收到问卷，请如实认真回答，操作完成，佣金会在第一时间进入账号明细并且您所回答内容是匿名的，请放心
          </span>

        </div>
      </div>
    </div>

  </div>
</div>







</body>
`
const BCHtml3 = `<body>
 <style type="text/css">
   * {

margin: 0;
padding: 0;

}

.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}




.group_1 {
  width: 100%;
  background-color: white;
}

.block_1 {
  background-color: white;
}

.box_1 {
margin: 11.25rem 11.25rem 0 11.25rem;
}

.image_1 {
  width: 41.125rem;
  height: 27.375rem;
}

.text-group_1 {
  margin-top: 5.375rem;
  margin-left: 5rem;
}

.text_1 {

  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 3rem;
  font-family: Source Han Sans CN-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;

}

.paragraph_1 {

  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 1.5rem;
  font-family: Source Han Sans CN-Regular;
  font-weight: 400;
  text-align: left;
  margin-top: 1rem;
}

.box_2 {

  margin: 7.5rem 11.25rem;
}

.text-group_2 {
  margin-top: 5.375rem;
  margin-right: 5rem;
}

.text_2 {

  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 3rem;
  font-family: Source Han Sans CN-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
}

.paragraph_2 {
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 1.5rem;
  font-family: Source Han Sans CN-Regular;
  font-weight: 400;
  text-align: left;
  margin-top: 1rem;
}

.image_2 {
  width: 41.125rem;
  height: 27.375rem;
}

.box_3 {
  margin: 0 11.25rem 7.5rem 11.25rem;
}

.image_3 {
  width: 41.125rem;
  height: 27.375rem;
}

.text-group_3 {
  margin-top: 5.375rem;
  margin-left: 5rem;
}

.text_3 {

  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 3rem;
  font-family: Source Han Sans CN-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
}

.text_4 {
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 1.5rem;
  font-family: Source Han Sans CN-Regular;
  font-weight: 400;
  text-align: left;
  margin-top: 1rem;
}






.group_2 {
  width: 28.907rem;
  height: 10.134rem;
  margin: 1.707rem 0 0 11.147rem;
}


    </style>
  <div class="group_1 flex-row">
        <div class="block_1 flex-col">
          <div class="box_1 flex-row justify-between">
            <img
            class="image_1"
            referrerpolicy="no-referrer"
            src=
            />
               <div class="text-group_1 flex-col">
              <span class="text_3">在线赚钱</span>
              <span class="text_4">
                在该网站填写问卷就可轻松在线赚钱
                <br />
                我们已经优化系统来匹配最适配的问卷。问卷相关性越高，意味着可获奖金也更多。
                当我们为您匹配到完美问卷后，请及时进行参与，每一份问卷的配额是有限的。
                在该网站上赚钱趣味十足。公司参考您的意见来改善产品开发设计，这意味着您的意见非常宝贵。
              </span>
            </div>
          </div>
          <div class="box_2 flex-row justify-between">
            <div class="text-group_2 flex-col ">
              <span class="text_2">填问卷，在家办公</span>
              <span class="text_4">
                通过您的手机或电脑就可轻松参与问卷填写，您随时随地都可以在线填问卷，所以这是在家工作的理想选择。
                <br />
                这不需要花太多时间，您随时可以参与问卷，任何人都可以通过参与问卷的方式在家赚钱，您甚至可以在填写问卷的同时边做其他事。这是简单、有弹性的快速赚钱方法。
                <br />
                在家填写问卷是一件非常有意义的事，您的意见有助于公司设计更优质的产品和服务，问卷仅作为公司的产品调研使用。
              </span>
            </div>
            <img
            class="image_2"
            referrerpolicy="no-referrer"  src= />
          </div>
          <div class="box_3 flex-row justify-between">
            <img
              class="image_3"
              referrerpolicy="no-referrer" src= />
            <div class="text-group_3 flex-col ">
              <span class="text_3">在家工作您能赚多少?</span>
              <span class="text_4">
                您填写的每一份问卷都会获得奖金。这是一份有保障的兼职收入。让您轻松在家填问卷赚钱。我们提供最详细的市场问卷内容，您还可以在问卷邀请上查看每份问卷能赚到的奖金金额。
              </span>
            </div>
          </div>



        </div>

      </div>







</body>
`


const BCHtml4 = `

<body>
<style type="text/css">
 * {

    margin: 0;
    padding: 0;

  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .box_4 {
    display: flex;
  justify-content: center;
    align-items: center;
    width: 100%;
    height: 31.25rem;
  position: relative;
  }
  .box_4 img {
    position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  .text_5 {
    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 3rem;
    font-family: Source Han Sans CN-Medium;
    font-weight: 500;
    white-space: nowrap;
 z-index: 9999;
  }

  .text-wrapper_1 {
    margin-top: 1.5rem;
    width: 14rem;
height: 4.9375rem;

display: flex;
justify-content: center;
align-items: center;
 z-index: 9999;
  }

  .text_6 {

    overflow-wrap: break-word;
    font-weight: 500;
    font-size: 2rem;
    font-family: Source Han Sans CN-Medium;
    font-weight: 500;
    white-space: nowrap;
 z-index: 9999;
 color: #777777;
  }




    </style>



  <div class="box_4 flex-col">
   <img src="" >
    <span class="text_5">有偿问卷·轻松赚钱</span>
    <div class="text-wrapper_1 flex-col">
      <span class="text_6">邀请您的参与</span>
    </div>
  </div>




</body>`


const colorBlocksHtml = `
<div class="square_div">
`
export const customBlock = [
  // {
  //   id: 'Custom-footerHtml', // 唯一标识
  //   label: '自定义footer', //标题
  //   content: footerHtml, // 块的内容
  //   category: 'Custom',// 块的位置 （那个类别下）
  // },
  // {
  //   id: 'Custom-wxHtml', // 唯一标识
  //   label: '微信', //标题
  //   content: wxHtml, // 块的内容
  //   category: 'Custom',// 块的位置 （那个类别下）
  // },
  {
    id: 'B2C-Html1', // 唯一标识
    label: 'B2C首页模板第一部分', //标题
    content: BCHtml1, // 块的内容
    category: 'Custom',// 块的位置 （那个类别下）
  },
  {
    id: 'B2C-Html2', // 唯一标识
    label: 'B2C首页模板第二部分', //标题
    content: BCHtml2, // 块的内容
    category: 'Custom',// 块的位置 （那个类别下）
  },
  {
    id: 'B2C-Html3', // 唯一标识
    label: 'B2C首页模板第三部分', //标题
    content: BCHtml3, // 块的内容
    category: 'Custom',// 块的位置 （那个类别下）
  },
  {
    id: 'B2C-Html4', // 唯一标识
    label: 'B2C首页模板第四部分', //标题
    content: BCHtml4, // 块的内容
    category: 'Custom',// 块的位置 （那个类别下）
  },
  // {
  //   id: 'color-blocks', // 唯一标识
  //   label: '自定义色块', //标题
  //   content: { type: 'color-blocks' }, // 块的内容
  //   category: 'Custom',// 块的位置 （那个类别下）
  // },
]

//#endregion

const colotBlocks = () => {
  alert('这是一个色块')
}

// 定义js
export const htmlJsList = [
  {
    id: 'color-blocks', // 唯一标识
    model: {
      defaults: {
        // 使用 script 来执行 JavaScript 函数
        script: colotBlocks,
        // Add some style, just to make the component visible
        style: {
          width: '100px',
          height: '100px',
          background: 'red',
        },
      },
    },
  }
]
