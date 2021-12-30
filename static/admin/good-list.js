function bool_format(value, row, index) {
    var _val = null;
    _val = $.inArray(value, ['1', 1, true, 'true']) > 0 ? '是' : '否';
    return _val || value;
}

function get_category_by_id(c_id, ret_obj) {
    var ret = null;
    var cl = GLOBAL.category_list;
    for (var i = 0; i < cl.length; i++) {
        if(cl[i].id == c_id) {
            ret = !!ret_obj ? cl[i] : cl[i].name;
            break;
        }
    }
    return ret || c_id;
}

function get_good_by_id(d_id) {
    var ret = null;
    var dl = $('#tb-goods').data('bootstrap.table').data;
    for (var i = 0; i < dl.length; i++) {
        if(dl[i].id == d_id) {
            ret = dl[i];
            break;
        }
    }
    return ret;
}

function good_detail(good_id) {
    if(good_id) {
        var good_item = get_good_by_id(good_id);
        popup_good('商品详情', good_item);
    }
}

function build_line(item_name, item_html, tip_style) {
    if(!tip_style) {
        tip_style = '';
    }
    tip_style += 'display: inline-block;';
    return [
        '<div class="form-line">',
            '<span style="', tip_style, '">',
                '<label class="line-tip">', item_name, '</label>: ',
            '</span>',
            item_html,
        '</div>'
    ].join('');
}

function build_on_sale(sale_val) {
    return [
        '<label>',
            '<input type="radio" name="rdo-on-sale" value="1" ', (sale_val == '1' ? 'checked="checked"' : ''), ' />是',
        '</label>',
        '&nbsp;&nbsp;',
        '<label>',
            '<input type="radio" name="rdo-on-sale" value="0" ', (sale_val == '0' ? 'checked="checked"' : ''), ' />否',
        '</label>',
    ].join('');
}

function build_is_hot(hot_val) {
    return [
        '<label>',
            '<input type="radio" name="rdo-is-hot" value="1" ', (hot_val == '1' ? 'checked="checked"' : ''), ' />是',
        '</label>',
        '&nbsp;&nbsp;',
        '<label>',
            '<input type="radio" name="rdo-is-hot" value="0" ', (hot_val == '0' ? 'checked="checked"' : ''), ' />否',
        '</label>',
    ].join('');
}

function build_category(selected_val) {
    var cl = GLOBAL.category_list;
    var htmls = [
        '<select name="sel-category" ', (!!selected_val ? 'disabled="disabled"' : ''), '>',
            '<option value="" ', (!selected_val ? 'selected="selected"' : ''), '>--请选择--</option>'
    ];
    for(var i = 0; i < cl.length; i++) {
        var selected_attr = cl[i].id == selected_val ? 'selected="selected"' : '';
        htmls.push([
            '<option value="', cl[i].id, '" ', selected_attr, '>',
                cl[i].name,
            '</option>'
        ].join(''))
    }
    htmls.push('</select>');
    return htmls.join('');
}

function build_package_group(good_item, is_new) {
    var htmls = [
        '<div name="panel-package-group" style="max-width: 72%; display: inline-block; width: 100%;">'
    ];
    if(!is_new) {
        var category_obj = get_category_by_id(good_item.category_id, true);
        // console.log(category_obj, good_item);
        if(category_obj.package_style == 'smb') {
            htmls.push(build_package_smb(good_item));
        }
        else if(category_obj.package_style == 'one') {
            htmls.push(build_package_one(false));
        }
    }
    else {
        htmls.push('<span class="text-muted">请先选择<strong>分类</strong></span>');
    }
    htmls.push('</div>');
    return htmls.join('');
}

