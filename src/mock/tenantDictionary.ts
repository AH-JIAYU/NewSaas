import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 字典
const dictionaryList = [
  {
    id: 1,
    label: "国家",
    code: "test",
    items: [
      {
        id: 1,
        chineseName: "中国",
        englishName: "ZH",
        value: "1",
        enable: true,
        children:[
          {
            id: 2,
            chineseName: "台湾省",
            englishName: "TW",
            value: "2",
            enable: true,
          }
        ]
      },
      {
        id: 3,
        chineseName: "美国",
        englishName: "US",
        value: "3",
        enable: true,
        children:[
          {
            id: 4,
            chineseName: "佛罗里达州",
            englishName: "FLLD",
            value: "4",
            enable: true,
          }
        ]
      },
    ],
  },
  {
    id: 2,
    label: "性别",
    code: "sex",
    items: [
      {
        id: 2,
        chineseName: "女",
        value: "0",
        enable: true,
      },
      {
        id: 3,
        chineseName: "男",
        value: "1",
        enable: true,
      },
      {
        id: 4,
        chineseName: "保密",
        value: "2",
        enable: true,
      },
    ],
  },
  {
    id: 3,
    label: "用户",
    code: "user",
    items: [],
    children: [
      {
        id: 4,
        label: "证件",
        code: "user_card",
        items: [
          {
            id: 5,
            chineseName: "居民身份证",
            value: "1",
            enable: true,
          },
          {
            id: 6,
            chineseName: "出生证",
            value: "2",
            enable: false,
          },
          {
            id: 7,
            chineseName: "护照",
            value: "3",
            enable: true,
          },
        ],
      },
      {
        id: 5,
        label: "学历",
        code: "user_education",
        items: [
          {
            id: 8,
            chineseName: "初中及以下",
            value: "1",
            enable: true,
          },
          {
            id: 9,
            chineseName: "高中",
            value: "2",
            enable: true,
          },
          {
            id: 10,
            chineseName: "大学",
            value: "3",
            enable: true,
          },
        ],
      },
    ],
  },
];

export default defineFakeRoute([
  {
    url: "/mock/tenantDictionary/list",
    method: "get",
    response: () => {
      function getDictionaryTree(list: any[]) {
        const tree = [];
        for (const i in list) {
          const item: Record<string, any> = {
            id: list[i].id,
            label: list[i].label,
            code: list[i].code,
          };
          if (list[i].children) {
            item.children = getDictionaryTree(list[i].children);
          }
          tree.push(item);
        }
        return tree;
      }
      const pageList = getDictionaryTree(dictionaryList);
      return {
        error: "",
        status: 1,
        data: pageList,
      };
    },
  },
  {
    url: "/mock/tenantDictionary/detail",
    method: "get",
    response: ({ query }) => {
      function findDictionary(
        list: any,
        parentId: number | "",
        id: number
      ): any {
        for (const i in list) {
          if (list[i].id === id) {
            return {
              parentId,
              id: list[i].id,
              name: list[i].label,
              code: list[i].code,
            };
          } else if (list[i].children) {
            const temp = findDictionary(list[i].children, list[i].id, id);
            if (temp) {
              return temp;
            }
          }
        }
      }
      const info = findDictionary(dictionaryList, "", ~~query.id);
      return {
        error: "",
        status: 1,
        data: info,
      };
    },
  },
  {
    url: "/mock/tenantDictionary/create",
    method: "post",
    response: () => {
      return {
        error: "",
        status: 1,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/edit",
    method: "post",
    response: () => {
      return {
        error: "",
        status: 1,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/delete",
    method: "post",
    response: () => {
      return {
        error: "",
        status: 1,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/item/list",
    method: "get",
    response: ({ query }) => {
      const { dictionary_id, title, from, limit } = query;
      function findDictionary(list: any, dictionary_id: number): any {
        for (const i in list) {
          if (list[i].id === dictionary_id) {
            return list[i].items ?? [];
          }
          if (list[i].children) {
            return findDictionary(list[i].children, dictionary_id);
          }
        }
      }
      let list: any[] = findDictionary(dictionaryList, ~~dictionary_id) ?? [];
      list = list.filter((item) => {
        return title ? item.name.includes(title) : true;
      });
      const pageList = list.filter((item, index) => {
        return index >= ~~from && index < ~~from + ~~limit;
      });
      return {
        error: "",
        status: 1,
        data: {
          list: pageList,
          total: list.length,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/item/detail",
    method: "get",
    response: ({ query }) => {
      function findDictionaryItem(list: any, id: number): any {
        for (const i in list) {
          if (list[i].items.some((item: any) => item.id === id)) {
            return list[i].items.find((item: any) => item.id === id);
          }
          if (list[i].children) {
            return findDictionaryItem(list[i].children, id);
          }
        }
      }
      const info = findDictionaryItem(dictionaryList, ~~query.id);
      return {
        error: "",
        status: 1,
        data: info,
      };
    },
  },
  {
    url: "/mock/tenantDictionary/item/create",
    method: "post",
    response: () => {
      return {
        error: "",
        status: 1,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/item/edit",
    method: "post",
    response: () => {
      return {
        error: "",
        status: 1,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/item/delete",
    method: "post",
    response: () => {
      return {
        error: "",
        status: 1,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/item/change/enable",
    method: "post",
    response: () => {
      return {
        error: "",
        status: 1,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: "/mock/tenantDictionary/get",
    method: "get",
    response: ({ query }) => {
      const { code } = query;
      function findDictionary(list: any, code: string): any {
        for (const i in list) {
          if (list[i].code === code) {
            return list[i].items ?? [];
          }
          if (list[i].children) {
            return findDictionary(list[i].children, code);
          }
        }
      }
      let list: any[] = findDictionary(dictionaryList, code as string) ?? [];
      list = list.filter((item) => item.enable);
      list = list.map((item) => ({
        name: item.name,
        value: item.value,
      }));
      return {
        error: "",
        status: 1,
        data: {
          list,
        },
      };
    },
  },
]);
