
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as u,d as g,a2 as k,D as C,a as p,o as f,b as S,f as m,w as i,i as n,g as y,e as D,j,an as w,aF as E}from"./index-CGMecxe4.js";/* empty css                      */const x={list:s=>u.post("callback/getProjectSurveyScreenList",s),childList:s=>u.post("callback/getProjectScreenMemberChildList",s),getDetail:s=>u.post("/callback/getProjectSurveyScreenDetailList",s)},I=g({__name:"index",setup(s,{expose:_}){const e=k({visible:!1,survey:null}),b=async v=>{const t=await x.getDetail({id:v.id}),r=w(JSON.parse(t.data.projectJson));r.pages.forEach(l=>{l.elements.forEach(o=>{o.readOnly=!0;const a=t.data.projectSurveyScreenDetailInfoList.find(c=>c.projectProblemId===o.surveyId);if(a&&o.type==="radiogroup"){const c=o.choices.filter(d=>a.projectAnswerId.includes(d.surveyId));o.defaultValue=c.map(d=>d.value)}})}),e.survey=new E.Model(JSON.stringify(r)),e.survey.onUpdateQuestionCssClasses.add(function(l,o){}),e.visible=!0};return C(async()=>{}),_({showEdit:b}),(v,t)=>{const r=p("SurveyComponent"),l=p("ElButton"),o=p("ElDrawer");return f(),S("div",null,[m(o,{modelValue:n(e).visible,"onUpdate:modelValue":t[2]||(t[2]=a=>n(e).visible=a),title:"查看",size:"80%","close-on-click-modal":!1,"destroy-on-close":""},{footer:i(()=>[m(l,{size:"large",onClick:t[0]||(t[0]=a=>n(e).visible=!1)},{default:i(()=>[y(" 取消 ")]),_:1}),m(l,{type:"primary",size:"large",onClick:t[1]||(t[1]=a=>n(e).visible=!1)},{default:i(()=>[y(" 确定 ")]),_:1})]),default:i(()=>[n(e).survey?(f(),D(r,{key:0,model:n(e).survey,style:{width:"100%"}},null,8,["model"])):j("",!0)]),_:1},8,["modelValue"])])}}});export{I as _,x as a};
