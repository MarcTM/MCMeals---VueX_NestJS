(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56d35a58"],{"059c":function(e,t,c){"use strict";c("a8e0")},"6b75":function(e,t,c){"use strict";c.r(t);c("b0c0");var n=c("7a23"),o=Object(n["F"])("data-v-3b7a22ec");Object(n["s"])("data-v-3b7a22ec");var a={class:"categories"},s={class:"categories-info"},i=Object(n["g"])("section",{class:"categories-columns"},[Object(n["g"])("h1",null,"SLUG"),Object(n["g"])("h1",null,"NAME"),Object(n["g"])("h1",null,"IMAGE")],-1),l={class:"modal-content"},r={key:0};Object(n["q"])();var u=o((function(e,t,c,o,u,b){return Object(n["p"])(),Object(n["d"])("section",a,[Object(n["g"])("section",s,[i,(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["v"])(e.categories,(function(e){return Object(n["p"])(),Object(n["d"])("section",{onClick:function(t){return b.selectCategory(e.id)},class:"categories-details"},[Object(n["g"])("h4",null,Object(n["y"])(e.slug),1),Object(n["g"])("h4",null,Object(n["y"])(e.name),1),Object(n["g"])("img",{src:e.image,alt:"category image"},null,8,["src"])],8,["onClick"])})),256))]),Object(n["g"])("section",{class:["modal",{showed:u.openModal}]},[Object(n["g"])("section",l,[Object(n["g"])("span",{onClick:t[1]||(t[1]=function(e){return u.openModal=!1}),class:"close"},"×"),u.selected?(Object(n["p"])(),Object(n["d"])("section",r,[Object(n["g"])("button",{onClick:t[2]||(t[2]=function(e){return b.updateCategory(u.selected)}),class:"button"},"UPDATE"),Object(n["g"])("button",{onClick:t[3]||(t[3]=function(e){return b.deleteCategory(u.selected)}),class:"button"},"DELETE")])):Object(n["e"])("",!0)])],2)])})),b=c("5530"),d=c("6cb8"),g=c("5502"),O={name:"Admin-Categories",data:function(){return{openModal:!1,selected:!1}},mounted:function(){this.getCategories()},computed:Object(b["a"])({},Object(g["b"])(["categories"])),methods:{getCategories:function(){this.$store.dispatch(d["h"])},selectCategory:function(e){this.openModal=!0,this.selected=e},updateCategory:function(e){},deleteCategory:function(e){this.$store.dispatch(DELETE_CATEGORY)}}};c("059c");O.render=u,O.__scopeId="data-v-3b7a22ec";t["default"]=O},a8e0:function(e,t,c){},b0c0:function(e,t,c){var n=c("83ab"),o=c("9bf2").f,a=Function.prototype,s=a.toString,i=/^\s*function ([^ (]*)/,l="name";n&&!(l in a)&&o(a,l,{configurable:!0,get:function(){try{return s.call(this).match(i)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-56d35a58.3ef9770e.js.map