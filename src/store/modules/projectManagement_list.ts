const useProjectManagementListStore = defineStore(
  // 唯一ID
  "projectManagementList",
  () => {
    // 初始数据
    const initialTopTabsData = {
      name: "", //项目名称
      projectIdentification: "", // 项目标识
      clientId: null, //	所属客户编号id(客户表主键)
      countryIdList: [], //所属国家编号id(国家表主键)
      doMoneyPrice: null, //原价-美元
      num: null, //配额
      minimumDuration: null, //最小时长/分-这么问卷需要做多长时间,没有到设定的分钟,甄别
      ir: null, //ir
      uidUrl: "", //url
      mutualExclusion: 2, //	互斥ID 1:开启 2:关闭
      mutualExclusionId: "", //	如果互斥id选择开启,需要传id值
      remark: "", //备注
      isPinned: 2, //	是否置顶:1:置顶 2:不置顶
      isOnline: 2, //	是否在线:1:在线 2:不在线
      isProfile: 2, //	是否资料:1:资料 2:不资料
      isB2b: 1, //是否b2b:1:不是 2:是
      projectType: "", //当b2b为是的时候需要项目类型
      projectRemark: "", //	项目备注-仅针对租户pm查看
      isTimeReleases: 1, //	是否定时发布:1:不是 2:是
      releaseTime: "", //	如果选择定时发布,需要传入发布时间
      descriptionUrl: "", //	描述配额url
      richText: "", //富文本编辑器内容
      //配置信息
      addProjectQuotaInfoList: [],
      timeDifferenceDetection: 2, //时差检测1-开启 2-不开启
      ipDifferenceDetection: 2, //重复IP检测1-开启 2-不开启
      ipConsistency: 2, //	IP一致性(完成IP和进入IP)检测1-开启 2-不开启
      limitedQuantity: null, //	小时完成量
      preNum: null, //	小时准入量
      // 配置信息中展示需要的数据，提交时删除
      data: {
        //配置信息
        configurationInformation: {
          // 问题初始数据
          initialProblem: {
            countryId: null, //问卷对应国家id
            projectProblemCategoryId: null, //问题类别id
            projectQuotaQuestionType: null, //问题类型:1:总控问题 2:租户自己问题
            projectProblemId: null, //	前置问卷问题id
            keyValue: "", //	前置问卷问题
            answerValueList: [], //前置问卷答案,
            projectAnswerIdList: [], //	前置问卷答案id,
          },

          configurationCountryList: [], // 配置信息-国家
          projectCategoryList: null, //题库目录
          ProjectProblemInfoList: [], // 问题列表 - 显示
        },
      },
    };
    // 问题 答案 初始数据
    const initialProblem = {
      countryId: null, //问卷对应国家id
      projectProblemCategoryId: null, //问题类别id
      projectQuotaQuestionType: null, //问题类型:1:总控问题 2:租户自己问题
      projectProblemId: null, //	前置问卷问题id
      keyValue: "", //	前置问卷问题
      answerValueList: [], //前置问卷答案,
      projectAnswerIdList: [], //	前置问卷答案id,
    };
    return {
      initialTopTabsData,
      initialProblem,
    };
  }
);

export default useProjectManagementListStore;
