
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import"./survey-creator-core.i18n-DA1fh3wM.js";import{d as i,ai as s,aj as n,a as m,o as p,b as u,f as d,i as y}from"./index-C32xF_ni.js";const h={style:{width:"100%",height:"95%"}},w=i({__name:"index",setup(_){s.editorLocalization.currentLocale="zh-cn",n.surveyLocalization.supportedLocales=["en","fr","zh-cn"],n.setLicenseKey("ZjU4MjI0NjMtN2YzYi00ZDMyLWEyYmEtOTliMmVhZmEyODc5OzE9MjAyNS0wMi0yNA==");const c={showLogicTab:!0,isAutoSave:!1,showTranslationTab:!0},l={pages:[{name:"Name",elements:[{name:"country",type:"dropdown",placeholder:"Select a country...",choicesByUrl:{url:"https://surveyjs.io/api/CountriesExample"}}]}]},t=new s.SurveyCreatorModel(c);return t.text=window.localStorage.getItem("survey-json")||JSON.stringify(l),t.saveSurveyFunc=(r,o)=>{window.localStorage.setItem("survey-json",t.text),o(r,!0)},t.onUploadFile.add((r,o)=>{const a=new FormData;o.files.forEach(e=>{a.append(e.name,e)}),fetch("https://example.com/uploadFiles",{method:"post",body:a}).then(e=>e.json()).then(e=>{o.callback("success",`https://example.com/files?name=${e[o.files[0].name]}`)}).catch(e=>{o.callback(e,"error")})}),(r,o)=>{const a=m("survey-creator-component");return p(),u("div",h,[d(a,{model:y(t)},null,8,["model"])])}}});export{w as _};
