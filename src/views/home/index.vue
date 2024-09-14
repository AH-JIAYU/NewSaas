<script setup lang="ts">
import api from "@/api/modules/register";
defineOptions({
  name: "home",
});
const router = useRouter() 
const isRegister = ref<any>(); //注册开关

const toLogin = () => {
  router.push('/login')
}
// 免费试用
const freeTrial=()=>{ 
  router.push({
    path: "/login",
    query: {
      isRegister:isRegister.value,
    },
  });
}
onMounted(async() => {
  // 元素淡入
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeOut');
      }
    });
    // 进入视口10% 触发
  }, { threshold: .5 });
  // ref获取到的只有最后一个，直接加属性用原生获取
  const fadeOutElementList = document.querySelectorAll('img[fadeOut]');
  fadeOutElementList.forEach((element: any) => {
    observer.observe(element);
  });

  const { data } = await api.getTenantConfig({});
  isRegister.value = data.register;

})
</script>

<template>
  <div class="page flex-col">
    <div class="box_1 flex-col">

      <div class="text_1">
        <div>传统调研服务难题</div>
        <div>嘉禹调研服务平台为您解决</div>

      </div>
      <div class="group_1 flex-row justify-between">
        <div class="box_2 flex-row">
          <div class="image-wrapper_1 flex-col">
            <img class="label_1" referrerpolicy="no-referrer"
              src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGb7a18705bb3676692299cdb1619a1a18.png" />
          </div>
          <div class="text-group_1 flex-col justify-between">
            <span class="text_2">调查种类多，集成难</span>
            <span class="text_3">全球客户样本需求量大，传统系统实现需求碎片化，无集成，使用效率低，统计难度大</span>
          </div>
        </div>
        <div class="box_3 flex-row">
          <div class="image-wrapper_2 flex-col">
            <img class="label_2" referrerpolicy="no-referrer"
              src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG7f3b6b22174df1b2bc0022999d5e6a6f.png" />
          </div>
          <div class="text-group_2 flex-col justify-between">
            <span class="text_4">项目基数多，管控难</span>
            <span class="text_5">调查项目通过人员经验进行管理，员工专业水平不统一，沟通协作难，业务协同难</span>
          </div>
        </div>
        <div class="box_4 flex-row">
          <div class="image-wrapper_3 flex-col">
            <img class="label_3" referrerpolicy="no-referrer"
              src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGb8346f3842e8498968812828990df5d6.png" />
          </div>
          <div class="text-group_3 flex-col justify-between">
            <span class="text_6">业务生态链建设度低、获客难、收益小</span>
            <span class="text_7">业务模式单一，无内外部合作，无可用资源整合，收益不适应市场环境，突破难</span>
          </div>
        </div>
      </div>
      <div class="group_2 flex-row justify-between">
        <div class="section_1 flex-row">
          <div class="image-wrapper_4 flex-col">
            <img class="label_4" referrerpolicy="no-referrer"
              src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG5fc4d2f66c660c23e5e9a7d7ff7f1d0a.png" />
          </div>
          <div class="text-group_4 flex-col justify-between">
            <span class="text_8">回款周期长，履约成本高</span>
            <span class="text_9">业务单一，回款周期冗长，项目发布至项目审核无规则限制，导致审核率失真，履约精神低</span>
          </div>
        </div>
        <div class="section_2 flex-row">
          <div class="image-wrapper_5 flex-col">
            <img class="label_5" referrerpolicy="no-referrer"
              src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG75c01117abd2ff5f448db300af5b56c7.png" />
          </div>
          <div class="text-group_5 flex-col justify-between">
            <span class="text_10">样本匹配机制无算法支撑，效率低</span>
            <span class="text_11">传统调研系统，调查合规率低，算法不完善，精准匹配度低，导致大量时间和资源浪费</span>
          </div>
        </div>
        <div class="section_3 flex-row">
          <div class="image-wrapper_6 flex-col">
            <img class="label_6" referrerpolicy="no-referrer"
              src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG1efdb6c4b3de858407d3d0ef3f4ea8c4.png" />
          </div>
          <div class="text-group_6 flex-col justify-between">
            <span class="text_12">需求变化快，响应速度慢</span>
            <span class="text_13">在不同阶段有不同需求，传统业务单一，无灵活配置，造成调整响应慢、周期长</span>
          </div>
        </div>
      </div>
      <img class="image_1" referrerpolicy="no-referrer"
        src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG7862c01aa5a4b1f501569971fa87d052.png" />
      <div class="image-wrapper_7 flex-col">
      </div>
    </div>
    <div class="box_5 flex-col">
      <div class="text-group_7 flex-col justify-between">
        <span class="text_14">嘉禹·数字化产品优势</span>
        <span class="text_15">六大核心能力</span>
      </div>
      <div class=" po-r">
        <div class="section_4 flex-row justify-between">
          <img class="image_3 displayNo" fadeOut referrerpolicy="no-referrer" src="../../assets/images/home/1.svg" />
          <div class="box_6 flex-col justify-between">
            <div class="text-group_8 flex-col justify-between">
              <span class="text_16">项目数字化能力</span>
              <span class="text_17">实现项目全程数据化。从项目发布至项目结算，通过智能埋点，进行数据监控，合理控制项目预算及成本</span>
            </div>
            <div class="block_1 flex-row"  @click="freeTrial">
              <div class="image-text_1 flex-row justify-between">
                <span class="text-group_9">免费试用</span>
                <img class="thumbnail_1" referrerpolicy="no-referrer"
                  src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGc2be064a1afab26a9502ccaf5f9caa3c.png" />
              </div>
            </div>
          </div>
        </div>
        <img class="bg-r" src="../../assets/images/home/right.png" alt="">
      </div>
      <div class="section_6 flex-row justify-between">
        <div class="box_8 flex-col justify-between">
          <div class="text-group_12 flex-col justify-between">
            <span class="text_20">多模态合作能力</span>
            <span class="text_21">实现多级合作关系，打通租户与租户的合作壁垒，支持内部会员拓展，建立供应商、服务商亲密的合作关系，更好适应市场变化</span>
          </div>
          <div class="group_3 flex-row"  @click="freeTrial">
            <div class="image-text_3 flex-row justify-between">
              <span class="text-group_13">免费试用</span>
              <img class="thumbnail_3" referrerpolicy="no-referrer"
                src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGc2be064a1afab26a9502ccaf5f9caa3c.png" />
            </div>
          </div>
        </div>
        <img class="image_5 displayNo" fadeOut referrerpolicy="no-referrer" src="../../assets/images/home/2.svg" />
      </div>
      <div class="po-r">
        <div class="section_5 flex-row justify-between">
          <img class="image_4 displayNo" fadeOut referrerpolicy="no-referrer" src="../../assets/images/home/3.svg" />
          <div class="box_7 flex-col justify-between">
            <div class="text-group_10 flex-col justify-between">
              <span class="text_18">敏捷应用开发能力</span>
              <span class="text_19">系统应用中心通过提供额外功能和定制化服务，提升系统的效率，快速响应合作方定制需求，同时降低系统运维成本和复杂性</span>
            </div>
            <div class="block_2 flex-row"  @click="freeTrial">
              <div class="image-text_2 flex-row justify-between">
                <span class="text-group_11">免费试用</span>
                <img class="thumbnail_2" referrerpolicy="no-referrer"
                  src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGc2be064a1afab26a9502ccaf5f9caa3c.png" />
              </div>
            </div>
          </div>
        </div>
        <img src="../../assets/images/home/left.png" alt="" class="bg-l">
      </div>
      <div class="section_9 flex-row justify-between">

        <div class="box_11 flex-col justify-between">
          <div class="text-group_18 flex-col justify-between">
            <span class="text_26">信息门户引擎</span>
            <span class="text_27">可视化配置为组织打造千人千面工作台，支持合作用户自定义搭建客商门户官网</span>
          </div>
          <div class="block_3 flex-row"  @click="freeTrial">
            <div class="image-text_6 flex-row justify-between">
              <span class="text-group_19">免费试用</span>
              <img class="thumbnail_6" referrerpolicy="no-referrer"
                src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGc2be064a1afab26a9502ccaf5f9caa3c.png" />
            </div>
          </div>
        </div>
        <img class="image_8 displayNo" fadeOut referrerpolicy="no-referrer" src="../../assets/images/home/4.svg" />
      </div>

      <div class="po-r">
        <div class="section_7 flex-row justify-between">
          <img class="image_6 displayNo" fadeOut referrerpolicy="no-referrer" src="../../assets/images/home/5.svg" />
          <div class="group_4 flex-col justify-between">
            <div class="text-group_14 flex-col justify-between">
              <span class="text_22">RBAC3组织能力</span>
              <span class="text_23">支撑组织、人员、角色管理、支持多维组织、集团化企业分级分权管理</span>
            </div>
            <div class="box_9 flex-row" @click="freeTrial">
              <div class="image-text_4 flex-row justify-between">
                <span class="text-group_15">免费试用</span>
                <img class="thumbnail_4" referrerpolicy="no-referrer"
                  src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGc2be064a1afab26a9502ccaf5f9caa3c.png" />
              </div>
            </div>
          </div>
        </div>
        <img src="../../assets/images/home/right.png" alt="" class="bg-r">

      </div>
      <div class="section_8 flex-row justify-between">
        <div class="box_10 flex-col justify-between">
          <div class="text-group_16 flex-col justify-between">
            <span class="text_24">客商集合能力</span>
            <span class="text_25">集合客商关键信息，通过数据报表聚合展现，包括客户的基本信息，合作关联信息，方便与客户有效对接</span>
          </div>
          <div class="group_5 flex-row" @click="freeTrial">
            <div class="image-text_5 flex-row justify-between">
              <span class="text-group_17" >免费试用</span>
              <img class="thumbnail_5" referrerpolicy="no-referrer"
                src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGc2be064a1afab26a9502ccaf5f9caa3c.png" />
            </div>
          </div>
        </div>
        <img class="image_7 displayNo" fadeOut referrerpolicy="no-referrer" src="../../assets/images/home/6.svg" />
      </div>

    </div>
    <div class="box_12 flex-col">
      <div class="text-group_20 flex-col justify-between">
        <span class="text_28">嘉禹·数字化构建支撑</span>
        <span class="text_29">赋予组织数字化应用构建能力</span>
      </div>
      <div class="block_4 flex-row justify-between">
        <div class="box_13 flex-col">
          <img class="label_7" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGb1a785639190c4aea86b97f6c74082a3.png" />
          <div class="text-group_21 flex-col justify-between">
            <span class="text_30">组织引擎</span>
            <span class="text_31">支撑项目组织</span>
          </div>
          <img class="label_8" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG048dfa41fe9c922843517d28713a4874.png" />
        </div>
        <div class="box_14 flex-col">
          <img class="label_9" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG7ee1e1f4e5b344e6503155f23147b61d.png" />
          <div class="text-group_22 flex-col justify-between">
            <span class="text_32">知识引擎</span>
            <span class="text_33">项目素材样本归集</span>
          </div>
          <img class="label_10" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGdd863d5955d462e78c0688f52db2afdb.png" />
        </div>
        <div class="box_15 flex-col">
          <img class="label_11" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG88dc4abc1e1cbda273bf579205fe9b0b.png" />
          <div class="text-group_23 flex-col justify-between">
            <span class="text_34">门户引擎</span>
            <span class="text_35">支撑多角色项目用户</span>
          </div>
          <img class="label_12" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG57cd7fc347bcf530cfc3f404fbb73d79.png" />
        </div>
        <div class="box_16 flex-col">
          <img class="label_13" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG17aedceec8efda1cb6322064ef6b990c.png" />
          <div class="text-group_24 flex-col justify-between">
            <span class="text_36">移动引擎</span>
            <span class="text_37">快速灵活·自动适配</span>
          </div>
          <img class="label_14" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGa998c8c49a0917dcf1ba910d11aa8b20.png" />
        </div>
        <div class="box_17 flex-col">
          <img class="label_15" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG0d1326c9160c67bdd983f1380f72286e.png" />
          <div class="text-group_25 flex-col justify-between">
            <span class="text_38">集成引擎</span>
            <span class="text_39">与各类异动系统集成</span>
          </div>
          <img class="label_16" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG0d6e14aa417b2d93dfbc181dfe993212.png" />
        </div>
        <div class="box_18 flex-col">
          <img class="label_17" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGccec99d876fa9a9f085f9c3b44f0f5d5.png" />
          <div class="text-group_26 flex-col justify-between">
            <span class="text_40">通讯协议</span>
            <span class="text_41">数据传输可靠性·安全性</span>
          </div>
          <img class="label_18" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGbdfcaa73461270ac7850b872da0f2cb2.png" />
        </div>
        <div class="box_19 flex-col">
          <img class="label_19" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGea94742335cfa96f8276a04d34f9a51b.png" />
          <div class="text-group_27 flex-col justify-between">
            <span class="text_42">位置服务</span>
            <span class="text_43">实现数据保障与收集</span>
          </div>
          <img class="label_20" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNGca6bccc84c1e508588bcc80f9ac30987.png" />
        </div>
      </div>
      <div class="image-wrapper_8 flex-row justify-between">
        <img class="thumbnail_7" referrerpolicy="no-referrer"
          src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG66769d8f8b7ec936f4c6d44a5faf0834.png" />
        <img class="thumbnail_8" referrerpolicy="no-referrer"
          src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG66769d8f8b7ec936f4c6d44a5faf0834.png" />
        <img class="thumbnail_9" referrerpolicy="no-referrer"
          src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG66769d8f8b7ec936f4c6d44a5faf0834.png" />
        <img class="thumbnail_10" referrerpolicy="no-referrer"
          src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG66769d8f8b7ec936f4c6d44a5faf0834.png" />
        <img class="thumbnail_11" referrerpolicy="no-referrer"
          src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG66769d8f8b7ec936f4c6d44a5faf0834.png" />
        <img class="thumbnail_12" referrerpolicy="no-referrer"
          src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG66769d8f8b7ec936f4c6d44a5faf0834.png" />
        <img class="thumbnail_13" referrerpolicy="no-referrer"
          src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG66769d8f8b7ec936f4c6d44a5faf0834.png" />
      </div>
      <div class="block_5 flex-col">
        <div class="text-group_28 flex-col justify-between">
          <span class="text_44">智能·协同·安全</span>
          <span class="text_45">亚洲首家SaaS化项目执行平台</span>
          <span class="text_46">助力调研服务数字化转型</span>
        </div>
        <div class="text-wrapper_1 flex-col"  @click="freeTrial">
          <span class="text_47">免费试用</span>
        </div>
      </div>
    </div>
    <div class="box_20 flex-col">
      <div class="group_6 flex-row">
        <img class="image_9" referrerpolicy="no-referrer"
          src="../../assets/images/home/bottomlogo.svg" />
        <!-- <span class="text_48">嘉禹</span> -->
        <span class="text_49">热门方案</span>
        <span class="text_50">服务</span> <span class="text_51">公司</span>
        <span class="text_52">联系我们</span>
      </div>
      <div class="text-wrapper_2 flex-row justify-between">
        <span class="text_53">嘉禹SaaS平台</span>
        <span class="text_54">服务条款</span>
        <span class="text_55">关于我们</span>
        <span class="text_56">999-1233-3333（工作日9：30-18：30）</span>
      </div>
      <div class="group_7 flex-row">
        <div class="image-text_7 flex-col justify-between">
          <!-- <img class="image_10" referrerpolicy="no-referrer"
            src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG0088d46ee36456d34c87dd122f0bb018.png" /> -->
          <span class="text-group_29"> </span>
        </div>
        <div class="text-wrapper_3 flex-col justify-between">
          <span class="text_57">隐私条款</span>
          <span class="text_58">会员条款</span>
        </div>
        <span class="text_59">商务合作</span>
        <div class="text-wrapper_4 flex-col justify-between">
          <span class="text_60">1231324324&#64;qq.com</span>
          <span class="text_61">上海市某某区某某路某号某栋某层</span>
        </div>
      </div>
    </div>
    <div class="box_21 flex-col">
      <div class="group_8 ">
        <div class="group_8_1 flex-row">
          <img class="image_11" referrerpolicy="no-referrer"
            src="../../assets/images/home/toplogo.svg" /> 
          <div class="section_10 flex-row justify-between">
            <img class="thumbnail_14" referrerpolicy="no-referrer"
              src="https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG1788f426d5196954b610bcab7a424f19.png" />
            <span class="text_63">电话号码：888-888-888</span>
          </div>
          <div class="text-wrapper_5 flex-col">
            <span class="text_64" @click="toLogin">登录</span>
          </div>
          <div class="text-wrapper_6 flex-col">
            <span class="text_65" @click="freeTrial">免费试用</span>
          </div>
        </div>

      </div>
      <div class="group_9 ">
        <div class="group_9_1 flex-row justify-between">
          <div class="box_22 flex-col">
            <!-- <span class="text_66">嘉禹·调研平台</span> -->
            <div class="text-group_30 flex-col justify-between">
              <h1 class="text_67">全球一站式调研服务平台</h1>
              <span class="text_68">百万数据集成样本库.亚洲首家SaaS化项目执行服务平台</span>
            </div>
            <div class="box_23 flex-row justify-between">
              <div class="text-wrapper_7 flex-col">
                <span class="text_69" @click="freeTrial">免费试用</span>
              </div>
              <div class="text-wrapper_8 flex-col">
                <span class="text_70">预约演示</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.page {
  background-color: rgba(251, 251, 253, 1);
  position: relative;
  width: 100%;
  // height: 6903px;
  overflow: hidden;
}

