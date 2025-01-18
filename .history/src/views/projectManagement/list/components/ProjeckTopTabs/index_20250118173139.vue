<script setup lang="ts">
//  #region 引入
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import customerApi from "@/api/modules/user_customer";
import fileApi from "@/api/modules/file";
import { cloneDeep } from "lodash-es";
// import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import {
  MessageBox,
  UploadFilled,
  QuestionFilled,
} from "@element-plus/icons-vue";
import storage from "@/utils/storage";
import api from "@/api/modules/projectManagement";
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import customerEdit from "@/views/user/customer/components/CustomerEdit/index.vue"; //快捷操作： 新增客户
import useUserStore from "@/store/modules/user"; // 用户汇率
import apiSite from "@/api/modules/configuration_site_setting";
import Edit from "@/views/configuration/screen_library/components/Edit/index.vue";
// 引入 TinyMCE 编辑器组件
import UEditor from "@/components/UEditor/index.vue";
// 下载
import DownLoad from "@/utils/download";
// 导入图片
import word from "@/assets/images/uploadFile/word.png";
import xlsx from "@/assets/images/uploadFile/xlsx.png";
import pdf from "@/assets/images/uploadFile/pdf.png";
// 国际化
import { useI18n } from "vue-i18n";
//  #endregion

defineOptions({
  name: "SurveyTopTabs",
});
const userStore = useUserStore();
// 快速编辑汇率弹框开关
const dialogVisibleExchangeRate = ref<any>(false);
// 国际化
const { t } = useI18n();
// #region 值
const currencyList = [
  { :label: "", value: "USD" },
  { label: "人民币", value: "CNY" },
];
// 操作系统
const operatingSystemList = [
  { label: "Windows", value: "1" },
  { label: "Mac OS", value: "2" },
  { label: "Linux", value: "3" },
  { label: "Android", value: "4" },
  { label: "其他", value: "5" },
];
// 浏览器
const browserList = [
  { label: "Chrome", value: "1" },
  { label: "Safari", value: "2" },
  { label: "Flrefox", value: "3" },
  { label: "Edge", value: "4" },
  { label: "Opera", value: "5" },
  { label: "其他", value: "6" },
];

// 储存第一次输入美元汇率
const currencyTypeRes = ref<any>(null);
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const projectManagementListStore = useProjectManagementListStore(); //项目
const props: any = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const emits = defineEmits(["sync-project"]);
const localToptTab = ref<any>(props.leftTab);
const validate = inject<any>("validateTopTabs"); //注入Ref
const setAScheduledReleaseTime = inject<any>("currentProjectTimeline"); //注入Ref 设置定时发布时间
const url: string = "例：https://www.xxxx.com/8994343?uid=[uid]";
const activeName = ref("basicSettings"); // tabs
const formRef = ref<any>(); // Ref 在edit中进行校验
const editRef = ref<any>(); // 组件Ref 快捷操作： 新增客户
const fold = ref(!props.tabIndex ? true : false); // 折叠 描述配额
const Url = `${import.meta.env.VITE_APP_API_BASEURL}/api/project/uploadQiniu`;
let data = ref<any>({
  checked: false, //所属区域的全选按钮
  //基础设置
  basicSettings: {
    countryList: [], // 区域
    customerList: [], // 客户
    B2BTypeList: [], // 项目类型
    // 配置 项目级联选择器
    B2BTypeProps: {
      multiple: true, // 多选
      checkStrictly: true,
      emitPath: false, // 只返回该节点的值
      value: "chineseName", // 在调查站会用到项目类型，项目类型不会变，直接用名字，这样调查站就不需要根据id查询了，直接显示就行（刘）
      label: "chineseName",
      lazy: true, // 动态加载
      async lazyLoad(node: any, resolve: any) {
        const nodes =
          (await basicDictionaryStore.getB2BTypeItemChildren(node.data.id)) ||
          [];
        resolve(nodes);
      },
    },
  },
  // 新增
  editProps: {
    id: "",
    countryId: "",
    visible: false,
    row: "",
  },
});

// 自定义校验邮箱
const validateUrlRegistered = (rule: any, value: any, callback: any) => {
  // 网址格式
  const regExpUrl: any =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  if (!regExpUrl.test(localToptTab.value.uidUrl)) {
    callback(new Error("请输入合法网址"));
  }
  if (!localToptTab.value.uidUrl.includes("[uid]")) {
    callback(new Error("格式不正确,请查看例子"));
  }
  callback();
};
// 自定义校验发布时间
const validateReleaseTime = (rule: any, value: any, callback: any) => {
  if (new Date(localToptTab.value.releaseTime).getTime() < Date.now()) {
    callback(new Error("发布时间早于当前时间"));
  }
  callback();
};
// 校验
const rules = reactive<any>({
  name: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
  ],
  projectIdentification: [
    { max: 100, required: true, message: "请输入项目标识", trigger: "blur" },
    { min: 2, max: 100, message: "内容在2-100个字之间", trigger: "blur" },
  ],
  countryIdList: [
    {
      required: true,
      message: "请选择所属区域",
      trigger: "change",
    },
  ],
  clientId: [{ required: true, message: "请选择所属客户", trigger: "change" }],
  currencyType: [{ required: true, message: "请选择币种", trigger: "change" }],
  uidUrl: [
    { required: true, message: "请输入URL", trigger: "blur" },
    { validator: validateUrlRegistered, trigger: "blur" },
  ],
  releaseTime: [{ validator: validateReleaseTime, trigger: "blur" }],
  doMoneyPrice: [
    { required: true, message: "请输入项目价", trigger: "blur" },
    {
      pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,
      message: "请输入大于0的数字，最多保留两位小数",
      trigger: "blur",
    },
  ],
  num: [
    { required: true, message: "请输入配额", trigger: "blur" },
    { pattern: /^[0-9]+$/, message: "请输入0以上的正整数", trigger: "blur" },
  ],
  minimumDuration: [
    { required: true, message: "请输入最小分长", trigger: "blur" },
    {
      pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,
      message: "请输入大于0的数字，最多保留两位小数",
      trigger: "blur",
    },
  ],
  ir: [
    { required: true, message: "请输入ir", trigger: "blur" },
    {
      pattern: /^(100|[1-9]?[0-9])$/,
      message: "请输入0到100之间的正整数",
      trigger: "blur",
    },
  ],
  exchangeRate: [
    { required: true, message: "请输入汇率", trigger: "blur" },
    {
      pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,
      message: "请输入大于0的数字，最多保留两位小数",
      trigger: "blur",
    },
  ],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  startAge: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    {
      validator: (rule: any, value: any, callback: any) => {
        // 判断值是否为空
        if (!value) {
          callback(new Error("请输入年龄"));
        } else if (value < 18) {
          callback(new Error("年龄不能小于18"));
        } else if (value >= 99) {
          callback(new Error("年龄不能大于或等于99"));
        } else {
          callback(); // 校验通过
        }
      },
      trigger: "change",
    },
  ],
});