function build_package_smb(good_item) {
    if(!good_item) {
        good_item = {
            price_small: '',
            detail_small: '',
            price_middle: '',
            detail_middle: '',
            price_big: '',
            detail_big: ''
        };
    }
    var htmls = [
        '<label>',
            '水果: <input name="txt-fruit" type="text" style="max-width: 7.2em;" />',
        '</label>',
        '<label>',
            '单位: ', build_select_unit('sel-unit'),
        '</label>'
    ];
    htmls.push([
        '<table width="100%" class="table table-bordered">',
            '<thead>',
                '<tr>',
                    '<th style="width: 3.6em;">份量</th>',
                    '<th style="width: 5em;">定价</th>',
                    '<th style="width: 5em;">数量</th>',
                    '<th>描述</th>',
                '</tr>',
            '</thead>',
            '<tbody>',
                '<tr class="tr-small">',
                    '<td>小份</td>',
                    '<td>',
                        '<input type="text" name="txt-price-small" value="', good_item.price_small, '" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        '<input type="text" name="txt-package-small" value="" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        '<textarea rows="1" name="txt-detail-small" style="width: 100%;">', good_item.detail_small, '</textarea>',
                    '</td>',
                '</tr>',
                '<tr class="tr-middle">',
                    '<td>中份</td>',
                    '<td>',
                        '<input type="text" name="txt-price-middle" value="', good_item.price_middle, '" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        '<input type="text" name="txt-package-middle" value="" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        '<textarea rows="1" name="txt-detail-middle" style="width: 100%;">', good_item.detail_middle, '</textarea>',
                    '</td>',
                '</tr>',
                '<tr class="tr-big">',
                    '<td>大份</td>',
                    '<td>',
                        '<input type="text" name="txt-price-big" value="', good_item.price_big, '" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        '<input type="text" name="txt-package-big" value="" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        '<textarea rows="1" name="txt-detail-big" style="width: 100%;">', good_item.detail_big, '</textarea>',
                    '</td>',
                '</tr>',
            '</tbody>',
        '</table>'
    ].join(''));
    return htmls.join('');
}

function build_package_one(is_new) {
    var _body = [
        '<tr class="tr-empty">',
            '<td colspan="4" class="text-center">',
                '<span class="text-muted">数据加载中...</span>',
            '</td>',
        '</tr>'
    ].join('');
    if(is_new) {
        _body = build_empty_unit_one(false);
    }
    return [
        '<div class="package-one-panel">',
            '<table width="100%" class="table table-bordered">',
                '<thead>',
                    '<tr>',
                        '<th style="min-width: 8em;">水果</th>',
                        '<th style="min-width: 4em; max-width: 6em;">数量</th>',
                        '<th style="min-width: 6em;">单位</th>',
                        '<th style="min-width: 5em;">操作</th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    _body,
                '</tbody>',
            '</table>',
        '</div>'
    ].join('');
}

function build_good_image(pic_url_1, pic_url_2, pic_url_3, pic_url_0) {
    var img_1 = !!pic_url_1 ? (IMAGE_BASE + pic_url_1 ) : GLOBAL.default_image,
        img_2 = !!pic_url_2 ? (IMAGE_BASE + pic_url_2 ) : GLOBAL.default_image,
        img_3 = !!pic_url_3 ? (IMAGE_BASE + pic_url_3 ) : GLOBAL.default_image,
        img_0 = !!pic_url_0 ? (IMAGE_BASE + pic_url_0 ) : GLOBAL.default_image;
    return [
        '<div class="form-line images-line">',
            '<div class="img-wrapper" data-which="pic_1">',
                '<label>轮播图-1</label>',
                '<img src="', img_1, '" class="img-style" />',
            '</div>',
            '<div class="img-wrapper" data-which="pic_2">',
                '<label>轮播图-2</label>',
                '<img src="', img_2, '" class="img-style" />',
            '</div>',
            '<div class="img-wrapper" data-which="pic_3">',
                '<label>轮播图-3</label>',
                '<img src="', img_3, '" class="img-style" />',
            '</div>',
            '<div class="img-wrapper" data-which="pic_0">',
                '<label>介绍图</label>',
                '<img src="', img_0, '" class="img-style" />',
            '</div>',
        '</div>'
    ].join('');
}

