"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var book_header_1 = require("./book-header");
var book_description_1 = require("./book-description");
var book_cover_1 = require("./book-cover");
;
;
var BookReducedView = /** @class */ (function (_super) {
    __extends(BookReducedView, _super);
    function BookReducedView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookReducedView.prototype.render = function () {
        return (react_1["default"].createElement(antd_1.Row, { type: "flex" },
            react_1["default"].createElement(antd_1.Col, null,
                react_1["default"].createElement(book_cover_1["default"], { book: this.props.book, size: "small" })),
            react_1["default"].createElement(antd_1.Col, null,
                react_1["default"].createElement(book_header_1["default"], { book: this.props.book, author: true }),
                react_1["default"].createElement(book_description_1["default"], { book: this.props.book, size: "small" }))));
    };
    return BookReducedView;
}(react_1["default"].Component));
exports["default"] = BookReducedView;
