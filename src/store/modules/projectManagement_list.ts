import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户


const useProjectManagementListStore = defineStore(
  // 唯一ID
  "projectManagementList",
  () => {
    const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
    const customerStore = useUserCustomerStore(); // 客户
    // 回显时存储编辑前的数据，用于做数据对比，显示操作日志
    const dataBeforeEditing = ref<any>([])
    // 初始数据
    const initialTopTabsData: any = {
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
      isOnline: 1, //	是否在线:1:在线 2:不在线
      isProfile: 2, //	是否资料:1:资料 2:不资料
      isB2b: 1, //是否b2b:1:不是 2:是
      projectType: [], //当b2b为是的时候需要项目类型
      projectRemark: "", //	项目备注-仅针对租户pm查看
      isTimeReleases: 1, //	是否定时发布:1:不是 2:是
      releaseTime: "", //	如果选择定时发布,需要传入发布时间
      descriptionUrl: [], //	描述配额url
      richText: "", //富文本编辑器内容
      //配置信息
      projectQuotaInfoList: [],
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
            questionType: null, // 问题类型    type: 1 输入框 2单选 3复选 4下拉
            answerValueList: [], //前置问卷答案,
            projectAnswerIdList: [], //	前置问卷答案id,
          },

          configurationCountryList: null, // 配置信息-国家
          projectCategoryList: null, //题库目录
          ProjectProblemInfoList: [], // 问题列表 - 显示
        },
      },
    };
    const enumeration: any = {
      name: {
        val: "项目名称"
      },
      projectIdentification: {
        val: "项目标识"
      },
      clientId: {
        val: '所属客户'
      },
      countryIdList: {
        val: '所属国家'
      },
      doMoneyPrice: {
        val: '原价'
      },
      num: {
        val: '配额'
      },
      minimumDuration: {
        val: '最小时长'
      },
      ir: {
        val: 'ir'
      },
      uidUrl: {
        val: "url"
      },
      mutualExclusion: {
        val: '填写互斥ID',
        type: 'switch',
        1: '开启',
        2: '关闭'
      },
      mutualExclusionId: {
        val: "互斥id"
      },
      remark: {
        val: "备注"
      },
      isPinned: {
        val: '置顶',
        type: 'switch',
        1: '开启',
        2: '关闭',
      },
      isOnline: {
        type: 'switch',
        val: '在线',
        1: '开启',
        2: '关闭',
      },
      isProfile: {
        val: '前置问卷',
        type: 'switch',
        1: '开启',
        2: '关闭',
      },
      isB2b: {
        val: 'b2b',
        type: 'switch',
        2: '开启',
        1: '关闭',
      },
      projectType: {
        val: '项目类型'
      },
      isTimeReleases: {
        val: '定时发布',
        type: 'switch',
        2: '开启',
        1: '关闭',
      },
      releaseTime: {
        val: "发布时间"
      },
      limitedQuantity: {
        val: '小时完成量'
      },
      preNum: {
        val: '小时准入量'
      },
      ipDifferenceDetection: {
        val: '允许重复参与',
        type: 'switch',
        1: '开启',
        2: '关闭',
      },
    };
    // 问题 答案 初始数据
    const initialProblem = {
      countryId: null, //问卷对应国家id
      projectProblemCategoryId: null, //问题类别id
      projectQuotaQuestionType: null, //问题类型:1:总控问题 2:租户自己问题
      projectProblemId: null, //	前置问卷问题id
      keyValue: "", //	前置问卷问题
      questionType: null, // 问题类型    type: 1 输入框 2单选 3复选 4下拉
      answerValueList: [], //前置问卷答案,
      projectAnswerIdList: [], //	前置问卷答案id,
    };
    // 分配类型
    const allocationTypeList: any = {
      1: "自动分配",
      2: "供应商",
      3: "会员组",
    };

    // 用于对比编辑前后不同的值
    const compareProjectData = async (oldData: any, newData: any) => {
      // 创建一个映射表，用于存储 projectId 对应的对象
      const oldDataMap = oldData.reduce((map: any, item: any) => {
        map[item.projectId] = item;
        return map;
      }, {});
      // 遍历 newData 并添加差异信息到每个 newItem
      await newData.forEach(async (newItem: any) => {
        const oldItem = oldDataMap[newItem.projectId];
        if (oldItem) {
          // 创建一个差异记录数组
          const differences = [];
          // 遍历 newItem 的每个字段
          for (const key in newItem) {
            if (enumeration.hasOwnProperty(key)) {
              let newValue = newItem[key];
              let oldValue = oldItem[key];
              if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                // 转换空数组为字符串
                Array.isArray(newValue) && !newValue.length && (newValue = newValue.toString())
                Array.isArray(oldValue) && !oldValue.length && (oldValue = oldValue.toString())
                if (key === 'clientId' || key === 'countryIdList') {
                  oldValue = await getValue(key, oldValue)
                  newValue = await getValue(key, newValue)
                }
                const fieldLabel = enumeration[key].val || key;
                if (enumeration[key].type === 'switch') {
                  differences.push(`${fieldLabel}「${enumeration[key][oldValue]}」更改为「${enumeration[key][newValue]}」`);
                } else {
                  differences.push(`${fieldLabel}「${oldValue || 'null'}」更改为「${newValue || 'null'}」`);
                }


              }
            }
          }
          // 将差异信息添加到 newItem 对象中
          if (differences.length > 0) {
            newItem.projectLogList = differences;
          }
        }
      });

      return newData;
    }
    const getValue = async (key: any, val: any) => {
      let value: any
      if (key === 'clientId') {
        const data: any = await customerStore.getCustomerList();
        const findData = data.find((item: any) => item.tenantCustomerId === val)
        value = findData.customerAccord
      } else if (key === 'countryIdList') {
        const data = await basicDictionaryStore.getCountry();
        const idToChineseName = data.reduce((acc: any, item: any) => {
          acc[item.id] = item.chineseName;
          return acc;
        }, {});

        // 获取存在于 idArray 中的 chineseName
        value = val
          .map((id: any) => idToChineseName[id])
          .filter((name: any) => name !== undefined);
      }
      return value;
    }

    return {
      initialTopTabsData,
      initialProblem,
      allocationTypeList,
      dataBeforeEditing,
      compareProjectData,
    };
  }
);

export default useProjectManagementListStore;
