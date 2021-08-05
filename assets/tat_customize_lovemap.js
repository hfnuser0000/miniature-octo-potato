jQuery.fancybox.defaults.beforeShow = function(){
    jQuery('body').css('position','fixed');
    jQuery("body").css({'overflow-y':'hidden'});
 }
jQuery.fancybox.defaults.beforeClose = function(){
    jQuery('body').css('position','');
    jQuery("body").css({'overflow-y':'visible'});
}
jQuery.fancybox.defaults.iframe.attr = {"data-hj-allow-iframe": ""}

jQuery(document).ready(function () {
  var waitingLoading = setInterval(function () {

    if (jQuery('#pw-personalize-btn').attr('data-src')) {
      clearInterval(waitingLoading)
      window._loq = window._loq || [];

      var UpdateURLParameter = (function () {
        return {

          update: function (key, value) {
            var iframeUrl = jQuery('#pw-personalize-btn').attr('data-src')
            if (iframeUrl) {
              if (value) iframeUrl = this._updateURLParameter(iframeUrl, key, value)
              jQuery('#pw-personalize-btn').attr('data-src', iframeUrl);
            }
          },
          fancyboxOverridesSettings: function (settings) {
            jQuery('#pw-personalize-btn').fancybox(settings);
          },
          _updateURLParameter: function (t, l, r) { var a = null, e = '', i = t.split('?'), p = i[0], s = i[1], n = ''; if (s) { var u = (f = s.split('#'))[0]; (a = f[1]) && (s = u), i = s.split('&'); for (var v = 0; v < i.length; v++)i[v].split('=')[0] != l && (e += n + i[v], n = '&') } else { var f; u = (f = p.split('#'))[0]; a = f[1], u && (p = u) } return a && (r += '#' + a), p + '?' + e + (n + '' + l + '=' + r) }
        }
      })()

      var GlobalStyles = (function () {
        return {
          insertToHead: function (target, styles) {
            var style = document.createElement('style');
            var html = target.concat('{')
            styles.forEach(function (s) {
              if (s[0] && s[1]) html = html.concat(s[0]).concat(':').concat(s[1]).concat(' !important;')
            });
            html = html.concat('}')
            style.innerHTML = html
            document.head.appendChild(style);
          }
        }
      })()

      function closePopup() {
        jQuery.fancybox.close();
      }

      function setResultImage(previewImg) {
        console.log(previewImg);
        var $el = jQuery('.images.woocommerce-product-gallery, .woo-variation-product-gallery')
        if (!$el.length) $el = jQuery('.col-sm-6.product-images')
        $el.empty();
        $el.append('<a id="previewImg" href="' + previewImg + '" data-fancybox="images" ><img src="' + previewImg + '" alt="" /></a>');
        jQuery('#link_image').val(previewImg);
        jQuery('#previewImg').fancybox();
        setTimeout(function () {
          jQuery('#previewImg').click();
        }, 500);
        jQuery('#pw-personalize-btn').val('EDIT DESIGN');
        jQuery('.product-form--regular .product-form--atc-button,.product-form--regular .shopify-payment-button__button').show('slow');
      }


      var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      var eventer = window[eventMethod];
      var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
      var callpreviewImg = false
      eventer(messageEvent, function (e) {
        if (e.data.name == 'previewImg') {
          // if (!callpreviewImg) {
          //   callpreviewImg = true
          //   setTimeout(function () {
          //     callpreviewImg = false
          //   }, 3000);
             closePopup();
           // setTimeout(function () {
              setResultImage(e.data.data.file);
              jQuery('#loadingDialog').removeClass('is-active');
           // }, 8000);

           
          //}
        } else if (e.data.name == 'showLoading') {
          jQuery('#loadingDialog').addClass('is-active');
        }
        
        else if(e.data.name == 'reloadframe'){
          jQuery('iframe.fancybox-iframe').attr('src',e.data.url)
        }
        
        
      });

      UpdateURLParameter.fancyboxOverridesSettings({

        afterShow: function (instance, current) {
          current.$iframe[0].contentWindow.postMessage({ name: 'onReady' }, '*');
          jQuery('[data-fancybox-close]')
            .prependTo('.fancybox-slide--iframe .fancybox-content')
            .css('position', 'absolute')
            .css('z-index', '1')
            .css('top', '0')
            .css('right', '0')
            .css('height', '50px')
            .css('width', '50px')
          window._loq.push(['tag', 'StartPersonalization']);
        },
        clickSlide: false,
        beforeClose: function (i, c, e) {
          c.$iframe[0].contentWindow.postMessage({ name: 'onBeforeClose' }, '*');
          var button = e ? e.target || e.currentTarget : null;
          if (button) return window.confirm('Your design will be lost, do you really want to close it ?');
          return true
        },
        afterClose: function () {
          jQuery('body')
            .css('position', '')
            .css('overflow-y', '')
        }
      })


      GlobalStyles.insertToHead('.fancybox-slide--iframe .fancybox-content', [
        ['max-width', '100%']
      ])


      function _getUrlParameter(sParam, pageUrl) {
        var sPageURL = window.location.search.substring(1)
        if (pageUrl) sPageURL = pageUrl
        var sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? null : decodeURIComponent(sParameterName[1]);
          }
        }
      }
    }
  }, 300);
  setTimeout(function () {
    clearInterval(waitingLoading)
  }, 10000)
});
