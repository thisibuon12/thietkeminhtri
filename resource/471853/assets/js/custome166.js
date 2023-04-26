(function($) {
    "use strict";

    jQuery(document).ready(function($) {

        //search
        $('.click-appear').click(function() {
            $(this).parent().toggleClass('active');
            $(this).children().toggleClass('icon-search').toggleClass('icon-cancel');
        });
        
        

        //Subscribe

        $("#subscribe").validate({
            submitHandler: function(form) {

                var email = $("#subscribe input.form-dky").val();
                if (email == "" || email == null) {
                    email = "admin@gmail.com";
                }
                $.ajax({
                        method: "post",
                        url: "/contact-ajax",
                        data: { email: email, action: "subscribe_email" }
                    })
                    .done(function(msg) {
                        alert("Đăng ký thành công!");
                        location.reload();
                    });
            }
        });
        $("#subscribe-f").validate({
            submitHandler: function(form) {

                var email = $("#subscribe-f input.form-dky").val();
                if (email == "" || email == null) {
                    email = "admin@gmail.com";
                }
                $.ajax({
                        method: "post",
                        url: "/contact-ajax",
                        data: { email: email, action: "subscribe_email" }
                    })
                    .done(function( msg ) {
        		    swal({
        		         title: "Đăng ký thành công",
                          text: "Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi những ưu đãi sớm nhất cho bạn!",
                          icon: "success",
                          button: "Đóng",
                          closeOnEsc: false
        		    })
        		    .then((value) => {
                        window.location.reload();
                    })
        	    }); 
            }
        });

        // lien he bao hanh
        $("#contact-fr").validate({
            submitHandler: function(form) {

                var full_name = $("#name").val();
                if (full_name == "" || full_name == null) {
                    full_name = "Admin";
                }
                // var email = $("#email").val();
                // if (email == "" || email == null) {
                //     email = "admin@gmail.com";
                // }
                var email = $("#email").val() || "khach"+Math.round(Math.random()*1234)+"@supertech.vn";
                var phone_number = $("#phone").val();
                if (phone_number == "" || phone_number == null) {
                    phone_number = "+84";
                }
                var content = "<p><strong>Chủ đề: </strong></p>" + $("#sub").val() + "<p>Nội dung: </p>" + $("#content").val();
                $.ajax({
                    method: "post",
                    url: "/contact-ajax",
                    data: { full_name: full_name, email: email, phone_number: phone_number, content: content, action: "feedback.add" }
                })
                .done(function( msg ) {
    		    swal({
    		         title: "Thành công",
                      text: "Cảm ơn quý khách đã liên hệ. Nhân viên chúng tôi sẽ liên lạc trong thời gian sớm nhất. Xin cảm ơn !",
                      icon: "success",
                      button: "Đóng",
                      closeOnEsc: false
    		    })
    		    .then((value) => {
                    window.location.reload();
                })
    	    });   
            }
        });

    });
    jQuery(document).ready(function() {
        jQuery('#rev_slider_4').show().revolution({
            dottedOverlay: 'none',
            delay: 5000,
            startwidth: 1920,
            startheight: 555,

            hideThumbs: 200,
            thumbWidth: 200,
            thumbHeight: 50,
            thumbAmount: 2,

            navigationType: 'thumb',
            navigationArrows: 'solo',
            navigationStyle: 'round',

            touchenabled: 'on',
            onHoverStop: 'on',

            swipe_velocity: 0.7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: false,

            spinner: 'spinner0',
            keyboardNavigation: 'off',

            navigationHAlign: 'center',
            navigationVAlign: 'bottom',
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: 'left',
            soloArrowLeftValign: 'center',
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: 'right',
            soloArrowRightValign: 'center',
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: 'on',
            fullScreen: 'off',

            stopLoop: 'off',
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: 'off',

            autoHeight: 'off',
            forceFullWidth: 'on',
            fullScreenAlignForce: 'off',
            minFullScreenHeight: 0,
            hideNavDelayOnMobile: 1500,

            hideThumbsOnMobile: 'off',
            hideBulletsOnMobile: 'off',
            hideArrowsOnMobile: 'off',
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0,
            fullScreenOffsetContainer: ''
        });
    });


    // sort

}(jQuery));

function formatMoney(roundToDecimalPlace, decimal, thousands) {
    var n = this,
        c = isNaN(roundToDecimalPlace = Math.abs(roundToDecimalPlace)) ? 0 : roundToDecimalPlace,
        d = decimal === undefined ? "." : decimal,
        t = thousands === undefined ? "," : thousands,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(2))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(2).slice(2) : "");
}

$(document).ready(function() {
    Number.prototype.formatMoney = formatMoney;
});
//sắp xếp  
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}


var name_last = ($.urlParam('name'));
if (name_last.length == null) {
    name_last_t = '';
} else {
    name_last_t = name_last;
}
$('#sortControl').change(function() {
    var pathname = window.location.origin + window.location.pathname;

    var query = "";

    var collection_id = $('.data-id-category').val();


    //
    var filler_type = $(this).find("option:selected").data('type');
    var filler = $(this).find("option:selected").data('filler');

    //
    if (pathname.indexOf(filler_type) != -1) {
        var value_para = GetURLParameter(filler_type);
        pathname = pathname.replace('&' + filler_type + '=' + value_para, '');
    }

    query += filler_type + "=" + filler; // origin
    if (pathname.indexOf('?') != -1) {
        pathname += '&' + query;

    } else {
        pathname += '?' + query;
    }

    window.history.pushState(null, null, pathname);
    var link = $('meta[name=current_link]').attr('content');
    var url_final = '/ajax-filter-html/' + pathname.substring(pathname.indexOf('?')) + '&name=' + name_last_t;
    loadResultBy(url_final, $(".product6-2"));

    // location.href = pathname;
    return false;
});

function loadResultBy(url_building, position_load) {
    var srt_pro = '';
    $.ajax({
        'url': url_building,
        'type': 'GET',
        beforeSend: function() {
            $("body").removeClass("loaded");
        },
        'success': function(response) {

            srt_pro += response;

            position_load.html(srt_pro);

        },
        'complete': function() {
            // setTimeout(function(){
            //   $("body").addClass("loaded");
            //  },1000);
        }
    });
}
//sắp xếp --- sort