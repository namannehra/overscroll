'use strict';

(function () {
	'use strict';

	if ('getOverscrollEvent' in window) return;
	var des = 'overscrollEventProperties',
	    sym = 'Symbol' in window ? Symbol(des) : '_' + des;
	var positiveOnly = function positiveOnly(e) {
		return Math.max(e, 0);
	};
	var check = function check(e, f) {
		if (!e || e.nodeType !== 1) throw new TypeError('Failed to execute \'' + f + '\' with \'' + e + '\': parameter 1 should be a node with nodeType equal to 1');
	};
	var update = function update(e) {
		var s = e[sym];
		s.height = e.clientHeight;
		s.width = e.clientWidth;
		s.scrollHeight = e.scrollHeight;
		s.scrollWidth = e.scrollWidth;
	};
	var touchstart = function touchstart(e) {
		var s = this[sym];
		s.startX = undefined;
		s.startY = undefined;
		update(this);
	};
	var touchmove = function touchmove(e) {
		var s = this[sym],
		    t = e.touches[0],
		    scrollTop = this.scrollTop,
		    scrollLeft = this.scrollLeft,
		    atTop = scrollTop === 0,
		    atLeft = scrollLeft === 0,
		    atBottom = scrollTop + s.height === s.scrollHeight,
		    atRight = scrollLeft + s.width === s.scrollWidth;
		var top = 0,
		    right = 0,
		    bottom = 0,
		    left = 0;
		if (atTop || atBottom) {
			var y = t.clientY;
			if (s.startY === undefined) s.startY = y;else {
				if (atTop) top = positiveOnly(y - s.startY);
				if (atBottom) bottom = positiveOnly(s.startY - y);
			}
		} else if (s.startY !== undefined) s.startY = undefined;
		if (atLeft || atRight) {
			var x = t.clientX;
			if (s.startX === undefined) s.startX = x;else {
				if (atLeft) left = positiveOnly(x - s.startX);
				if (atRight) right = positiveOnly(s.startX - x);
			}
		} else if (s.startX !== undefined) s.startX = undefined;
		this.dispatchEvent(new CustomEvent('overscroll', {
			detail: {
				top: top, right: right, bottom: bottom, left: left,
				sourceEvent: e
			}
		}));
	};
	window.getOverscrollEvent = function (e) {
		check(e, 'getOverscrollEvent');
		if (!e[sym]) {
			e[sym] = {};
			e.addEventListener('touchstart', touchstart);
			e.addEventListener('touchmove', touchmove);
		}
		update(e);
	};
	window.stopOverscrollEvent = function (e) {
		check(e, 'stopOverscrollEvent');
		delete e[sym];
		e.removeEventListener('touchstart', touchstart);
		e.removeEventListener('touchmove', touchmove);
	};
	window.firesOverscrollEvent = function (e) {
		check(e, 'firesOverscrollEvent');
		return sym in e;
	};
})();