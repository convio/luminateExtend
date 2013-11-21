/* luminateExtend.js | Version: 1.5.1 (22-OCT-2013) */
(function(e){var t=jQuery.fn.jquery.split("."),n=Number(t[0]+"."+t[1]),r=function(e,t){var n=t||window;if(e){var r=e.split(".");for(var i=0;i<r.length;i++){if(i<r.length-1&&!n[r[i]]){return{}}n=n[r[i]]}}return n},i=function(t){if(t&&e.inArray(t,["es_US","en_CA","fr_CA","en_GB","en_AU"])<0){t="en_US"}return t},s=function(e){if(e){e=i(e);luminateExtend.sessionVars.set("locale",e)}return e},o=function(e,t){return(e?luminateExtend.global.path.secure+"S":luminateExtend.global.path.nonsecure)+"PageServer"+(luminateExtend.global.sessionCookie?";"+luminateExtend.global.sessionCookie:"")+"?pagename=luminateExtend_server&pgwrap=n"+(t?"&"+t:"")},u=function(t,n){if(t.responseFilter&&t.responseFilter.array&&t.responseFilter.filter){if(r(t.responseFilter.array,n)){var i=t.responseFilter.filter.split("==")[0].split("!=")[0].replace(/^\s+|\s+$/g,""),s,o;if(t.responseFilter.filter.indexOf("!=")!=-1){s="nequal";o=t.responseFilter.filter.split("!=")[1]}else if(t.responseFilter.filter.indexOf("==")!=-1){s="equal";o=t.responseFilter.filter.split("==")[1]}if(s&&o){o=o.replace(/^\s+|\s+$/g,"");var u=[],a=false;e.each(luminateExtend.utils.ensureArray(r(t.responseFilter.array,n)),function(e){if(s=="nequal"&&this[i]==o||s=="equal"&&this[i]!=o){a=true}else{u.push(this)}});if(a){var f=t.responseFilter.array.split(".");e.each(n,function(t,r){if(t==f[0]){e.each(r,function(r,i){if(r==f[1]){if(f.length==2){n[t][r]=u}else{e.each(i,function(i,s){if(i==f[2]){if(f.length==3){n[t][r][i]=u}else{e.each(s,function(e,s){if(e==f[3]&&f.length==4){n[t][r][i][e]=u}})}}})}}})}})}}}}var l=e.noop;if(t.callback){if(typeof t.callback==="function"){l=t.callback}else if(t.callback.error&&n.errorResponse){l=t.callback.error}else if(t.callback.success&&!n.errorResponse){l=t.callback.success}}if(!(t.data.indexOf("&method=login")!=-1&&t.data.indexOf("&method=loginTest")==-1||t.data.indexOf("&method=logout")!=-1)){l(n)}else{var c=function(){l(n)};luminateExtend.api.getAuth({callback:c,useCache:false,useHTTPS:t.useHTTPS})}};window.luminateExtend=function(e){luminateExtend.init(e||{})};luminateExtend.library={version:"1.5.1"};luminateExtend.global={update:function(t,n){if(t){if(t.length){if(n){if(t=="locale"){n=s(n)}luminateExtend.global[t]=n}}else{if(t.locale){t.locale=s(t.locale)}luminateExtend.global=e.extend(luminateExtend.global,t)}}}};luminateExtend.init=function(t){var n=e.extend({apiCommon:{},auth:{type:"auth"},path:{}},t||{});if(n.locale){n.locale=s(n.locale)}n.supportsCORS=false;if(window.XMLHttpRequest){var r=new XMLHttpRequest;if("withCredentials"in r){n.supportsCORS=true}}luminateExtend.global=e.extend(luminateExtend.global,n);return luminateExtend};luminateExtend.api=function(e){luminateExtend.api.request(e||{})};luminateExtend.api.bind=function(t){t=t||"form.luminateApi";if(e(t).length>0){e(t).each(function(){if(this.nodeName.toLowerCase()=="form"){e(this).bind("submit",function(t){t.cancelBubble=true;t.returnValue=false;if(t.stopPropagation){t.stopPropagation();t.preventDefault()}if(!e(this).attr("id")){e(this).attr("id","luminateApi-"+(new Date).getTime())}var n=e(this).attr("action"),i=n.split("?"),s=e(this).data("luminateapi"),o=i[0].indexOf("/site/")!=-1?i[0].split("/site/")[1]:i[0],u,a=e(this).attr("enctype"),f=i.length>1?i[1]:"",l="#"+e(this).attr("id"),c=false,h=e(this).attr("method"),p=false;if(s){if(s.callback){u=r(s.callback)}if(s.requiresAuth&&s.requiresAuth=="true"){c=true}if(n.indexOf("https:")==0||window.location.protocol=="https:"&&n.indexOf("http")==-1){p=true}}luminateExtend.api.request({api:o,callback:u,contentType:a,data:f,form:l,requestType:h,requiresAuth:c,useHTTPS:p})})}})}return luminateExtend};luminateExtend.api.getAuth=function(t){var n=e.extend({useCache:true,useHTTPS:false},t||{});if(luminateExtend.api.getAuthLoad){luminateExtend.api.getAuthLoad=false;if(n.useCache&&luminateExtend.global.auth.type&&luminateExtend.global.auth.token){luminateExtend.api.getAuthLoad=true;if(n.callback){n.callback()}}else{var r=function(e){luminateExtend.global.update(e);luminateExtend.api.getAuthLoad=true;if(n.callback){n.callback()}};if(luminateExtend.global.supportsCORS){e.ajax({data:"luminateExtend="+luminateExtend.library.version+"&api_key="+luminateExtend.global.apiKey+"&method=getLoginUrl&response_format=json&v=1.0",dataType:"json",success:function(e){r({auth:{type:"auth",token:e.getLoginUrlResponse.token},sessionCookie:e.getLoginUrlResponse.url.split(";")[1]})},url:(n.useHTTPS?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"CRConsAPI",xhrFields:{withCredentials:true}})}else{e.ajax({dataType:"jsonp",success:r,url:o(n.useHTTPS,"action=getAuth&callback=?")})}}}else{var i=function(){luminateExtend.api.getAuth(n)},s=setTimeout(i,1e3)}};luminateExtend.api.getAuthLoad=true;luminateExtend.api.request=function(t){var n=e.extend({contentType:"application/x-www-form-urlencoded",data:"",requestType:"GET",requiresAuth:false,useHashTransport:false,useHTTPS:null},t||{});var r=["addressbook","advocacy","connect","cons","content","datasync","donation","email","group","orgevent","recurring","survey","teamraiser"];if(e.inArray(n.api.toLowerCase(),r)>=0){n.api="CR"+n.api.charAt(0).toUpperCase()+n.api.slice(1).toLowerCase()+"API";n.api=n.api.replace("Addressbook","AddressBook").replace("Datasync","DataSync").replace("Orgevent","OrgEvent")}if(luminateExtend.global.path.nonsecure&&luminateExtend.global.path.secure&&luminateExtend.global.apiKey&&n.api){if(n.contentType!="multipart/form-data"){n.contentType="application/x-www-form-urlencoded"}n.data="luminateExtend="+luminateExtend.library.version+(n.data==""?"":"&"+n.data);if(n.form&&e(n.form).length>0){n.data+="&"+e(n.form).eq(0).serialize()}if(n.data.indexOf("&api_key=")==-1){n.data+="&api_key="+luminateExtend.global.apiKey}if(luminateExtend.global.apiCommon.centerId&&n.data.indexOf("&center_id=")==-1){n.data+="&center_id="+luminateExtend.global.apiCommon.centerId}if(luminateExtend.global.categoryId&&n.data.indexOf("&list_category_id=")==-1){n.data+="&list_category_id="+luminateExtend.global.apiCommon.categoryId}if(n.data.indexOf("&response_format=xml")!=-1){n.data=n.data.replace(/&response_format=xml/g,"&response_format=json")}else if(n.data.indexOf("&response_format=")==-1){n.data+="&response_format=json"}if(luminateExtend.global.apiCommon.source&&n.data.indexOf("&source=")==-1){n.data+="&source="+luminateExtend.global.apiCommon.source}if(luminateExtend.global.apiCommon.subSource&&n.data.indexOf("&sub_source=")==-1){n.data+="&sub_source="+luminateExtend.global.apiCommon.subSource}if(n.data.indexOf("&suppress_response_codes=")==-1){n.data+="&suppress_response_codes=true"}if(luminateExtend.global.locale&&n.data.indexOf("&s_locale=")==-1){n.data+="&s_locale="+luminateExtend.global.locale}if(n.data.indexOf("&v=")==-1){n.data+="&v=1.0"}n.requestType=n.requestType.toLowerCase()=="post"?"POST":"GET";var i="http://",s=luminateExtend.global.path.nonsecure.split("http://")[1];if(n.api=="CRDonationAPI"||n.api=="CRTeamraiserAPI"||n.api!="CRConnectAPI"&&(window.location.protocol=="https:"&&n.useHTTPS==null||n.useHTTPS==true)){n.useHTTPS=true}else{n.useHTTPS=false}if(n.useHTTPS){i="https://",s=luminateExtend.global.path.secure.split("https://")[1]}i+=s+n.api;var a=false,f=false,l=false;if(window.location.protocol==i.split("//")[0]&&document.domain==s.split("/")[0]&&!n.useHashTransport){a=true,f=true}else{if(luminateExtend.global.supportsCORS&&!n.useHashTransport){f=true}else if("postMessage"in window&&!n.useHashTransport){l=true}}var c;if(f){c=function(){if(n.requiresAuth&&n.data.indexOf("&"+luminateExtend.global.auth.type+"=")==-1){n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token}if(luminateExtend.global.sessionCookie){i+=";"+luminateExtend.global.sessionCookie}n.data+="&ts="+(new Date).getTime();e.ajax({contentType:n.contentType,data:n.data,dataType:"json",success:function(e){u(n,e)},type:n.requestType,url:i,xhrFields:{withCredentials:true}})}}else if(l){c=function(){var t=(new Date).getTime(),r="luminateApiPostMessage"+t,s=o(n.useHTTPS,"action=postMessage");if(n.requiresAuth&&n.data.indexOf("&"+luminateExtend.global.auth.type+"=")==-1){n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token}n.data+="&ts="+t;if(!luminateExtend.api.request.postMessageEventHandler){luminateExtend.api.request.postMessageEventHandler={};luminateExtend.api.request.postMessageEventHandler.handler=function(t){var n=e.parseJSON(t.data),r=n.postMessageFrameId,i=e.parseJSON(decodeURIComponent(n.response));if(luminateExtend.api.request.postMessageEventHandler[r]){luminateExtend.api.request.postMessageEventHandler[r](r,i)}};if(typeof window.addEventListener!="undefined"){window.addEventListener("message",luminateExtend.api.request.postMessageEventHandler.handler,false)}else if(typeof window.attachEvent!="undefined"){window.attachEvent("onmessage",luminateExtend.api.request.postMessageEventHandler.handler)}}luminateExtend.api.request.postMessageEventHandler[r]=function(t,r){u(n,r);e("#"+t).remove();delete luminateExtend.api.request.postMessageEventHandler[t]};e("body").append('<iframe style="position: absolute; top: 0; left: -999em;" '+'name="'+r+'" id="'+r+'">'+"</iframe>");e("#"+r).bind("load",function(){var t="{"+'"postMessageFrameId": "'+e(this).attr("id")+'", '+'"requestUrl": "'+i+'", '+'"requestContentType": "'+n.contentType+'", '+'"requestData": "'+n.data+'", '+'"requestType": "'+n.requestType+'"'+"}",r=i.split("/site/")[0].split("/admin/")[0];document.getElementById(e(this).attr("id")).contentWindow.postMessage(t,r)});e("#"+r).attr("src",s)}}else{c=function(){var t=(new Date).getTime(),r="luminateApiHashTransport"+t,s=o(n.useHTTPS,"action=hashTransport"),a=window.location.protocol+"//"+document.domain+"/luminateExtend_client.html";if(n.requiresAuth&&n.data.indexOf("&"+luminateExtend.global.auth.type+"=")==-1){n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token}n.data+="&ts="+t;s+="#&hashTransportClientUrl="+encodeURIComponent(a)+"&hashTransportFrameId="+r+"&requestUrl="+encodeURIComponent(i)+"&requestContentType="+encodeURIComponent(n.contentType)+"&requestData="+encodeURIComponent(n.data)+"&requestType="+n.requestType;if(!luminateExtend.api.request.hashTransportEventHandler){luminateExtend.api.request.hashTransportEventHandler={};luminateExtend.api.request.hashTransportEventHandler.handler=function(e,t){if(luminateExtend.api.request.hashTransportEventHandler[e]){luminateExtend.api.request.hashTransportEventHandler[e](e,t)}}}luminateExtend.api.request.hashTransportEventHandler[r]=function(t,r){u(n,r);e("#"+t).remove();delete luminateExtend.api.request.hashTransportEventHandler[t]};e("body").append('<iframe style="position: absolute; top: 0; left: -999em;" '+'name="'+r+'" id="'+r+'" '+'src="'+s+'"></iframe>')}}if(n.requiresAuth||!f&&!a&&!luminateExtend.global.sessionCookie){luminateExtend.api.getAuth({callback:c,useHTTPS:n.useHTTPS})}else{c()}}};luminateExtend.sessionVars={set:function(e,t,n){var r={};if(n){r.callback=n}if(e){r.data="s_"+e+"="+(t||"");luminateExtend.utils.ping(r)}}};luminateExtend.tags=function(e,t){luminateExtend.tags.parse(e,t)};luminateExtend.tags.parse=function(t,n){if(!t||t=="all"){t=["cons"]}else{t=luminateExtend.utils.ensureArray(t)}n=n||"body";e.each(t,function(){if(t=="cons"){var i=e(n).find(document.getElementsByTagName("luminate:cons"));if(i.length>0){var s=function(t){i.each(function(){if(t.getConsResponse){e(this).replaceWith(r(e(this).attr("field"),t.getConsResponse))}else{e(this).remove()}})};luminateExtend.api.request({api:"cons",callback:s,data:"method=getUser",requestType:"POST",requiresAuth:true})}}})};luminateExtend.utils={ensureArray:function(t){if(e.isArray(t)){return t}else{return[t]}},ping:function(t){var n=e.extend({data:null},t||{});var r="luminatePing"+(new Date).getTime();e("body").append('<img style="position: absolute; left: -999em; top: 0;" '+'id="'+r+'" />');e("#"+r).bind("load",function(){e(this).remove();if(n.callback){n.callback()}});e("#"+r).attr("src",(window.location.protocol=="https:"?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"EstablishSession?"+(n.data==null?"":n.data+"&")+"NEXTURL="+encodeURIComponent((window.location.protocol=="https:"?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"PixelServer"))},simpleDateFormat:function(t,n,r){r=r||luminateExtend.global.locale;r=i(r);n=n||(e.inArray(r,["en_CA","fr_CA","en_GB","en_AU"])>=0?"d/M/yy":"M/d/yy");t=t||new Date;if(!(t instanceof Date)){var s=t.split("T")[0].split("-"),o=t.split("T").length>1?t.split("T")[1].split(".")[0].split("Z")[0].split("-")[0].split(":"):["00","00","00"];t=new Date(s[0],s[1]-1,s[2],o[0],o[1],o[2])}var u=function(e){e=""+e;return e.indexOf("0")==0&&e!="0"?e.substring(1):e},a=function(e){e=Number(e);return isNaN(e)?"00":(e<10?"0":"")+e},f={month:a(t.getMonth()+1),date:a(t.getDate()),year:a(t.getFullYear()),day:t.getDay(),hour24:t.getHours(),hour12:t.getHours(),minutes:a(t.getMinutes()),ampm:"AM"};if(f.hour24>11){f.ampm="PM"}f.hour24=a(f.hour24);if(f.hour12==0){f.hour12=12}if(f.hour12>12){f.hour12=f.hour12-12}f.hour12=a(f.hour12);var l,c=function(e){var t=e.replace(/yy+(?=y)/g,"yy").replace(/MMM+(?=M)/g,"MMM").replace(/d+(?=d)/g,"d").replace(/EEE+(?=E)/g,"EEE").replace(/a+(?=a)/g,"").replace(/k+(?=k)/g,"k").replace(/h+(?=h)/g,"h").replace(/m+(?=m)/g,"m"),n=t.replace(/yyy/g,f.year).replace(/yy/g,f.year.substring(2)).replace(/y/g,f.year).replace(/dd/g,f.date).replace(/d/g,u(f.date)),i=function(e,t,n){for(var r=1;r<e.length;r++){if(!isNaN(e[r].substring(0,1))){var i=e[r].substring(0,2);e[r]=e[r].substring(2);if(isNaN(i.substring(1))){e[r]=i.substring(1)+e[r];i=i.substring(0,1)}i=Number(i);if(i>23){i=23}var s=n=="+"?i:0-i;if(t=="kk"||t=="k"){s=Number(f.hour24)+s;if(s>24){s=s-24}else if(s<0){s=s+24}}else{s=Number(f.hour12)+s;if(s>24){s=s-24}else if(s<0){s=s+24}if(s>12){s=s-12}}s=""+s;if(t=="kk"||t=="hh"){s=a(s)}if(t=="h"&&s==0||t=="hh"&&s=="00"){s="12"}e[r]=s+e[r]}}return e.join("")};if(n.indexOf("k+")!=-1){n=i(n.split("kk+"),"kk","+");n=i(n.split("k+"),"k","+")}if(n.indexOf("k-")!=-1){n=i(n.split("kk-"),"kk","-");n=i(n.split("k-"),"k","-")}n=n.replace(/kk/g,f.hour24).replace(/k/g,u(f.hour24));if(n.indexOf("h+")!=-1){n=i(n.split("hh+"),"hh","+");n=i(n.split("h+"),"h","+")}if(n.indexOf("h-")!=-1){n=i(n.split("hh-"),"hh","-");n=i(n.split("h-"),"h","-")}n=n.replace(/hh/g,f.hour12<12&&f.hour12.indexOf&&f.hour12.indexOf("0")!=0?"0"+f.hour12:f.hour12).replace(/h/g,u(f.hour12));n=n.replace(/mm/g,f.minutes).replace(/m/g,u(f.minutes));n=n.replace(/a/g,"A");var s=["January","February","march","april","may","June","July","august","September","October","November","December"];if(r=="es_US"){s=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]}if(r=="fr_CA"){s=["janvier","f&"+"#233;vrier","mars","avril","mai","juin","juillet","ao&"+"#251;t","septembre","octobre","novembre","d&"+"#233;cembre"]}n=n.replace(/MMMM/g,s[Number(f.month)-1]).replace(/MMM/g,s[Number(f.month)-1].substring(0,3)).replace(/MM/g,f.month).replace(/M/g,u(f.month)).replace(/march/g,"March").replace(/may/g,"May").replace(/Mayo/g,"mayo");var o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];if(r=="es_US"){o=["domingo","lunes","martes","mi&"+"eacute;rcoles","jueves","viernes","s&"+"aacute;bado"]}if(r=="fr_CA"){o=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]}n=n.replace(/EEEE/g,o[f.day]).replace(/EEE/g,o[f.day].substring(0,3)).replace(/EE/g,o[f.day].substring(0,3)).replace(/E/g,o[f.day].substring(0,3));n=n.replace(/A/g,f.ampm).replace(/april/g,"April").replace(/august/g,"August");return n};if(n.indexOf("'")==-1){l=c(n)}else{var h=n.replace(/\'+(?=\')/g,"''").split("''");if(h.length==1){h=n.split("'");for(var p=0;p<h.length;p++){if(p%2==0){h[p]=c(h[p])}}return h.join("")}else{for(var p=0;p<h.length;p++){var d=h[p].split("'");for(var v=0;v<d.length;v++){if(v%2==0){d[v]=c(d[v])}}h[p]=d.join("")}return h.join("'")}}return l}}})(jQuery)