function collect_submit_info(good_item) {
    var $form = $('.bootbox .bootbox-body .box-form-wrapper');
    var is_new = true;
    var _ret = {};
    if(!!good_item.id) {
        is_new = false;
        _ret['id'] = good_item.id;
    }
    var _name = $form.find('input[name="txt-name"]').val();
    if(!_name || _name.length < 1) {
        alert('[名称]必填');
        return null;
    }
    _ret['name'] = _name;
    var _on_sale = $form.find('input[name="rdo-on-sale"]:checked').val();
    _ret['on_sale'] = _on_sale;
    var _category = $form.find('select[name="sel-category"]').val();
    var category_obj = get_category_by_id(_category, true);
    var _package_unit = null;
    if(category_obj.package_style == 'smb') {
        var _fruit = $form.find('input[name="txt-fruit"]').val(),
            _unit = $form.find('select[name="sel-unit"]').val();
        _package_unit = {
            'style': 'smb',
            'fruit': _fruit,
            'unit': _unit,
            'packages': []
        };
        var _s_price = $form.find('input[name="txt-price-small"]').val(),
            _s_package = $form.find('input[name="txt-package-small"]').val(),
            _s_detail = $form.find('textarea[name="txt-detail-small"]').val();
        var _s_item = {
            'size': 'small',
            'price': _s_price,
            'amount': _s_package,
            'detail': _s_detail
        };
        if(!is_new) {
            _s_item['id'] = $form.find('input[name="txt-package-small"]').attr('data-id');
        }
        _package_unit['packages'].push(_s_item);
        var _m_price = $form.find('input[name="txt-price-middle"]').val(),
            _m_package = $form.find('input[name="txt-package-middle"]').val(),
            _m_detail = $form.find('textarea[name="txt-detail-middle"]').val();
        var _m_item = {
            'size': 'middle',
            'price': _m_price,
            'amount': _m_package,
            'detail': _m_detail
        };
        if(!is_new) {
            _m_item['id'] = $form.find('input[name="txt-package-middle"]').attr('data-id');
        }
        _package_unit['packages'].push(_m_item);
        var _b_price = $form.find('input[name="txt-price-big"]').val(),
            _b_package = $form.find('input[name="txt-package-big"]').val(),
            _b_detail = $form.find('textarea[name="txt-detail-big"]').val();
        var _b_item = {
            'size': 'big',
            'price': _b_price,
            'amount': _b_package,
            'detail': _b_detail
        };
        if(!is_new) {
            _b_item['id'] = $form.find('input[name="txt-package-big"]').attr('data-id');
        }
        _package_unit['packages'].push(_b_item);
    }
    else if(category_obj.package_style == 'one') {
        _package_unit = {
            'style': 'one',
            'packages': []
        };
        $form.find('tr.tr-one-unit').each(function(_i, _tr) {
            var $_tr = $(_tr);
            var _fruit = $_tr.find('input[name="txt-one-fruit"]').val(),
                _amount = $_tr.find('input[name="txt-one-amount"]').val(),
                _unit = $_tr.find('select[name="sel-one-unit"]').val();
            var is_ok = !!_fruit && _fruit.length > 0 && !!_amount && _amount.length > 0;
            if(!is_ok) {
                // continue, 跳过空行
                return true;
            }
            var _p_item = {
                'fruit': _fruit,
                'amount': _amount,
                'unit': _unit
            };
            if(!is_new) {
                _p_item['id'] = $_tr.attr('data-id');
            }
            _package_unit['packages'].push(_p_item);
        });
        var $_add_tr = $form.find('tr.tr-add-unit');
        var _add_tr_fruit = $_add_tr.find('input[name="txt-one-fruit"]').val(),
            _add_tr_amount = $_add_tr.find('input[name="txt-one-amount"]').val(),
            _add_tr_unit = $_add_tr.find('select[name="sel-one-unit"]').val();
        var is_add_ok = !!_add_tr_fruit && _add_tr_fruit.length > 0 && !!_add_tr_amount && _add_tr_amount.length > 0;
        if(is_add_ok) {
            _package_unit['packages'].push({
                'fruit': _add_tr_fruit,
                'amount': _add_tr_amount,
                'unit': _add_tr_unit
            });
        }
    }
    else {
        alert('[分类]必填');
        return null;
    }
    _ret['category'] = _category;
    _ret['package_unit'] = _package_unit;
    var _advertising = $form.find('input[name="txt-advertising"]').val();
    _ret['advertising'] = _advertising;
    var _price_sell = $form.find('input[name="txt-price-sell"]').val();
    if(!_price_sell || _price_sell.length < 1) {
        alert('[售价]必填');
        return null;
    }
    _ret['price_sell'] = _price_sell;
    var _is_hot = $form.find('input[name="rdo-is-hot"]:checked').val();
    _ret['is_hot'] = _is_hot;
    var $pics = $form.find('.images-line').find('.img-wrapper[data-file]');
    $pics.each(function(_i, _pic) {
        var $_pic = $(_pic);
        _ret[$_pic.attr('data-which')] = $_pic.attr('data-file');
    });

    return _ret;
}