// 租户汇率
if (!localToptTab.value.clientId) {
  if (userStore.originalExchangeRate) {
    currencyTypeRes.value = userStore.originalExchangeRate;
    localToptTab.value.exchangeRate = userStore.originalExchangeRate;
  }
} else {
  currencyTypeRes.value = 1;
}

// 租户货币类型
if (!localToptTab.value.clientId) {
  if (userStore.currencyType) {
    localToptTab.value.currencyType =
      userStore.currencyType === 1 ? "USD" : "CNY";
  }
}
if (localToptTab.value.browser) {
  // 浏览器
  localToptTab.value.browser = localToptTab.value.browser.split(",");
}
if (localToptTab.value.operatingSystem) {
  // 操作系统(后端刘定义类型为字符串，前端回显转换)
  localToptTab.value.operatingSystem =
    localToptTab.value.operatingSystem.split(",");
}

// #endregion

// #region 方法
// #region 基础设置
// 输入框限制 只能输入数字
const handleInput = (value: any) => {
  // 允许数字键、删除键、退格键、方向键等
  if (value.key === ".") {
    value.preventDefault(); // 阻止非数字键输入
  }
};
// 限制定时发布时间
const disabledDateFn = (time: any) => {
  // 当前时间戳  -  一天的时间戳 86400000
  return time.getTime() < Date.now() - 86400000;
};
// 定时发布时间切换,时间- 最早为当前时间
function handleChangeTime() {
  // @ts-ignore
  const startAt: any = (new Date(localToptTab.value.releaseTime) * 1000) / 1000;
  if (startAt < Date.now()) {
    const date = new Date();
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // getMonth() 返回的是 0 到 11，所以需要加 1
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    localToptTab.value.releaseTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  function padZero(num: any) {
    return (num < 10 ? "0" : "") + num;
  }
  // 设置Edit底部的定时发布时间
  if (localToptTab.value.releaseTime) {
    setAScheduledReleaseTime(localToptTab.value.releaseTime);
  }
}
// 同步客户的前置问卷开关
const changeClient = (val: any) => {
  const findData = data.value.basicSettings.customerList.find(
    (item: any) => item.tenantCustomerId === val,
  );
  localToptTab.value.isProfile = findData.antecedentQuestionnaire === 2 ? 1 : 2;
};

// 所属区域全选
const selectAll = () => {
  localToptTab.value.countryIdList = [];
  if (data.value.checked) {
    data.value.basicSettings.countryList.map((item: any) => {
      localToptTab.value.countryIdList.push(item.id);
    });
  }
};
const tinymceEditor = ref();
// 富文本配置
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
];
const editorConfig = {
  selector: "#tinymceEditor",
  height: 500, // 设置编辑器的高度
  width: 600,
  menubar: true, // 不显示菜单栏
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
  paste_as_text: false, // 粘贴时以纯文本形式处理
  setup(editor: any) {
    // 当编辑器内容改变时，更新 Vue 数据
    editor.on("change", () => {
      localToptTab.value.richText = editor.getContent();
    });
  },
};
// 富文本设置值
function handleChange(v: string) {
  localToptTab.value.richText = v;
}
//富文本框
const changeEditorValue = (v: string) => {
  localToptTab.value.richText = v;
};
// 同步
function syncProject() {
  emits("sync-project");
}
// 折叠 描述配额
function isHieght() {
  fold.value = !fold.value;
}

// #region  上传文件
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const fileList = ref<any>([]); // 上传
// 是否是图片
const isItAPicture = (file: any) => {
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "doc",
    "xls",
    "pdf",
    "xlsx",
    "docx",
  ];
  // 是否 非图片格式
  const isImage = whiteList.indexOf(fileSuffix) === -1;
  return isImage;
};
// 上传前
const beforeUpload = (file: any) => {
  const isImage = isItAPicture(file);
  if (isImage) {
    ElMessage.warning({
      message: "只能上传图片文件JPG，JPEG，PNG，GIF，DOC，XLS，PDF",
      center: true,
    });
  }
  return !isImage;
};
// 删除
const handleRemove: any = async (uploadFile: any, uploadFiles: any) => {
  localToptTab.value.descriptionUrl = uploadFiles.map((item: any) => item.name);
  // 当上传前，判断格式不通过时，会走删除事件，过滤掉后图片并没有走上传接口，也就不需要走删除接口
  if (!isItAPicture(uploadFile)) {
    const { status } = await fileApi.delete({
      fileName: uploadFile.name,
    });
    status === 1 &&
      ElMessage.success({
        message: "删除成功",
        center: true,
      });
  }
};
const replaceImg = (list: any) => {
  // 文件扩展名映射
  const extensionMap: { [key: string]: string } = {
    doc: word,
    docx: word,
    xls: xlsx,
    xlsx: xlsx,
    pdf: pdf,
  };

  // 遍历文件列表
  list.map((item: any) => {
    // 提取文件的扩展名 (忽略大小写)
    const fileExtension = item.name.split(".").pop()?.toLowerCase();
    // 如果扩展名在映射表中，替换url
    if (fileExtension && extensionMap[fileExtension]) {
      item.url = extensionMap[fileExtension];
    }
  });
};
// 上传图片成功
const handleSuccess: any = (uploadFile: any, uploadFiles: any) => {
  replaceImg(fileList.value);
  localToptTab.value.descriptionUrl.push(uploadFile.data.qiNiuUrl);
};
// 超出限制
const handleExceed: any = async (uploadFile: any, uploadFiles: any) => {
  ElMessage.warning({
    message: "最多可上传10个",
    center: true,
  });
};
// 查看
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
// 回显图片
const getUpLoad = async (file: any) => {
  if (file.length) {
    file.forEach(async (item: any) => {
      if (item) {
        const res: any = await fileApi.detail({
          fileName: item,
        });
        fileList.value.push({
          name: item,
          url: res.data.fileUrl,
        });
        replaceImg(fileList.value);
      }
    });
  }
};

