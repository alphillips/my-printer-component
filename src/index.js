import React from "react";

import Checkbox from "@react-ag-components/checkbox";
import * as api from "./api";

import "./commodities.css";

class Commodities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commodities: props.commodities || [],
      activeCommodities: props.activeCommodities || [],
      onlyShowCommodities: props.onlyShowCommodities || false,
      remotePrint: props.activeCommodities && props.activeCommodities.length > 0 || false,
      standAlonePage: props.standAlonePage || false,
      standAloneLabel: props.standAloneLabel || "Save",
      tac:props.tac || null
    };
    this.errObj = {}
  }

  componentWillMount() {
    if(this.state.tac){
      let tac = {}
      tac.__html = this.state.tac.body.toString('html').replace(/<a /g, '<a rel="external" ')
      this.setState({tac})
    }
  }

  getDetails = () => {
    let remotePrintCommodities = []
    if (this.state.remotePrint || this.state.onlyShowCommodities) {
      remotePrintCommodities = this.state.activeCommodities
    }
    return remotePrintCommodities
  }

  onCheck = (field) => {
    return (value) => {
      this.setState((prevState, props) => ({
        [field]: !this.state[field]
      }));
    };
  };

  getErrorObj = () => {
    this.errObj = {}
    this.errObj.type = "error"
    this.errObj.msg = ""

    this.triggerErrObj()
    return this.errObj
  }

  triggerErrObj = () => {
    this.errObj = {}
    this.errObj.type = "error"

    if(!this.state.onlyShowCommodities) {
      if (this.state.remotePrint && this.state.activeCommodities.length === 0) {
        this.errObj.msg = "Select at least one commodity to enable my printer"
      } else {
        this.errObj.msg = ""
      }
    }else{
      if (this.state.activeCommodities.length === 0) {
        this.errObj.msg = "Select at least one commodity"
      } else {
        this.errObj.msg = ""
      }
    }
  }

  handleSave = () => {

    this.triggerErrObj()

    this.props.myPrinterMsg(this.errObj)

    if(this.state.standAlonePage){
      if(this.errObj.msg === "") {
        this.props.handleMyPrinterSave()
      }
    }
  }

  handleCommodityChange = id => {
    return () => {
      let hasTarget = this.state.activeCommodities.includes(id);
      if (hasTarget) {
        this.setState({
          activeCommodities: this.state.activeCommodities.filter(activeCommodity => activeCommodity !== id)
        });
        {this.props.markDirty !== undefined &&
          this.props.markDirty("activeCommodities", this.state.activeCommodities.filter(activeCommodity => activeCommodity !== id))
        }
      } else {
        this.setState({
          activeCommodities: [...this.state.activeCommodities, id]
        });
        {this.props.markDirty !== undefined &&
          this.props.markDirty("activeCommodities", [...this.state.activeCommodities, id])
        }
      }
    };
  };

  render() {
    return (
      <div>
        <div className="my-printer-component">
          {!this.state.onlyShowCommodities && (
              <div>
                <h2>My Printer</h2>

                <Checkbox
                  label="Requires My Printer"
                  checked={this.state.remotePrint}
                  onCheck={this.onCheck("remotePrint")}
                />
                <p className="extra-info">
                  The Department allows some documents to be print in
                  locations outside of the Departments offices. In these
                  cases, client can print on their premises once they have
                  been assessed and cleared to do so. Select this option if
                  you would like to be assessed to my printer.
                  Alternatively, you can apply for my printer at a later
                  time via Account menu within the application.
                </p>
              </div>
            )}

            {(this.state.remotePrint && !this.state.onlyShowCommodities) && (
              <div>
                <h3>My Printer available for following Commodities</h3>
                <p>Select commodities to enable My Printer.</p>
              </div>
            )}

                {(this.state.remotePrint || this.state.onlyShowCommodities) && (
                  <div>
                    {this.props.commodities && this.props.commodities.map((commodity, i) => (
                      <Checkbox
                        key={i + commodity.value}
                        label={commodity.label}
                        checked={this.state.activeCommodities.includes(commodity.value)}
                        onCheck={this.handleCommodityChange(commodity.value)}
                      />
                    ))}
                  </div>
                )}

                {this.state.remotePrint && this.state.tac &&(
                  <div className="declaration">
                    <p>
                      By clicking the {this.state.standAloneLabel} button below, I hereby agree to
                      and accept the following:
                    </p>
                    <div dangerouslySetInnerHTML={this.state.tac} />
                  </div>
                )}
                {this.state.standAlonePage &&
                <button
                  className="uikit-btn"
                  onClick={this.handleSave}
                >{this.state.standAloneLabel}</button>
              }
        </div>
      </div>
    );
  }
}
export default Commodities;
