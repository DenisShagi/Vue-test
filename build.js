// строит 

//
;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS для Browserify
		module.exports = factory;
	} else {
		// Используя глобальные переменные браузера
		factory(jQuery);
	}
}(function ($, undefined) {
	'use script';
	// код плагина
//
    $.MnemoObject = function (options) {
        var op = $.extend({}, options);
        return {
            html: function () {
                var html = [];
                return html.join('');
            }
        }
    };
	//
	$.MnemoImage = function (options) {
		var op = $.extend({}, options);
		return {
			val: function (_src) {
				var el = this.owner.getElementByInd(this.ind);
				if (el) {
					if (el.src != _img) el.src = _img;
				}
			},
			html: function () {
				var html = [];
				if(op.url) html.push('<a target="_blank" href="', op.url, '">');
				if (op.paint_mode === 2) html.push('<div');
				else html.push('<img');
				html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
				html.push(' class="ui-mnemo-object ui-mnemo-img');
                if (op.shop || op.section || op.node) html.push(' hide');
                html.push('"');
				if(op.tooltip) html.push(' title="', op.tooltip, '"');
				if(op.image !== null && op.paint_mode !== 2){
					if(op.image.charAt(0) == '/') html.push(' src="',op.image,'"');
					else html.push(' src="',app.root,'conf/themes/silver/',op.image,'"');
				}
				html.push(' style="');
				if(op.y) html.push('top:', op.y, 'px;');
				if(op.x) html.push('left:', op.x, 'px;');
				if(op.paint_mode !== 0) { //!!!
					if(op.width) html.push('width:', op.width, 'px;');
					if(op.height) html.push('height:', op.height, 'px;');
				}
				if(op.image !== null && op.paint_mode === 2)
					html.push('background-image:url(',app.root,'conf/themes/silver/', op.image, ');');
				html.push('"');
				if (op.paint_mode === 2) html.push('></div>');
				else html.push(' />');
				//
				if(op.href) html.push('</a>');
				return html.join('');
			}
		}
	};
	//
	$.MnemoText = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {// alert(JSON.stringify(op));
                var html = [];
	            html.push('<table');
	            html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
	            html.push(' class="ui-mnemo-object ui-mnemo-text');
				//
				if (op.orientation === 0) html.push('');
				else if (op.orientation === 1) html.push(' wm');
                html.push('"');
                if (op.tooltip) html.push(' title="', op.tooltip, '"');
                html.push(' style="');
                if (op.y)html.push('top:', op.y, 'px;');
                if (op.x)html.push('left:', op.x, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
				//
				if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
				if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
				//
				if (op.border_style === 0) html.push('');
				else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
				else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
				else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
				//
				if (op.background_color) html.push('background-color:',op.background_color,';');
                if (op.opacity) html.push('filter: alpha(opacity=',op.opacity,');');
                //if (op.opacity) html.push('opacity:',op.opacity,';');
                //
                html.push('"');
				html.push('><tr><td');
				html.push(' class="');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
                html.push('"');
				html.push('>');
                if (op.url) html.push('<a href="', op.url, '">');//target="_blank"
                if (op.text) html.push(op.text);
                if (op.url) html.push('</a>');
                html.push('</td></tr></table>');
                //alert(html.join(''));
                return html.join('');
            }
        }
    };
    //
    $.MnemoWidget = function (options) {
        var op = $.extend({}, options);
        var _id = "ui-mnemo-"+op.mnemo+"-object-"+op.object;
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {// alert(JSON.stringify(op));
                var html = [];
                html.push('<div');
                html.push(' id="',_id,'"');
                html.push(' class="ui-mnemo-object ui-mnemo-widget"');
                if (op.tooltip) html.push(' title="', op.tooltip, '"');
                //
                html.push(' style="');
                if (op.y)html.push('top:', op.y, 'px;');
                if (op.x)html.push('left:', op.x, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
                if (op.background_color) html.push('background-color:',op.background_color,';');
                html.push('"');
                //
                html.push('>');
                if(op.edit) html.push('W', op.widget_id);
                html.push('</div>');
                html.push('<script type="text/javascript">');
                html.push('$.ajax({url:"/api/widget/',op.widget_id,'/render/',op.date,'",');
                html.push('success: function(data){if(!data.errcode){ $("#',_id,'").html(data);}},');
                html.push('error: function (xhr, status) { console.debug("ERROR HTTP: /api/widget/render/',op.widget_id,' " + status); }');
                html.push('});');
                html.push('</script>');
                return html.join('');
            }
        }
    };
    //
    $.MnemoBlock = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {
                var html = [];
                html.push('<table');
                html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
                html.push(' class="ui-mnemo-object ui-mnemo-text');
                //
                if (op.orientation === 0) html.push('');
                else if (op.orientation === 1) html.push(' wm');
                html.push('"');
                if (op.tooltip) html.push(' title="', op.tooltip, '"');
                html.push(' style="');
                if (op.y)html.push('top:', op.y, 'px;');
                if (op.x)html.push('left:', op.x, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
                //
                if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
                if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
                //
                if (op.border_style === 0) html.push('');
                else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
                else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
                else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
                //
                if (op.background_color) html.push('background-color:',op.background_color,';');
                html.push('"');
                html.push('><tr><td');
                html.push(' class="');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
                html.push('"');
                html.push('>');
                if (op.url) html.push('<a href="', op.url, '">');//target="_blank"
                if (op.text) html.push(op.text);
                if (op.url) html.push('</a>');
                html.push('</td></tr></table>');
                return html.join('');
            }
        }
    };
    //
	$.MnemoPosition = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {
				var html = [];
				html.push('<table');
				html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
				html.push(' class="ui-mnemo-object ui-mnemo-position');
                //
                if(op.position_id){
                    if (op.position_type === 0)
                        html.push(' ui-mnemo-position-'+op.position_id);
                    else if (op.position_type === 1 || op.position_type === 2 || op.position_type === 3)
                        html.push(' ui-mnemo-value-'+op.position_id);
                }
				//
				if (op.orientation === 0) html.push('');
				else if (op.orientation === 1) html.push(' wm');
				html.push('"');
				if (op.tooltip) html.push(' title="', op.tooltip, '"');
				html.push(' style="');
				if (op.y)html.push('top:', op.y, 'px;');
				if (op.x)html.push('left:', op.x, 'px;');
				if (op.width)html.push('width:', op.width, 'px;');
				if (op.height)html.push('height:', op.height, 'px;');
				//
				if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
				//
				if (op.border_style === 0) html.push('');
				else if (op.border_style === 1) html.push('border: 1px solid silver;');
				else if (op.border_style === 2) html.push('border: 1px dotted silver;');
				else if (op.border_style === 3) html.push('border: 1px dashed silver;');
				//
                if (op.background_color) html.push('background-color:',op.background_color,';');
				html.push('"');
				html.push('><tr><td');
				html.push(' class="');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
				html.push('"');
				html.push('>');
				if(op.edit){
					if (op.position_type === 0) html.push('P');
					else if (op.position_type === 1) html.push('V');
					else if (op.position_type === 2) html.push('F');
					else if (op.position_type === 3) html.push('L');
					if(op.position_id) html.push(op.position_id);
				}
				html.push('</td></tr></table>');
				return html.join('');
            }
        }
    };
	//
	$.MnemoLevel = function (options) {
        var op = $.extend({}, options);
        return {
            html: function () {
                var html = [];
	            html.push('<div');
	            html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
	            html.push(' class="ui-mnemo-object');
                if(op.level_type == 1){
                    html.push(' ui-mnemo-diagram-s');
                }else if(op.level_type == 2){
                    html.push(' ui-mnemo-diagram-h');
                }else if(op.level_type == 3){
                    html.push(' ui-mnemo-diagram-v');
                }else{
                    html.push(' ui-mnemo-diagram');
                }
                if(op.position_id){
                    html.push(' ui-mnemo-level-'+op.position_id);
                }
                html.push('"');
                if (op.tooltip) html.push(' title="', op.tooltip, '"');
				html.push(' style="');
				if(op.y)html.push('top:', op.y, 'px;');
				if(op.x)html.push('left:', op.x, 'px;');
				if(op.width)html.push('width:', op.width, 'px;');
				if(op.height)html.push('height:', op.height, 'px;');
                if(op.level_radius)html.push('border-radius:', op.level_radius, ';');
                html.push('"');
                html.push('>');
                html.push('<div>');
                html.push('</div>');
                html.push('</div>');
                return html.join('');
            }
        }
    };
	//
	$.MnemoAnalysis = function (options) {
		var op = $.extend({}, options);
		return {
			val: function (_html) {
				var el = this.owner.getElementByInd(this.ind);
				if (el) el.innerHTML = _html;
			},
			html: function () {
				var html = [];
				html.push('<table');
				html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
				html.push(' class="ui-mnemo-object ui-mnemo-analysis');
                html.push(' ui-mnemo-analysis-'+op.analysis_points.split(',').join('_'));
				if (op.orientation === 0) html.push('');
				else if (op.orientation === 1) html.push(' wm');
				html.push('"');
				if (op.tooltip) html.push(' title="', op.tooltip, '"');
				html.push(' style="');
				if (op.y)html.push('top:', op.y, 'px;');
				if (op.x)html.push('left:', op.x, 'px;');
				if (op.width)html.push('width:', op.width, 'px;');
				if (op.height)html.push('height:', op.height, 'px;');
				//
				if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
				if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
				//
				if (op.border_style === 0) html.push('');
				else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
				else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
				else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
				//
				if (op.background_color) html.push('background-color:',op.background_color,';');
				html.push('"');
				html.push('><tr><td');
				html.push(' class="');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
				html.push('"');
				html.push('>');

				//if (op.url) html.push('<a target="_blank" href="', op.url, '">');
				if(op.edit) html.push('A<br>pt|', op.analysis_points, '<br>pr|', op.analysis_parameters);
				//if (op.url) html.push('</a>');
				html.push('</td></tr></table>');
				return html.join('');
			}
		}
	};
	//
	$.MnemoNode = function (options) {
		var op = $.extend({}, options);
		return {
			val: function (_html) {
				var el = this.owner.getElementByInd(this.ind);
				if (el) el.innerHTML = _html;
			},
			html: function () {
				var html = [];
				html.push('<div');
				html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
				html.push(' class="ui-mnemo-object ui-mnemo-node');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
				//
				if (op.orientation === 0) html.push('');
				else if (op.orientation === 1) html.push(' wm');
				html.push('"');
				if (op.tooltip) html.push(' title="', op.tooltip, '"');
				html.push(' style="');
				if (op.y)html.push('top:', op.y, 'px;');
				if (op.x)html.push('left:', op.x, 'px;');
				if (op.width)html.push('width:', op.width, 'px;');
				if (op.height)html.push('height:', op.height, 'px;');
				//
				if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
				if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
				//
				if (op.border_style === 0) html.push('');
				else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
				else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
				else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
				//
				if (op.background_color) html.push('background-color:',op.background_color,';');
				html.push('"');
				html.push('>');
				if (op.url) html.push('<a target="_blank" href="', op.url, '">');
				if (op.edit) html.push('N', op.node_id);
				if (op.url) html.push('</a>');
				html.push('</div>');
				return html.join('');
			}
		}
	};
    //
    $.MnemoTag = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {
                var html = [];
                html.push('<div');
                html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
                html.push(' class="ui-mnemo-object ui-mnemo-tag');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
                //
                if (op.orientation === 0) html.push('');
                else if (op.orientation === 1) html.push(' wm');
                html.push('"');
                if (op.tooltip) html.push(' title="', op.tooltip, '"');
                html.push(' style="');
                if (op.y)html.push('top:', op.y, 'px;');
                if (op.x)html.push('left:', op.x, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
                //
                if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
                if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
                //
                if (op.border_style === 0) html.push('');
                else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
                else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
                else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
                //
                if (op.background_color) html.push('background-color:',op.background_color,';');
                html.push('"');
                html.push('>');
                if (op.url) html.push('<a target="_blank" href="', op.url, '">');
                if (op.edit) html.push('T', op.node_id);
                if (op.url) html.push('</a>');
                html.push('</div>');
                return html.join('');
            }
        }
    };
	//
	$.MnemoSql = function (options) {
		var op = $.extend({}, options);
		return {
			val: function (_html) {
				var el = this.owner.getElementByInd(this.ind);
				if (el) el.innerHTML = _html;
			},
			html: function () {
				var html = [];
				html.push('<table');
				html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
				html.push(' class="ui-mnemo-object ui-mnemo-sql');
				//
				if (op.orientation === 0) html.push('');
				else if (op.orientation === 1) html.push(' wm');
				html.push('"');
				if (op.tooltip) html.push(' title="', op.tooltip, '"');
				html.push(' style="');
				if (op.y)html.push('top:', op.y, 'px;');
				if (op.x)html.push('left:', op.x, 'px;');
				if (op.width)html.push('width:', op.width, 'px;');
				if (op.height)html.push('height:', op.height, 'px;');
				//
				if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
				if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
				//
				if (op.border_style === 0) html.push('');
				else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
				else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
				else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
				//
				if (op.background_color) html.push('background-color:',op.background_color,';');
				html.push('"');
				html.push('><tr><td');
				html.push(' class="');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
				html.push('"');
				html.push('>');
				if (op.url) html.push('<a target="_blank" href="', op.url, '">');
				if (op.edit) html.push('SQL:',op.query);
				if (op.url) html.push('</a>');
				html.push('</td></tr></table>');
				return html.join('');
			}
		}
	};
	//
	$.MnemoBalance = function (options) {
		var op = $.extend({}, options);
		return {
			val: function (_html) {
				var el = this.owner.getElementByInd(this.ind);
				if (el) el.innerHTML = _html;
			},
			html: function () {
				var html = [];
				html.push('<table');
				html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
				html.push(' class="ui-mnemo-object ui-mnemo-balance');
				//
				if (op.orientation === 0) html.push('');
				else if (op.orientation === 1) html.push(' wm');
				html.push('"');
				if (op.tooltip) html.push(' title="', op.tooltip, '"');
				html.push(' style="');
				if (op.y)html.push('top:', op.y, 'px;');
				if (op.x)html.push('left:', op.x, 'px;');
				if (op.width)html.push('width:', op.width, 'px;');
				if (op.height)html.push('height:', op.height, 'px;');
				//
				if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
				if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
				//
				if (op.border_style === 0) html.push('');
				else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
				else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
				else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
				//
				if (op.background_color) html.push('background-color:',op.background_color,';');
				html.push('"');
				html.push('><tr><td');
				html.push(' class="');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
				html.push('"');
				html.push('>');
				if (op.url) html.push('<a target="_blank" href="', op.url, '">');
				if (op.edit) html.push('B',op.balance_id);
				if (op.url) html.push('</a>');
				html.push('</td></tr></table>');
				return html.join('');
			}
		}
	};
    //
    $.MnemoTrend = function (options) {
        var op = $.extend({}, options);
        //
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {
                //
                var html = [];
                html.push('<div');
                html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
                html.push(' class="ui-mnemo-object ui-mnemo-trend"');
                html.push(' style="');
                if(op.y)html.push('top:', op.y, 'px;');
                if(op.x)html.push('left:', op.x, 'px;');
                if(op.width)html.push('width:', op.width, 'px;');
                if(op.height)html.push('height:', op.height, 'px;');
                html.push('"');
                html.push('>');
                //
                html.push('</div>');
                return html.join('');
            },
            init: function () {
                var _id = "ui-mnemo-"+op.mnemo+"-object-"+op.object;
                var _zoom = "bt-mnemo-"+op.mnemo+"-object-"+op.object+"-zoom";
                //
                var _date = options.date.split('|');
                var _options = {
                    series:{lines:{show:true,lineWidth:1},shadowSize:0},
                    crosshair:{mode:"x"},
                    grid:{hoverable:true,autoHighlight:false},
                    xaxis:{mode:"time"},//,timezone:10,autoscaleMargin:false
                    yaxis:{},
                    //,min:parseInt(_date[1]+'000'),max:parseInt(_date[2]+'000')
                    //zoom:{interactive:true},
                    //pan:{interactive:true}
                };
                //console.info('/api/trend/data/'+options.date+'/'+op.infosys_positions);
                //console.info('_options', _options);

                $.ajax({
                    url: '/api/trend/data/'+options.date+'/'+op.infosys_positions,
                    data: { },
                    type: "GET",
                    dataType: "json",
                    success: function(_data){
                        if(_data){
                            if(_data[0]) {
                                _options.yaxis.min = _data[0].scales[0].global_min;
                                _options.yaxis.max = _data[0].scales[0].global_max;
                            }
                        var _plot = $.plot('#'+_id, _data, _options);
                        //console.info(_plot.getOptions());
                        //console.info(_plot.options.legend.container);
                        $('#'+_id).data('plot', _plot);
                        $('#'+_id).bind('plothover', _onChartOver);
                        }
                    }
                });
            }
        }
    };
    //
    $.MnemoTrendOld = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {
                //
                var html = [];
                html.push('<table');
                html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
                html.push(' class="ui-mnemo-object ui-mnemo-trend');
                //
                if (op.orientation === 0) html.push('');
                else if (op.orientation === 1) html.push(' wm');
                html.push('"');
                if (op.tooltip) html.push(' title="', op.tooltip, '"');
                html.push(' style="');
                if (op.y)html.push('top:', op.y, 'px;');
                if (op.x)html.push('left:', op.x, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
                //
                if (op.font_size !== -1) html.push('font-size:',op.font_size,';');
                if (op.font_weight !== -1) html.push('font-weight:',op.font_weight,';');
                //
                if (op.border_style === 0) html.push('');
                else if (op.border_style === 1) html.push('border: 2px solid #A1ACB9;');
                else if (op.border_style === 2) html.push('border: 2px dotted #A1ACB9;');
                else if (op.border_style === 3) html.push('border: 2px dashed #A1ACB9;');
                //
                if (op.background_color) html.push('background-color:',op.background_color,';');
                html.push('"');
                html.push('><tr><td');
                html.push(' class="');
                if (op.orientation === 0){
                    if (op.alignment == 0) html.push(' text-left', ' text-top');
                    else if (op.alignment == 1) html.push(' text-center', ' text-top');
                    else if (op.alignment == 2) html.push(' text-right', ' text-top');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 7) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 8) html.push(' text-right', ' text-bottom');
                }else if (op.orientation === 1){
                    if (op.alignment == 0) html.push(' text-left', ' text-bottom');
                    else if (op.alignment == 1) html.push(' text-center', ' text-bottom');
                    else if (op.alignment == 2) html.push(' text-right', ' text-bottom');
                    else if (op.alignment == 3) html.push(' text-left', ' text-middle');
                    else if (op.alignment == 4) html.push(' text-center', ' text-middle');
                    else if (op.alignment == 5) html.push(' text-right', ' text-middle');
                    else if (op.alignment == 6) html.push(' text-left', ' text-top');
                    else if (op.alignment == 7) html.push(' text-center', ' text-top');
                    else if (op.alignment == 8) html.push(' text-right', ' text-top');
                }
                html.push('"');
                html.push('>');
                //&gs[]=l
                //&gl[]=filter_nonull
                //
                var _url = '&date='+getLocationSearchParam("date");
                if(is_null(getLocationSearchParam("date"))){
                    _url = '&datetype='+getLocationSearchParam("datetype")
                    +'&datectrl_value1='+getLocationSearchParam("datectrl_value1")
                    +'&datectrl_value2='+getLocationSearchParam("datectrl_value2")
                    +'&dateshift='+getLocationSearchParam("dateshift");
                }
                //
                //op.url = '/_trend/trend.php?&g[]=C|'+op.infosys_positions+'&act=0&tp=image';
                op.url = '/_asodu/trend_channels.php?ch[]='+op.infosys_positions+_url;
                if (op.url) html.push('<a target="_blank" href="', op.url, '">');
                op.url = '/_asodu/trend_image.php?ch[]='+op.infosys_positions+_url;
                html.push('<img src="', op.url,'"');
                html.push(' style="');
                if(op.width)html.push('width:', op.width, 'px;');
                if(op.height)html.push('height:', op.height, 'px;');
                html.push('"/>');
                if (op.edit) html.push('T',op.infosys_positions);
                //console.debug(op);
                if (op.url) html.push('</a>');
                html.push('</td></tr></table>');
                return html.join('');
            }
        }
    };
    //
    $.MnemoTrendMy = function (options) {
        var op = $.extend({}, options);
        //
        //console.info('op',op);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {
                //
                var html = [];
                html.push('<div');
                html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
                html.push(' class="ui-mnemo-object ui-mnemo-trend"');
                html.push(' style="');
                if(op.y)html.push('top:', op.y, 'px;');
                if(op.x)html.push('left:', op.x, 'px;');
                if(op.width)html.push('width:', op.width, 'px;');
                if(op.height)html.push('height:', op.height, 'px;');
                html.push('"');
                html.push('>');
                //
                html.push('</div>');
                return html.join('');
            },
            init: function () {
                /*var _id = "ui-mnemo-"+op.mnemo+"-object-"+op.object;
                var _zoom = "bt-mnemo-"+op.mnemo+"-object-"+op.object+"-zoom";
                //
                var _options = {
                    legend:{fragmentsInitX:[
                        '<caption>',
                        '<a id="',_zoom,'" class="btn btn-flat">',
                        '<img src="/i/trend_zoom_actual_equal_24.png">',
                        '</a>',
                        '</caption>'
                    ]},
                    series:{lines:{show:true,lineWidth:1},shadowSize:0},
                    crosshair:{mode:"x"},
                    grid:{hoverable:true,autoHighlight:false},
                    xaxis:{mode:"time"},
                    zoom:{interactive:true,zoomRange: [0.1, 10]},
                    pan:{interactive:true,zoomRange: [0.1, 10]}
                };
                var _data = [];
                //console.info('/api/trend/data/'+options.date+'/'+op.infosys_positions);
                $.ajax({
                    url: '/api/trend/data/'+options.date+'/'+op.infosys_positions,
                    data: { },
                    type: "GET",
                    dataType: "json",
                    success: function(_data){
                        var _plot = $.plot('#'+_id, _data, _options);
                        console.info(_plot.getOptions());
                        //console.info(_plot.options.legend.container);
                        $('#'+_id).data("plot", _plot);
                        $('#'+_id).bind('plothover', _onChartOver);
                        //
                        $('<div id="'+_zoom+'" class="btn btn-flat" style="position:relative;right:20px;top:20px">'
                        +'<img src="/i/trend_zoom_actual_equal_24.png"></div>')
                            .appendTo($('#'+_id))
                            .click(function (event) {
                                console.info('clk');
                                event.preventDefault();
                                _plot.zoomOut();
                            });
                    }
                });*/
            }
        }
    };

