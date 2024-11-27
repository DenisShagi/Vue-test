// запрашивается

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
	var NAME = 'MNEMO';
	var CTRL = function (element, options) {
		if(options.debug)console.info(NAME, element, options);
		var _this;
        var _el = $(element);
		//
		var init = function () {
			//
			options.css_loading = options.css_widget+'-loading';
            if(_el.attr('id')) options.id = _el.attr('id');
            //
			if(options.debug)console.info(NAME+'.init', options);
			//
			_this.el_items = $(element);
			_this.el_items.addClass(options.css_widget);
            //AUDIO
            if(options.is_audio){
                _this.el_items.append([
                    '<audio id="mnemo',options.mnemo,'_audio_alert" preload="auto" style="display:none;">',
                    '<source src="/audio/state_alert.mp3" /></audio>',
                    '<audio id="mnemo',options.mnemo,'_audio_warning" preload="auto" style="display:none;">',
                    '<source src="/audio/state_warning.mp3" /></audio>'
                ].join(''));
                options.el_audio_alert = $('#mnemo'+options.mnemo+'_audio_alert')[0];
                options.el_audio_warning = $('#mnemo'+options.mnemo+'_audio_warning')[0];
            }
			if(options.edit){
				_this.el_items.addClass(options.css_widget+'-edit');
				//.draggable();
				//_this.delegate( function(event){ _this.onClick(event); });
			}
			//
			_this._load();
		};
		var _update = function () {
			if (options.debug) console.log(NAME+'._update', options.update, { mnemo: options.mnemo, date: options.date, edit:options.edit });
			//
			$.ajax({
				url: options.update,
				data: { mnemo: options.mnemo, date: options.date, edit:options.edit },
				dataType: 'script',
				cache: false,
				success: function (data) {
					if (options.debug)console.debug(NAME+'._update->$.ajax:success');
					_this.el_items.removeClass(options.css_loading);
					if (!data.status) {
					} else {
					}
				},
				error: function (xhr, status) {
					if (options.debug)console.warn(NAME+'._update->$.ajax:error', xhr, ' | ', status);
					_this.el_items.removeClass(options.css_loading);
					//var errinfo = { errcode: status }
					//if (xhr.status != 200) {
					//    errinfo.message = xhr.statusText
					//} else {
					//    // может быть статус 200, а ошибка из-за некорректного JSON
					//    errinfo.message = 'Некорректные данные с сервера'
					//}
				}
			});
		};
		var _load = function () {
			//
			_this.el_items.addClass(options.css_loading);
			$.ajax({
				url: options.url,
				data: { mnemo: options.mnemo, date: options.date, edit:options.edit },
				dataType: 'json',
				cache: false,
				success: function (data) {
					if (options.debug)console.debug(NAME+'._load->$.ajax:success');
					_this.el_items.removeClass(options.css_loading);
					if (!data.status) {
						_this.el_items.css({
                            'min-height': data.mnemo.height,
                            'min-width': data.mnemo.width,
                            'height': data.mnemo.height, //FIX# for ie < 9
                            'width': data.mnemo.width //FIX# for ie < 9
                        });
						_this.el_items.append(_this._html(data.items));
						_this._update();
                        //
                        //SUBSCRIBE
                        if($.ws && app.roleid) _.delay(function(){
                            $.ws.on('open', function(_data){
                                if(options.debug)console.debug(NAME+'ws.open->data', _data);
                                data.channel.map(function(_id){
                                    $('#ws').ws('subscribe', 'MAIN.DB.CHANNEL.'+_id+'.CHANGE.*', _this._current);
                                    $('#ws').ws('subscribe', 'MAIN.DB.CHANNEL.'+_id+'.STATE.*', _this._state);
                                });
                                data.analysis.map(function(_an){
                                    $('#ws').ws('subscribe', 'MAIN.DB.ANALYSIS.'+_an+'.CHANGE.CURRENT', _this._analysis);
                                });
                                $('#ws').ws('subscribe', 'MAIN.DB.MNEMO.'+options.mnemo+'.CHANGE.*', _this._reload);
                            });
                        }, 100);
                        //$(element).on('PAGE.onstart', _this._update);
						if(options.refresh) window.setInterval(_this._update, options.refresh);
					} else {
						_this.el_items.append(data.message);
					}
				},
				error: function (xhr, status) {
					if (options.debug)console.warn(NAME+'._load->$.ajax:error', xhr, ' | ', status);
					_this.el_items.removeClass(options.css_loading);
					//var errinfo = { errcode: status }
					//if (xhr.status != 200) {
					//    errinfo.message = xhr.statusText
					//} else {
					//    // может быть статус 200, а ошибка из-за некорректного JSON
					//    errinfo.message = 'Некорректные данные с сервера'
					//}
				}
			});
        };
        var _reload = function(ev){ //Получено сообщение об изменении мнемосхемы
            if(options.debug) console.info(NAME+'._reload', options, ev);
            //if(ev && ev.data && ev.data.event){
            _this.el_items.empty();//Удаление дочерних элементов
            _this.init();
            //}
        };
        var _analysis = function(ev){ //Получено сообщение об изменении значения
            if(options.debug) console.info(NAME+'._analysis', options, ev);
            if(ev && ev.data && ev.data.event){
                var routekey = (ev.data.event).split('.');
                var o = ev.data.payload;
                var is_inform_date = false;
                //console.log(routekey,o);
                //VALUE
                var el = $('.ui-mnemo-analysis-'+o.point+' .val-'+o.parameter);
                if(el.length){
                    //console.info('el',el);
                    if(routekey[5]=='CURRENT'){
                        //console.info('m',o);
                        var html = '';
                        if(o.value === null || typeof o.value === 'undefined') html = '<abbr>Н/Д</abbr>';
                        else if(o.value == -200) html = '<abbr class="icon-present" title="Отсутствует">Отс.</abbr>';
                        else if(o.value == -100) html = '<abbr class="icon-present" title="Присутствует">Прис.</abbr>';
                        else html = o.value;
                        //
                        el.attr('title', o.change_time).html(html).addClass('ani-pulsate');
                        //console.warn('add class ani-pulsate on',el);
                        _.delay(function(){
                            //console.warn('del class ani-pulsate on',el);
                            el.removeClass('ani-pulsate');
                        }, 4000);//2*2sec in button.css
                        is_inform_date = true;
                    }
                }
                //INFORM_DATE
                if(is_inform_date){
                    $(window).trigger('update_datetimepicker');
                }
            }
        };
        var _current = function(ev){ //Получено сообщение об изменении значения
            if(options.debug) console.info(NAME+'._current', options, ev);
            if(ev && ev.data && ev.data.event){
                var routekey = (ev.data.event).split('.');
                var o = ev.data.payload;
                var is_inform_date = false;
                //VALUE
                var el = $('.ui-mnemo-value-'+o.id+' .val');
                if(el.length){
                    //console.info('el',el);
                    if(routekey[5]=='MARK'){
                        el.attr('title', o.change_time);
                        is_inform_date = true;
                    }else if(routekey[5]=='VALUE'){
                        //console.info('m',o);
                        el.attr('title', o.change_time).html(o.state ? $.coalesce(o.value, '<abbr>Н/Д</abbr>') : '<abbr>Откл</abbr>').addClass('ani-pulsate');
                        //console.warn('add class ani-pulsate on',el);
                        _.delay(function(){
                            //console.warn('del class ani-pulsate on',el);
                            el.removeClass('ani-pulsate');
                        }, 4000);//2*2sec in button.css
                        is_inform_date = true;
                    }
                }
                //LEVEL
                var el_level = $('.ui-mnemo-level-'+o.id+' div');
                if(el_level.length){
                    if(options.debug)console.info('LEVEL', ev.data, o, options);
                    if(routekey[5]=='VALUE'){
                        if($('.ui-mnemo-level-'+o.id).hasClass('ui-mnemo-diagram')){
                            if(o.state){
                                if(o.unit == 5){
                                    //console.info('LEVEL VALUE', o.value);
                                    el_level.height($.coalesce(o.value, 0)+'%');//%
                                }else if(
                                    (o.unit == 2 || o.unit == 57)//2=m3 57=m
                                    &&
                                    (o.percent >= 0 && o.percent <= 100)//[0,100]
                                ){
                                    //console.info('LEVEL PERCENT', o.percent);
                                    el_level.height($.coalesce(o.percent, 0)+'%');
                                }
                            }else{
                                el_level.height(0);
                            }
                        }else{
                            if(o.state){
                                if(o.unit == 5){
                                    //console.info('LEVEL VALUE', o.value);
                                    el_level.height($.coalesce(100-o.value, 100)+'%');//%
                                }else if(o.unit == 2 && (o.percent >= 0 && o.percent <= 100)){//m3 [0,100]
                                    //console.info('LEVEL PERCENT', o.percent);
                                    el_level.height($.coalesce(100-o.percent, 100)+'%');
                                }
                            }else{
                                el_level.height(100);
                            }
                        }
                        is_inform_date = true;
                    }
                }
                //INFORM_DATE
                if(is_inform_date){
                    $(window).trigger('update_datetimepicker');
                }
            }
        };
        var _state = function (ev) { //Изменение состояния (тревоги)
            if(options.debug) console.info(NAME+'._state', ev);
            if(ev && ev.data && ev.data.event){
                var routekey = (ev.data.event).split('.');
                var el_pos = $('.ui-mnemo-position-'+routekey[3]+' A');
                var el_val = $('.ui-mnemo-value-'+routekey[3]+' A');
                if(options.debug) console.info(NAME+'._state', routekey, el_pos, el_val);
                if(routekey[5]=='ALARM'){
                    el_pos.removeClass('ani-pulsate-norm').removeClass('ani-pulsate-warning').removeClass('ani-pulsate-alarm').addClass('ani-pulsate-alarm');
                    el_val.removeClass('ani-pulsate-norm').removeClass('ani-pulsate-warning').removeClass('ani-pulsate-alarm').addClass('ani-pulsate-alarm');
                    if(!($.browser.msie && $.browser.version < 10))
                        if(options.is_audio && options.el_audio_alert)
                            options.el_audio_alert.play();
                }else if(routekey[5]=='WARNING'){
                    el_pos.removeClass('ani-pulsate-norm').removeClass('ani-pulsate-warning').removeClass('ani-pulsate-alarm').addClass('ani-pulsate-warning');
                    el_val.removeClass('ani-pulsate-norm').removeClass('ani-pulsate-warning').removeClass('ani-pulsate-alarm').addClass('ani-pulsate-warning');
                    if(!($.browser.msie && $.browser.version < 10))
                        if(options.is_audio && options.el_audio_warning)
                            options.el_audio_warning.play();
                }else if(routekey[5]=='NORM'){
                    el_pos.removeClass('ani-pulsate-norm').removeClass('ani-pulsate-warning').removeClass('ani-pulsate-alarm').addClass('ani-pulsate-norm');
                    el_val.removeClass('ani-pulsate-norm').removeClass('ani-pulsate-warning').removeClass('ani-pulsate-alarm').addClass('ani-pulsate-norm');
                }
            }
        };
        var _date = function() {
            var x = _.now();//new Date().toISOString();
            if(options.debug) console.info(NAME+'._date', x);
            $('#datepicker').attr('tscurrent', x);
        };
		var _html = function (items) {
			var html = [];
			//
			if (options.debug)console.debug(NAME+'._html[',items.length,']');
			for (var i = 0, c = items.length; i < c; i++) {
				var item = items[i];
				item.edit = options.edit;
                item.date = options.date;
				var tmp = eval('$.' + item.type + '(item)');
				_this.el_items.append(tmp.html());
                if(tmp.init) tmp.init();
			}
			return html.join('');
		};
		//
		_this = {
			init: init,
			_update: _update,
			_load: _load,
			_html: _html,
            _state: _state,
            _current: _current,
            _analysis: _analysis,
            _reload: _reload,
            _date: _date
		};
		return _this;
	};
	//
	$.fn.mnemo = function (opt) {
		var _this = this;
		var _arguments = arguments;
		this.each(function () {
			var ctrl = $(this).data(NAME);
            if (!ctrl) {
				ctrl = new CTRL(this, $.extend(true, {}, $.fn.mnemo_default, opt||{} ));
				$(this).data(NAME, ctrl);
				ctrl.init.apply(_this, _arguments);
			}
			//
			if ($.type(opt) === 'string' && ctrl[opt] !== undefined && $.isFunction(ctrl[opt])) { //Вызов метода
				_this = ctrl[opt].apply(_this, Array.prototype.slice.call(_arguments, 1));
			}
		});
		return _this;
	};
	//FIX# $.fn.class.default не работает в ie < 9
	$.fn.mnemo_default = {
        debug: false,
		mnemo: null,
		id: '',
        is_audio: false,
		refresh: app.refresh,
		url: '/init',
		update: '/update',
		css_widget: 'ui-mnemo'
	};
    //
}));
//