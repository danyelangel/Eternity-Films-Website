var escapeRegExp=function(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")},replaceAll=function(a,b,c){return a.replace(new RegExp(escapeRegExp(b),"g"),c)},replaceBetween=function(a,b){return $.each(b,function(c){a=replaceAll(a,"{{"+c+"}}",b[c])}),a},fireHelper={init:function(){$.fn.fireHelper=function(a){var b={baseUrl:"https://danyelangel.firebaseio.com/eternity/",callback:fireHelper.renderView,element:$(this),url:$(this).data("firebase")},c=$.extend({},b,a);c.fullUrl=c.baseUrl+c.url,ref=new Firebase(c.fullUrl),ref.on("value",function(a){c.callback(a.val(),c),0!=fireHelper.templates||fireHelper.outerTemplatesRendered?fireHelper.templatesFinished():(fireHelper.outerTemplatesRendered=!0,fireHelper.templates=$("template[data-firebase-child-template]").length,fireHelper.outerTemplatesFinished())},function(a){console.log("The read failed: "+a.code)})},$("[data-firebase]").each(function(){$(this).fireHelper()}),$("[data-firebase-child]").each(function(){$(this).fireHelper({url:$(this).data("firebaseParent")+"/"+$(this).data("firebaseChild")})}),$("[data-firebase-list]").each(function(){$(this).fireHelper({url:$(this).data("firebaseList"),callback:fireHelper.fillList})}),fireHelper.uploadForm()},fillList:function(a,b){var c={},d=$.extend({},c,b),e=d.element;e.html(""),$template=$("#"+e.data("firebaseTemplateId")).html(),console.log($("#"+e.data("firebaseTemplateId")).html()),$.each(a,function(a,b){b.visible&&($rendered=replaceBetween($template,{id:a}),e.append($rendered),$('[data-firebase-id="'+a+'"]').find("[data-firebase-child], [data-firebase-child-src]").attr("data-firebase-parent",d.url+"/"+a))}),e.find("[data-firebase-child]").each(function(){$(this).fireHelper({url:$(this).data("firebaseParent")+"/"+$(this).data("firebaseChild")})}),e.find("[data-firebase-child-src]").each(function(){$(this).fireHelper({url:$(this).data("firebaseParent")+"/"+$(this).data("firebaseChildSrc"),callback:fireHelper.renderUrl})}),fireHelper.templateCheck()},renderView:function(a,b){$element=b.element,$element.html(a)},renderUrl:function(a,b){$element=b.element,$element.attr("src",a)},outerTemplatesFinished:function(){$("[data-firebase-child-list]").length>0?$("[data-firebase-child-list]").each(function(){$(this).fireHelper({url:$(this).data("firebaseParent")+"/"+$(this).data("firebaseChild"),callback:fireHelper.fillList})}):callbacks.fire()},templates:$("template[data-firebase-template]").length,outerTemplatesRendered:!1,templateCheck:function(){fireHelper.templates--},templatesFinished:function(){0==fireHelper.templates&&callbacks.fire()},uploadForm:function(){function a(a){var b=$("#contact_firstName").val(),d=$("#contact_lastName").val(),e=$("#contact_telephone").val(),f=$("#contact_email").val(),g=$("#contact_film").is(":checked"),h=$("#contact_web").is(":checked"),i=$("#contact_photo").is(":checked"),j=$("#contact_design").is(":checked"),k=$("#contact_marketing").is(":checked"),l=$("#contact_time").val(),m=Date.now();if(""!=b&&""!=d&&""!=e&&""!=f&&""!=l){var n=c.push();n.set({firstName:b,lastName:d,telephone:e,email:f,interests:{film:{title:"Film",checked:g},web:{title:"Web",checked:h},photo:{title:"Photography",checked:i},design:{title:"Design",checked:j},marketing:{title:"Marketing",checked:k}},time:l,timestamp:m}),a.preventDefault(),$("#contactForm").slideUp(),$("#contactError").slideUp(),$("#contactReady").slideDown(),$(this).html("Sent").addClass("disabled")}else $("#contactError").slideDown()}var b="https://danyelangel.firebaseio.com/eternityContact",c=new Firebase(b);if($("#contact_submit").length>0){var d=$("#contact_submit");$("#contactReady").slideUp(),$("#contactError").slideUp(),d.click(a)}}};