// 下载
async function download(val: any) {
  await DownLoad(val, val.name);
}
// #endregion

// 定时发布
const changeTimeReleases = (val: any) => {
  localToptTab.value.isOnline = val === 2 ? 2 : 1;
};

// 切换问卷如果关 清空问卷list
const changeProfile = (val: any) => {
  if (val === 2) localToptTab.value.projectQuotaInfoList = [];
};
//#endregion

// 所属区域改变重新获取 配置信息中的区域
const changeCountryId = () => {
  localToptTab.value.data.configurationInformation.configurationCountryList =
    null;
  // 反选
  data.value.checked = Boolean(
    localToptTab.value.countryIdList.length ===
      basicDictionaryStore.country.length,
  );
};
// 配置区域改变 重新获取题库目录
const changeConfigurationCountryId = () => {
  localToptTab.value.data.configurationInformation.projectCategoryList = null; // 题库目录
  localToptTab.value.data.configurationInformation.initialProblem.projectProblemCategoryId =
    ""; // 问卷绑定值
  clearData();
};
// 清除数据
const clearData = (judge?: boolean) => {
  localToptTab.value.data.configurationInformation.initialProblem.projectProblemId =
    null; // 题库绑定值
  localToptTab.value.data.configurationInformation.ProjectProblemInfoList =
    null; // 题库下对应的答案
  // 编辑回显时 不清除
  if (!judge) {
    localToptTab.value.projectQuotaInfoList = []; // 提交的答案集合
  }
};

// 切换tab 获取区域集合
const changeTab = async (val: any, judge?: boolean) => {
  if (
    val === "configurationInformation" &&
    !localToptTab.value.data.configurationInformation.configurationCountryList
  ) {
    formRef.value.validateField(["countryIdList"], async (valid: any) => {
      if (valid) {
        clearData(judge || false);
        const res = await api.getProjectCountryList({
          countryIdList: localToptTab.value.countryIdList,
        });
        // 配置-区域
        localToptTab.value.data.configurationInformation.configurationCountryList =
          res.data.getProjectCountryListInfoList;
        // 开启默认国际后，只会有一个区域，直接回显
        if (res.data.getProjectCountryListInfoList.length === 1) {
          localToptTab.value.data.configurationInformation.initialProblem.countryId =
            res.data.getProjectCountryListInfoList[0].countryId;
        }
        // 编辑时 已经有初始数据
        if (!localToptTab.value.data.configurationInformation.initialProblem) {
          // 初始化 数据 问题
          localToptTab.value.data.configurationInformation.initialProblem =
            cloneDeep(projectManagementListStore.initialProblem);
        }

        // 问题类型:1:总控问题 2:合作商自己问题
        localToptTab.value.data.configurationInformation.initialProblem.projectQuotaQuestionType =
          cloneDeep(res.data.projectQuotaQuestionType);
      } else {
        activeName.value = "basicSettings";
        nextTick(() => {
          setTimeout(() => {
            formRef.value.scrollToField("countryIdList");
          }); // 延迟一段时间，确保元素已经渲染到DOM中
          ElMessage.warning({ message: "请先选择所属区域", center: true });
        });
      }
    });
  }
};
// 获取题库目录
const getProjectCategoryList = async () => {
  // 如果配置中的区域不存在就请求，反正不请
  if (
    localToptTab.value.data.configurationInformation.initialProblem.countryId
  ) {
    // 就问卷就用 ,没有再请求
    if (!localToptTab.value.data.configurationInformation.projectCategoryList) {
      const params = {
        countryId:
          localToptTab.value.data.configurationInformation.initialProblem
            .countryId,
        projectQuotaQuestionType:
          localToptTab.value.data.configurationInformation.initialProblem
            .projectQuotaQuestionType, //问题类型:1:总控问题 2:合作商自己问题
      };

      const res = await api.getProjectCategoryList(params);

      localToptTab.value.data.configurationInformation.projectCategoryList =
        res.data.getProjectCategoryInfoList.filter(
          (item: any) => item.status === 1,
        );
    }
  } else {
    ElMessage.warning({
      message: "请先选择配置信息下的区域",
      center: true,
    });
  }
};
// 根据目录id查询问题和答案表
const getProjectProblemList = async (id: string | number, judge: boolean) => {
  // 选中值
  if (id) {
    // 置空数据
    setTimeout(async () => {
      const { projectProblemCategoryName, ...params } =
        localToptTab.value.data.configurationInformation.projectCategoryList.find(
          (item: any) => item.projectProblemCategoryId === id,
        );
      const res = await api.getProjectProblemList(params);
      //问题列表 - 显示的数据
      localToptTab.value.data.configurationInformation.ProjectProblemInfoList =
        res.data.getProjectProblemInfoList.map((item: any) => {
          return {
            ...item,
            getProjectAnswerInfoList: item.getProjectAnswerInfoList.sort(
              (a: any, b: any) =>
                a.answerValue.replace(/^[a-zA-Z]+/, "") -
                b.answerValue.replace(/^[a-zA-Z]+/, ""),
            ),
          };
        });

      /**
       * 如果不是编辑的时候正常清空提交和回显的数据
       * 编辑时不能清除,答案(提交list)是接口返回的
       */
      if (!judge) {
        localToptTab.value.projectQuotaInfoList = []; //提交
        // 问题列表 - 提交的数据
        for (
          let i = 0;
          i <
          localToptTab.value.data.configurationInformation
            .ProjectProblemInfoList.length;
          i++
        ) {
          const item = cloneDeep(
            localToptTab.value.data.configurationInformation.initialProblem,
          );
          // 问题id
          item.projectProblemId =
            localToptTab.value.data.configurationInformation.ProjectProblemInfoList[
              i
            ].id;
          // 问题
          item.keyValue =
            localToptTab.value.data.configurationInformation.ProjectProblemInfoList[
              i
            ].question;
          // 问题类型
          item.questionType =
            localToptTab.value.data.configurationInformation.ProjectProblemInfoList[
              i
            ].questionType;
          // 目录id
          item.projectProblemCategoryId = id;
          localToptTab.value.projectQuotaInfoList.push(item);
        }
      }
    });
  } else {
    // 未选中值（清空）
    clearData();
  }
};
// 设置 问题的答案和答案id  type: 1 输入框 2单选 3复选 4下拉
const setAnswerValue = (type: number, index: number) => {
  // 选择的id "" | []
  let id: any =
    localToptTab.value.projectQuotaInfoList[index].projectAnswerIdList;
  // 答案列表 []
  const answerList: any =
    localToptTab.value.data.configurationInformation.ProjectProblemInfoList[
      index
    ].getProjectAnswerInfoList;
  const filteredData = answerList.filter((item: any) => id.includes(item.id));
  localToptTab.value.projectQuotaInfoList[index].answerValueList =
    filteredData.map((item: any) => item.anotherName);
};

