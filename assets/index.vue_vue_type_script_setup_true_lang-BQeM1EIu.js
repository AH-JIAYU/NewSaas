
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as u,d as g,a2 as k,D as S,a as p,o as v,b as D,f as m,w as i,i as l,g as y,e as j,j as w,an as C,aF as E}from"./index-lVXLlegD.js";/* empty css                      */const x={list:s=>u.post("callback/getProjectSurveyScreenList",s),childList:s=>u.post("callback/getProjectScreenMemberChildList",s),getDetail:s=>u.post("/callback/getProjectSurveyScreenDetailList",s)},I=g({__name:"index",setup(s,{expose:_}){const t=k({visible:!1,survey:null}),b=async f=>{const e=await x.getDetail({id:f.id}),n=C(JSON.parse(e.data.projectJson));n.pages.forEach(r=>{r.elements.forEach(o=>{o.readOnly=!0;const a=e.data.projectSurveyScreenDetailInfoList.find(c=>c.projectProblemId===o.surveyId);if(a&&o.type==="radiogroup"){const c=o.choices.filter(d=>a.projectAnswerId.includes(d.surveyId));o.defaultValue=c.map(d=>d.value)}})}),t.survey=new E.Model(JSON.stringify(n)),t.visible=!0};return S(async()=>{}),_({showEdit:b}),(f,e)=>{const n=p("SurveyComponent"),r=p("ElButton"),o=p("ElDrawer");return v(),D("div",null,[m(o,{modelValue:l(t).visible,"onUpdate:modelValue":e[2]||(e[2]=a=>l(t).visible=a),title:"查看",size:"80%","close-on-click-modal":!1,"destroy-on-close":""},{footer:i(()=>[m(r,{size:"large",onClick:e[0]||(e[0]=a=>l(t).visible=!1)},{default:i(()=>[y(" 取消 ")]),_:1}),m(r,{type:"primary",size:"large",onClick:e[1]||(e[1]=a=>l(t).visible=!1)},{default:i(()=>[y(" 确定 ")]),_:1})]),default:i(()=>[l(t).survey?(v(),j(n,{key:0,model:l(t).survey,style:{width:"100%"}},null,8,["model"])):w("",!0)]),_:1},8,["modelValue"])])}}});export{I as _,x as a};