/**
 * 弹出商品信息编辑对话框
 * @param  {String} box_title 对话框标题
 * @param  {Object} good_item 商品信息
 */
function popup_good(box_title, good_item) {
    var is_new = false;
    if(!good_item) {
        is_new = true;
        good_item = {
            name: '',
            on_sale: 0,
            price_sell: '',
            category_id: null,
            advertising: '',
            is_hot: 0,
            pic_url_0: '',
            pic_url_1: '',
            pic_url_2: '',
            pic_url_3: ''
        };
    }
    // console.log(good_item);
    var htmls = [
        '<div class="box-form-wrapper">'
    ];
    htmls.push(build_line(
        '名称',
        '<input type="text" name="txt-name" value="' + good_item.name + '" />'
    ));
    htmls.push(build_line(
        '分类',
        build_category(good_item.category_id)
    ));
    htmls.push(build_line(
        '上架',
        build_on_sale(good_item.on_sale)
    ));
    htmls.push(build_line(
        '售价',
        '<input type="text" name="txt-price-sell" value="' + good_item.price_sell + '" />'
    ));
    htmls.push(build_line(
        '广告语',
        '<input style="min-width: 72%;" type="text" name="txt-advertising" value="' + good_item.advertising + '" />'
    ));
    htmls.push(build_line(
        '热销',
        build_is_hot(good_item.is_hot)
    ));
    htmls.push(build_line(
        '分装组合',
        build_package_group(good_item, is_new),
        'vertical-align: top;'
    ));
    htmls.push(build_good_image(
        good_item.pic_url_1,
        good_item.pic_url_2,
        good_item.pic_url_3,
        good_item.pic_url_0
    ));
    htmls.push('</div>');
    htmls.push([
        '<div class="popup-tip-msg">',
            '注意: 操作完成后，请手动点击 [提交] 按钮',
        '</div>'
    ].join(''));
    // http://bootboxjs.com/documentation.html
    bootbox.setLocale('zh_CN');
    var dialog = bootbox.dialog({
        title: box_title,
        message: htmls.join(''),
        show: true,
        backdrop: undefined,
        closeButton: true,
        onEscape: false,
        size: 'large',
        className: "my-modal",
        buttons: {
            submit: {
                label: '提交',
                className: 'btn-primary',
                callback: function() {
                    console.log(good_item);
                    var _data = collect_submit_info(good_item);
                    if(!!_data) {
                        submit_good_request(_data);
                        return true;
                    }
                    console.log(_data)
                    return false;
                }
            },
            close: {
                label: '取消',
                className: 'btn-primary',
                callback: function() {
                    return true;
                }
            }
        },
        callback: function(result) {
            return true;
        }
    });
    dialog.init(function(){
        setTimeout(function(){
            var $box_body = dialog.find('.bootbox-body');
            var $box_view = $box_body.closest('.modal-dialog');
            $box_body.find('.images-line').on('click', 'img', function(e) {
                var $img = $(e.target);
                var which = $img.closest('.img-wrapper').attr('data-which');
                console.log(which);
                $('#uploader-wrapper').attr('data-img-which', which).css('visibility', 'visible');
                $(document.body).addClass('uploading');
            });
            if(!is_new) {
                load_good_units(good_item.id);
            }
            // var $blocks = $box_body.find('.line-block-wrapper');
            // $box_view.css('width', w);
            // $box_view.css('margin-left', '7px');
            setTimeout(function() {
                dialog.scrollTop(0);
            }, 500);
        }, 80);
    });
}