// 获取客户
const getCustomerList = async () => {
  // data.value.basicSettings.customerList = await customerStore.getCustomerList();
  // 新增时获取，判断客户是否超出限额
  const res = await customerApi.getCustomerList({});
  data.value.basicSettings.customerList =
    res.data.getTenantCustomerAccordInfoList;
};
// 快捷操作：新增客户
const AddCustomers = () => {
  editRef.value.showEdit();
};
// 获取 客户 区域 项目类型
const getList = async () => {
  await getCustomerList();
  data.value.basicSettings.countryList =
    await basicDictionaryStore.getCountry();
  data.value.basicSettings.B2BTypeList =
    await basicDictionaryStore.getB2BType();
};
// 编辑时 回显配置信息
const showProjectQuotaInfoList = async () => {
  if (localToptTab.value.projectQuotaInfoList.length) {
    localToptTab.value.data.configurationInformation.initialProblem.countryId =
      localToptTab.value.projectQuotaInfoList[0].countryId; // 区域id
    localToptTab.value.data.configurationInformation.initialProblem.projectQuotaQuestionType =
      localToptTab.value.projectQuotaInfoList[0].projectQuotaQuestionType; // 问卷类型
    localToptTab.value.data.configurationInformation.initialProblem.projectProblemCategoryId =
      localToptTab.value.projectQuotaInfoList[0].projectProblemCategoryId; // 问卷id
    await changeTab("configurationInformation", true);
    await getProjectCategoryList();
    setTimeout(async () => {
      await getProjectProblemList(
        localToptTab.value.data.configurationInformation.initialProblem
          .projectProblemCategoryId,
        true,
      );
    }, 100);
  }
};
/**
 * 举例： 显示的问题list(接口获取的数据/project/getProjectProblemList)[爱好，性别，区域]
 * 新增时  提交的问题list(本地处理的数据projectQuotaInfoList)的每一项的绑定值 projectAnswerIdList都为空 不影响
 * 编辑时  提交的问题list(本地处理的数据projectQuotaInfoList) 返回[ 区域，性别，爱好 ]  如果顺序和接口的顺序一致则不影响 如果不一致无法回显和更新
 * 之前的写法 是v-model直接绑定对应的下标
 * 由于顺序不一样所有编辑时(新增不受影响)会影响数据回显 和更新
 * 更换为 调用v-model的底层原理  modelValue  @update:modelValue 并传递 问题id和下标 来判断，
 * 如果 回显list[下标]的问题id 和 提交list[下标]的问题id 一致就试用下标，如果不一致就找到问题id一致的对象 来进行回显和更新
 */
const customModel = (id: any, index: any) => {
  return {
    get() {
      if (localToptTab.value.projectQuotaInfoList[index].id === id) {
        return localToptTab.value.projectQuotaInfoList[index]
          .projectAnswerIdList;
      } else {
        const data = localToptTab.value.projectQuotaInfoList.find(
          (item: any) => item.projectProblemId === id,
        );
        return data.projectAnswerIdList;
      }
    },
    set(newValue: any) {
      if (localToptTab.value.projectQuotaInfoList[index].id === id) {
        localToptTab.value.projectQuotaInfoList[index].projectAnswerIdList =
          newValue;
      } else {
        const data = localToptTab.value.projectQuotaInfoList.find(
          (item: any) => item.projectProblemId === id,
        );
        data.projectAnswerIdList = newValue;
      }
    },
  };
};

// 绑定表单
const exchangeRateRef = ref();
// 表单
const exchangeRateForm = ref<any>({
  // 汇率
  exchangeRate: null,
});

// 校验
const exchangeRateRules = reactive<any>({
  exchangeRate: [
    { required: true, message: "请输入汇率", trigger: "blur" },
    {
      pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,
      message: "请输入一个有效的数字，不能小于0，最多保留两位小数",
      trigger: "blur",
    },
  ],
});

// 快速设置汇率
const setExchangeRate = () => {
  dialogVisibleExchangeRate.value = true;
};

// 提交汇率
const exchangeRateSubmit = async () => {
  await exchangeRateRef.value.validate();
  localToptTab.value.exchangeRate = exchangeRateForm.value.exchangeRate;
  const res = await apiSite.updateWebConfig(exchangeRateForm.value);
  if (res.data.flag) {
    await userStore.getCurrencyType();
    currencyTypeRes.value = userStore.originalExchangeRate;
    localToptTab.value.exchangeRate = userStore.originalExchangeRate;
    localToptTab.value.currencyType =
      userStore.currencyType === 1 ? "USD" : "CNY";
    if (userStore.currencyType !== 1) {
      localToptTab.value.exchangeRate =
        Math.floor((1 / userStore.originalExchangeRate) * 100) / 100;
      currencyTypeRes.value = localToptTab.value.exchangeRate;
    }
    dialogVisibleExchangeRate.value = false;
  }
};
//#endregion
// 切换币种
const handleSelectChange = async (val: any) => {
  const params = {
    beforeCurrency: "",
    oldCurrency: val,
    exchangeRate: "",
  };
  if (val === "USD") {
    params.beforeCurrency = "CNY";
  } else if (val === "CNY") {
    params.beforeCurrency = "USD";
  }
  params.exchangeRate = currencyTypeRes.value;
  const res = await api.updateExchangeRate(params);
  if (res.data) {
    currencyTypeRes.value = Math.floor(res.data.exchangeRate * 100) / 100;
    localToptTab.value.exchangeRate =
      Math.floor(res.data.exchangeRate * 100) / 100;
  }
};

