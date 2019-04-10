//轮播图
(function($) {
	$.fn.nTabs = function(options) {
		if(this.length == 0) return;
		var defaults = {
			button: null,
			prep: null,
			next: null,
			clickChange: true,
			interval: 5000,
			easing: 'slideLeft',
			callback: null
		};
		var o = $.extend(defaults, options);
		if(o.button == null || o.button == '') o.button = $(Array());
		else o.button = $(o.button);
		if(o.interval == null) o.interval = -1;
		else o.interval = parseInt(o.interval);
		if(o.easing == null) o.easing = 'none';
		var count = this.css('position', 'relative').show().children().css('position', 'absolute').length;
		var fn = 'JQUERY_YOK_NTABS_FN_' + parseInt(Math.random() * 1000000);
		var cur = -1;
		var width = this.width();
		var height = this.height();
		var timer = null;
		var panel = this.children();
		o.button = o.button.children();
		window[fn] = function(dir) {
			var next, _easing;
			clearTimeout(timer);
			if(dir == 'p') {
				next = cur <= 0 ? count - 1 : cur - 1;
				if(o.easing == 'slideLeft') _easing = 'slideRight';
				else if(o.easing == 'slideRight') _easing = 'slideLeft';
				else if(o.easing == 'slideUp') _easing = 'slideDown';
				else if(o.easing == 'slideDown') _easing = 'slideUp'
			} else if(typeof(dir) == 'number') {
				next = parseInt(dir);
				_easing = o.easing
			} else {
				next = cur > count - 2 ? 0 : cur + 1;
				_easing = o.easing
			};
			if(cur != next) {
				var curp = panel.eq(cur).stop(true, true);
				var nextp = panel.eq(next).stop(true, true);
				if(_easing == 'slideLeft') {
					panel.not(curp).css({
						'top': 0,
						'left': width
					});
					curp.animate({
						'top': 0,
						'left': -width
					}, 'fast');
					nextp.animate({
						'top': 0,
						'left': 0
					}, 'fast')
				} else if(_easing == 'slideRight') {
					panel.not(curp).css({
						'top': 0,
						'left': -width
					});
					curp.animate({
						'top': 0,
						'left': width
					}, 'fast');
					nextp.animate({
						'top': 0,
						'left': 0
					}, 'fast')
				} else if(_easing == 'slideUp') {
					panel.not(curp).css({
						'top': height,
						'left': 0
					});
					curp.animate({
						'top': -height,
						'left': 0
					}, 'fast');
					nextp.animate({
						'top': 0,
						'left': 0
					}, 'fast')
				} else if(_easing == 'slideDown') {
					panel.not(curp).css({
						'top': -height,
						'left': 0
					});
					curp.animate({
						'top': height,
						'left': 0
					}, 'fast');
					nextp.animate({
						'top': 0,
						'left': 0
					}, 'fast')
				} else if(_easing == 'fade') {
					panel.not(curp).css({
						'z-index': 0,
						'opacity': 0
					});
					curp.animate({
						'z-index': 5,
						'opacity': 0
					});
					nextp.css({
						'z-index': 10
					}).animate({
						'opacity': 1
					})
				} else {
					panel.css({
						'top': 0,
						'left': width
					});
					nextp.css({
						'top': 0,
						'left': 0
					})
				};
				if(cur < 0) nextp.stop(true, true);
				o.button.removeClass('cur').eq(next).addClass('cur');
				cur = next
			};
			if(o.interval > 0) timer = setTimeout(fn + '()', o.interval)
		};
		o.button.each(function(i, n) {
			n = $(n);
			if(o.clickChange) n.click(function() {
				eval(fn + '(' + i + ')')
			});
			else n.mouseover(function() {
				eval(fn + '(' + i + ')')
			})
		});
		if(o.prep != null) {
			n = $(o.prep);
			if(o.clickChange) n.click(function() {
				eval(fn + '(\'p\')')
			});
			else n.mouseover(function() {
				eval(fn + '(\'p\')')
			})
		};
		if(o.next != null) {
			n = $(o.next);
			if(o.clickChange) n.click(function() {
				eval(fn + '()')
			});
			else n.mouseover(function() {
				eval(fn + '()')
			})
		};
		eval(fn + '()');
		return this
	}
})(jQuery);
(function($) {
	$.fn.countdown = function(timeout, options) {
		function parseDate(datestr) {
			var par = new Array();
			datestr = datestr.replace('/', '-');
			par[0] = datestr.match(/\d+\-\d+\-\d+/g);
			par[0] = par[0] == null ? "1901-1-1" : par[0].toString();
			par[1] = datestr.match(/\d+:\d+:\d+/g);
			par[1] = par[1] == null ? "0:0:0" : par[1].toString();
			par[2] = datestr.indexOf('T') > -1 ? datestr.split('T')[1] : "";
			par[0] = par[0].split("-");
			par[1] = par[1].split(":");
			var date = new Date(par[0][0], par[0][1] - 1, par[0][2], par[1][0], par[1][1], par[1][2]);
			if(par[2] != "") {
				par[2] = par[2].split(":");
				par[2] = (eval(par[2][0]) * 60 + eval(par[2][1])) * 60000;
				date -= par[2];
				date -= (new Date()).getTimezoneOffset() * 60000
			};
			return new Date(date)
		};
		var defaults = {
			now: '',
			format: 'HH:MM:ss',
			expire: 'Time out'
		};
		if(typeof(options) == 'string') options = {
			format: options
		};
		var o = $.extend(defaults, options);
		if(typeof(timeout) == 'string') {
			timeout = parseDate(timeout);
			now = (o.now == '' || o.now == null) ? new Date() : parseDate(o.now);
			timeout = parseInt((timeout - now) / 1000)
		};
		if(typeof(timeout) == 'number') {
			var t = new Date();
			t.setTime(parseInt(new Date().getTime() / 1000 + 1) * 1000 + parseInt(timeout) * 1000);
			timeout = t
		} else return this;
		var p = this;
		var fn = 'JQUERY_YOK_COUNTDOWN_FN_' + parseInt(Math.random() * 1000000);
		var i = 0;
		window[fn] = function() {
			var t = timeout - new Date();
			var k = 0;
			var l = 0;
			var s = '';
			if(t < 0) {
				p.html(o.expire);
				return
			} else t = parseInt(t / 1000);
			if(typeof(o.format) == 'function') {
				s = o.format(t)
			} else {
				s = o.format;
				var f = o.format.toLowerCase();
				if(f.indexOf('dd') > -1) {
					k = parseInt(t / 86400);
					s = s.replace(/dd/i, k);
					l += k * 86400
				};
				if(f.indexOf('hh') > -1) {
					k = parseInt((t - l) / 3600);
					s = s.replace('HH', k < 10 ? ('0' + k) : k);
					s = s.replace('hh', k);
					l += k * 3600
				};
				if(f.indexOf('mm') > -1) {
					k = parseInt((t - l) / 60);
					s = s.replace('MM', k < 10 ? ('0' + k) : k);
					s = s.replace('mm', k);
					l += k * 60
				};
				if(f.indexOf('ss') > -1) {
					k = parseInt(t - l);
					s = s.replace('SS', k < 10 ? ('0' + k) : k);
					s = s.replace('ss', k);
					l += k
				}
			};
			p.html(s);
			i = setTimeout(fn + '()', 1000)
		};
		eval(fn + '()');
		return this
	}
})(jQuery);

function cur(ele) {
	$(ele).addClass("cur").siblings().removeClass("cur");
}

function tab(id_tab, tag_tab, id_con, tag_con, act) {
	if(!act) {
		act = "click"
	};
	if(act == "click") {
		$(id_tab).find(tag_tab).each(function(i) {
			$(id_tab).find(tag_tab).eq(i).click(function() {
				cur(this);
				$(id_con).find(tag_con).eq(i).show().siblings(tag_con).hide();
			})
		})
	}
	if(act == "mouseover") {
		$(id_tab).find(tag_tab).each(function(i) {
			$(id_tab).find(tag_tab).eq(i).mouseover(function() {
				cur(this);
				$(id_con).find(tag_con).eq(i).show().siblings(tag_con).hide();
			})
		})
	}
}
//轮播图end