function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import Checkbox from "@react-ag-components/checkbox";
import * as api from "./api";

import "./commodities.css";

var Commodities = function (_React$Component) {
  _inherits(Commodities, _React$Component);

  function Commodities(props) {
    _classCallCheck(this, Commodities);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getDetails = function () {
      var remotePrintCommodities = [];
      if (_this.state.remotePrint || _this.state.onlyShowCommodities) {
        remotePrintCommodities = _this.state.activeCommodities;
      }
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
      _this.errObj = {};
      _this.errObj.type = "error";
      _this.errObj.msg = "";

      _this.triggerErrObj();
      return _this.errObj;
    };

    _this.triggerErrObj = function () {
      _this.errObj = {};
      _this.errObj.type = "error";

      if (!_this.state.onlyShowCommodities) {
        if (_this.state.remotePrint && _this.state.activeCommodities.length === 0) {
          _this.errObj.msg = "Select at least one commodity to enable my printer";
        } else {
          _this.errObj.msg = "";
        }
      } else {
        if (_this.state.activeCommodities.length === 0) {
          _this.errObj.msg = "Select at least one commodity";
        } else {
          _this.errObj.msg = "";
        }
      }
    };

    _this.handleSave = function () {

      _this.triggerErrObj();

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
        var activeCommodities = null;
        if (hasTarget) {
          activeCommodities = _this.state.activeCommodities.filter(function (activeCommodity) {
            return activeCommodity !== id;
          });
          _this.setState({ activeCommodities: activeCommodities });
          if (_this.props.onCommodityChange) {
            _this.props.onCommodityChange(activeCommodities);
          }
          {
            _this.props.markDirty !== undefined && _this.props.markDirty("activeCommodities", activeCommodities);
          }
        } else {
          activeCommodities = [].concat(_this.state.activeCommodities, [id]);
          _this.setState({ activeCommodities: activeCommodities });
          if (_this.props.onCommodityChange) {
            _this.props.onCommodityChange(activeCommodities);
          }
          {
            _this.props.markDirty !== undefined && _this.props.markDirty("activeCommodities", activeCommodities);
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
      standAloneLabel: props.standAloneLabel || "Save",
      tac: props.tac
    };
    _this.errObj = {};
    return _this;
  }

  Commodities.prototype.componentWillMount = function componentWillMount() {
    if (this.state.tac) {
      if (this.state.tac.body) {
        var tac = {};
        tac.__html = this.state.tac.body.toString('html').replace(/<a /g, '<a rel="external" ');
        this.setState({ tac: tac });
      }
    }
  };

  Commodities.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "my-printer-component" },
        !this.state.onlyShowCommodities && React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "My Printer"
          ),
          React.createElement(Checkbox, {
            label: "Requires My Printer",
            checked: this.state.remotePrint,
            onCheck: this.onCheck("remotePrint")
          }),
          React.createElement(
            "p",
            { className: "extra-info" },
            "The Department allows some documents to be printed in locations outside of the Department's offices. In these cases, clients can print on their premises once they have been assessed and cleared to do so. Select this option if you would like to be assessed for My Printer. If you select no, you can apply for My Printer at a later time via the Account menu within the application."
          )
        ),
        this.state.remotePrint && !this.state.onlyShowCommodities && React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            "My Printer available for following Commodities"
          ),
          React.createElement(
            "p",
            null,
            "Select commodities to enable My Printer."
          )
        ),
        (this.state.remotePrint || this.state.onlyShowCommodities) && React.createElement(
          "div",
          null,
          this.props.commodities && this.props.commodities.map(function (commodity, i) {
            return React.createElement(Checkbox, {
              key: i + commodity.value,
              label: commodity.label,
              checked: _this2.state.activeCommodities.includes(commodity.value),
              onCheck: _this2.handleCommodityChange(commodity.value)
            });
          })
        ),
        this.state.remotePrint && this.state.tac && React.createElement(
          "div",
          { className: "declaration" },
          React.createElement(
            "p",
            null,
            "By clicking the ",
            this.state.standAloneLabel,
            " button below, I hereby agree to and accept the following:"
          ),
          React.createElement("div", { dangerouslySetInnerHTML: this.state.tac })
        ),
        this.state.standAlonePage && React.createElement(
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
}(React.Component);

export default Commodities;