// 如果父组件更新了 leftTab，反映这些更改到本地副本
watch(
  () => props.leftTab,
  (newVal, oleVal) => {
    localToptTab.value = newVal;
  },
  { deep: true },
);
const acquiesceExchangeRate = ref<any>();
onMounted(async () => {
  fileList.value = [];
  // 获取客户 区域 项目类型
  await getList();
  await showProjectQuotaInfoList();
  acquiesceExchangeRate.value = storage.local.get("acquiesceExchangeRate");
});
defineExpose({ getUpLoad });
nextTick(() => {
  // 表单验证方法
  validate(formRef.value);
});
//新增问卷
const addProblem = () => {
  data.value.editProps.id = "";
  data.value.editProps.countryId = "";
  data.value.editProps.row = "";
  data.value.editProps.visible = true;
};
//获取区域
const getProblemList = async () => {
  const res = await api.getProjectCountryList({
    countryIdList: localToptTab.value.countryIdList,
  });
  // 配置-区域
  localToptTab.value.data.configurationInformation.configurationCountryList =
    res.data.getProjectCountryListInfoList;
  // 开启默认国际后，只会有一个区域，直接回显
  if (res.data.getProjectCountryListInfoList.length === 1) {
    localToptTab.value.data.configurationInformation.initialProblem.countryId =
      res.data.getProjectCountryListInfoList[0].countryId;
  }
  // 编辑时 已经有初始数据
  if (!localToptTab.value.data.configurationInformation.initialProblem) {
    // 初始化 数据 问题
    localToptTab.value.data.configurationInformation.initialProblem = cloneDeep(
      projectManagementListStore.initialProblem,
    );
  }

  // 问题类型:1:总控问题 2:合作商自己问题
  localToptTab.value.data.configurationInformation.initialProblem.projectQuotaQuestionType =
    cloneDeep(res.data.projectQuotaQuestionType);
};
</script>

