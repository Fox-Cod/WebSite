import{r as c,u as g,n as N,j as s,L as b,Z as w,g as y}from"./index-6c9d4048.js";function k(){const[i,p]=c.useState({}),[l,h]=c.useState({}),[a,u]=c.useState({name:"",email:"",password:"",confirmPassword:"",group:"",school:""}),{t:r,i18n:S}=g(),x=N(),v=()=>{const e={};return(!a.name||a.name.length<4)&&(e.name="O nome deve ter pelo menos 4 caracteres."),(!a.email||!a.email.includes("@"))&&(e.email="Introduza um endereço de correio eletrónico válido."),(!a.password||a.password.length<8)&&(e.password="A palavra-passe deve ter pelo menos 8 caracteres."),a.password!==a.confirmPassword&&(e.confirmPassword="As palavras-passe não correspondem."),a.group||(e.group="Seleccione um grupo válido."),a.school||(e.school="Selecionar uma escola válida."),h(e),Object.keys(e).length===0},n=e=>{const{id:o,value:t}=e.target,m=i.groups.find(d=>d.nameGroup===t);u(d=>({...d,[o]:t,idGroup:m?m.codGroup:null}))},f=async e=>{if(e.preventDefault(),v())try{await w(a),x("/sign-in")}catch(o){console.error("Error submitting data to the server:",o)}else console.log("Form validation failed.")},j=async()=>{try{const e=await y();p(e)}catch(e){console.error("Error fetching view data:",e)}};return c.useEffect(()=>{j()},[]),s.jsx("div",{children:s.jsx("main",{id:"content",role:"main",className:"main",children:s.jsx("div",{className:"container py-5 py-sm-7 ",children:s.jsx("div",{className:"mx-auto",style:{maxWidth:"30rem"},children:s.jsx("div",{className:"card card-lg mb-5",children:s.jsx("div",{className:"card-body",children:s.jsxs("form",{onSubmit:f,children:[s.jsx("div",{className:"text-center",children:s.jsx("div",{className:"mb-5",children:s.jsx("h1",{className:"display-5",children:"Sign Up"})})}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{htmlFor:"name",className:"form-label",children:r("name")}),s.jsx("input",{type:"text",className:`form-control ${l.name?"is-invalid":""}`,id:"name",placeholder:"Tiago Lopes",value:a.name,onChange:n}),s.jsx("span",{className:"invalid-feedback",children:l.name})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{htmlFor:"email",className:"form-label",children:r("email")}),s.jsx("input",{type:"text",className:`form-control ${l.email?"is-invalid":""}`,id:"email",placeholder:"example@example.com",value:a.email,onChange:n}),s.jsx("span",{className:"invalid-feedback",children:l.email})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{htmlFor:"password",className:"form-label",children:s.jsx("span",{children:r("password")})}),s.jsx("input",{type:"password",className:`form-control ${l.password?"is-invalid":""}`,id:"password",placeholder:"Password",value:a.password,onChange:n}),s.jsx("span",{className:"invalid-feedback",children:l.password})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{htmlFor:"confirmPassword",className:"form-label",children:s.jsx("span",{children:r("confirm_password")})}),s.jsx("input",{type:"password",className:`form-control ${l.confirmPassword?"is-invalid":""}`,id:"confirmPassword",placeholder:"Confirmar a password",value:a.confirmPassword,onChange:n}),s.jsx("span",{className:"invalid-feedback",children:l.confirmPassword})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"form-label",children:r("group")}),s.jsxs("select",{className:`form-control ${l.group?"is-invalid":""}`,id:"group",value:a.group,onChange:n,children:[s.jsx("option",{value:"",children:"Qualquer"}),i.groups&&i.groups.map((e,o)=>s.jsxs("option",{value:e.idGroup,children:[e.codGroup," ",e.nameGroup]},o))]}),s.jsx("span",{className:"invalid-feedback",children:l.group})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"form-label",children:r("school")}),s.jsxs("select",{className:`form-control ${l.school?"is-invalid":""}`,id:"school",value:a.school,onChange:n,children:[s.jsx("option",{value:"",children:"Qualquer"}),i.schools&&i.schools.map((e,o)=>s.jsx("option",{value:e.idSchool,children:e.nameSchool},o))]}),s.jsx("span",{className:"invalid-feedback",children:l.school})]}),s.jsxs("p",{className:"text-center",children:[r("text_info_sign_up_1")," ",s.jsx(b,{className:"link",to:"/sign-in",children:r("text_info_sign_up_2")})]}),s.jsx("div",{className:"d-grid",children:s.jsx("button",{type:"submit",className:"btn btn-primary btn-lg",children:r("sign_in")})})]})})})})})})})}export{k as default};
