import{r as n,C as L,u as M,j as e,L as c,f as R,t as A}from"./index-42be3ba3.js";import{c as O,d as _}from"./Search-98057a69.js";import{P as $}from"./Other-530bf885.js";import"./setPrototypeOf-72fdee31.js";import"./index-e159ce0a.js";function H(){const{user:y}=n.useContext(L),[j,w]=n.useState([]),[p,b]=n.useState([]),[u,N]=n.useState(1),[r]=n.useState(10),[t,C]=n.useState({title:"",link:"",about:"",application:"Redes sociais e plataformas de ligação em rede",type:"Apresentações e documentos",state:"Sem dados"}),[v,m]=n.useState(""),{t:s,i18n:z}=M(),o=({target:{id:a,value:i}})=>C(l=>({...l,[a]:i})),k=async a=>{if(a.preventDefault(),!t.title.trim()||!t.link.trim()||!t.about.trim()){m("Preencha todos os campos obrigatórios.");return}try{await R(t),m(""),g()}catch(i){console.error(i),m("Ocorreu um erro ao adicionar a ferramenta.")}},g=async()=>{try{const a=await A();w(a),b(a)}catch(a){console.log(a)}};n.useEffect(()=>{g()},[]);const P=a=>{const l={"Não está a funcionar":"danger","Está a funcionar":"success","Sem dados":"warning"}[a]||"secondary";return e.jsxs("span",{className:`badge bg-soft-${l} text-${l} rounded-pill`,children:[e.jsx("span",{className:`legend-indicator bg-${l}`})," ",a]})},f=u*r,S=f-r,D=p.slice(S,f),T=a=>N(a),F=a=>{const{type:i,application:l}=a,h=j.filter(d=>(!i.length||i.includes(d.type))&&(!l.length||l.includes(d.application)));b(h),N(1)};return e.jsxs("div",{className:"container mt-4",children:[e.jsx("header",{id:"header",className:"navbar navbar-expand-lg navbar-spacer-y-0 flex-lg-column",children:e.jsx("nav",{className:"js-mega-menu flex-grow-1",children:e.jsx("div",{className:"collapse navbar-collapse",id:"navbarDoubleLineContainerNavDropdown",children:e.jsxs("ul",{className:"nav nav-tabs align-items-center",children:[e.jsx("li",{className:"nav-item",children:e.jsxs(c,{className:"nav-link",to:"/form","data-placement":"left",children:[e.jsx("i",{className:"bi bi-house dropdown-item-icon"})," ",s("home")]})}),e.jsx("li",{className:"nav-item",children:e.jsxs(c,{className:"nav-link",to:"/activity","data-placement":"left",children:[e.jsx("i",{className:"bi bi-activity dropdown-item-icon"})," ",s("activity")]})}),e.jsx("li",{className:"nav-item",children:e.jsxs(c,{className:"nav-link",to:"/resources","data-placement":"left",children:[e.jsx("i",{className:"bi bi-file-earmark-arrow-down dropdown-item-icon"})," ",s("resources")]})}),e.jsx("li",{className:"nav-item",children:e.jsxs(c,{className:"nav-link active",to:"/tools","data-placement":"left",children:[e.jsx("i",{className:"bi bi-tools dropdown-item-icon"})," ",s("tool")]})})]})})})}),e.jsxs("main",{className:"card card-body",children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-header card-header-content-md-between",children:[e.jsx("div",{className:"mb-2",children:e.jsx(O,{posts:j})}),e.jsxs("div",{className:"d-grid d-sm-flex justify-content-md-end align-items-sm-center",children:[e.jsx(_,{onFilter:F}),y._defaultRole==="administrador"&&e.jsxs("button",{type:"button",className:"btn btn-white btn-sm","data-bs-toggle":"modal","data-bs-target":"#addTools",children:[e.jsx("i",{className:"bi-plus-circle"})," ",s("tool")]})]})]}),e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-lg table-borderless table-thead-bordered table-nowrap card-table",children:[e.jsx("thead",{className:"thead-light",children:e.jsxs("tr",{children:[e.jsx("th",{children:s("tool")}),e.jsx("th",{children:s("application")}),e.jsx("th",{children:s("type")}),e.jsx("th",{children:s("state")}),e.jsx("th",{children:s("about_the_App")})]})}),e.jsx("tbody",{children:D.map(({id:a,title:i,link:l,application:h,type:d,state:E,about:x})=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(c,{className:"d-flex align-items-center",to:l,children:e.jsx("span",{className:"d-block h5 text-inherit mb-0",children:i})})}),e.jsx("td",{children:e.jsx("span",{className:"badge bg-soft-primary text-primary rounded-pill",children:h})}),e.jsx("td",{children:e.jsx("span",{className:"badge bg-soft-secondary text-secondary rounded-pill",children:d})}),e.jsx("td",{children:P(E)}),e.jsxs("td",{title:x,children:[x.slice(0,50),x.length>50&&"..."]})]},a))})]})})]}),e.jsx($,{dataPerPage:r,totalDatas:p.length,currentPage:u,paginate:T})]}),e.jsx("div",{className:"modal fade",id:"addTools",tabIndex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered modal-lg",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsx("div",{className:"modal-close",children:e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})}),e.jsxs("form",{onSubmit:k,children:[e.jsxs("div",{className:"modal-body",children:[e.jsx("textarea",{id:"title",className:"form-control form-control-title",placeholder:"Name",value:t.title,onChange:o}),e.jsxs("div",{className:"row mb-4",children:[e.jsx("div",{className:"col-sm-3 mb-2 mb-sm-0",children:e.jsxs("div",{className:"d-flex align-items-center mt-2",children:[e.jsx("i",{className:"bi bi-link nav-icon"}),e.jsx("div",{className:"flex-grow-1",children:s("link")})]})}),e.jsx("div",{className:"col-sm",children:e.jsx("input",{id:"link",className:"form-control",placeholder:"https:/example.com/",value:t.link,onChange:o})})]}),e.jsxs("div",{className:"row mb-4",children:[e.jsx("div",{className:"col-sm-3 mb-2 mb-sm-0",children:e.jsxs("div",{className:"d-flex align-items-center mt-2",children:[e.jsx("i",{className:"bi-text-left nav-icon"}),e.jsx("div",{className:"flex-grow-1",children:s("about")})]})}),e.jsx("div",{className:"col-sm",children:e.jsx("textarea",{id:"about",className:"form-control",placeholder:"Discription",value:t.about,onChange:o})})]}),e.jsxs("div",{className:"row mb-4",children:[e.jsx("div",{className:"col-sm-3 mb-2 mb-sm-0",children:e.jsxs("div",{className:"d-flex align-items-center mt-2",children:[e.jsx("i",{className:"bi bi-book nav-icon"}),e.jsx("div",{className:"flex-grow-1",children:s("application")})]})}),e.jsx("div",{className:"col-sm",children:e.jsxs("div",{className:"tom-select-custom",children:[s("application"),e.jsxs("select",{className:"js-select form-select",autoComplete:"off",id:"application",value:t.application,onChange:o,children:[e.jsx("option",{children:"Redes sociais e plataformas de ligação em rede"}),e.jsx("option",{children:"Computação em nuvem e armazenamento de dados"}),e.jsx("option",{children:"Educação e formação em linha"})]})]})}),e.jsx("div",{className:"col-sm",children:e.jsxs("div",{className:"tom-select-custom",children:[s("type"),e.jsxs("select",{className:"js-select form-select",autoComplete:"off",id:"type",value:t.type,onChange:o,children:[e.jsx("option",{children:"Apresentações e documentos"}),e.jsx("option",{children:"Design gráfico e edição de imagens"}),e.jsx("option",{children:"Vídeo e montagem"}),e.jsx("option",{children:"Colaboração em linha e gestão de projectos"}),e.jsx("option",{children:"Áudio e Podcasting"})]})]})}),e.jsx("div",{className:"col-sm",children:e.jsxs("div",{className:"tom-select-custom",children:[s("state"),e.jsxs("select",{className:"js-select form-select",autoComplete:"off",id:"state",value:t.state,onChange:o,children:[e.jsx("option",{children:"Sem dados"}),e.jsx("option",{children:"Está a funcionar"}),e.jsx("option",{children:"Não está a funcionar"})]})]})})]}),v&&e.jsx("div",{className:"text-danger",children:v})]}),e.jsxs("div",{className:"modal-footer gap-3",children:[e.jsxs("button",{type:"button",id:"discardFormt",className:"btn btn-white","data-bs-dismiss":"modal",children:[" ",s("cancel")," "]}),e.jsxs("button",{type:"submit",id:"processEvent",className:"btn btn-primary",children:[" ",s("save")," "]})]})]})]})})})]})}export{H as default};