<template>
  <ElForm
    label-width="100px"
    :rules="rules"
    ref="formRef"
    :model="localToptTab"
    label-position="top"
  >
    <el-tabs v-model="activeName" @tab-change="changeTab">
      <el-tab-pane :label="t('newProject.basicSettings')" name="basicSettings">
        <el-card body-style="">
          <template #header>
            <div
              style="display: flex; justify-content: space-between"
              class="card-header"
            >
              <div style="height: 32px; line-height: 32px">
                {{ t('newProject.basicSettings') }}
              </div>
              <div>
                <el-button
                  v-if="props.tabIndex > 0"
                  size="small"
                  type="primary"
                  round
                  plain
                  @click="syncProject"
                >
                  {{ t('newProject.synchronizeData') }}
                </el-button>
                <el-switch
                  v-model="localToptTab.required"
                  :active-value="true"
                  :inactive-value="false"
                  class="ml-2"
                />
                {{ t('newProject.only') }}
              </div>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="t('newProject.name')" prop="name">
                <el-input
                  v-model="localToptTab.name"
                  :disabled="localToptTab.projectType === 2"
                  clearable
                  :maxlength="50"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="localToptTab.projectType !== 2" :span="6">
              <el-form-item :label="t('newProject.projectIdentification')" prop="projectIdentification">
                <el-input
                  clearable
                  v-model.trim="localToptTab.projectIdentification"
                  :maxlength="100"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="localToptTab.projectType !== 2" :span="6">
              <!-- 单个 -->
              <el-form-item :label="t('newProject.clientId')" prop="clientId">
                <el-select
                  class="placeholderColor"
                  placeholder="Select"
                  v-model="localToptTab.clientId"
                  :disabled="localToptTab.projectType === 2"
                  clearable
                  @change="changeClient"
                >
                  <el-option
                    v-for="item in data.basicSettings.customerList"
                    :key="item.tenantCustomerId"
                    :value="item.tenantCustomerId"
                    :label="item.customerAccord"
                    :disabled="
                      item.isReveal === 1 ||
                      (item.turnover &&
                        item.practiceTurnover &&
                        item.turnover < item.practiceTurnover)
                    "
                  >
                    <span style="float: left">{{ item.customerAccord }}</span>
                    <span
                      style="float: right; color: #fb6868; font-size: 13px"
                      v-show="item.isReveal === 1"
                    >
                      <span v-show="item.practiceTurnover > item.turnover">
                        {{t('newProject.turnoverLimit')}}
                      </span>
                      <span v-show="item.rateAudit > item.practiceRateAudit">
                        {{t('newProject.notQualified')}}
                      </span>
                    </span>
                  </el-option>
                  <el-button
                    size="small"
                    class="buttonClass"
                    @click="AddCustomers"
                  >
                  {{t('newProject.notQualified')}}
                    <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
                    <!-- <SvgIcon
                      name="ant-design:plus-outlined"
                  style="border-radius: 50%;padding: 2px;margin:0 4px;border: 1px solid #409EFF;"
                    /> -->
                  </el-button>
                  <template #empty>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 1rem;
                      "
                    >
                    {{t('newProject.nodata')}}
                      <el-button
                        type="primary"
                        link
                        size="small"
                        @click="AddCustomers"
                      >
                      {{t('newProject.quickAdd')}}
                        <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
                        <!-- <SvgIcon name="ant-design:plus-outlined" /> -->
                      </el-button>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="t('newProject.countryIdList')" prop="countryIdList">
                <ElSelect
                  class="placeholderColor"
                  v-model="localToptTab.countryIdList"
                  :disabled="localToptTab.projectType === 2"
                  :placeholder="t('newProject.area')"
                  clearable
                  filterable
                  multiple
                  collapse-tags
                  @change="changeCountryId"
                >
                  <template #header>
                    <el-checkbox
                      v-model="data.checked"
                      @change="selectAll"
                      style="display: flex; height: unset"
                      >{{t('newProject.global')}}</el-checkbox
                    >
                  </template>
                  <ElOption
                    v-for="item in data.basicSettings.countryList"
                    :label="item.chineseName"
                    :value="item.id"
                  >
                  </ElOption>
                </ElSelect>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="t('newProject.currency')" prop="currencyType">
                <el-button
                  v-if="!userStore.originalExchangeRate"
                  type="primary"
                  link
                  @click="setExchangeRate"
                  >{{t('newProject.toSet')}}>></el-button
                >
                <el-select
                  v-else
                  v-model="localToptTab.currencyType"
                  :disabled="!!localToptTab.projectId"
                  value-key=""
                  style="width: 22.4375rem"
                  :placeholder="t('newProject.currencySelect')"
                  filterable
                  @change="handleSelectChange"
                >
                  <el-option
                    v-for="item in currencyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- v-if="currencyTypeRes !== null" -->
              <el-form-item :label="t('newProject.exchangeRate')" prop="">
                <el-text v-if="currencyTypeRes !== null">
                  1{{t('newProject.dollor')}} = {{ acquiesceExchangeRate }}{{t('newProject.rmb')}}</el-text
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="t('newProject.projectPrice')" prop="doMoneyPrice">
                <el-input
                  style="height: 2rem"
                  v-model="localToptTab.doMoneyPrice"
                  controls-position="right"
                  size="large"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="t('newProject.quota')" prop="num">
                <el-input
                  style="height: 2rem"
                  v-model="localToptTab.num"
                  size="large"
                  @keydown="handleInput"
                />
              </el-form-item>
            </el-col>
            <el-col style="position: relative" :span="6">
              <el-form-item prop="minimumDuration">
                <template #label>
                  <div>
                    {{t('newProject.miniLength')}}<el-tooltip
                      class="tooltips"
                      :content="t('newProject.latestTime')"
                      placement="top"
                    >
                      <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                    </el-tooltip>
                  </div>
                </template>
                <el-input
                  style="height: 2rem; width: 100%"
                  v-model.number="localToptTab.minimumDuration"
                  :min="1"
                  :step="1"
                  step-strictly
                  controls-position="right"
                  size="large"
                  @keydown="handleInput"
                  ><template #append> min </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="IR" prop="ir">
                <el-input v-model="localToptTab.ir">
                  <template #append> % </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="uidUrl">
                <template #label>
                  <div>
                    URL<el-tooltip class="tooltips" placement="top">
                      <template #content>
                        <div>
                          <div>{{t('newProject.link')}}<br />{{ url }}</div>
                          <div style="margin-top: 4px">
                            {{t('newProject.bandend')}}
                          </div>
                        </div>
                      </template>
                      <SvgIcon class="SvgIcon2" name="i-ri:question-line" />
                    </el-tooltip>
                  </div>
                </template>
                <el-input
                  v-if="localToptTab.projectType === 2"
                  clearable
                  :value="'**************************************'"
                  :disabled="localToptTab.projectType === 2"
                />
                <el-input
                  v-else
                  clearable
                  v-model.trim="localToptTab.uidUrl"
                  :disabled="localToptTab.projectType === 2"
                />
                <el-text class="mx-1">{{ url }}</el-text>
              </el-form-item>
            </el-col>
            <el-col
              v-if="
                localToptTab.mutualExclusion === 1 && !localToptTab.required
              "
              :span="12"
            >
              <el-form-item :label="t('newProject.exclusiveID')">
                <el-input
                  clearable
                  v-model.trim="localToptTab.mutualExclusionId"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-if="!localToptTab.required">
          <template #header>
            <div class="card-header">
              <span>{{t('newProject.otherSettings')}}</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item :label="t('newProject.sex')" class="flex" prop="sex">
                <el-radio-group
                  v-model="localToptTab.sex"
                  :disabled="localToptTab.projectType === 2"
                  class="sex-select"
                >
                  <el-radio-button :value="1" :label="t('newProject.unlimited')"></el-radio-button>
                  <el-radio-button :value="2" :label="t('newProject.male')"></el-radio-button>
                  <el-radio-button :value="3" :label="t('newProject.female')"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="年龄" class="flex" prop="startAge">
                <el-input
                  v-model.trim="localToptTab.startAge"
                  :disabled="localToptTab.projectType === 2"
                  style="width: 3rem !important"
                />
                <span style="margin: 0 0.25rem">-</span>
                <el-input
                  v-model.trim="localToptTab.endAge"
                  :disabled="localToptTab.projectType === 2"
                  style="width: 3rem !important"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="t('newProject.operatingSystem')" class="flex">
                <el-select
                  v-model.trim="localToptTab.operatingSystem"
                  :placeholder="t('newProject.systemSelect')"
                  :disabled="localToptTab.projectType === 2"
                  multiple
                  clearable
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                >
                  <el-option
                    v-for="item in operatingSystemList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1"> </el-col>
            <el-col :span="6">
              <el-form-item :label="t('newProject.browser')" class="flex">
                <el-select
                  v-model.trim="localToptTab.browser"
                  :placeholder="t('newProject.browserSelect')"
                  :disabled="localToptTab.projectType === 2"
                  multiple
                  clearable
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                >
                  <el-option
                    v-for="item in browserList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item :label="t('newProject.scheduledRelease')" class="flex">
                <el-switch
                  :active-value="2"
                  :inactive-value="1"
                  v-model="localToptTab.isTimeReleases"
                  :disabled="localToptTab.projectType === 2"
                  @change="changeTimeReleases"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="B2B" class="flex">
                <el-switch
                  :active-value="2"
                  :inactive-value="1"
                  v-model="localToptTab.isB2b"
                  :disabled="localToptTab.projectType === 2"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :label="t('newProject.online')" class="flex">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  :disabled="
                    localToptTab.isTimeReleases === 2 ||
                    localToptTab.projectType === 2
                  "
                  v-model="localToptTab.isOnline"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :label="t('newProject.preRuestionnaire')" class="flex">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="localToptTab.isProfile"
                  :disabled="localToptTab.projectType === 2"
                  @change="changeProfile"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :label="t('newProject.pinned')" class="flex">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="localToptTab.isPinned"
                  :disabled="localToptTab.projectType === 2"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <!-- 定时发布开显示时间，关隐藏 -->
            <el-col :span="5" v-if="localToptTab.isTimeReleases === 2">
              <el-form-item :label="t('newProject.releaseTime')" prop="releaseTime">
                <el-date-picker
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model="localToptTab.releaseTime"
                  :placeholder="t('newProject.timeSelect')"
                  :disabledDate="disabledDateFn"
                  @change="handleChangeTime"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="5"
              v-if="localToptTab.isB2b === 2 && localToptTab.projectType !== 2"
            >
              <el-form-item :label="t('newProject.projectType')">
                <el-cascader
                  :show-all-levels="false"
                  v-model="localToptTab.projectType"
                  :props="data.basicSettings.B2BTypeProps"
                  :options="data.basicSettings.B2BTypeList"
                  :collapse-tags="true"
                  filterable
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="t('newProject.remark')">
                <el-input
                  maxlength="200"
                  show-word-limit
                  type="textarea"
                  :rows="5"
                  v-model="localToptTab.remark"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-if="!localToptTab.required">
          <template #header>
            <div
              style="display: flex; justify-content: space-between"
              class="card-header"
            >
              <span>{{t('newProject.descriptionQuota')}}</span>
              <el-button type="primary" link size="default" @click="isHieght">
                {{ fold ? t('newProject.collapse') : t('newProject.expand') }}
              </el-button>
            </div>
          </template>
          <div v-if="fold">
            <el-form-item :label="t('newProject.uploadIF')">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                "
              >
                <el-upload
                  v-model:file-list="fileList"
                  :action="Url"
                  list-type="picture-card"
                  :drag="true"
                  :limit="10"
                  accept=".png, .jpg, .jpeg, .gif"
                  :before-upload="beforeUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-exceed="handleExceed"
                >
                  <el-icon style="margin-bottom: none" class="el-icon--upload">
                    <UploadFilled />
                  </el-icon>
                  <div class="el-upload__text">{{t('newProject.upload')}}</div>
                  <template #tip>
                    <div class="el-upload__tip">
                      <el-text size="small">
                        {{t('newProject.support')}}
                      </el-text>
                    </div>
                  </template>
                </el-upload>
                <el-dialog
                  v-model="dialogVisible"
                  style="
                    z-index: 1000;
                    transform: translate(0);
                    position: relative;
                  "
                >
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
                <div v-for="item in fileList" :key="item.name">
                  <div class="i-f7:doc-text w-1rem h-1rem"></div>
                  <el-link
                    style="padding: 0; margin: 0"
                    :underline="false"
                    type="primary"
                    @click="download(item)"
                  >
                    {{ item.name }}
                    <span style="margin-left: 0.625rem">{{t('newProject.download')}}</span>
                  </el-link>
                </div>
              </div>
            </el-form-item>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="t('newProject.projectDescribe')">
                  <!-- key解决富文本编译器   先新增  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
                  <!-- <Editor
                    class="editor"
                    :value="localToptTab.richText"
                    :plugins="plugins"
                    :locale="zhHans"
                    @change="handleChange"
                  /> -->
                  <UEditor
                    style="width: 100%"
                    :tinymceHtml="localToptTab.richText"
                    @changeEditorValue="changeEditorValue"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane
        label="配置信息"
        name="configurationInformation"
        v-if="
          localToptTab.isProfile === 1 &&
          !localToptTab.required &&
          localToptTab.projectType !== 2
        "
      >
        <el-card v-if="localToptTab.data">
          <template #header>
            <div class="card-header">配置信息</div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="选择区域">
                <el-select
                  v-model="
                    localToptTab.data.configurationInformation.initialProblem
                      .countryId
                  "
                  filterable
                  clearable
                  placeholder="Select"
                  :disabled="localToptTab.projectType === 2"
                  @change="changeConfigurationCountryId"
                >
                  <ElOption
                    v-for="item in localToptTab.data.configurationInformation
                      .configurationCountryList"
                    :label="item.countryName"
                    :value="item.countryId"
                  ></ElOption>
                  <template #empty>
                    <div>
                      <el-button
                        type="primary"
                        link
                        class="buttonClass"
                        size="small"
                        @click="addProblem"
                      >
                        快捷新增
                        <SvgIcon
                          name="ant-design:plus-outlined"
                          color="#fff"
                          style="
                            background-color: var(--el-color-primary);
                            border-radius: 50%;
                            padding: 0.125rem;
                            margin: 0 0.125rem;
                          "
                        />
                      </el-button>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              v-if="
                localToptTab.data.configurationInformation.initialProblem
                  .countryId
              "
            >
              <el-form-item label="问卷名称">
                <el-select
                  v-model="
                    localToptTab.data.configurationInformation.initialProblem
                      .projectProblemCategoryId
                  "
                  clearable
                  placeholder="Select"
                  :disabled="localToptTab.projectType === 2"
                  @focus="getProjectCategoryList"
                  @change="getProjectProblemList"
                >
                  <el-option
                    v-for="item in localToptTab.data.configurationInformation
                      .projectCategoryList"
                    :key="item.projectProblemCategoryId"
                    :label="item.projectProblemCategoryName"
                    :value="item.projectProblemCategoryId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 1 输入框 2单选 3复选 4下拉  -->
          <template
            v-if="
              localToptTab.data.configurationInformation
                .ProjectProblemInfoList &&
              localToptTab.data.configurationInformation.ProjectProblemInfoList
                .length &&
              localToptTab.projectQuotaInfoList.length
            "
          >
            <el-row
              class="allocation"
              :gutter="20"
              v-for="(item, index) in localToptTab.data.configurationInformation
                .ProjectProblemInfoList"
            >
              <el-col :span="20"> 问题：{{ item.question }} </el-col>
              <el-col :span="20">
                <el-form-item>
                  <!-- 1输入框 -->
                  <el-input
                    v-if="item.questionType === 1"
                    disabled
                    placeholder="输入框无法设置"
                  ></el-input>
                  <!-- 3多选 值为[]-->
                  <el-checkbox-group
                    v-else
                    :modelValue="customModel(item.id, index).get()"
                    @update:modelValue="customModel(item.id, index).set($event)"
                    @change="setAnswerValue(3, index)"
                  >
                    <el-checkbox
                      :label="ite.anotherName"
                      :value="ite.id"
                      v-for="ite in item.getProjectAnswerInfoList"
                    />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-card>
      </el-tab-pane>
      <el-tab-pane
        :label="t('newProject.safetyInformation')"
        name="securityInformation"
        v-if="!localToptTab.required"
      >
        <el-card>
          <template #header>
            <div class="card-header">{{t('newProject.safetyInformation')}}</div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item>
                <template #label>
                  <div>{{t('newProject.hourly')}}<span class="red">{{t('newProject.inflow')}}</span>{{t('newProject.num')}}</div>
                </template>
                <el-input-number
                  style="height: 2rem"
                  v-model="localToptTab.preNum"
                  :min="1"
                  :step="1"
                  step-strictly
                  controls-position="right"
                  size="large"
                  @keydown="handleInput"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1"> </el-col>
            <el-col :span="6">
              <el-form-item>
                <template #label>
                  <div>{{t('newProject.hourly')}}<span class="blue">{{t('newProject.completion')}}</span>{{t('newProject.num')}}</div>
                </template>
                <el-input-number
                  style="height: 2rem"
                  v-model="localToptTab.limitedQuantity"
                  :min="1"
                  :step="1"
                  step-strictly
                  controls-position="right"
                  size="large"
                  @keydown="handleInput"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1"> </el-col>
            <el-col :span="4" class="flex">
              <el-form-item label="" class="flex m-0">
                <template #label>
                  <div>
                    {{t('newProject.allowRepeat')}}<el-tooltip class="tooltips" placement="top">
                      <template #content>
                        <div>{{t('newProject.switchOn')}}</div>
                        <div>{{t('newProject.switchOff')}}</div>
                      </template>
                      <SvgIcon class="SvgIcon2" name="i-ri:question-line" />
                    </el-tooltip>
                  </div>
                </template>
                <el-switch
                  v-model="localToptTab.ipDifferenceDetection"
                  :active-value="1"
                  :inactive-value="2"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 先不删除，后面可能会加 -->
          <!-- <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="时差检测">
                <el-switch
                  v-model="localToptTab.timeDifferenceDetection"
                  :active-value="1"
                  :inactive-value="2"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="IP一致性检测">
                <el-switch
                  v-model="localToptTab.ipConsistency"
                  :active-value="1"
                  :inactive-value="2"
                />
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-card>
        <!-- <div class="hui">举例</div>
        <div class="hui">
          小时准入量【5】：10:00~11:00时间区间只能5人参与该项目
        </div>
        <div class="hui">
          小时完成量【5】：10:00~11:00时间区间只能5人完成该项目
        </div>
        <div class="hui">
          允许重复参与：开启后，小明同学做调查可以对该项目一直重复做
        </div> -->
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="dialogVisibleExchangeRate" title="设置汇率" width="500">
      <el-form
        :model="exchangeRateForm"
        ref="exchangeRateRef"
        :rules="exchangeRateRules"
        label-width="90px"
        :inline="false"
      >
        <el-form-item label="美元汇率" prop="exchangeRate">
          <div class="right">
            <el-input
              v-model="exchangeRateForm.exchangeRate"
              placeholder="请输入数值"
              clearable
            >
              <template #prefix>
                <!-- 自定义 SVG 图标作为前缀图标 -->
                <el-text style="color: #333">
                  1 {{t('newProject.dollor')}} (USD)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=
                </el-text>
              </template>

              <template #suffix>
                <!-- 自定义 SVG 图标作为后缀图标 -->
                <el-text style="color: #333"> {{t('newProject.rmb')}} (CNY) </el-text>
              </template>
            </el-input>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="exchangeRateSubmit">
            确认
          </el-button>
          <el-button @click="dialogVisibleExchangeRate = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
    <customerEdit ref="editRef" @fetch-data="getCustomerList" />
    <Edit
      v-if="data.editProps.visible"
      :id="data.editProps.id"
      :countryId="data.editProps.countryId"
      v-model="data.editProps.visible"
      :row="data.editProps.row"
      @success="getProblemList"
    ></Edit>
  </ElForm>