.box_1 {
  position: relative;
  width: 100%;
  height: 1690px;
}


.text_1 {
  width: 576px; 
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 48px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 48px;
  margin: 1006px auto 0;
  text-align: center;

  >div:nth-of-type(1) {
    font-size: 24px;
    color: #8b8b89;
  }
}

.group_1 {
  width: 1561px;
  height: 160px;
  margin: 64px auto 0;
}

.box_2 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 499px;
  height: 160px;
}

.image-wrapper_1 {
  border-radius: 200px;
  height: 48px;
  border: 1px solid rgba(64, 158, 255, 1);
  width: 48px;
  margin: 24px 0 0 24px;
}

.label_1 {
  width: 28px;
  height: 28px;
  margin: 10px 0 0 10px;
}

.text-group_1 {
  width: 331px;
  height: 85px;
  margin: 24px 80px 0 16px;
}

.text_2 {
  width: 331px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.text_3 {
  width: 331px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.box_3 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 499px;
  height: 160px;
  margin-left: 32px;
}

.image-wrapper_2 {
  border-radius: 200px;
  height: 48px;
  border: 1px solid rgba(64, 158, 255, 1);
  width: 48px;
  margin: 24px 0 0 24px;
}

.label_2 {
  width: 28px;
  height: 28px;
  margin: 10px 0 0 10px;
}

.text-group_2 {
  width: 331px;
  height: 85px;
  margin: 24px 80px 0 16px;
}

.text_4 {
  width: 331px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.text_5 {
  width: 331px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.box_4 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 499px;
  height: 160px;
  margin-left: 32px;
}

.image-wrapper_3 {
  border-radius: 200px;
  height: 48px;
  border: 1px solid rgba(64, 158, 255, 1);
  width: 48px;
  margin: 24px 0 0 24px;
}

.label_3 {
  width: 28px;
  height: 28px;
  margin: 10px 0 0 9px;
}

.text-group_3 {
  width: 331px;
  height: 85px;
  margin: 24px 80px 0 16px;
}

.text_6 {
  width: 331px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.text_7 {
  width: 331px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.group_2 {
  width: 1561px;
  height: 160px;
  margin: 48px auto 185px
}

.section_1 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 499px;
  height: 160px;
}

.image-wrapper_4 {
  border-radius: 200px;
  height: 48px;
  border: 1px solid rgba(64, 158, 255, 1);
  width: 48px;
  margin: 24px 0 0 24px;
}

.label_4 {
  width: 28px;
  height: 28px;
  margin: 10px 0 0 10px;
}

.text-group_4 {
  width: 331px;
  height: 85px;
  margin: 24px 80px 0 16px;
}

.text_8 {
  width: 331px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.text_9 {
  width: 331px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.section_2 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 499px;
  height: 160px;
  margin-left: 32px;
}

.image-wrapper_5 {
  border-radius: 200px;
  height: 48px;
  border: 1px solid rgba(64, 158, 255, 1);
  width: 48px;
  margin: 24px 0 0 24px;
}

.label_5 {
  width: 28px;
  height: 28px;
  margin: 10px 0 0 10px;
}

.text-group_5 {
  width: 331px;
  height: 85px;
  margin: 24px 80px 0 16px;
}

.text_10 {
  width: 270px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.text_11 {
  width: 331px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.section_3 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 499px;
  height: 160px;
  margin-left: 32px;
}

.image-wrapper_6 {
  border-radius: 200px;
  height: 48px;
  border: 1px solid rgba(64, 158, 255, 1);
  width: 48px;
  margin: 24px 0 0 24px;
}

.label_6 {
  width: 28px;
  height: 28px;
  margin: 10px 0 0 9px;
}

.text-group_6 {
  width: 331px;
  height: 85px;
  margin: 24px 80px 0 16px;
  align-items: center;
}

.text_12 {
  width: 331px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.text_13 {
  width: 331px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.image_1 {
  position: absolute;
  left: -500px;
  top: 427px;
  width: 651px;
  height: 544px;
}

.image-wrapper_7 {
  background-image: linear-gradient(180deg,
      rgba(237, 244, 255, 1) 0,
      rgba(255, 255, 255, 1) 100%);
  height: 700px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 80px;
  overflow: hidden;
}

.image_2 {
  width: 1141px;
  height: 1141px;
  position: absolute;
  right: 0;
  top: 0;
}

.box_5 {
  background-color: #fbfbfd;
  width: 100%;
  // height: 3493px;
  margin-top: -1px;
  justify-content: flex-center;
}

.text-group_7 {
  width: 288px;
  height: 109px;
  margin: 64px auto 0;
}

.text_14 {
  width: 228px;
  height: 34px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 24px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 24px;
  margin-left: 30px;
}

.text_15 {
  width: 288px;
  height: 67px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 48px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 48px;
  margin-top: 8px;
}

.section_4 {
  width: 1560px;
  max-width: 90vw;
  margin: 64px auto 0;
  align-items: center;
}

.box_6 {
  width: 530px;
  height: 186px;
  // margin-top: 123px;
}

.text-group_8 {
  width: 530px;
  height: 110px;
}

.text_16 {
  width: 530px;
  height: 50px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 36px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 36px;
}

.text_17 {
  width: 530px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.block_1 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  width: 160px;
  height: 52px;
  margin-top: 24px;
}

.image-text_1 {
  width: 88px;
  height: 22px;
  margin: 16px 0 0 36px;
}

.text-group_9 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.thumbnail_1 {
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.image_3 {
  width: 950px;
}

.section_5 {
  width: 1560px;
  max-width: 90vw;
  margin: 120px auto 0;
  align-items: center;
}

.image_4 {
  width: 950px;
}

.box_7 {
  width: 530px;
  height: 186px; 
}

.text-group_10 {
  width: 530px;
  height: 110px;
}

.text_18 {
  width: 530px;
  height: 50px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 36px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 36px;
}

.text_19 {
  width: 530px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.block_2 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  width: 160px;
  height: 52px;
  margin-top: 24px;
}

.image-text_2 {
  width: 88px;
  height: 22px;
  margin: 16px 0 0 36px;
}

.text-group_11 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.thumbnail_2 {
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.section_6 {
  width: 1560px;
  max-width: 90vw;
  margin: 120px auto 0;
  align-items: center;
}

.box_8 {
  width: 530px;
  height: 186px; 
}

.text-group_12 {
  width: 530px;
  height: 110px;
}

.text_20 {
  width: 530px;
  height: 50px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 36px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 36px;
}

.text_21 {
  width: 530px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.group_3 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  width: 160px;
  height: 52px;
  margin-top: 24px;
}

.image-text_3 {
  width: 88px;
  height: 22px;
  margin: 16px 0 0 36px;
}

.text-group_13 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.thumbnail_3 {
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.image_5 {
  width: 950px; 
}

.section_7 {
  width: 1560px;
  max-width: 90vw;
  margin: 120px auto 0;
  align-items: center;
}

.image_6 {
  width: 950px;
}

.group_4 {
  width: 530px;
  height: 186px; 
}

.text-group_14 {
  width: 530px;
  height: 110px;
}

.text_22 {
  width: 530px;
  height: 50px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 36px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 36px;
}

.text_23 {
  width: 530px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.box_9 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  width: 160px;
  height: 52px;
  margin-top: 24px;
}

.image-text_4 {
  width: 88px;
  height: 22px;
  margin: 16px 0 0 36px;
}

.text-group_15 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.thumbnail_4 {
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.section_8 {
  width: 1560px;
  max-width: 90vw;
  margin: 120px auto 0;
  align-items: center;
}

.box_10 {
  width: 530px;
  height: 186px; 
}

.text-group_16 {
  width: 530px;
  height: 110px;
}

.text_24 {
  width: 530px;
  height: 50px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 36px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 36px;
}

.text_25 {
  width: 530px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.group_5 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  width: 160px;
  height: 52px;
  margin-top: 24px;
}

.image-text_5 {
  width: 88px;
  height: 22px;
  margin: 16px 0 0 36px;
}

.text-group_17 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.thumbnail_5 {
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.image_7 {
  width: 950px; 
}

.section_9 {
  width: 1560px;
  max-width: 90vw;
  margin: 120px auto 64px;
  align-items: center;
}

.image_8 {
  width: 950px;
}

.box_11 {
  width: 530px;
  height: 186px; 
}

.text-group_18 {
  width: 530px;
  height: 110px;
}

.text_26 {
  width: 530px;
  height: 50px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 36px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 36px;
}

.text_27 {
  width: 530px;
  height: 44px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
}

.block_3 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  width: 160px;
  height: 52px;
  margin-top: 24px;
}

.image-text_6 {
  width: 88px;
  height: 22px;
  margin: 16px 0 0 36px;
}

.text-group_19 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.thumbnail_6 {
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.box_12 {
  width: 100%;
  height: 1404px;
}

.text-group_20 {
  width: 456px;
  height: 109px;
  margin: 184px auto 0;
}

.text_28 {
  width: 456px;
  height: 67px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 48px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 48px;
}

.text_29 {
  width: 312px;
  height: 34px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 24px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 24px;
  margin: 8px 0 0 72px;
}

.block_4 {
  width: 1560px;
  max-width: 90vw;
  height: 263px;
  margin: 64px auto 0;
}

.box_13 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 197px;
  height: 223px;
  margin-top: 40px;
  justify-content: flex-center;
}

.label_7 {
  width: 32px;
  height: 32px;
  margin: 32px 0 0 83px;
}

.text-group_21 {
  width: 96px;
  height: 55px;
  margin: 24px 0 0 51px;
}

.text_30 {
  width: 96px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text_31 {
  width: 96px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 8px;
}

.label_8 {
  width: 24px;
  height: 24px;
  margin: 24px 0 32px 87px;
}

.box_14 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 197px;
  height: 223px;
  margin-left: 24px;
  justify-content: flex-center;
}

.label_9 {
  width: 32px;
  height: 32px;
  margin: 32px 0 0 82px;
}

.text-group_22 {
  width: 128px;
  height: 55px;
  margin: 24px 0 0 34px;
}

.text_32 {
  width: 128px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text_33 {
  width: 128px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 8px;
}

.label_10 {
  width: 24px;
  height: 24px;
  margin: 24px 0 32px 86px;
}

.box_15 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 197px;
  height: 223px;
  margin: 40px 0 0 24px;
}

.label_11 {
  width: 25px;
  height: 28px;
  margin: 34px 0 0 86px;
}

.text-group_23 {
  width: 144px;
  height: 55px;
  margin: 26px 0 0 26px;
}

.text_34 {
  width: 144px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text_35 {
  width: 144px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 8px;
}

.label_12 {
  width: 24px;
  height: 24px;
  margin: 24px 0 32px 86px;
}

.box_16 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 197px;
  height: 223px;
  margin-left: 23px;
}

.label_13 {
  width: 27px;
  height: 28px;
  margin: 34px 0 0 85px;
}

.text-group_24 {
  width: 136px;
  height: 55px;
  margin: 26px 0 0 30px;
}

.text_36 {
  width: 136px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text_37 {
  width: 136px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 8px;
}

.label_14 {
  width: 24px;
  height: 24px;
  margin: 24px 0 32px 86px;
}

.box_17 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 197px;
  height: 223px;
  justify-content: flex-center;
  margin: 40px 0 0 24px;
}

.label_15 {
  width: 32px;
  height: 32px;
  margin: 32px 0 0 82px;
}

.text-group_25 {
  width: 144px;
  height: 55px;
  margin: 24px 0 0 26px;
}

.text_38 {
  width: 144px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text_39 {
  width: 144px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 8px;
}

.label_16 {
  width: 24px;
  height: 24px;
  margin: 24px 0 32px 86px;
}

.box_18 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 197px;
  height: 223px;
  margin-left: 23px;
  justify-content: flex-center;
}

.label_17 {
  width: 32px;
  height: 32px;
  margin: 32px 0 0 83px;
}

.text-group_26 {
  width: 168px;
  height: 55px;
  margin: 24px 0 0 15px;
}

.text_40 {
  width: 168px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text_41 {
  width: 168px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 8px;
}

.label_18 {
  width: 24px;
  height: 24px;
  margin: 24px 0 32px 87px;
}

.box_19 {
  box-shadow: 0px 4px 16px 0px rgba(236, 243, 250, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  width: 197px;
  height: 223px;
  margin: 40px 0 0 24px;
}

.label_19 {
  width: 24px;
  height: 29px;
  margin: 34px 0 0 86px;
}

.text-group_27 {
  width: 144px;
  height: 55px;
  margin: 25px 0 0 26px;
}

.text_42 {
  width: 144px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text_43 {
  width: 144px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 8px;
}

.label_20 {
  width: 24px;
  height: 24px;
  margin: 24px 0 32px 86px;
}

.image-wrapper_8 {
  position: relative;
  width: 1560px;
  max-width: 90vw;
  height: 60px;
  background: url('@/assets/images/home/Vector5.png') no-repeat 100%;
  margin: 32px auto 0;
}

.thumbnail_7 {
  width: 16px;
  height: 16px;
  margin-left: 344px;
}

.thumbnail_8 {
  width: 16px;
  height: 16px;
  margin-right: 311px;
}

.thumbnail_9 {
  position: absolute;
  left: 90px;
  top: 46px;
  width: 16px;
  height: 16px;
}

.thumbnail_10 {
  position: absolute;
  left: 550px;
  top: 46px;
  width: 16px;
  height: 16px;
}

.thumbnail_11 {
  position: absolute;
  left: 780px;
  top: -8px;
  width: 16px;
  height: 16px;
}

.thumbnail_12 {
  position: absolute;
  left: 1009px;
  top: 47px;
  width: 16px;
  height: 16px;
}

.thumbnail_13 {
  position: absolute;
  left: 1452px;
  top: 51px;
  width: 16px;
  height: 16px;
}

.block_5 {
  width: 100%;
  height: 500px;
  margin: 191px 0 1px 0;
  background: url('@/assets/images/home/Frame3475518.png') center center no-repeat;
  background-size: cover;
}

.text-group_28 {
  width: 645px;
  height: 162px;
  margin: 114px auto 0;
}

.text_44 {
  width: 224px;
  height: 45px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 32px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 32px;
  margin-left: 210px;
}

.text_45 {
  width: 645px;
  height: 67px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 48px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 48px;
  margin-top: 8px;
}

.text_46 {
  width: 264px;
  height: 34px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 24px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 24px;
  margin: 8px 0 0 190px;
}

.text-wrapper_1 {
  background-color: rgba(36, 144, 255, 1);
  border-radius: 4px;
  height: 77px;
  width: 428px;
  margin: 32px auto 115px;
  justify-content: center;
  align-items: center;
}

.text_47 {
  width: 128px; 
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 32px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 32px;
  // margin: 16px 0 0 150px;
}

.box_20 {
  background-color: rgba(51, 51, 51, 1);
  height: 318px;
  margin-top: -1px;
  width: 100%;
  justify-content: flex-center;
}

.group_6 {
  width: 1000px;
  max-width: 90vw;
  height: 52px;
  margin: 64px auto 0;
  align-items: center;
}

.image_9 {
  // width: 52px;
  height: 52px;
}

.text_48 {
  width: 64px;
  height: 45px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 32px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 32px;
  margin: 4px 0 0 24px;
}

.text_49 {
  width: 90px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin-left: 120px;
}

.text_50 {
  width: 56px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin-left: 64px;
}

.text_51 {
  width: 56px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin-left: 64px;
}

.text_52 {
  width: 269px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin-left: 64px;
}

.text-wrapper_2 {
  width: 1000px;
  max-width: 90vw;
  justify-content: start !important;
  height: 20px;
  margin: 5px auto 0;
  padding-left: 260px;
}

.text_53 {
  width: 90px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
}

.text_54 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
  margin-left: 64px;
}

.text_55 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
  margin-left: 64px;
}

.text_56 {
  width: 269px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
  margin-left: 64px;
}

.group_7 {
  width: 1000px;
  max-width: 90vw;
  height: 106px;
  margin: 7px auto 180px;
}

.image-text_7 {
  width: 70px;
  height: 106px;
}

.image_10 {
  width: 70px;
  height: 70px;
}

.text-group_29 {
  width: 70px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 14px;
  margin-top: 16px;
}

.text-wrapper_3 {
  width: 56px;
  height: 64px;
  margin: 17px 0 0 344px;
}

.text_57 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
}

.text_58 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
  margin-top: 24px;
}

.text_59 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
  margin: 17px 0 0 64px;
}

.text-wrapper_4 {
  width: 269px;
  height: 64px;
  margin: 17px 0 0 64px;
}

.text_60 {
  width: 269px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
}

.text_61 {
  width: 269px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 14px;
  margin-top: 24px;
}

.box_21 {
  position: absolute;
  left: 0;
  top: -20px;
  width: 100%;
  height: 800px;

}

.group_8 {
  background-color: rgba(255, 255, 255, 1);
  width: 100%;


}

.group_8_1 {
  width: 1560px;
  max-width: 90vw;
  height: 80px;
  margin: 20px auto 0;
  justify-content: start;
}

.image_11 { 
  height: 52px;
  margin: 10px 0 0 0;
}

.text_62 {
  display: inline-block;
  width: 82px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin: 29px 0 0 10px;
}

.section_10 {
  background-color: rgba(239, 245, 255, 1);
  border-radius: 40px;
  width: 240px;
  height: 38px;
  margin: 21px 0 0 956px;
  align-items: center;
}

.thumbnail_14 {
  width: 14px;
  height: 14px;
  margin-left: 16px;
  margin-right: 8px;
}

.text_63 {
  width: 186px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: PingFang SC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin: 8px 16px 0 0;
}

.text-wrapper_5 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  height: 34px;
  width: 64px;
  margin: 23px 0 0 24px;
}

.text_64 {
  width: 32px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  margin: 6px 16px;
  cursor: pointer;
}

.text-wrapper_6 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  height: 34px;
  width: 96px;
  margin: 23px 180px 0 16px;
}

.text_65 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  margin: 6px 16px;
  cursor: pointer;
}

.group_9 {
  width: 1560px;
  max-width: 90vw;
  /* margin: 0 ; */
  margin: 0 auto;
  padding: 1px;
  background: url('@/assets/images/home/banner.png') top right no-repeat;
  background-size: 130% 100%;
  // background: url('https://lanhu-oss.lanhuapp.com/FigmaDDSSlicePNG51534c7738d3fbd38b0c5e10f381ca5e.png') calc(50% + 480px) top no-repeat;
  // background-size: auto 120%;
}

.group_9_1 {
  margin: 159px 0 30px;
  height: 511px;

}

.box_22 {
  width: 528px;
  height: 235px;
  margin-top: 72px;
}

.text_66 {
  width: 156px;
  height: 34px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 24px;
}

.text-group_30 {
  width: 528px;
  height: 108px;
  margin-top: 12px;
}

.text_67 {
  width: 528px;
  height: 67px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 48px;
  font-family: PingFang SC-Semibold; 
  text-align: left;
  white-space: nowrap;
  line-height: 48px;
}

.text_68 {
  width: 528px;
  height: 25px;
  overflow-wrap: break-word;
  color: rgba(119, 119, 119, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin-top: 16px;
}

.box_23 {
  width: 300px;
  height: 49px;
  margin-top: 32px;
}

.text-wrapper_7 {
  background-color: rgba(68, 157, 250, 1);
  border-radius: 4px;
  height: 49px;
  width: 138px;
  align-items: center;
  justify-content: center
}

.text_69 {
  width: 72px; 
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap; 
}

.text-wrapper_8 {
  border-radius: 4px;
  height: 49px;
  border: 1px solid rgba(68, 157, 250, 1);
  width: 138px;
  align-items: center;
  justify-content: center
}

.text_70 {
  width: 72px; 
  overflow-wrap: break-word;
  color: rgba(68, 157, 250, 1);
  font-size: 18px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap; 
}

.image_12 {
  width: 511px;
  height: 511px;
}

body * {
  box-sizing: border-box;
  flex-shrink: 0;
}

body {
  font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
    Arial, PingFang SC-Light, Microsoft YaHei;
  color: #fff;
}

input {
  background-color: transparent;
  border: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  background-color: transparent;
}

button:active {
  opacity: 0.6;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.align-start {
  display: flex;
  align-items: flex-start;
}

.align-center {
  display: flex;
  align-items: center;
}

.align-end {
  display: flex;
  align-items: flex-end;
}

.displayNo {
  opacity: 0;
}

.fadeOut {
  animation: identifier .5s forwards;
}

@keyframes identifier {
  0% {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }

  100% {
    opacity: 1;
    transform: translateZ(0);
  }
}

.po-r {
  position: relative;
}

.bg-r {
  width: 170px;
  height: 500px;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(0, 50%)
}

.bg-l {
  width: 170px;
  height: 500px;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(0, 70%)
}
</style>
