(this["webpackJsonp2048-react"]=this["webpackJsonp2048-react"]||[]).push([[0],{52:function(e,t,n){},53:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),s=n(15),a=n.n(s),i=(n(52),n(5)),o=n(79),u=n(80),d=(n(53),n(21)),j=n(25),l=n(14),b=n(35),f=n(75),h=n(81),O=n(36),m=n.n(O),x=n(2),v=Object(f.a)({box:{display:"flex",position:"absolute",justifyContent:"center",alignItems:"center",width:"23%",height:"23%",margin:"1%",borderRadius:"10%",transition:"all 100ms linear"}}),g=function(e){return e.toString().concat("%")},p=function(e){var t=v(),n=e.items,r=e.id,s=e.type,a=e.deadItems,o=e.setDeadItems,u=Object(c.useState)(null),d=Object(i.a)(u,2),j=d[0],b=d[1];Object(c.useEffect)((function(){var e;switch(s){case"dead":b("red"),setTimeout((function(){var e=Object(l.a)({},a);delete e[r],o(e)}),100);break;case"blank":b("darkgrey");break;default:b("blue"),e=setTimeout((function(){b("white")}),100)}return function(){clearTimeout(e)}}),[s,a,r,b,o]);var f=Object(i.a)(n[r],3),O=f[0],p=f[1],y=f[2],S=g(25*O),I=g(25*p);return Object(x.jsx)(h.a,{bgcolor:j,className:m()(t.box,t.fadeIn),style:{top:I,left:S},children:"blank"===s?null:Object(x.jsxs)("h1",{style:{fontSize:"7vw"},children:[" ",y," "]})})},y=function(e){return Math.floor(Math.random()*e)},S=function(){return y(1e6)},I=function e(t,n){return t===n||t instanceof Array&&n instanceof Array&&t.length===n.length&&t.every((function(t,c){return e(t,n[c])}))},w=37,k=38,D=39,C=40,T=n(41),B=n(76),F=Object(T.a)({palette:{primary:{main:"#fff3e0",contrastText:"#6d4c41"},secondary:{main:"#9e9e9e",contrastText:"#000"},background:{default:"#fff3e0"}}});function N(e){return Object(x.jsx)(B.a,{theme:F,children:e.children})}var P=Object(f.a)({box:{width:"100%",maxWidth:"80vh",paddingBottom:"min(100%, 80vh - 35px)",marginTop:"10px",marginBottom:"10px",position:"relative",border:"0.5vw solid ".concat(F.palette.secondary.main),background:F.palette.secondary.main,borderRadius:"3%"}}),M=function(){for(var e={},t=function(t){return e=t},n=0;n<2;n++)z(e,t);return e},R=function(e,t){var n,c=Object(b.a)(t);try{for(c.s();!(n=c.n()).done;){var r=n.value;if(e[0]===r[0]&&e[1]===r[1])return!0}}catch(s){c.e(s)}finally{c.f()}return!1},z=function(e,t){var n;do{n=[y(4),y(4)]}while(R(n,Object.values(e)));t(Object(l.a)(Object(l.a)({},e),{},Object(d.a)({},S(),[].concat(Object(j.a)(n),[Math.random()<.9?2:4]))))},E=function(e,t,n,c){t(Object(l.a)(Object(l.a)({},e),{},Object(d.a)({},n,c)))},J=function(e,t){for(var n,c=t.items,r=t.setItems,s=t.score,a=t.setScore,o=t.deadItems,u=t.setDeadItems,d=t.setPreviousItems,l=t.setPreviousScore,b=[[],[],[],[]],f=["left","right"].includes(e)?0:1,h=s,O=0,m=Object.entries((n=c,JSON.parse(JSON.stringify(n))));O<m.length;O++){var x=Object(i.a)(m[O],2),v=x[0],g=x[1];b[g[1-f]].push([v,g])}for(var p={},y=0;y<b.length;y++){var S=b[y];S.sort((function(e,t){return e[1][f]-t[1][f]}));for(var w=1;w<S.length;w++)S[w][1][2]===S[w-1][1][2]&&(S[w][1][2]=2*S[w][1][2],h+=S[w][1][2],E.apply(void 0,[o,u].concat(Object(j.a)(S[w-1]))),S.splice(w-1,1));["right","down"].includes(e)&&S.reverse();for(var k=0;k<S.length;k++){var D=Object(i.a)(S[k],2),C=D[0],T=D[1],B=["right","down"].includes(e)?3-k:k;p[C]=[],p[C][1-f]=y,p[C][f]=B,p[C][2]=T[2]}}I(Object.values(p),Object.values(c))||(d(c),l(s),a(h),setTimeout((function(){z(p,r)}),1))},L=function(e){var t=P(),n=e.items,r=e.deadItems,s=e.setDeadItems,a=Object(c.useState)(function(){for(var e={},t=0;t<16;t++)e[S()]=[t%4,Math.floor(t/4),0];return e}()),o=Object(i.a)(a,1)[0];return Object(x.jsx)("div",{style:{width:"100%"},children:Object(x.jsxs)("div",{className:t.box,onAnimationEnd:z,children:[Object.keys(o).map((function(e){return Object(x.jsx)(p,{items:o,type:"blank",id:e},e)})),Object.keys(r).map((function(e){return Object(x.jsx)(p,{items:r,id:e,type:"dead",deadItems:r,setDeadItems:s},e)})),Object.keys(n).map((function(e){return Object(x.jsx)(p,{items:n,id:e},e)}))]})})},A=n(82),H=n(77),K=n(78),W=Object(f.a)({container:{display:"flex",flexDirection:"column",width:"100%"},header:{display:"flex",width:"100%",justifyContent:"flex-end",margin:"10px"},actionBar:{display:"flex",width:"100%",justifyContent:"flex-end"},box:{marginLeft:"10px",padding:"12px",background:"grey",borderRadius:"10px",color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}),q=function(e){var t=W(),n=e.title,c=e.score;return Object(x.jsxs)("div",{className:t.box,children:[Object(x.jsx)("h3",{style:{fontSize:"1.5vw",margin:"0"},children:n}),Object(x.jsx)("h2",{style:{fontSize:"2.5vw",margin:"0"},children:c})]})},G=function(e){var t=e.score,n=e.resetBoardFunc,c=e.highScore,r=e.undoFunc,s=W();return Object(x.jsxs)("div",{className:s.container,children:[Object(x.jsxs)("div",{className:s.header,children:[Object(x.jsx)("h1",{style:{margin:"0 auto 0 0",fontSize:"min(6vw, 60px)"},children:"2048-React"}),Object(x.jsx)(q,{title:"Score",score:t}),Object(x.jsx)(q,{title:"Highscore",score:c})]}),Object(x.jsxs)("div",{className:s.actionBar,children:[Object(x.jsx)(A.a,{variant:"contained",color:"secondary",onClick:r,children:Object(x.jsx)(H.a,{style:{color:"white"}})}),Object(x.jsx)(A.a,{variant:"contained",color:"secondary",onClick:n,style:{marginLeft:"10px"},children:Object(x.jsx)(K.a,{style:{color:"white"}})})]})]})};var Q=function(){var e=Object(c.useState)(M()),t=Object(i.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(0),a=Object(i.a)(s,2),d=a[0],j=a[1],l=Object(c.useState)({}),b=Object(i.a)(l,2),f=b[0],h=b[1],O=Object(c.useState)(0),m=Object(i.a)(O,2),v=m[0],g=m[1],p=Object(c.useState)(n),y=Object(i.a)(p,2),S=y[0],I=y[1],T=Object(c.useState)(d),B=Object(i.a)(T,2),F={items:n,setItems:r,score:d,setScore:j,deadItems:f,setDeadItems:h,highScore:v,setHighScore:g,previousItems:S,setPreviousItems:I,previousScore:B[0],setPreviousScore:B[1]},P=Object(c.useRef)();return Object(c.useEffect)((function(){P.current.focus()})),Object(x.jsx)("div",{ref:P,onKeyDown:function(e){switch(e.keyCode){case w:J("left",F);break;case k:J("up",F);break;case D:J("right",F);break;case C:J("down",F)}},tabIndex:-1,style:{height:"100vh"},children:Object(x.jsxs)(N,{children:[Object(x.jsx)(o.a,{}),Object(x.jsxs)(u.a,{container:!0,children:[Object(x.jsx)(u.a,{item:!0,xs:2}),Object(x.jsxs)(u.a,{container:!0,item:!0,xs:8,children:[Object(x.jsx)(G,{score:d,highScore:v,resetBoardFunc:function(){!function(e){for(var t=e.items,n=e.setItems,c=e.score,r=e.setScore,s=e.deadItems,a=e.setDeadItems,o=e.highScore,u=e.setHighScore,d=e.setPreviousItems,j=e.setPreviousScore,l=0,b=Object.entries(t);l<b.length;l++){var f=Object(i.a)(b[l],2),h=f[0],O=f[1];E(s,a,h,[O[0],O[1]])}o<c&&u(c),d(t),j(c),r(0),n(M())}(F)},undoFunc:function(){!function(e){var t=e.setItems,n=e.setScore,c=e.previousItems;n(e.previousScore),t(c)}(F)}}),Object(x.jsx)(L,{items:n,deadItems:f,setDeadItems:h})]}),Object(x.jsx)(u.a,{item:!0,xs:2})]})]})})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,84)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};a.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(Q,{})}),document.getElementById("root")),U()}},[[59,1,2]]]);
//# sourceMappingURL=main.c8d47f13.chunk.js.map