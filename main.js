(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var n=function(){function n(e){var r=this,o=e.baseUrl,i=e.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t(this,"addLike",(function(e){return fetch("".concat(r._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r._headers}).then(r._getResponse)})),t(this,"removeLike",(function(e){return fetch("".concat(r._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r._headers}).then(r._getResponse)})),this._baseUrl=o,this._headers=i}var r,o;return r=n,(o=[{key:"_getResponse",value:function(e){return e.ok?e.json():Promise.reject(e.status)}},{key:"getUser",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(this._getResponse)}},{key:"_getCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._getResponse)}},{key:"getAppInfo",value:function(){return Promise.all([this.getUser(),this._getCards()])}},{key:"updateProfile",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._getResponse)}},{key:"updateAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._getResponse)}},{key:"addCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._getResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._getResponse)}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),n}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"end";switch(t){case"end":this._container.append(e);break;case"start":this._container.prepend(e)}}},{key:"clear",value:function(){this._container.innerHTML=""}}],n&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n,r){var o=t.cardData,i=t.handleCardClick,a=t.handleLikeClick,c=t.handleDeleteClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._id=o._id,this._title=o.name,this._image=o.link,this._likes=o.likes,this._ownerId=o.owner._id,this._userId=n,this._handleCardClick=i,this._handleLikeClick=a,this._handleDeleteClick=c,this._cardSelector=r}var t,n;return t=e,(n=[{key:"getView",value:function(){this._element=this._getTemplate(),this._element.querySelector(".card__title").textContent=this._title;var e=this._element.querySelector(".card__image");return e.src=this._image,e.alt=this._title,this._updateLikesView(),this._setEventListeners(),this._isRemovable(),this._element}},{key:"remove",value:function(){this._element.remove(),this._element=null}},{key:"element",value:function(){return this._element}},{key:"id",value:function(){return this._id}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__image").addEventListener("click",(function(){e._handleCardClick(e,e._title,e._image)})),this._element.querySelector(".card__like-button").addEventListener("click",(function(){e._handleLikeClick(e)})),this._element.querySelector(".card__trash-icon").addEventListener("click",(function(){e._handleDeleteClick(e)}))}},{key:"_isLiked",value:function(){var e=this;return Boolean(this._likes.find((function(t){return t._id===e._userId})))}},{key:"_updateLikesView",value:function(){this._element.querySelector(".card__like-counter").textContent=this._likes.length;var e=this._element.querySelector(".card__like-button");this._isLiked()?e.classList.add("card__like-button_active"):e.classList.remove("card__like-button_active")}},{key:"_isRemovable",value:function(){var e=this._element.querySelector(".card__trash-icon"),t=this._ownerId===this._userId;e.classList.add(t?"card__trash-icon_visible":"card__trash-icon_hidden")}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popUpSelector=t}var t,n;return t=e,(n=[{key:"open",value:function(){var e=this;document.querySelector(this._popUpSelector).classList.add("popup_opened"),document.addEventListener("keydown",(function(t){e._handleEscClose(t)}))}},{key:"close",value:function(){var e=this;document.querySelector(this._popUpSelector).classList.remove("popup_opened"),document.removeEventListener("keydown",(function(t){e._handleEscClose(t)}))}},{key:"setEventListeners",value:function(){var e=this;document.querySelector(this._popUpSelector).addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__close")&&e.close()}))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&document.querySelector(this._popUpSelector).classList.contains("popup_opened")&&this.close()}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),l=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__avatar"),f=document.querySelector(".profile__edit-avatar"),p=document.querySelector(".profile__add-button"),d=document.querySelector(".profile__avatar"),h=(document.querySelector("#avatar-input"),document.querySelector(".profile__username")),y=document.querySelector(".profile__description"),_=document.forms.editavatarform,v=_.elements.avatar,m=document.forms.editprofileform,b=m.elements.username,g=m.elements.description,k=document.forms.newplaceform,w=k.elements.place,S=k.elements.imagelink,E=document.querySelector(".popup_type_photo-view").querySelector(".popup__container").querySelector(".photo-view"),O=E.querySelector(".photo-view__image"),C=E.querySelector(".photo-view__title"),L={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=R(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},q.apply(this,arguments)}function R(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=U(e)););return e}function I(e,t){return I=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},I(e,t)}function T(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function U(e){return U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},U(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=U(r);if(o){var n=U(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),i.call(this,e)}return t=a,(n=[{key:"open",value:function(e,t){q(U(a.prototype),"open",this).call(this),O.src=t,O.alt=e,C.textContent=e}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(){return x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=V(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},x.apply(this,arguments)}function V(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=J(e)););return e}function N(e,t){return N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},N(e,t)}function H(e,t){if(t&&("object"===D(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function J(e){return J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},J(e)}var M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&N(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=J(r);if(o){var n=J(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return H(this,e)});function a(e,t){var n,r=t.submit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._popupElement=document.querySelector(e),n._formElement=n._popupElement.querySelector(".popup__form"),n._submit=r,n.formData={},n}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;x(J(a.prototype),"setEventListeners",this).call(this),this._getInputValues(),this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._getInputValues(),e._submit()}))}},{key:"close",value:function(){x(J(a.prototype),"close",this).call(this),this._formElement.reset()}},{key:"element",value:function(){return this._formElement}},{key:"_getInputValues",value:function(){var e=this,t=this._formElement.querySelectorAll(".popup__input");return Array.from(t).forEach((function(t){e.formData[t.name]=t.value})),this.formData}}])&&A(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function z(e){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(e)}function $(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function F(){return F="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=G(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},F.apply(this,arguments)}function G(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=W(e)););return e}function K(e,t){return K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},K(e,t)}function Q(e,t){if(t&&("object"===z(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function W(e){return W=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},W(e)}var X=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&K(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=W(r);if(o){var n=W(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Q(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupElement=document.querySelector(e),t._formElement=t._popupElement.querySelector(".popup__form"),t}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;F(W(a.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmit()}))}},{key:"setSubmitHandler",value:function(e){this._handleSubmit=e}}])&&$(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u),Y=function(e,t){e.element().querySelectorAll(L.inputSelector).forEach((function(e){e.classList.contains(L.inputErrorClass)&&t.hideInputError(e)}))},Z=function(e,t){var n=Array.from(e.element().querySelectorAll(L.inputSelector)),r=e.element().querySelector(L.submitButtonSelector);t.toggleButtonState(n,r,L.inactiveButtonClass)},ee=function(e,t){t.element().querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"};function te(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var ne=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.userName=t,this.userDescription=n}var t,n;return t=e,n=[{key:"getUserInfo",value:function(e){var t=this;return e.getUser().then((function(e){t.name=e.name,t.about=e.about})).catch((function(e){return console.log("Error: ",e)}))}},{key:"setUserInfo",value:function(e,t,n,r){var o=this;e.updateProfile(t,n).then((function(e){o.userName.textContent=e.name,o.userDescription.textContent=e.about})).catch((function(e){return console.log(e)})).finally((function(){ee(!1,r)}))}}],n&&te(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function re(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var oe=function(){function e(t,n){var r=t.formSelector,o=t.inputSelector,i=t.submitButtonSelector,a=t.inactiveButtonClass,c=t.inputErrorClass,u=t.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=r,this._inputSelector=o,this._submitButtonSelector=i,this._inactiveButtonClass=a,this._inputErrorClass=c,this._errorClass=u,this._formElement=n}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListenersValidate()}},{key:"_setEventListenersValidate",value:function(){var e=this,t=Array.from(this._formElement.querySelectorAll(this._inputSelector)),n=this._formElement.querySelector(this._submitButtonSelector);this.toggleButtonState(t,n),t.forEach((function(r){r.addEventListener("input",(function(){e._checkInputValidity(r),e.toggleButtonState(t,n)}))}))}},{key:"toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?(t.classList.add(this._inactiveButtonClass),t.disabled=!0):(t.classList.remove(this._inactiveButtonClass),t.disabled=!1)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this.hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}}])&&re(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function ie(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ae,ce=new n({baseUrl:"https://nomoreparties.co/v1/plus-cohort-6",headers:{authorization:"f3d57c75-f8a6-4acb-a0b6-75252be6dd05","Content-Type":"application/json"}}),ue=new o({renderer:function(e){ue.addItem(ye(e))}},".content__cards"),le=new ne(h,y),se=new B(".popup_type_photo-view");se.setEventListeners();var fe=new M(".popup_type_avatar-edit",{submit:function(){ee(!0,fe),ce.updateAvatar(v.value).then((function(e){s.src=e.avatar,fe.close()})).catch((function(e){return console.log(e)})).finally((function(){ee(!1,fe)}))}});fe.setEventListeners();var pe=new M(".popup_type_profile-edit",{submit:function(){ee(!0,pe),le.setUserInfo(ce,b.value,g.value,pe),pe.close()}});pe.setEventListeners();var de=new M(".popup_type_place-new",{submit:function(){ee(!0,de),ce.addCard(w.value,S.value).then((function(e){ue.addItem(ye(e),"start"),de.close()})).catch((function(e){return console.log("popupAddCard: "+e)})).finally((function(){ee(!1,de)}))}});de.setEventListeners();var he=new X(".popup_type_remove-card");he.setEventListeners();var ye=function(e){var t=new a({cardData:e,handleCardClick:be,handleLikeClick:ge,handleDeleteClick:function(){he.open(),he.setSubmitHandler((function(){ce.deleteCard(t.id()).then((function(){t.element().remove(),he.close()})).catch((function(e){return console.log(e)}))}))}},ae,"#card-template");return t.getView()},_e=new oe(L,_),ve=new oe(L,m),me=new oe(L,k);_e.enableValidation(),ve.enableValidation(),me.enableValidation(),s.addEventListener("mouseover",(function(){f.classList.remove("profile__edit-avatar_hidden")})),s.addEventListener("mouseout",(function(){f.classList.add("profile__edit-avatar_hidden")})),ce.getAppInfo().then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return ie(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ie(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];d.src=o.avatar,h.textContent=o.name,y.textContent=o.about,ae=o._id,le.getUserInfo(ce),ue.renderItems(i)})).catch((function(e){return console.log("ОШИБКА --- "+e)}));var be=function(e,t,n){se.open(t,n)},ge=function(e){var t=e.element(),n=e.id(),r=t.querySelector(".card__like-button");r.classList.contains("card__like-button_active")?ce.removeLike(n).then((function(e){r.classList.remove("card__like-button_active"),t.querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){return console.log(e)})):ce.addLike(n).then((function(e){r.classList.add("card__like-button_active"),t.querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){return console.log(e)}))};f.addEventListener("click",(function(){fe.open(),Y(fe,_e),Z(fe,_e)})),l.addEventListener("click",(function(){pe.open(),le.getUserInfo(ce),b.value=le.name,g.value=le.about,Y(pe,ve),Z(pe,ve)})),p.addEventListener("click",(function(){de.open(),Y(de,me),Z(de,me)}))})();