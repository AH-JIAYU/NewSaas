export default
  // 导出
  async function fileExport(list: any, name: string) {
  let content: any = list;
  // 将数据转换为 Blob 对象
  let data = new Blob([content], {
    type: "application/vnd.ms-excel;charset=utf-8"
  });
  let downloadUrl = window.URL.createObjectURL(data);
  let anchor: any = document.createElement("a");
  anchor.href = downloadUrl;
  // 表格名称.文件类型
  anchor.download = name;
  anchor.click();
  // 消除请求接口返回的数据
  window.URL.revokeObjectURL(anchor);
}
