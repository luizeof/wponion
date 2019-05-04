"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,i){return n&&_defineProperties(e.prototype,n),i&&_defineProperties(e,i),e}var WP=function(){function n(e){_classCallCheck(this,n),this.element=e,this.element.hasClass("wponion-settings")&&(this.settings_menu_handler(),this.settings_init_search_input()),this.element.hasClass("wponion-metabox")&&this.element.hasClass("wponion-wp-theme")&&this.metabox_menu_handler()}return _createClass(n,[{key:"metabox_menu_handler",value:function(){this.settings_main_menu(),this.settings_submenu()}},{key:"settings_menu_handler",value:function(){this.settings_main_menu(),this.settings_submenu()}},{key:"settings_main_menu",value:function(){var a=this;this.element.find(".main-navigation .nav-tab-wrapper a").on("click",function(e){e.preventDefault();var n=jQuery(e.currentTarget),i=window.wponion.helper.url_params(n.attr("href"));if(!1===window.wponion._.isUndefined(i["container-id"])){var t=a.element.find("div#wponion-tab-"+i["container-id"]);0<t.length?(a.element.find(".wponion-container-wraps").hide(),t.show(),a.element.find("nav.nav-tab-wrapper a.nav-tab-active").removeClass("nav-tab-active"),n.addClass("nav-tab-active"),0===t.find(".wponion-submenus a.current").length?t.find(".wponion-submenus li:first-child a").click():t.find(".wponion-submenus a.current").click()):!1===n.hasClass("disabled")&&(window.location.href=n.attr("href"))}else!1===n.hasClass("disabled")&&(window.location.href=n.attr("href"))})}},{key:"settings_submenu",value:function(){var s=this;this.element.find(".wponion-submenus a").on("click",function(e){e.preventDefault();var n=jQuery(e.currentTarget),i=window.wponion.helper.url_params(n.attr("href"));if(!1===window.wponion._.isUndefined(i["container-id"])){var t=s.element.find("div#wponion-tab-"+i["container-id"]);if(0<t.length)if(!1===window.wponion._.isUndefined(i["sub-container-id"])){var a=t.find("div#wponion-tab-"+i["container-id"]+"-"+i["sub-container-id"]);0<a.length?(s.element.find("div#wponion-tab-"+i["container-id"]+" .wponion-sub-container-wraps ").hide(),a.show(),t.find(".wponion-submenus a.current").removeClass("current"),n.addClass("current")):!1===n.hasClass("disabled")&&(window.location.href=n.attr("href"))}else!1===n.hasClass("disabled")&&(window.location.href=n.attr("href"));else!1===n.hasClass("disabled")&&(window.location.href=n.attr("href"))}else!1===n.hasClass("disabled")&&(window.location.href=n.attr("href"))})}},{key:"settings_init_search_input",value:function(){var a=this;this.element.find(".action-search").find("input").on("change keyup",function(e){var t=jQuery(e.currentTarget).val(),n=a.element.find(".wponion-container-wraps");a.element.find(".search-no-result").hide(),3<t.length?(a.element.find(".wponion-submenus").addClass("wponion-search-unmatched"),a.element.find(".content-outer-wrap").addClass("full-width"),n.addClass("wponion-search-matched"),a.element.find(".wponion-has-callback").addClass("wponion-search-unmatched"),a.element.find(".wponion-has-callback").removeClass("wponion-search-matched"),n.each(function(e,n){(n=jQuery(n)).find("> .wponion-element").addClass("wponion-search-unmatched"),n.find("> .wponion-element").removeClass("wponion-search-matched"),n.find("> .wponion-element").each(function(e,i){(i=jQuery(i)).find(".wponion-element-title > h4, .wponion-desc").each(function(e,n){a.settings_is_search_matched(jQuery(n),t)&&(i.addClass("wponion-search-matched"),i.removeClass("wponion-search-unmatched"))})})}),0===a.element.find(".wponion-element:visible").length&&a.element.find(".search-no-result").show()):(a.element.find(".search-no-result").hide(),a.element.find(".wponion-search-unmatched").removeClass("wponion-search-unmatched"),a.element.find(".wponion-search-matched").removeClass("wponion-search-matched"),a.element.find(".content-outer-wrap").removeClass("full-width"))})}},{key:"settings_is_search_matched",value:function(e,n){return e.text().match(new RegExp(".*?"+n+".*?","i"))}}]),n}();window.wponion.hooks.addAction("wponion_theme_init","wponion_core",function(e){e.hasClass("wponion-wp-theme")&&new WP(e),e.hasClass("wponion-wp_lite-theme")&&new WP(e)});