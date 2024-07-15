export default // 下载
async function DownLoad(imgUrl: any, name: any) {
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  // 根据需要设置文件名
  document.body.appendChild(link);
  link.download = name;
  link.click();
  document.body.removeChild(link);
  // 清理URL对象
  URL.revokeObjectURL(url);
}
