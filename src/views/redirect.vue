<template>
  <div class="wscn-box" v-loading="data.loading">
    <div class="wscn-http404-container">
      <div class="wscn-http404">
        <div class="pic-404">
          <img :src="getAssetsImages(data.svg)" alt="" />
        </div>
        <div class="bullshit">
          <div class="bullshit__oops" v-html="data.typename" />
          <div class="bullshit__info" v-html="data.englishtypename" />
          <div class="bullshit__headline">{{ data.message }}</div>
          <div class="bullshit__info">{{ data.describe }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import statements from "./statements";
// import request from "@/utils/request";
import api from "@/api/modules/redirect";
import storage from "@/utils/storage";
const route = useRoute();
// const loading=
const data = ref<any>({
  svg: "",
  svgColor: "",
  typename: "",
  englishtypename: "",
  message: "",
  describe: "",
  loading: true, //加载
});

onMounted(async () => {
  try {
    data.value.loading = true;
    // 获取ip
    // const response = await fetch("https://qifu-api.baidubce.com/ip/local/geo/v1/district");
    // const res = await response.json();
    // const ip = res.ip;
    const status: any = route.query.status;
    const uid: any = route.query.uid;
    const params = {
      uid: uid,
      status: status,
      // ip: ip,
    };
    const resRedirect = await api.redirection(params);
    const URL = resRedirect.data.status;
    // 新开 会员或子会员重定向页面
    if (resRedirect.data.redirectAddress) {
      const href = `https://${resRedirect.data.peopleType === 1 ? '' : resRedirect.data.redirectAddress}${resRedirect.data.peopleType === 1 //peopleType 1 会员  2子会员
        ? "samples.surveysaas.com/"
        : ".front-supplier-web.surveyssaas.com/#/"
        }${
        //surveySource 1内部 2外部
        resRedirect.data.surveySource === 1 ? "redirect" : "externalRedirection"
        }?uid=${uid}&type=${URL}`;
      // #region 防止浏览器拦截新开标签页
      window.location.href = href;
      // let tempwindow: any = window.location.href //打开一个窗口，然后用
      // tempwindow = href; //使这个窗口跳转到百度，这样就会呈现弹出百度窗口的效果了。
      //#endregion
    }
    data.value.loading = false;
    if (URL == 1) {
      data.value.svg = 1;
      data.value.typename = "<span>恭喜您完成此项调查</span>";
      data.value.englishtypename =
        '<span>Congratulations on</span> <span style="color:#20a0ff" >complete this survey</span>';
      data.value.message = "太棒了!!";
      data.value.describe = "谁也不能随随便便成功，它来自彻底的自我管理和毅力。";
    } else if (URL == 2) {
      data.value.svg = 2;
      data.value.typename = '<span style="color: #e6a239">配额已满</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >quota is full</span>';
      data.value.message = "请尝试其他调查!";
      data.value.describe = `学会让自己安静，把思维沉浸下来，慢慢降低对事物的欲望。把自我经常归零，每天都是新的起点，没有年龄的限制，只要你对事物的欲望适当的降低，会赢得更多的求胜机会`;
    } else if (URL == 3) {
      data.value.svg = 3;
      data.value.typename =
        '<span style="color: #e6a239">您已经参与过此项目</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >You have worked on this project</span>';
      data.value.message = "请尝试其他调查!";
      data.value.describe = "Please try other surveys";
    } else if (URL == 4) {
      data.value.svg = 4;
      data.value.typename =
        '<span style="color: #e6a239">当前IP已经参与过此项目</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >Current IP has participated in this project</span>';
      data.value.message = "请尝试其他调查!";
      data.value.describe = "Please try other surveys";
    } else if (URL == 5) {
      data.value.svg = 5;
      data.value.typename = '<span style="color: #e6a239">项目已关闭</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >The project has been closed</span>';
      data.value.message = "请尝试其他调查!";
      data.value.describe = "Please try other surveys";
    } else if (URL == 6) {
      data.value.svg = 6;
      data.value.typename =
        '<span style="color: #e6a239">答题用时过短，问卷作废!</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >The LOI are too short</span>';
      data.value.message = "请注意质量!";
      data.value.describe = "Please ensure the quality of the questionnaire";
    } else if (URL == 7) {
      data.value.svg = 7;
      data.value.typename = '<span style="color: #e6a239">数据出现异常</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >Abnormal data</span>';
      data.value.message = "请尝试刷新或联系管理员!";
      data.value.describe = "Please try to refresh or contact the administrator!";
    } else if (URL == 8) {
      data.value.svg = 8;
      data.value.typename =
        '<span style="color: #e6a239">您访问的项目不存在</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >The project you visited does not exist</span>';
      data.value.message = "请尝试其他项目!";
      data.value.describe = "Please try other survey!";
    } else if (URL == 9) {
      data.value.svg = 9;
      data.value.typename = '<span style="color: #e6a239">IR过高</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >IR is too high</span>';
      data.value.message = "请保证完成问卷的合理性";
      data.value.describe =
        "Please ensure that the completed questionnaire is reasonable";
    } else if (URL == 10) {
      data.value.svg = 10;
      data.value.typename =
        '<span style="color: #e6a239">时间段内配额已满</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >The quota for the current time period is full</span>';
      data.value.message = "请销后再试!";
      data.value.describe = "Please sell it and try again!";
    } else if (URL == 11) {
      data.value.svg = 10;
      data.value.typename = '<span style="color: #e6a239">超时完成</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >Current project timeout completed </span>';
      data.value.message = "请销后再试!";
      data.value.describe = "Please sell it and try again!";
    } else if (URL == 12) {
      data.value.svg = 7;
      data.value.typename = '<span style="color: #e6a239">ip不一致</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >IP is inconsistent </span>';
      data.value.message = "请销后再试!";
      data.value.describe = "Please sell it and try again!";
    } else if (URL == 13) {
      data.value.svg = 7;
      data.value.typename = '<span style="color: #e6a239">被甄别</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >have been screened </span>';
      data.value.message = "请销后再试!";
      data.value.describe = "Please sell it and try again!";
    } else if (URL == 14) {
      data.value.svg = 7;
      data.value.typename = '<span style="color: #e6a239">配额满</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >quota full  </span>';
      data.value.message = "请销后再试!";
      data.value.describe = "Please sell it and try again!";
    } else if (URL == 15) {
      data.value.svg = 7;
      data.value.typename = '<span style="color: #e6a239">安全终止</span>';
      data.value.englishtypename =
        '<span>I\'m sorry</span> <span style="color:#20a0ff" >safe termination  </span>';
      data.value.message = "请销后再试!";
      data.value.describe = "Please sell it and try again!";
    }
  } catch (error) {

  } finally {
    data.value.loading = false;
  }

});
// 加载静态图片
const getAssetsImages = (fileName: any, type = "png") => {
  const path = `/src/assets/images/redirect/${fileName}.${type}`;
  const modules: Record<string, any> = import.meta.glob(
    "@/assets/images/redirect/*.{png,svg,jpg,jpeg}",
    { eager: true }
  );
  if (modules[path]) return modules[path].default;
  else {
    // 地址错误
    const path2 = `/src/assets/images/redirect/100.png`;
    return modules[path2].default;
    console.error("Error url is wrong path");
  }
};
</script>
<style lang="scss" scoped>
.wscn-box {
  background-color: #f3f6fb;
  width: 100vw;
  height: 100vh;
}

.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}

.wscn-http404 {
  position: relative;
  // width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .pic-404 {
    position: relative;
    float: left;
    width: 400px;
    aspect-ratio: 1/1;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 1/1;
    }

    &__parent {
      width: 100%;
    }

    &__child {
      position: absolute;

      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }

      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }

      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }

      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }

  .bullshit {
    position: relative;
    float: left;
    width: 400px;
    padding: 30px 0;
    overflow: hidden;

    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
