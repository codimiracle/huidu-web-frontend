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
var retry_view_1 = require("./retry-view");
var direct_link_1 = require("./direct-link");
var network_util_1 = require("../util/network-util");
var api_config_1 = require("../configs/api-config");
var book_header_1 = require("./book/book-header");
var book_description_1 = require("./book/book-description");
var EMPTY_IMAGE = '/assets/empty-audio.png';
;
;
var AudioBookView = /** @class */ (function (_super) {
    __extends(AudioBookView, _super);
    function AudioBookView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            book: props.book,
            loading: !!props.id,
            joined: false,
            joining: false,
            retry: false
        };
        return _this;
    }
    AudioBookView.prototype.onJoinShelfClick = function () {
        var _this = this;
        var book = this.state.book;
        this.setState({ joining: true });
        network_util_1.fetchMessageByPost(api_config_1.API.UserShelfJoin, {
            book_id: book.id
        }).then(function (msg) {
            if (msg.code == 200) {
                _this.setState({ joined: true });
            }
            else {
                antd_1.message.error(msg.message);
            }
        })["catch"](function (err) {
            antd_1.message.error("\u52A0\u5165\u4E66\u67B6\u5931\u8D25\uFF1A" + err);
        })["finally"](function () {
            _this.setState({ joining: false });
        });
    };
    AudioBookView.prototype.fetchBook = function () {
        var id = this.props.id;
        if (!!id) {
            this.setState({ loading: true });
        }
    };
    AudioBookView.prototype.render = function () {
        var _this = this;
        var _a = this.state, book = _a.book, loading = _a.loading, retry = _a.retry, joined = _a.joined, joining = _a.joining;
        return (react_1["default"].createElement(retry_view_1["default"], { visible: !loading && retry, onClick: function () { return _this.fetchBook(); } },
            react_1["default"].createElement("div", { className: "audio-book" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("img", { src: book.cover || book.metadata.cover || EMPTY_IMAGE })),
                react_1["default"].createElement("div", { className: "body" },
                    react_1["default"].createElement(book_header_1["default"], { book: book, status: true, author: true }),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(antd_1.Rate, { defaultValue: 2.5, disabled: true, style: { fontSize: '18px' } })),
                    react_1["default"].createElement(book_description_1["default"], { book: book, size: "small", style: { flex: 1 } }),
                    react_1["default"].createElement("div", { className: "actions" },
                        react_1["default"].createElement(direct_link_1["default"], { href: "/player/[book_id]", as: "/player/" + book.id },
                            react_1["default"].createElement(antd_1.Button, { size: "small" }, "\u5728\u7EBF\u542C\u4E66")),
                        " ",
                        react_1["default"].createElement(antd_1.Button, { size: "small", loading: joining, disabled: joined, onClick: function () { return _this.onJoinShelfClick(); } }, joined ? '已加入' : '加入书架')))),
            react_1["default"].createElement("style", { jsx: true }, "\n          .audio-book {\n            padding: 0.5em;\n            display: flex;\n          }\n          img {\n            background-color: #f7f7f7;\n            border-radius: 4px;\n            width: 7em;\n            height: 9.4em;\n          }\n          .body {\n            padding: 0.5em;\n            display: flex;\n            flex-direction: column;\n          }\n          ")));
    };
    return AudioBookView;
}(react_1["default"].Component));
exports["default"] = AudioBookView;