</template>

<style lang="scss" scoped>
:deep(.tox-promotion) {
  display: none !important;
}

.buttonClass {
  text-align: center;
  width: 100%;
  margin: 0.75rem;
  height: 2rem;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 500;
  font-size: 0.875rem;
  color: #409eff;
  line-height: 16px;
  background: #f4f8ff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #e9eef3;
}

/* 使按钮在下拉框展开时自适应宽度 */
.el-select-dropdown .buttonClass {
  width: calc(100% - 24px);
  /* 减去两边的 padding */
}

:deep(.el-button.is-link:hover) {
  color: #409eff !important;
  background: #f4f8ff !important;
  border-radius: 4px 4px 4px 4px !important;
  border: 1px solid #e9eef3 !important;
}

.fx-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.editor) {
  width: 100%;
}

:deep(.dialog-footer) {
  text-align: center;
}

// card样式
:deep(.el-card) {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;

  .el-row:nth-last-of-type(1) {
    margin-bottom: 0 !important;
  }
}

:deep(.el-card__header) {
  border: none !important;
}

:deep(.el-card__body) {
  padding-bottom: 0 !important;
}

// card样式

.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }
}

.allocation {
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px dashed #d5d5d5;
}

:deep {
  .el-input-number,
  .el-input,
  .el-select,
  .el-select__wrapper,
  .el-cascader,
  .el-form-item__content {
    width: 100% !important;
  }

  td .el-form-item {
    margin: 0;
  }

  .bytemd-body {
    height: calc(100% - 41px);
  }

  .el-input-number.is-controls-right[class*="large"] [class*="decrease"],
  .el-input-number.is-controls-right[class*="large"] [class*="increase"] {
    --el-input-number-controls-height: none;
  }

  .el-upload-dragger .el-icon--upload {
    margin-bottom: none !important;
  }

  .el-upload-dragger {
    width: 100%;
    height: 100% !important;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  /* 使边框合并 */
}

th,
td {
  padding: 10px;
  /* 单元格内部填充 */
  text-align: center;
  /* 文本左对齐 */
  border: 1px solid #e4e7ed;
  /* 给每个单元格新增边框 */
}

th {
  background-color: #efefef;
  /* 表头背景颜色 */
  line-height: 100%;
  font-weight: bold;
  /* 表头文字加粗 */
}

tr:hover {
  background-color: #f9f9f9;
  /* 鼠标悬停效果 */
}

.red {
  color: #df354b;
}

.blue {
  color: #5d97ff;
}

.hui {
  font-size: 14px;
  color: #818181;
}

// 让单选 左右布局
.flex {
  display: flex !important;
  align-items: center;

  :deep(.el-form-item__label) {
    margin-bottom: 0;
  }
}

:deep(.el-form-item--label-top .el-form-item__label) {
  display: inline-flex;
}

.placeholderColor {
  --el-text-color-placeholder: #5d97ff;
}

// :deep(.right .el-input__wrapper) {
//   box-shadow: none;
// }

:deep(.right .el-input__inner) {
  text-align: center;
}

.sex-select {
  display: flex;
  flex-wrap: nowrap;
}
</style>
