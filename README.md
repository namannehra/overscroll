# overscroll
JavaScript functions for listening to `overscroll` events on touch devices.

[Example](https://namannehra.github.io/overscroll/)

## Setup
Load the file using script tag in head

	<script src="overscroll-transformed.js"></script>

## Use
Call `OverscrollEvent.start` and pass an element as argumenmt

	var d = document.querySelector('#d');
	OverscrollEvent.start(d);

Now this element will fire `overscroll` events. Listen using addEventListener. The `detail` of event has following properties:

| Property | Type | Description |
| --- | --- | --- |
| top | Number | top overscroll |
| right | Number | right overscroll |
| bottom | Number | bottom overscroll |
| left | Number | left overscroll |
| sourceEvent | Object | Original Touch Event which is used it calculate `overscroll` |

	d.addEventListener(`overscroll`, function(e) {
		var det = e.detail;
		var top = det.top;
		console.log('overscroll top is ', top);
	});

Call `OverscrollEvent.stop` when you don't need the element to fire `overscroll` event as `overscroll` events are heavy on scrolling performance

	OverscrollEvent.stop(d);

`OverscrollEvent.fires` can be used to check if an element is firing `overscroll` events.

	OverscrollEvent.fires(d); //true

`overscroll.js` is the original file and uses `const`, `let` and `arrow functions` which may not be supported in all browsers. `overscroll-transformed.js` is genetared using [babeljs](https://babeljs.io/) and will work in most browsers.

## Notes
* `overscroll` events only work in browsers which support Touch Events and fires Touch Events without CSS touch-action property (Currently only Chrome).
* `top`, `right`, `bottom` and `left` properties will be `0` when there is no `overscroll` in the perticular direction.
* Height and width of element is calculate when user touches the element (using touchstart event). If size of element changes while user is touhing then call `OverscrollEvent.update` with the element as argumant to recalculate the size.
* `preventDefault` can be called on `sourceEvent` property to prevent scrolling.
