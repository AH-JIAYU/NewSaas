import Mock from "mockjs";
Mock.Random.extend({
  countryCode: function () {
    const code1 = String.fromCharCode(Mock.Random.integer(65, 90)); // 生成大写字母
    const code2 = String.fromCharCode(Mock.Random.integer(65, 90)); // 生成大写字母
    return code1 + code2;
  },
});
const AllList: any[] = [];
for (let i = 0; i < 50; i++) {
  AllList.push(
    Mock.mock({
      id: "@id",
      title: "@ctitle(2,5)",
      country: "@countryCode",
      "state|1": [true, false],
      "default|1": [true, false],
    })
  );
}

export default [
  {
    url: "/mock/otherFunctions/screen_library/list",
    method: "get",
    response: (option: any) => {
      const { title, from, limit } = option.query;
      const list = AllList.filter((item) => {
        return title ? item.title.includes(title) : true;
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
    url: "/mock/otherFunctions/screen_library/detail",
    method: "get",
    response: (option: any) => {
      const info = AllList.filter((item) => item.id === option.query.id);
      return {
        error: "",
        status: 1,
        data: info[0],
      };
    },
  },
  {
    url: "/mock/otherFunctions/screen_library/create",
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
    url: "/mock/otherFunctions/screen_library/edit",
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
    url: "/mock/otherFunctions/screen_library/delete",
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
];
