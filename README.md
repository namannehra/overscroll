# overscroll
JavaScript functions for listening to `overscroll` events on touch devices.

[Example](https://namannehra.github.io/overscroll/)

`overscroll.js` is the original file and uses `const`, `let` and `arrow functions` which may not be supported in all browsers. `overscroll-transformed.js` is genetared using [babeljs](https://babeljs.io/) and will work in most browsers.

Load the file using script tag in head

	<script src="overscroll-transformed.js"></script>

Call `getOverscrollEvent` and pass an element as argumenmt

	var d = document.querySelector('#d');
	getOverscrollEvent(d);

Now this element will fire overscroll events. Listen using addEventListener. The `detail` of event has 5 properties. `top`, `right`, `bottom` and `left` are the respective overflow in pixel. If there is no overflow then value is `0`. The 5th property is `touchmoveEvent`. It is the original `touchmove` event which is used to calculate overflow. You may call `preventDefault` on `touchmove` event to stop scrolling.

	d.addEventListener(`overscroll`, function(e) {
		var det = e.detail;
		var top = det.top;
		console.log('overscroll top is ', top);
	});

Call `stopOverscrollEvent` when you don't need the element to fire overscroll events

	stopOverscrollEvent(d);

**Note:** Height and width of element is calculate when `getOverscrollEvent` is called. If size of element changes after that then simply call `getOverscrollEvent` again with same element as argumant.