/**
 * 提交商品信息
 * @param  {Object} good_data 商品信息
 */
function submit_good_request(good_data) {
    $.ajax({
        url: GOOD_SAVE_AJAX,
        type: 'POST',
        data: {
            good_data: JSON.stringify(good_data)
        },
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        if(data.error == 0) {
            $('#tb-goods').bootstrapTable('refresh');
        }
        else {
            alert(data.desc);
        }
    }).fail(function(e) {
        console.error(e);
        alert(e.responseText)
    });
}

/**
 * 加载商品分装信息
 * @param  {Integer} good_id 商品ID
 */
function load_good_units(good_id) {
    $.ajax({
        url: GOOD_UNITS_AJAX,
        type: 'POST',
        data: {
            good_id: good_id
        },
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        show_good_units(data.data);
    }).fail(function(e) {
        console.error(e);
    });
}

/**
 * 显示商品分装信息
 * @param  {Array} good_units 商品分装信息数据
 */
function show_good_units(good_units) {
    var $package_panel = $('[name="panel-package-group"]');
    var $txt_fruit = $package_panel.find('input[name="txt-fruit"]'),
        $sel_unit = $package_panel.find('select[name="sel-unit"]');
    if($txt_fruit.length > 0 && $sel_unit.length > 0) {
        $txt_fruit.val(good_units[0].name);
        $sel_unit.val(good_units[0].unit_name);
        var $txt_small = $package_panel.find('input[name="txt-package-small"]'),
            $txt_middle = $package_panel.find('input[name="txt-package-middle"]'),
            $txt_big = $package_panel.find('input[name="txt-package-big"]');
        for(var i = 0; i < good_units.length; i++) {
            if(good_units[i].size == 0) {
                $txt_small.val(good_units[i].amount);
                $txt_small.attr('data-id', good_units[i].id);
            }
            else if(good_units[i].size == 1) {
                $txt_middle.val(good_units[i].amount);
                $txt_middle.attr('data-id', good_units[i].id);
            }
            else if(good_units[i].size == 2) {
                $txt_big.val(good_units[i].amount);
                $txt_big.attr('data-id', good_units[i].id);
            }
        }
    }
    else {
        var $one_panel = $package_panel.find('.package-one-panel');
        var $tbody = $one_panel.find('table tbody');
        $tbody.empty();
        for(var i = 0; i < good_units.length; i++) {
            $tbody.append([
                '<tr class="tr-one-unit" data-id="', good_units[i].id, '">',
                    '<td>',
                        '<input type="text" name="txt-one-fruit" value="', good_units[i].name, '" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        '<input type="text" name="txt-one-amount" value="', good_units[i].amount, '" style="width: 100%;" />',
                    '</td>',
                    '<td>',
                        build_select_unit('sel-one-unit'),
                    '</td>',
                    '<td>',
                        '<button type="button" name="btn-unit-delete">删除</button>',
                    '</td>',
                '</tr>',
            ].join(''));
            var $sel_one_unit = $tbody.find('tr[data-id="' + good_units[i].id + '"]').find('[name="sel-one-unit"]');
            $sel_one_unit.val(good_units[i].unit_name);
        }
        $tbody.append(build_empty_unit_one(false));
    }
}

