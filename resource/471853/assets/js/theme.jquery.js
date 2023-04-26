var generate_html_header_cart = function (list_item) {
    var container_cart_product = $('.dropdown-cart-products');
    var container_cart_total = $('.dropdown-cart-total');
    var container_cart_action = $('.dropdown-cart-action');
    var html_cart_product = '';
    
    var total = 0;
    for (let i = 0; i < list_item.length; i++) {
        var item = list_item[i];
        var product_img = item.product_data.images;
        var item_image = (product_img.length > 0) ? SuperWeb.Utility.src_product(product_img[0]) : '/public/images/noimage.gif';
        var link = item.product_data.slug + '-' + item.id;
        total += parseFloat(item.price) * parseInt(item.quantity);
        html_cart_product += `<div class="product">
                            <div class="product-details">
                                <h4 class="product-title">
                                    <a href="/product/${ link }">${ item.name }</a>
                                </h4>

                                <span class="cart-product-info">
                            <span class="cart-product-qty"> ${item.quantity}</span> x ${SuperWeb.Utility.money(item.price)}
                        </span>
                            </div><!-- End .product-details -->

                            <figure class="product-image-container">
                                <a href="/product/${ link }" class="product-image">
                                    <img src="${item_image}" alt="product">
                                </a>
                                <a href="#" class="btn-remove cart-ajax" data-id="${item.id}" data-action="remove"  title="Xóa Sản Phẩm Này Khỏi Giỏ Hàng"><i class="icon-cancel"></i></a>
                            </figure>
                        </div>`;
    }
    $(container_cart_product).html(html_cart_product);
   if (list_item.length > 0) {
        $(container_cart_total).html(
            '<span>Tổng</span>' +
            '<span class="cart-total-price">' + SuperWeb.Utility.money(total) + '</span>'
        );
        $(container_cart_action).html(
            '<a href="/cart" class="btn">Giỏ Hàng</a>' +
            '<a href="/checkout" class="btn">Thanh Toán</a>'
        );
        $('span.cart-count').text(list_item.length) + 'sản phẩm';
    } else {
        $(container_cart_total).html('<span class="text-center">Giỏ hàng của bạn hiện đang trống</span>');
        $(container_cart_action).html('<a href="/collection" class="btn btn-block">Tiếp Tục Mua Hàng</a>');
         $('span.cart-count').text(list_item.length) + 'sản phẩm';
    }

};
var generate_html_table_cart = function (list_item) {
    var container_table_cart = $('div.cart-table-container table.table-cart tbody');
    var container_cart_total = $('div.cart-summary table.table-totals');
    var html_cart_product = '';

    var total = 0;
    for (let i = 0; i < list_item.length; i++) {
        var item = list_item[i];
        var product_img = item.product_data.images;
        var item_image = (product_img.length > 0) ? SuperWeb.Utility.src_product(product_img[0]) : '/public/images/noimage.gif';
        var link = item.product_data.slug + '-' + item.id;

        let option_html = '';
        let extra_price = 0;
        if (item.product_data['attribute_options'].length > 0) {
            item.product_data['attribute_options_index'] = item.product_data['attribute_options'].reduce(
                function (attribute_options_index, attribute) {
                    attribute['option'] = attribute['option'].reduce(function (options, option_item) {
                        options[option_item['value']] = option_item;
                        return options;
                    }, []);
                    attribute_options_index[attribute['code']] = attribute;
                    return attribute_options_index;
                }, []
            );
            item.product_data['attribute_options'].forEach((option, index) => {
                let option_id = item.product_data[option.code],
                    option_text = item.product_data['attribute_options_index'][option.code].option[option_id].text;
                option_html += '<span>' + option.label + ':' + option_text + '</span>';
            });
        }
        if (item.option.length > 0) {
            item.option.forEach((option, index) => {
                let extra_price_temp = 0,
                    value_text = '';
                if (typeof option.value[Symbol.iterator] === 'function') {
                    option.value.forEach((index, val) => {
                        extra_price_temp += (val.type_price === 'percent' ? ((val.extra_price / 100) * item_price) : val.extra_price);
                        value_text = value_text + val.text + (index !== (option.value.length - 1) ? ', ' : '');
                    });
                } else {
                    extra_price_temp += option.type_price === 'percent' ? ((option.extra_price / 100) * item.product_data.price) : option.extra_price;
                    value_text = option.text
                }
                extra_price += extra_price_temp;
                option_html += '<span>' + option.label + ':' + value_text + '</span>';
            });
        }

        let unit_price = item.price + extra_price;
        total += parseFloat(unit_price) * parseInt(item.quantity);
        html_cart_product += `<tr class="product-row">
                                <td class="product-col">
                                    <figure class="product-image-container">
                                        <a href="/product/${link}"
                                           class="product-image">
                                            <img src="${item_image}" alt="product">
                                        </a>
                                    </figure>
                                    <h2 class="product-title">
                                        <a href="/product">${item.name}</a>
                                    </h2>`;
        html_cart_product += option_html;
        html_cart_product += `</td>
                                <td>${SuperWeb.Utility.money(unit_price)}</td>
                                <td>
                                    <input value="${item.quantity}" class="vertical-quantity form-control qty_${item.id}"
                                           type="text">
                                </td>
                                <td>${SuperWeb.Utility.money(item.quantity * unit_price)}</td>
                            </tr>
                            <tr class="product-action-row">
                                <td colspan="4" class="clearfix">
                                    <div class="float-right">
                                        <a href="#" title="Edit product" class="btn-edit cart-ajax"
                                           data-id="${item.id}"
                                           data-action="update">
                                            <span class="sr-only">Cập nhật</span>
                                            <i class="icon-pencil"></i>
                                        </a>
                                        <a href="#" title="Remove product" class="btn-remove cart-ajax"
                                           data-id="${item.id}"
                                           data-action="remove">
                                            <span class="sr-only">Xóa</span>
                                        </a>
                                    </div>
                </td>
                </tr>`;
    }
    $(container_table_cart).html(html_cart_product);
    if (list_item.length > 0) {
        $(container_cart_total).html(`
             <tbody>
                        <tr>
                            <td>Tổng</td>
                            <td>${SuperWeb.Utility.money(total)}</td>
                        </tr>
                        <tr>
                            <td>Phí vận chuyển</td>
                            <td>${SuperWeb.Utility.money(0)}</td>
                        </tr>
                        <tr>
                            <td>Khuyến mãi</td>
                            <td>${SuperWeb.Utility.money(0)}</td>
                        </tr>

                        </tbody>
            <tfoot>
                        <tr>
                            <td>Thành tiền</td>
                            <td>${SuperWeb.Utility.money(total)}</td>
                        </tr>
                        </tfoot>`);
    } else {
        $(container_cart_total).html('<span class="text-center">Giỏ hàng của bạn hiện đang trống</span>');
    }
    // Quantity input - cart - product pages
    if ($.fn.TouchSpin) {
        // Vertical Quantity
        $('.vertical-quantity').TouchSpin({
            verticalbuttons: true,
            verticalup: '',
            verticaldown: '',
            verticalupclass: 'icon-up-dir',
            verticaldownclass: 'icon-down-dir',
            buttondown_class: 'btn btn-outline',
            buttonup_class: 'btn btn-outline',
            initval: 1,
            min: 1
        });

        // Horizontal Quantity
        $('.horizontal-quantity').TouchSpin({
            verticalbuttons: false,
            buttonup_txt: '',
            buttondown_txt: '',
            buttondown_class: 'btn btn-outline btn-down-icon',
            buttonup_class: 'btn btn-outline btn-up-icon',
            initval: 1,
            min: 1
        });
    }

};
var cart = new SuperWeb.ShoppingCart({
    btn_class: '.cart-ajax',
    add: {
        // beforeSend:function(btn_el){
        //     if($(btn_el).parents(".cart-item").find(".cart-item-thumb .ajaxOverlay").length > 0){
        //         $(btn_el).parents(".cart-item").find(".cart-item-thumb .ajaxOverlay").show()
        //     }else{
        //         if( $('body>.ajaxOverlay').length > 0 ){
        //             $('body>.ajaxOverlay:first').show();
        //         }else{
        //             $('body').append("<div class='ajaxOverlay'><i class='porto-loading-icon'></i></div>");
        //         }
        //     }
        // },
        success: function (result) {
            swal("Thành công!", "Đã thêm sản phẩm vào giỏ hàng thành công", "success");
            generate_html_header_cart(result);
            //generate_html_table_cart(result);
        },
        error:function () {
            swal("Thất bại!", "Oop!! Thêm sản phẩm vào giỏ hàng thất bại, vui lòng thử lại", "danger");
            $('.ajaxOverlay').hide();
        }
    },
    remove: {
        success: function (result) {
            swal("Thành công!", "Đã xóa sản phẩm ra khỏi giỏ hàng thành công", "success");
            generate_html_header_cart(result);
            generate_html_table_cart(result);
        },
        confirm: function () {
            return swal({
                title: "Bạn có chắc chắn?",
                text: "Muốn xóa sản phẩm này ra giỏ hàng!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
    },
    update: {
        success: function (result) {
            ("Thành công!", "Đã cập nhật phẩm trong giỏ hàng thành công", "success");
            generate_html_header_cart(result);
            generate_html_table_cart(result);
        }
    },
    destroy: {
        success: function (result) {
            swal("Thành công!", "Đã hủy giỏ hàng thành công", "success");
            generate_html_header_cart(result);
            generate_html_table_cart(result);
        },
        confirm: function () {
            return swal({
                title: "Bạn có chắc chắn?",
                text: "Muốn hủy giỏ hàng này!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
    }
});

$('ul.config-swatch-list li').click(function () {
   var container = $(this).parents('ul.config-swatch-list:first'),
        code = $(container).data('code'),
        value = $(this).data('value');
   $(container).find('li').removeClass('active');
   $(this).addClass('active');
   $('#attribute_option_'+code).val(value).change();
   return false;
});