/*


//
	$.MnemoNodeEx = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind)
                if (el) {
                    var _v = el.all('_src');
                    if (_v) {
                        _v.innerHTML = _html;
                    }
                }
            },
            html: function () {
                var html = [];
	            html.push('<div');
	            html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
	            html.push(' class="ui-mnemo-object ');
                if (op.click)html.push(op.click); else html.push('ui-mnemo-node');
                html.push('"');
                if (op.title) html.push(' title="', op.title, '"');
                html.push(' style="');
                if (op.src)html.push('background-image:url("', this.src, '");');//+get_images(
                if (op.top)html.push('top:', op.top, 'px;');
                if (op.left)html.push('left:', op.left, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
                html.push('"');
                html.push('>');
                if (op.href) {
                    html.push('<a target="_blank" href="', op.href, '">');
                }
                if (op.edit) html.push('N', op.id);
                if (op.src) html.push('<div id=_src style="float:left;">', op.src, '</div>');
                if (op.href) {
                    html.push('</a>');
                }
                html.push('</div>');
                return html.join('');
            }
        }
    };
    //! $.MnemoSQL({
    // ind=>-,
    // left,
    // top,
    // width,
    // height,
    // click=>css,
    // href,
    // src=>SQL
    // })
	$.MnemoSQL = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) {
                    var _n = el.all('_src');
                    if (_n) _n.innerHTML = _html;
                }
            },
            vals: function (_el, _html) {
                var el = this.owner.getElementByInd(this.ind)
                if (el) {
                    var _n = el.all(_el)
                    if (_n) {
                        _n.href = _html;
                        _n.target = '_blank';
                    }
                }
            },
            html: function () {
                var html = [];
	            html.push('<div');
	            html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
	            html.push(' class="ui-mnemo-object ');
                if (op.click)html.push(op.click); else html.push('ui-mnemo-level');
                html.push('"');
                if (op.title) html.push(' title="', op.title, '"');
                html.push(' style="');
                if (op.top)html.push('top:', op.top, 'px;');
                if (op.left)html.push('left:', op.left, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
                html.push('"');
                html.push('>');
                if (op.href) {
                    html.push('<a target="_blank" href="', op.href, '">');
                }
                if (op.src) html.push('<div id=_src>', op.src, '</div>');
                if (op.href) {
                    html.push('</a>');
                }
                html.push('</div>');
                return html.join('');
            }
        }
    };
    //cMnemoNode
    //
	$.MnemoBalance = function (options) {
        var op = $.extend({}, options);
        return {
            val: function (_html) {
                var el = this.owner.getElementByInd(this.ind);
                if (el) el.innerHTML = _html;
            },
            html: function () {
                var html = [];
                html.push('<div');
                html.push(' id="ui-mnemo-',op.mnemo,'-object-', op.object, '"');
                html.push(' class="ui-mnemo-object ');
                if (op.click)html.push(op.click); else html.push('ui-mnemo-balance');
                html.push('"');
                if (op.title) html.push(' title="', op.title, '"');
                html.push(' style="');
                if (op.top)html.push('top:', op.top, 'px;');
                if (op.left)html.push('left:', op.left, 'px;');
                if (op.width)html.push('width:', op.width, 'px;');
                if (op.height)html.push('height:', op.height, 'px;');
                html.push('"');
                html.push('>');
                if (op.id) html.push('b_',op.id);
                html.push('</div>');
                return html.join('');
            }
        }
    };
    */

}));
//