function build_select_unit(sel_name) {
    return [
        '<select name="', sel_name, '">',
            '<option value="克">克</option>',
            '<option value="斤">斤</option>',
            '<option value="千克">千克</option>',
            '<option value="个">个</option>',
            '<option value="根">根</option>',
        '</select>'
    ].join('');
}

function build_empty_unit_one(is_new_line) {
    var attr_name = 'btn-unit-add',
        text_name = '添加',
        tr_class = 'tr-add-unit';
    if(is_new_line) {
        attr_name = 'btn-unit-delete';
        text_name = '删除',
        tr_class = 'tr-one-unit';
    }
    return [
        '<tr class="', tr_class, '">',
            '<td>',
                '<input type="text" name="txt-one-fruit" value="" style="width: 100%;" />',
            '</td>',
            '<td>',
                '<input type="text" name="txt-one-amount" value="" style="width: 100%;" />',
            '</td>',
            '<td>',
                build_select_unit('sel-one-unit'),
            '</td>',
            '<td>',
                '<button type="button" name="', attr_name, '">', text_name, '</button>',
            '</td>',
        '</tr>',
    ].join('');
}

function url2random(url) {
    var ch_sp = '&',
        rand = (Math.random() * (new Date()).getTime()).toFixed(12).toString().replace('.', '');
    if(url.indexOf('?') < 0) {
        ch_sp = '?';
    }
    return url + ch_sp + '_t=' + rand;
}

function bind_event_in_popup() {
    $(document.body).on('click', '.box-form-wrapper .package-one-panel [name="btn-unit-delete"]', function(e) {
        var $elem = $(e.target);
        var $tr = $elem.closest('tr.tr-one-unit');
        var data_id = $tr.attr('data-id');
        if(data_id && $tr.attr('data-id').length > 0) {
            if(!confirm('确定要删除吗?')) {
                return;
            }
        }
        $tr.remove();
        console.log($tr);
    });

    $(document.body).on('click', '.box-form-wrapper .package-one-panel [name="btn-unit-add"]', function(e) {
        var $elem = $(e.target);
        var $tbody = $elem.closest('tbody'),
            $tr = $elem.closest('tr.tr-add-unit');
        $tr.before(build_empty_unit_one(true));
        console.log($tbody);
    });

    $(document.body).on('click', '.box-form-wrapper select[name="sel-category"]', function(e) {
        var $elem = $(e.target);
        var val = $elem.val();
        var $package_panel = $(document.body).find('.box-form-wrapper [name="panel-package-group"]');
        $package_panel.empty();
        if(val && val.length > 0) {
            var category_obj = get_category_by_id(val, true);
            if(category_obj.package_style == 'smb') {
                $package_panel.append(build_package_smb());
            }
            else if(category_obj.package_style == 'one') {
                $package_panel.append(build_package_one(true));
            }
        }
        else {
            $package_panel.html('<span class="text-muted">请先选择<strong>分类</strong></span>');
        }
        console.log($elem);
    });
}

