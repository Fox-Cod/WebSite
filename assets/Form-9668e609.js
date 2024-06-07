import{r as l,u as f,j as e,L as t,d as y,e as w}from"./index-6c9d4048.js";import{a as u}from"./js.cookie-edb2da2a.js";function S(){const[j,v]=l.useState([]),[p,b]=l.useState([]),[c,m]=l.useState([]),{t:i}=f(),x=s=>{let a=[...c];c.includes(s)?a=a.filter(r=>r!==s):a.push(s),m(a),u.set("favorites",a.join(","),{expires:365})};l.useEffect(()=>{const s=u.get("favorites");s&&m(s.split(",").map(Number))},[]),l.useEffect(()=>{(async()=>{try{const[a,r]=await Promise.all([y(),w()]),n=r.sort((o,d)=>new Date(d.publishDate)-new Date(o.publishDate)),g=a.sort((o,d)=>new Date(d.publishDate)-new Date(o.publishDate));b(g),v(n)}catch(a){console.log(a)}})()},[]);const h=s=>{const a=new Date(s),r=new Date;return a.toDateString()===r.toDateString()?a.toLocaleTimeString("default",{hour:"numeric",minute:"numeric"}):a.toLocaleDateString("default",{day:"numeric",month:"long",year:"numeric"})},N=s=>{if(s===0)return"0 Bytes";const a=1024,r=["Bytes","KB","MB","GB","TB"],n=Math.floor(Math.log(s)/Math.log(a));return parseFloat((s/Math.pow(a,n)).toFixed(2))+" "+r[n]};return e.jsxs("div",{className:"container mt-4",children:[e.jsx("header",{id:"header",className:"navbar navbar-expand-lg navbar-spacer-y-0 flex-lg-column",children:e.jsx("nav",{className:"js-mega-menu flex-grow-1",children:e.jsx("div",{className:"collapse navbar-collapse",id:"navbarDoubleLineContainerNavDropdown",children:e.jsxs("ul",{className:"nav nav-tabs align-items-center",children:[e.jsx("li",{className:"nav-item",children:e.jsxs(t,{className:"nav-link active",to:"/form","data-placement":"left",children:[e.jsx("i",{className:"bi bi-house dropdown-item-icon"})," ",i("home")]})}),e.jsx("li",{className:"nav-item",children:e.jsxs(t,{className:"nav-link",to:"/activity","data-placement":"left",children:[e.jsx("i",{className:"bi bi-activity dropdown-item-icon"})," ",i("activity")]})}),e.jsx("li",{className:"nav-item",children:e.jsxs(t,{className:"nav-link",to:"/resources","data-placement":"left",children:[e.jsx("i",{className:"bi bi-file-earmark-arrow-down dropdown-item-icon"})," ",i("resources")]})}),e.jsx("li",{className:"nav-item",children:e.jsxs(t,{className:"nav-link",to:"/tools","data-placement":"left",children:[e.jsx("i",{className:"bi bi-tools dropdown-item-icon"})," ",i("tool")]})})]})})})}),e.jsxs("main",{className:"card card-body",children:[j.slice(0,3).map((s,a)=>e.jsx("div",{className:"my-3 p-3 rounded shadow-sm card",style:{borderRadius:"10px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"},children:e.jsxs("div",{className:"d-flex align-items-start",children:[e.jsx("div",{className:"avatar avatar-sm avatar-circle me-2",children:e.jsx("span",{className:"avatar-soft-dark",title:s.users.name,children:e.jsx("span",{className:"bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials",children:s.users.name.charAt(0).toUpperCase()})})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h5",{className:"mb-1",children:e.jsxs("small",{className:"text-muted",children:[e.jsx(t,{to:`/view-profile/${s.users.idTeacher}`,children:s.users.name})," | ",h(s.publishDate)]})}),e.jsx("i",{className:`bi ${c.includes(s.idActivity)?"bi-bookmark-fill bookmark":"bi-bookmark bookmark"}`,role:"button",onClick:()=>x(s.idActivity)})]}),e.jsx("div",{className:"d-flex justify-content-between",children:e.jsx("strong",{className:"text-gray-dark",children:s.title})}),e.jsx("div",{className:"d-flex justify-content-between",children:e.jsx("span",{className:"text-gray-dark",children:s.description.length>200?`${s.description.substring(0,200)}...`:s.description})}),e.jsxs("div",{className:"mb-2",children:[e.jsx("span",{className:"badge bg-primary me-1",children:s.subjects.nameSubject}),e.jsx("span",{className:"badge bg-success me-1",children:s.educations.nameEducation}),e.jsx("span",{className:"badge bg-warning",children:s.years.year})]}),e.jsx("div",{className:"d-flex justify-content-between align-items-center",children:e.jsx(t,{to:`/activity/view-activity/${s.idActivity}`,className:"link",children:i("more")})})]})]})},a)),p.slice(0,3).map(s=>e.jsx("div",{className:"my-3 p-3 rounded shadow-sm card",style:{borderRadius:"10px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"},children:e.jsxs("div",{className:"d-flex align-items-start",children:[e.jsx("div",{className:"avatar avatar-sm avatar-circle me-2",children:e.jsx("span",{className:"avatar-soft-dark",title:s.users.name,children:e.jsx("span",{className:"bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials",children:s.users.name.charAt(0).toUpperCase()})})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h5",{className:"mb-1",children:e.jsxs("small",{className:"text-muted",children:[e.jsx(t,{to:`/profile/view-profile/${s.users.idTeacher}`,children:s.users.name})," | ",h(s.publishDate)]})}),e.jsx("i",{className:`bi ${c.includes(s.idResource)?"bi-bookmark-fill bookmark":"bi-bookmark bookmark"}`,role:"button",onClick:()=>x(s.idResource)})]}),e.jsx("div",{className:"d-flex justify-content-between",children:e.jsx("strong",{className:"text-gray-dark",children:s.title})}),e.jsx("div",{className:"d-flex justify-content-between",children:e.jsx("span",{className:"text-gray-dark",children:s.description.length>200?`${s.description.substring(0,200)}...`:s.description})}),e.jsx("span",{className:"badge bg-secondary mb-2",children:s.type}),s.type==="Ficheiro"?e.jsx("div",{className:"card p-3",children:e.jsx("li",{className:"list-group-item",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-auto",children:e.jsx("img",{className:"avatar avatar-xs avatar-4x3",src:"../assets/svg/illustrations/placeholder-img-format.svg",alt:"Img"})}),e.jsxs("div",{className:"col",children:[e.jsx("h5",{className:"mb-0",title:i("download"),children:e.jsx(t,{to:`http://localhost:8081/api/files/${s.fileName}`,download:!0,children:s.fileName})}),e.jsx("ul",{className:"list-inline list-separator small text-body",children:e.jsxs("li",{className:"list-inline-item",children:[i("file_size")," ",N(s.fileSize)]})})]})]})})}):null,e.jsx("div",{className:"mb-2"}),e.jsx("div",{className:"d-flex align-items-center",children:e.jsx(t,{to:`/resource/view-resource/${s.idResource}`,className:"link",children:i("more")})})]})]})},s.idResource))]})]})}export{S as default};
