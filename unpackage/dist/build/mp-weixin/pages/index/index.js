"use strict";var t=require("../../common/vendor.js");const e={data:()=>({title:"Hello 张思哲",time:"",content:"",list:[],user:"",message:"Hello Vue!"}),onLoad(){t.index.showToast({title:"加载"}),this.timer=setInterval((()=>this.changeTime()),1e3),t.rn.callFunction({name:"fun",data:{api:"getMessages"}}).then((t=>{this.list=t.result.data})),t.rn.callFunction({name:"fun",data:{api:"check"}}).then((t=>{console.log(t)}))},onUnload(){clearInterval(this.timer)},methods:{changeTime(){this.time=(new Date).toLocaleString()},publish(){if(this.user||(this.user="匿名"),!this.content)return t.index.showToast({title:"请填写留言",icon:"error"}),this.user="",void(this.content="");t.rn.callFunction({name:"fun",data:{api:"publish",content:this.content,user:this.user}}).then((t=>{console.log(t),this.list.push({_id:t.result.id,content:this.content,user:this.user}),this.content="",this.user=""}))}}};var n=t._export_sfc(e,[["render",function(e,n,s,i,o,a){return{a:o.user,b:t.o((t=>o.user=t.detail.value)),c:o.content,d:t.o((t=>o.content=t.detail.value)),e:t.o((t=>a.publish())),f:t.f(o.list,((e,n,s)=>({a:t.t(e.user),b:t.t(e.content),c:t.n("list-"+n%2),d:e._id})))}}]]);wx.createPage(n);