$(document).ready(function() {
    $('#tb-goods').bootstrapTable({
        locales:'zh-CN',
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true, //是否显示行间隔色
        cache: true, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（）
        pagination: true, //是否显示分页（）
        sortable: true, //是否启用排序
        sortOrder: "asc", //排序方式
        // queryParams: that.queryParams, //传递参数（）
        // queryParamsType: "limit",
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 100, //每页的记录行数（）
        pageList: [100], //可供选择的每页的行数（）
        search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true, //是否显示所有的列
        showRefresh: true, //是否显示刷新按钮
        minimumCountColumns: 1, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        // height: 700, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id", //每一行的唯一标识，一般为主键列
        showToggle: true, //是否显示详细视图和列表视图的切换按钮
        cardView: false, //是否显示详细视图
        detailView: false, //是否显示父子表
        showLoading:true,
        columns: [
            {
                field: 'id',
                title: '#ID'
            }, {
                field: 'name',
                title: '名称'
            }, {
                field: 'on_sale',
                title: '上架',
                formatter: bool_format
            }, {
                field: 'price_sell',
                title: '售价'
            }, /*{
                field: 'detail_big',
                title: '大份描述'
            }, {
                field: 'price_big',
                title: '大份价格'
            }, {
                field: 'detail_middle',
                title: '中份描述'
            }, {
                field: 'price_middle',
                title: '中份价格'
            }, {
                field: 'detail_small',
                title: '小份描述'
            }, {
                field: 'price_small',
                title: '小份价格'
            }, {
                field: 'pic_url_1',
                title: '轮播-1'
            }, {
                field: 'pic_url_2',
                title: '轮播-2'
            }, {
                field: 'pic_url_3',
                title: '轮播-3'
            }, {
                field: 'pic_url_0',
                title: '介绍图'
            }, */{
                field: 'advertising',
                title: '广告语'
            }, {
                field: 'is_hot',
                title: '热销',
                formatter: bool_format
            }, {
                field: 'category_id',
                title: '分类',
                formatter: function(value, row, index) {
                    return get_category_by_id(value);
                }
            }, {
                title: '详情',
                formatter: function(value, row, index) {
                    // console.log(row);
                    return ['<a href="javascript:good_detail(', row.id, ');">查看</a>'].join('');
                }
            }
        ],
        ajax: function(params) {
            $.ajax({
                url: DT_ajax,
                type: 'POST',
                data: {},
                dataType: 'json'
            }).done(function(res) {
                console.log(res)
                console.log(params)
                var _data = {
                    rows: res.rows,
                    total: res.total
                };
                params.success(_data);
                // that.trigger('load-success', _data);
            }).fail(function(e) {
                console.error(e);
                params.error(e);
            });
        }
    });

    $('#btn-add').on('click', function() {
        popup_good('添加商品');
    });

    var uploader = new qq.FineUploader({
        debug: true,
        element: $('#uploader-wrapper .uploader-ui').get(0),
        template: 'qq-template',
        multiple: false,
        request: {
            endpoint: GLOBAL.UPLOAD_URL,
            // filenameParam: 'qqfilename',
            // inputName: 'qqfile',
            // uuidName: 'qquuid',
            // totalFileSizeName: 'qqtotalfilesize',
            forceMultipart: true,
            params: {},
            paramsInBody: true
        },
        callbacks: {
            onValidate: function(data, buttonContainer) {
                var ext = data.name.split('.')[1].toLowerCase();
                var formats = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg'];
                if($.inArray(ext, formats) < 0) {
                    alert('只允许上传 ' + formats.join('、') + ' 格式的图片');
                    return false;
                }
            },
            onUpload: function(id, name) {
                console.log(this)
            },
            onComplete: function(id, name, responseJSON, xhr) {
                // console.log(id, name, responseJSON, xhr)
                // console.log(arguments)
                var img_which = $('#uploader-wrapper').attr('data-img-which');
                var $img_wrapper = $('.images-line .img-wrapper[data-which="' + img_which + '"]');
                $img_wrapper.attr('data-file', responseJSON.file);
                $img_wrapper.find('img').attr('src', url2random(responseJSON.src));
                $('#uploader-wrapper .uploader-closer .btn-close').trigger('click');
            }
        },
        chunking: {
            enabled: false
        },
        resume: {
            enabled: true
        },
        retry: {
            enableAuto: true,
            showButton: true
        }
    });

    $('#uploader-wrapper .uploader-closer').on('click', '.btn-close', function() {
        $('#uploader-wrapper').css('visibility', 'hidden').removeAttr('data-img-which');
        $(document.body).removeClass('uploading');
    });

    bind_event_in_popup();
});