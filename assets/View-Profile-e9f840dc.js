import{r as c,i as w,u as S,R as e,L as n,p as D}from"./main-faf44e1c.js";function L(){var p;const[s,E]=c.useState(null),[N,g]=c.useState([]),[v,b]=c.useState([]),[f,y]=c.useState([]),[h,m]=c.useState(!0),[i,x]=c.useState(null),{userId:o}=w(),{t:d,i18n:B}=S();c.useEffect(()=>{async function t(){try{const a=await D(o);E(a.profile),g(a.activity),b(a.resources),y(a.teams),m(!1)}catch(a){console.error("Erro durante o carregamento de dados:",a),x("Erro durante o carregamento de dados"),m(!1)}}t()},[o]);const l=t=>{const a=new Date(t),r=new Date;return a.toDateString()===r.toDateString()?a.toLocaleTimeString("default",{hour:"numeric",minute:"numeric"}):a.toLocaleDateString("default",{day:"numeric",month:"long",year:"numeric"})},k=t=>{if(t===0)return"0 Bytes";const a=1024,r=["Bytes","KB","MB","GB","TB"],u=Math.floor(Math.log(t)/Math.log(a));return parseFloat((t/Math.pow(a,u)).toFixed(2))+" "+r[u]};return h?e.createElement("div",null,"Loading..."):i?e.createElement("div",null,i):e.createElement("div",null,e.createElement("main",{id:"content",role:"main",className:"main"},e.createElement("div",{className:"content container-fluid"},e.createElement("div",{className:"row justify-content-lg-center"},e.createElement("div",{className:"col-lg-10"},e.createElement("div",{className:"profile-cover"},e.createElement("div",{className:"profile-cover-img-wrapper"},e.createElement("img",{className:"profile-cover-img",src:"../assets/img/1920x400/img1.jpg",alt:"Image Description"}))),e.createElement("div",{className:"text-center mb-5"},e.createElement("div",{className:"avatar avatar-xxl avatar-circle profile-cover-avatar"},e.createElement("span",{className:"bd-placeholder rounded avatar-initials"},(p=s==null?void 0:s.name)==null?void 0:p.charAt(0).toUpperCase()),e.createElement("span",{className:"avatar-status avatar-status-success"})),e.createElement("h1",{className:"page-header-title"},s==null?void 0:s.name),e.createElement("ul",{className:"list-inline list-px-2"},e.createElement("li",{className:"list-inline-item"},e.createElement("i",{className:"bi-geo-alt me-1"}),e.createElement("span",null,s==null?void 0:s.nameSchool)),e.createElement("li",{className:"list-inline-item"},e.createElement("i",{className:"bi-building me-1"}),e.createElement("span",null,s==null?void 0:s.nameGroup)),e.createElement("li",{className:"list-inline-item"},e.createElement("i",{className:"bi-calendar-week me-1"}),e.createElement("span",null,l(s==null?void 0:s.СreateDate))))),e.createElement("div",{className:"row"},e.createElement("div",{className:"col-lg-4"},e.createElement("div",{className:"js-sticky-block card mb-3 mb-lg-5","data-hs-sticky-block-options":`{\r
                       "parentSelector": "#accountSidebarNav",\r
                       "breakpoint": "lg",\r
                       "startPoint": "#accountSidebarNav",\r
                       "endPoint": "#stickyBlockEndPoint",\r
                       "stickyOffsetTop": 20\r
                     }`},e.createElement("div",{className:"card-header"},e.createElement("h4",{className:"card-header-title"},d("teams")),e.createElement("ul",{className:"list-unstyled list-py-3 mt-3"},e.createElement("li",{className:"pb-0"},e.createElement("div",{style:{display:"flex",flexDirection:"column"}},f.map(t=>e.createElement(n,{key:t.idTeam,to:`/${t.idTeam}`,style:{marginBottom:"10px"}},e.createElement("i",{className:"bi-people dropdown-item-icon"}),"#",t.teams.nameTeam)))))),e.createElement("div",{className:"card-body"}))),e.createElement("div",{className:"col-lg-8"},e.createElement("div",{className:"d-grid gap-3 gap-lg-5"},e.createElement("div",{className:"card"},e.createElement("div",{className:"card-header card-header-content-between"},e.createElement("h4",{className:"card-header-title"},d("activity"))),e.createElement("div",{className:"card-body card-body-height",style:{height:"30rem"}},e.createElement("ul",{className:"step step-icon-xs mb-0"},N.map((t,a)=>e.createElement("li",{className:"step-item",key:a},e.createElement("div",{className:"step-content-wrapper"},e.createElement("span",{className:"step-icon step-icon-pseudo step-icon-soft-dark"}),e.createElement("div",{className:"step-content"},e.createElement(n,{className:"text-dark",to:`/activity/view-activity/${t.idActivity}`},t.title),e.createElement("p",{className:"fs-5 mb-1"}," ",t.description,e.createElement("br",null),e.createElement("span",{className:"badge bg-soft-primary text-primary rounded-pill"},e.createElement("span",{className:"legend-indicator bg-primary"}),t.subjects.nameSubject," "),e.createElement("span",{className:"badge bg-soft-primary text-success rounded-pill"},e.createElement("span",{className:"legend-indicator bg-success"}),t.educations.nameEducation," "),e.createElement("span",{className:"badge bg-soft-primary text-warning rounded-pill"},e.createElement("span",{className:"legend-indicator bg-warning"}),t.years.year," ")),e.createElement("span",{className:"text-muted small text-uppercase"},l(t.publishDate))))))),v.map((t,a)=>e.createElement("ul",{className:"step step-icon-xs mb-0",key:a},e.createElement("li",{className:"step-item"},e.createElement("div",{className:"step-content-wrapper"},e.createElement("span",{className:"step-icon step-icon-pseudo step-icon-soft-dark"}),e.createElement("div",{className:"step-content"},e.createElement("ul",{className:"list-group"},e.createElement("h6",null,t.title),e.createElement("li",{className:"list-group-item list-group-item-light"},e.createElement("div",{className:"row gx-1"},e.createElement("div",{className:"col-sm-4"},e.createElement("div",{className:"d-flex"},e.createElement("span",{className:"flex-shrink-0"},e.createElement("img",{className:"avatar avatar-xs",src:"../assets/svg/components/placeholder-img-format.svg",alt:"Image Description"})),e.createElement("div",{className:"flex-grow-1 text-truncate ms-2"},e.createElement("span",{className:"d-block fs-6 text-dark text-truncate"},e.createElement(n,{className:"text-dark",to:"/resources"},t.fileName)),e.createElement("span",{className:"d-block small text-muted"},k(t.fileSize)))))))),e.createElement("span",{className:"text-muted small text-uppercase"},l(t.publishDate)))))))))))))))))}export{L as default};
