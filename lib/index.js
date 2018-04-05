"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _checkbox = require("@react-ag-components/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

require("./commodities.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Commodities = function (_React$Component) {
  _inherits(Commodities, _React$Component);

  function Commodities(props) {
    _classCallCheck(this, Commodities);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getDetails = function () {
      var remotePrintCommodities = [];
      remotePrintCommodities = _this.state.activeCommodities;
      return remotePrintCommodities;
    };

    _this.onCheck = function (field) {
      return function (value) {
        _this.setState(function (prevState, props) {
          var _ref;

          return _ref = {}, _ref[field] = !_this.state[field], _ref;
        });
      };
    };

    _this.getErrorObj = function () {
      return _this.errObj;
    };

    _this.handleSave = function () {

      _this.errObj = {};
      _this.errObj.type = "error";

      if (_this.state.remotePrint && _this.state.activeCommodities.length === 0) {
        _this.errObj.msg = "Select at least one commodity to enable my printer";
      } else {
        _this.errObj.msg = "";
      }

      _this.props.myPrinterMsg(_this.errObj);

      if (_this.state.standAlonePage) {
        if (_this.errObj.msg === "") {
          _this.props.handleMyPrinterSave();
        }
      }
    };

    _this.handleCommodityChange = function (id) {
      return function () {
        var hasTarget = _this.state.activeCommodities.includes(id);
        if (hasTarget) {
          _this.setState({
            activeCommodities: _this.state.activeCommodities.filter(function (activeCommodity) {
              return activeCommodity !== id;
            })
          });
          {
            _this.props.markDirty !== undefined && _this.props.markDirty("activeCommodities", _this.state.activeCommodities.filter(function (activeCommodity) {
              return activeCommodity !== id;
            }));
          }
        } else {
          _this.setState({
            activeCommodities: [].concat(_this.state.activeCommodities, [id])
          });
          {
            _this.props.markDirty !== undefined && _this.props.markDirty("activeCommodities", [].concat(_this.state.activeCommodities, [id]));
          }
        }
      };
    };

    _this.state = {
      commodities: props.commodities || [],
      activeCommodities: props.activeCommodities || [],
      onlyShowCommodities: props.onlyShowCommodities || false,
      remotePrint: props.activeCommodities && props.activeCommodities.length > 0 || false,
      standAlonePage: props.standAlonePage || false,
      standAloneLabel: props.standAloneLabel || "Save"
    };
    _this.errObj = {};
    return _this;
  }

  Commodities.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "my-printer-component" },
        !this.state.onlyShowCommodities && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "h2",
            null,
            "My Printer"
          ),
          _react2.default.createElement(_checkbox2.default, {
            label: "Requires My Printer",
            checked: this.state.remotePrint,
            onCheck: this.onCheck("remotePrint")
          }),
          _react2.default.createElement(
            "p",
            { className: "extra-info" },
            "The Department allows some documents to be print in locations outside of the Departments offices. In these cases, client can print on their premises once they have been assessed and cleared to do so. Select this option if you would like to be assessed to my printer. Alternatively, you can apply for my printer at a later time via Account menu within the application."
          )
        ),
        this.state.remotePrint && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "h3",
            null,
            "My Printer available for following Commondities"
          ),
          _react2.default.createElement(
            "p",
            null,
            "Select commodities to enable My Printer."
          )
        ),
        (this.state.remotePrint || this.state.onlyShowCommodities) && _react2.default.createElement(
          "div",
          null,
          this.props.commodities && this.props.commodities.map(function (commodity, i) {
            return _react2.default.createElement(_checkbox2.default, {
              key: i + commodity.value,
              label: commodity.label,
              checked: _this2.state.activeCommodities.includes(commodity.value),
              onCheck: _this2.handleCommodityChange(commodity.value)
            });
          })
        ),
        this.state.remotePrint && _react2.default.createElement(
          "div",
          { className: "declaration" },
          _react2.default.createElement(
            "p",
            null,
            "By clicking the save button below, I hereby agree to and accept the following:"
          ),
          _react2.default.createElement(
            "ul",
            null,
            _react2.default.createElement(
              "li",
              null,
              "I declare that the information I have provided is true and correct . I understand that it is a criminal offence under the Criminal Code Act 1995 to knowingly give false or misleading information to a Commonwealth officer exercising powers under Commonwealth law. This offence carries a maximum penalty of 12 months imprisonment ."
            ),
            _react2.default.createElement(
              "li",
              null,
              " ",
              "I, and/or the company where I am employed, may be audited by authorised department officers regarding any interaction I have had with NEXDOC, and as part of this process may be asked to provide evidence to substantiate any information I entered into the NEXDOC system ."
            ),
            _react2.default.createElement(
              "li",
              null,
              " ",
              "I have read and understood the Privacy Notice and Privacy Policy."
            ),
            _react2.default.createElement(
              "li",
              null,
              " ",
              "I consent to the collection, use and disclosure of my personal information, including disclosure to overseas authorities, as set out in the Privacy Notice."
            )
          ),
          _react2.default.createElement(
            "p",
            { className: "bold" },
            "Privacy Notice:"
          ),
          _react2.default.createElement(
            "p",
            null,
            "'Personal information' means information or an opinion about an identified, or reasonably identifiable, individual."
          ),
          _react2.default.createElement(
            "p",
            null,
            "The Department of Agriculture and Water Resources collects your personal information (as defined in the Privacy Act 1988) in relation to this form for the purposes of assessing your export application and related purposes. If you fail to provide some or all of the personal information requested in this form, the department will be unable to process your application."
          ),
          _react2.default.createElement(
            "p",
            null,
            "The department may disclose your personal information to Australian Government agencies, including the Department of Immigration and Border Protection, other Australian agencies, persons or organisations where necessary for the purposes described, provided the disclosure is consistent with relevant laws, particularly the Privacy Act."
          ),
          _react2.default.createElement(
            "p",
            null,
            "Your personal information may also be disclosed to overseas governments and relevant authorities in an importing country where this is required for importing country requirements. Overseas authorities in the importing country may not be subject to any privacy obligations or to any principles similar to the Australian Privacy Principles. The department has not taken steps to ensure that the relevant authorities in the importing country do not breach the Australian Privacy Principles. This means that:"
          ),
          _react2.default.createElement(
            "ul",
            null,
            _react2.default.createElement(
              "li",
              null,
              "relevant authorities in the importing country will not be accountable under the Privacy Act"
            ),
            _react2.default.createElement(
              "li",
              null,
              "you will not be able to seek redress under the Privacy Act"
            ),
            _react2.default.createElement(
              "li",
              null,
              "you may not be able to seek redress in the overseas jurisdiction."
            )
          ),
          _react2.default.createElement(
            "p",
            null,
            "Your personal information will be used and stored in accordance with the Australian Privacy Principles."
          ),
          _react2.default.createElement(
            "p",
            null,
            "See the department\u2019s ",
            _react2.default.createElement(
              "a",
              { href: "" },
              "Privacy Policy "
            ),
            "web page to learn more about accessing or correcting personal information or making a complaint. Alternatively, telephone the department on +61 6272 3933."
          )
        ),
        this.state.standAlonePage && _react2.default.createElement(
          "button",
          {
            className: "uikit-btn",
            onClick: this.handleSave
          },
          this.state.standAloneLabel
        )
      )
    );
  };

  return Commodities;
}(_react2.default.Component);

exports.default = Commodities;
module.exports = exports["default"];