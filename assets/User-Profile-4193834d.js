import{r as i,u as F,j as s,L as l,w as _,e as B,d as E}from"./index-08ea0f83.js";import{a as p}from"./js.cookie-edb2da2a.js";function $(){var h;const[t,j]=i.useState({}),[o,u]=i.useState([]),[N,v]=i.useState([]),[g,b]=i.useState([]),[m,f]=i.useState([]),[x,y]=i.useState([]),[w,k]=i.useState([]),[D,A]=i.useState([]),{t:c}=F();i.useEffect(()=>{f((p.get("activityFavorites")||"").split(",").map(Number)),y((p.get("resourcesFavorites")||"").split(",").map(Number))},[]),i.useEffect(()=>{(async()=>{try{const{profile:a,activity:r,resources:n,teams:R}=await _();j(a),u(r),v(n),b(R)}catch(a){console.log(a)}})()},[]),i.useEffect(()=>{(async()=>{try{k(await B())}catch(a){console.log(a)}})()},[]),i.useEffect(()=>{(async()=>{try{A(await E())}catch(a){console.log(a)}})()},[]);const d=e=>{const a=new Date(e),r={hour:"numeric",minute:"numeric"};return a.toDateString()===new Date().toDateString()?a.toLocaleTimeString("default",r):a.toLocaleDateString("default",{day:"numeric",month:"long",year:"numeric"})},S=e=>{if(e===0)return"0 Bytes";const a=1024,r=["Bytes","KB","MB","GB","TB"],n=Math.floor(Math.log(e)/Math.log(a));return parseFloat((e/Math.pow(a,n)).toFixed(2))+" "+r[n]};return s.jsx("div",{children:s.jsx("main",{id:"content",role:"main",className:"main",children:s.jsx("div",{className:"content container-fluid",children:s.jsx("div",{className:"row justify-content-lg-center",children:s.jsxs("div",{className:"col-lg-10",children:[s.jsx("div",{className:"profile-cover",children:s.jsx("div",{className:"profile-cover-img-wrapper",children:s.jsx("img",{className:"profile-cover-img",src:"../assets/img/1920x400/img1.jpg",alt:"Image Description"})})}),s.jsxs("div",{className:"text-center mb-5",children:[s.jsxs("div",{className:"avatar avatar-xxl avatar-circle profile-cover-avatar",children:[s.jsx("span",{className:"bd-placeholder rounded avatar-initials",children:(h=t==null?void 0:t.name)==null?void 0:h.charAt(0).toUpperCase()}),s.jsx("span",{className:"avatar-status avatar-status-success"})]}),s.jsx("h1",{className:"page-header-title",children:t.name}),s.jsxs("ul",{className:"list-inline list-px-2",children:[s.jsxs("li",{className:"list-inline-item",children:[s.jsx("i",{className:"bi-geo-alt me-1"}),s.jsx("span",{children:t.nameSchool})]}),s.jsxs("li",{className:"list-inline-item",children:[s.jsx("i",{className:"bi-building me-1"}),s.jsx("span",{children:t.nameGroup})]}),s.jsxs("li",{className:"list-inline-item",children:[s.jsx("i",{className:"bi-calendar-week me-1"}),s.jsx("span",{children:d(t.СreateDate)})]})]})]}),s.jsx("div",{className:"js-nav-scroller hs-nav-scroller-horizontal mb-5",children:s.jsxs("ul",{className:"nav nav-tabs align-items-center",children:[s.jsx("li",{className:"nav-item",children:s.jsx(l,{className:"nav-link active",to:"/user-profile",children:c("profile")})}),s.jsx("li",{className:"nav-item",children:s.jsx(l,{className:"nav-link",to:"/team-list",children:c("teams")})}),s.jsx("li",{className:"nav-item ms-auto",children:s.jsx("div",{className:"d-flex gap-2",children:s.jsxs("div",{className:"dropdown nav-scroller-dropdown",children:[s.jsx("button",{type:"button",className:"btn btn-white btn-icon btn-sm",id:"profileDropdown","data-bs-toggle":"dropdown","aria-expanded":"false",children:s.jsx("i",{className:"bi-three-dots-vertical"})}),s.jsxs("div",{className:"dropdown-menu dropdown-menu-end mt-1","aria-labelledby":"profileDropdown",children:[s.jsx("span",{className:"dropdown-header",children:c("feedback")}),s.jsxs(l,{className:"dropdown-item",to:"/#contact-section",children:[s.jsx("i",{className:"bi-flag dropdown-item-icon"}),c("contact_us")]})]})]})})})]})}),s.jsxs("div",{className:"row",children:[s.jsxs("div",{className:"col-lg",children:[s.jsx("div",{id:"accountSidebarNav"}),s.jsxs("div",{className:"js-sticky-block card mb-3 mb-lg-5",style:{maxHeight:"800px"},children:[s.jsx("div",{className:"card-header",children:s.jsx("h4",{className:"card-header-title",children:c("profile")})}),s.jsx("div",{className:"card-body overflow-auto",children:s.jsxs("ul",{className:"list-unstyled list-py-2 text-dark mb-0",children:[s.jsx("li",{className:"pb-0",children:s.jsx("span",{className:"card-subtitle",children:c("about")})}),s.jsxs("li",{children:[s.jsx("i",{className:"bi-person dropdown-item-icon"})," ",t.name]}),s.jsxs("li",{children:[s.jsx("i",{className:"bi-geo-alt me-1 dropdown-item-icon"})," ",t.nameSchool]}),s.jsxs("li",{children:[s.jsx("i",{className:"bi-building me-1 dropdown-item-icon"})," ",t.nameGroup]}),s.jsx("li",{className:"pt-4 pb-0",children:s.jsx("span",{className:"card-subtitle",children:c("contacts")})}),s.jsxs("li",{children:[s.jsx("i",{className:"bi-at dropdown-item-icon"})," ",t.email]}),s.jsx("li",{className:"pt-4 pb-0",children:s.jsx("span",{className:"card-subtitle",children:c("teams")})}),s.jsx("div",{style:{display:"flex",flexDirection:"column"},children:g.map(e=>s.jsxs(l,{to:`/team/${e.idTeam}`,style:{marginBottom:"10px"},children:[s.jsx("i",{className:"bi-people dropdown-item-icon"}),"#",e.teams.nameTeam]},e.idTeam))})]})})]}),s.jsxs("div",{className:"card mb-3",style:{maxHeight:"300px"},children:[s.jsx("div",{className:"card-header",children:s.jsxs("h4",{className:"card-header-title",children:[s.jsx("i",{className:"bi bi-bookmark-fill bookmark"})," Favoritos"]})}),s.jsx("div",{className:"card-body overflow-auto",children:s.jsxs("ul",{className:"list-unstyled list-py-2 text-dark mb-0",children:[s.jsx("li",{className:"pb-0",children:s.jsx("span",{className:"card-subtitle",children:"Atividades"})}),m.length>0?m.map(e=>{const a=w.find(r=>r.idActivity===e);return a?s.jsx("div",{className:"mb-2",children:s.jsx(l,{to:`/activity/view-activity/${a.idActivity}`,className:"link",children:a.title})},a.idActivity):null}):s.jsxs("p",{children:["Adicione as melhores ",s.jsx(l,{to:"/form",className:"link",children:"atividades"})]}),s.jsx("li",{className:"pb-0",children:s.jsx("span",{className:"card-subtitle",children:"Recursos"})}),x.length>0?x.map(e=>{const a=D.find(r=>r.idResource===e);return a?s.jsx("div",{className:"mb-2",children:s.jsx(l,{to:`/resource/view-resource/${a.idResource}`,className:"link",children:a.title})},a.idResource):null}):s.jsxs("p",{children:["Adicione os melhores ",s.jsx(l,{to:"/form",className:"link",children:"recursos"})]})]})})]})]}),s.jsx("div",{className:"col-lg-8",children:s.jsx("div",{className:"d-grid gap-3 gap-lg-5",children:s.jsxs("div",{className:"card",children:[s.jsx("div",{className:"card-header card-header-content-between",children:s.jsx("h4",{className:"card-header-title",children:c("your_activity")})}),s.jsxs("div",{className:"card-body card-body-height",style:{height:"35rem"},children:[o.length>0?s.jsx("ul",{className:"step step-icon-xs mb-0",children:o.map((e,a)=>s.jsx("li",{className:"step-item",children:s.jsxs("div",{className:"step-content-wrapper",children:[s.jsx("span",{className:"step-icon step-icon-pseudo step-icon-soft-dark"}),s.jsxs("div",{className:"step-content",children:[s.jsx(l,{className:"text-dark",to:`/activity/view-activity/${e.idActivity}`,children:s.jsx("strong",{children:e.title})}),s.jsxs("p",{className:"fs-5 mb-1",children:[e.description,s.jsx("br",{}),s.jsxs("span",{className:"badge bg-soft-primary text-primary rounded-pill",children:[s.jsx("span",{className:"legend-indicator bg-primary"}),e.subjects.nameSubject]}),s.jsxs("span",{className:"badge bg-soft-primary text-success rounded-pill",children:[s.jsx("span",{className:"legend-indicator bg-success"}),e.educations.nameEducation]}),s.jsxs("span",{className:"badge bg-soft-primary text-warning rounded-pill",children:[s.jsx("span",{className:"legend-indicator bg-warning"}),e.years.year]})]}),s.jsx("span",{className:"text-muted small text-uppercase",children:d(e.publishDate)})]})]})},a))}):s.jsxs("div",{className:"text-center",children:[s.jsx("img",{className:"mb-5",src:"./assets/svg/illustrations/oc-looking-for-answers.svg",alt:"Img NoData",style:{height:"20rem"}}),s.jsxs("h5",{children:[c("no_user_activity_data_1"),"."]}),s.jsxs(l,{className:"link",to:"/activity",children:[" ",c("no_user_activity_data_2")," "]})]}),N.map((e,a)=>s.jsx("ul",{className:"step step-icon-xs mb-0",children:s.jsx("li",{className:"step-item",children:s.jsxs("div",{className:"step-content-wrapper",children:[s.jsx("span",{className:"step-icon step-icon-pseudo step-icon-soft-dark"}),s.jsxs("div",{className:"step-content",children:[s.jsxs("ul",{className:"list-group",children:[s.jsx("div",{className:"d-flex justify-content-between",children:s.jsx(l,{className:"text-dark",to:`/resource/view-resource/${e.idResource}`,children:s.jsx("strong",{children:e.title})})}),s.jsx("div",{className:"d-flex justify-content-between",children:s.jsx("span",{className:"text-gray-dark",children:e.description})}),s.jsx("div",{className:"d-flex justify-content-between",children:s.jsx("span",{className:"badge bg-secondary mb-2",children:e.type})}),e.type==="Ficheiro"&&s.jsx("li",{className:"list-group-item list-group-item-light",children:s.jsx("div",{className:"row gx-1",children:s.jsx("div",{className:"col-sm-4",children:s.jsxs("div",{className:"d-flex",children:[s.jsx("span",{className:"flex-shrink-0",children:s.jsx("img",{className:"avatar avatar-xs",src:"../assets/svg/illustrations/placeholder-img-format.svg",alt:"Image Description"})}),s.jsxs("div",{className:"flex-grow-1 text-truncate ms-2",children:[s.jsx("span",{className:"d-block fs-6 text-dark text-truncate",children:e.fileName}),s.jsx("span",{className:"d-block small text-muted",children:S(e.fileSize)})]})]})})})})]}),s.jsx("span",{className:"text-muted small text-uppercase",children:d(e.publishDate)})]})]})})},a))]})]})})})]})]})})})})})}export{$ as default};