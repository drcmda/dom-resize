Library to make it easy to listen for element resize events

Forked from: https://github.com/KyleAMathews/element-resize-event

## Install
`npm install dom-resize`

## Dependencies
This library depends on the availability of `requestAnimationFrame` and `cancelAnimationFrame`

## Usage
```javascript
import { resizeListen, resizeUnlisten } from 'dom-resize'

const target = document.getElementById("target")

// Subscribe to resize event
resizeListen(target, () => {
  console.log("resized!");
  console.log(target.offsetWidth);
});

// Unsubscribe event
resizeUnlisten(target)
```
