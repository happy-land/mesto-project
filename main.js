(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{E:()=>q,A:()=>X});var t=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)},n=document.querySelector(".popup_type_photo-view"),r=n.querySelector(".popup__container").querySelector(".photo-view"),o=r.querySelector(".photo-view__image"),c=r.querySelector(".photo-view__title"),a=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",l)},i=function(e){var n=Array.from(e.querySelectorAll(X.inputSelector)),r=e.querySelector(X.submitButtonSelector);t(n,r,X.inactiveButtonClass)},u=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",l)},l=function(e){"Escape"===e.key&&q.forEach((function(e){e.classList.contains("popup_opened")&&u(e)}))},s=document.querySelector("#card-template").content,d=document.querySelector(".cards"),f=function(e,t,r){e.querySelector(".card__image").addEventListener("click",(function(){!function(e,t){a(n),o.src=t,o.alt=e,c.textContent=e}(t,r)}))},p=function(e,t,n,r){var o=e.name,c=e.link,a=e.likes,i=e.cardId,u=e.ownerId,l=s.querySelector(".card").cloneNode(!0),d=l.querySelector(".card__title"),p=l.querySelector(".card__image"),v=l.querySelector(".card__like-button"),_=l.querySelector(".card__like-counter");d.textContent=o,p.src=c,p.alt=o,_.textContent=a.length.toString();var m=Boolean(a.find((function(e){return e._id===t})));m&&v.classList.add("card__like-button_active"),v.addEventListener("click",(function(){return n(l,i,m)}));var y=l.querySelector(".card__trash-icon"),h=u===t;return y.classList.add(h?"card__trash-icon_visible":"card__trash-icon_hidden"),y.addEventListener("click",(function(){return r(l,i)})),f(l,o,c),l},v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"end";switch(t){case"end":d.append(e);break;case"start":d.prepend(e)}},_={baseUrl:"https://nomoreparties.co/v1/plus-cohort-6",headers:{authorization:"f3d57c75-f8a6-4acb-a0b6-75252be6dd05","Content-Type":"application/json"}},m=function(e){return e.ok?e.json():Promise.reject(e.status)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g,q=document.querySelectorAll(".popup"),L=document.querySelector(".popup_type_profile-edit"),E=document.querySelector(".popup_type_place-new"),k=document.querySelector(".popup_type_avatar-edit"),w=document.querySelector(".profile__edit-button"),O=document.querySelector(".profile__avatar"),C=document.querySelector(".profile__edit-avatar"),j=document.querySelector(".profile__add-button"),P=document.querySelector(".profile__avatar"),A=document.querySelector(".profile__username"),x=document.querySelector(".profile__description"),U=document.forms.editavatarform,D=U.elements.avatar,I=document.forms.editprofileform,T=I.elements.username,B=I.elements.description,N=document.forms.newplaceform,J=N.elements.place,H=N.elements.imagelink;O.addEventListener("mouseover",(function(e){C.classList.remove("profile__edit-avatar_hidden")})),O.addEventListener("mouseout",(function(e){C.classList.add("profile__edit-avatar_hidden")})),Promise.all([fetch("".concat(_.baseUrl,"/users/me"),{headers:_.headers}).then(m),fetch("".concat(_.baseUrl,"/cards"),{headers:_.headers}).then(m)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];P.src=o.avatar,A.textContent=o.name,x.textContent=o.about,g=o._id,c.forEach((function(e){var t=p(h(h({},e),{},{cardId:e._id,ownerId:e.owner._id}),g,M,z);v(t)}))})).catch((function(e){return console.log(e)}));var M=function(e,t){var n=e.querySelector(".card__like-button");n.classList.contains("card__like-button_active")?function(e){return fetch("".concat(_.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:_.headers}).then(m)}(t).then((function(t){n.classList.remove("card__like-button_active"),e.querySelector(".card__like-counter").textContent=t.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(_.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:_.headers}).then(m)}(t).then((function(t){n.classList.add("card__like-button_active"),e.querySelector(".card__like-counter").textContent=t.likes.length})).catch((function(e){return console.log(e)}))},z=function(e,t){(function(e){return fetch("".concat(_.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:_.headers}).then(m)})(t).then((function(t){e.closest(".card").remove()})).catch((function(e){return console.log(e)}))};C.addEventListener("click",(function(){a(k),i(k)})),w.addEventListener("click",(function(){T.value=A.textContent,B.value=x.textContent,a(L),i(L)})),j.addEventListener("click",(function(){a(E),i(E)})),q.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&u(e),t.target.classList.contains("popup__close")&&u(e)}))}));var $=function(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"};U.addEventListener("submit",(function(e){var t;e.preventDefault(),$(!0,k),(t=D.value,fetch("".concat(_.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:_.headers,body:JSON.stringify({avatar:t})}).then(m)).then((function(e){O.src=e.avatar,u(k)})).catch((function(e){return console.log(e)})).finally((function(){$(!1,k)}))})),I.addEventListener("submit",(function(e){var t,n;e.preventDefault(),$(!0,L),(t=T.value,n=B.value,fetch("".concat(_.baseUrl,"/users/me"),{method:"PATCH",headers:_.headers,body:JSON.stringify({name:t,about:n})}).then(m)).then((function(e){A.textContent=e.name,x.textContent=e.about,u(L)})).catch((function(e){return console.log(e)})).finally((function(){$(!1,L)}))})),N.addEventListener("submit",(function(e){var t,n;e.preventDefault(),$(!0,E),(t=J.value,n=H.value,fetch("".concat(_.baseUrl,"/cards"),{method:"POST",headers:_.headers,body:JSON.stringify({name:t,link:n})}).then(m)).then((function(e){var t=p(h(h({},e),{},{cardId:e._id,ownerId:e.owner._id}),g,M,z);v(t,"start"),N.reset(),u(E)})).catch((function(e){return console.log(e)})).finally((function(){$(!1,E)}))}));var F,G,K,Q,R,V,W,X={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};G=(F=X).formSelector,K=F.inputSelector,Q=F.submitButtonSelector,R=F.inactiveButtonClass,V=F.inputErrorClass,W=F.errorClass,Array.from(document.querySelectorAll(G)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,n,r,o,c,a){var i=Array.from(e.querySelectorAll(n)),u=e.querySelector(r);t(i,u,o),i.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n,r){t.validity.valid?function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,n,c,a),t(i,u,o)}))}))}(e,K,Q,R,V,W)}))})();