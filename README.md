# overscroll
JavaScript functions for listening to `overscroll` events on touch devices.

[Example](https://namannehra.github.io/overscroll/)

Load the file using script tag in head

	<script src="overscroll-transformed.js"></script>

Call `getOverscrollEvent` and pass an element as argumenmt

	var d = document.querySelector('#d');
	getOverscrollEvent(d);

Now this element will fire overscroll events. Listen using addEventListener. The `detail` of event has 5 properties. `top`, `right`, `bottom` and `left` are the respective overflow in pixel. If there is no overflow then their value is `0`. The 5th property is `sourceEvent`. It is the original `touchmove` event which is used to calculate overflow. You may call `preventDefault` on `touchmove` event to stop scrolling.

	d.addEventListener(`overscroll`, function(e) {
		var det = e.detail;
		var top = det.top;
		console.log('overscroll top is ', top);
	});

Call `stopOverscrollEvent` when you don't need the element to fire overscroll event as this event is has heavy on scrolling performance

	stopOverscrollEvent(d);

`firesOverscrollEvent` can be used to check if an element is firing overscroll events.

	firesOverscrollEvent(d); //true

**Note:** Height and width of element is calculate when user touches the element. If size of element changes while user is touhing then call `getOverscrollEvent` again with same element as argumant to recalculate the reise.

`overscroll.js` is the original file and uses `const`, `let` and `arrow functions` which may not be supported in all browsers. `overscroll-transformed.js` is genetared using [babeljs](https://babeljs.io/) and will work in most browsers.
