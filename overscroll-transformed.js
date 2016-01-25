'use strict';
var getOverscrollEvent = function getOverscrollEvent(e) {
	getOverscrollEvent._init(e);
};
var stopOverscrollEvent = function stopOverscrollEvent(e) {
	stopOverscrollEvent._init(e);
};
(function () {
	var x = getOverscrollEvent,
			y = stopOverscrollEvent,
			des = '\'getOverscrollEvent\' properties for element',
			sym = 'Symbol' in window ? Symbol(des) : des;
	var check = function check(e) {
		if (!e || e.nodeType !== 1) {
			throw new TypeError('Failed to execute \'getOverscrollEvent\' with \'' + e + '\': nodeType of parameter 1 is not \'1\'');
		}
	};
	var checkEnd = function checkEnd(e) {
		var s = e[sym];
		s.atTop = e.scrollTop === 0;
		s.atLeft = e.scrollLeft === 0;
		s.atBottom = e.scrollTop + s.clientHeight === s.scrollHeight;
		s.atRight = e.scrollLeft + s.clientWidth === s.scrollWidth;
	};
	var scroll = function scroll(e) {
		var _this = this;
		var s = this[sym];
		if (s.chill) {
			return;
		}
		s.chill = true;
		requestAnimationFrame(function () {
			checkEnd(_this);
			s.chill = false;
		});
	};
	var touchmove = function touchmove(e) {
		var s = this[sym],
				touch = e.touches[0];
		this.dispatchEvent(new CustomEvent('overscroll', {
			detail: {
				top: calcOverscroll('top', s, touch, 'y'),
				right: calcOverscroll('right', s, touch, 'x', true),
				bottom: calcOverscroll('bottom', s, touch, 'y', true),
				left: calcOverscroll('left', s, touch, 'x'),
				touchmoveEvent: e
			}
		}));
	};
	var touchend = function touchend(e) {
		var s = this[sym];
		s.overscrollStartTop = undefined;
		s.overscrollStartRight = undefined;
		s.overscrollStartLeft = undefined;
		s.overscrollStartBottom = undefined;
	};
	var calcOverscroll = function calcOverscroll(pos, s, touch, dir, rev) {
		var toReturn = 0;
		pos = pos.charAt(0).toUpperCase() + pos.slice(1);
		touch = touch['client' + dir.toUpperCase()];
		if (s['at' + pos]) {
			if (s['overscrollStart' + pos] === undefined) {
				s['overscrollStart' + pos] = touch;
			} else {
				toReturn = touch - s['overscrollStart' + pos];
				if (rev) {
					toReturn *= -1;
				}
				toReturn = Math.max(toReturn, 0);
			}
		} else {
			if (s['overscrollStart' + pos] !== undefined) {
				s['overscrollStart' + pos] = undefined;
			}
		}
		return toReturn;
	};
	x._init = function (e) {
		check(e);
		var s = e[sym];
		if (!s) {
			s = {};
			e[sym] = s;
			e.addEventListener('scroll', scroll);
			e.addEventListener('touchmove', touchmove);
			e.addEventListener('touchend', touchend);
		}
		s.clientHeight = e.clientHeight;
		s.scrollHeight = e.scrollHeight;
		s.clientWidth = e.clientWidth;
		s.scrollWidth = e.scrollWidth;
		checkEnd(e);
	};
	y._init = function (e) {
		check(e);
		delete e[sym];
		e.removeEventListener('scroll', scroll);
		e.removeEventListener('touchmove', touchmove);
		e.removeEventListener('touchend', touchend);
	};
})();