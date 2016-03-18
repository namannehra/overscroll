'use strict';

(function () {
	'use strict';

	if ('OverscrollEvent' in window) return;
	var propString = '_OverscrollEventProperties';
	var check = function check(e, f) {
		if (!e || e.nodeType !== 1) throw new TypeError('Failed to execute \'' + f + '\': The callback provided as parameter 1 is not a node with nodeType 1');
	};
	var getScroll = function getScroll(e) {
		var prop = e[propString];
		prop.scrollTop = e.scrollTop;
		prop.scrollLeft = e.scrollLeft;
	};
	var _update = function _update(e) {
		var prop = e[propString];
		prop.height = e.clientHeight;
		prop.width = e.clientWidth;
		prop.scrollHeight = e.scrollHeight;
		prop.scrollWidth = e.scrollWidth;
	};
	var scroll = function scroll() {
		getScroll(this);
	};
	var touchstart = function touchstart() {
		_update(this);
	};
	var touchend = function touchend() {
		var prop = this[propString];
		delete prop.startX;
		delete prop.startY;
	};
	var touchmove = function touchmove(e) {
		var prop = this[propString],
		    atTop = prop.scrollTop === 0,
		    atLeft = prop.scrollLeft === 0,
		    atBottom = prop.scrollTop + prop.height === prop.scrollHeight,
		    atRight = prop.scrollLeft + prop.width === prop.scrollWidth,
		    touch = e.touches[0],
		    det = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			sourceEvent: e
		};
		if (atTop || atBottom) {
			var y = touch.clientY,
			    startY = prop.startY;
			if (startY === undefined) prop.startY = y;else {
				var top = y - startY,
				    bottom = -top;
				if (atTop && top > 0) det.top = top;
				if (atBottom && bottom > 0) det.bottom = bottom;
			}
		}
		if (atLeft || atRight) {
			var x = touch.clientX,
			    startX = prop.startX;
			if (startX === undefined) prop.startX = x;else {
				var left = x - startX,
				    right = -left;
				if (atLeft && left > 0) det.left = left;
				if (atRight && right > 0) det.right = left;
			}
		}
		this.dispatchEvent(new CustomEvent('overscroll', {
			detail: det
		}));
	};
	window.OverscrollEvent = {
		start: function start(e) {
			check(e, 'start');
			if (propString in e) return;
			e[propString] = {};
			getScroll(e);
			e.addEventListener('scroll', scroll);
			e.addEventListener('touchstart', touchstart);
			e.addEventListener('touchmove', touchmove);
			e.addEventListener('touchend', touchend);
		},
		stop: function stop(e) {
			check(e, 'stop');
			if (!propString in e) return;
			delete e[propString];
			e.removeEventListener('scroll', scroll);
			e.removeEventListener('touchstart', touchstart);
			e.removeEventListener('touchmove', touchmove);
			e.removeEventListener('touchend', touchend);
		},
		update: function update(e) {
			check(e, 'update');
			if (!propString in e) return;
			_update(e);
		},
		fires: function fires(e) {
			check(e, 'fires');
			return propString in e;
		}
	};
})();