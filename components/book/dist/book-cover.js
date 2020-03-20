"use strict";
exports.__esModule = true;
var book_1 = require("../../types/book");
function BookCover(props) {
    var bookPreview = book_1.BookPreview.valueOf(props.book);
    var width = '7em';
    var height = '9.4em';
    if (props.size === 'small') {
        width = '5em';
        height = '6.7em';
    }
    if (props.size === 'large') {
        width = '192px';
        height = '264px';
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("img", { src: bookPreview.cover }),
        React.createElement("style", { jsx: true }, "\n        img {\n          max-width: " + width + ";\n          height: " + height + ";\n        }\n      ")));
}
exports["default"] = BookCover;
