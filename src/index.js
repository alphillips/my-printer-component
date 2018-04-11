import React from "react";

import Checkbox from "@react-ag-components/checkbox";

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
      standAloneLabel: props.standAloneLabel || "Save"
    };
    this.errObj = {}
  }

  getDetails = () => {
    let remotePrintCommodities = []
    remotePrintCommodities = this.state.activeCommodities
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
      if (this.state.remotePrint && this.state.activeCommodities.length === 0) {
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

                {this.state.remotePrint && (
                    <div className="declaration">
                      <p>
                        By clicking the save button below, I hereby agree to
                        and accept the following:
                      </p>
                      <ul>
                        <li>
                          I declare that the information I have provided is
                          true and correct . I understand that it is a
                          criminal offence under the Criminal Code Act 1995 to
                          knowingly give false or misleading information to a
                          Commonwealth officer exercising powers under
                          Commonwealth law. This offence carries a maximum
                          penalty of 12 months imprisonment .
                        </li>
                        <li>
                          {" "}
                          I, and/or the company where I am employed, may be
                          audited by authorised department officers regarding
                          any interaction I have had with NEXDOC, and as part
                          of this process may be asked to provide evidence to
                          substantiate any information I entered into the
                          NEXDOC system .
                        </li>
                        <li>
                          {" "}
                          I have read and understood the Privacy Notice and
                          Privacy Policy.
                        </li>
                        <li>
                          {" "}
                          I consent to the collection, use and disclosure of
                          my personal information, including disclosure to
                          overseas authorities, as set out in the Privacy
                          Notice.
                        </li>
                      </ul>

                      <p className="bold">Privacy Notice:</p>
                      <p>
                        'Personal information' means information or an opinion
                        about an identified, or reasonably identifiable,
                        individual.
                      </p>
                      <p>
                        The Department of Agriculture and Water Resources
                        collects your personal information (as defined in the
                        Privacy Act 1988) in relation to this form for the
                        purposes of assessing your export application and
                        related purposes. If you fail to provide some or all
                        of the personal information requested in this form,
                        the department will be unable to process your
                        application.
                      </p>
                      <p>
                        The department may disclose your personal information
                        to Australian Government agencies, including the
                        Department of Immigration and Border Protection, other
                        Australian agencies, persons or organisations where
                        necessary for the purposes described, provided the
                        disclosure is consistent with relevant laws,
                        particularly the Privacy Act.
                      </p>
                      <p>
                        Your personal information may also be disclosed to
                        overseas governments and relevant authorities in an
                        importing country where this is required for importing
                        country requirements. Overseas authorities in the
                        importing country may not be subject to any privacy
                        obligations or to any principles similar to the
                        Australian Privacy Principles. The department has not
                        taken steps to ensure that the relevant authorities in
                        the importing country do not breach the Australian
                        Privacy Principles. This means that:
                      </p>
                      <ul>
                        <li>
                          relevant authorities in the importing country will
                          not be accountable under the Privacy Act
                        </li>
                        <li>
                          you will not be able to seek redress under the
                          Privacy Act
                        </li>
                        <li>
                          you may not be able to seek redress in the overseas
                          jurisdiction.
                        </li>
                      </ul>

                      <p>
                        Your personal information will be used and stored in
                        accordance with the Australian Privacy Principles.
                      </p>
                      <p>
                        See the department’s <a href="">Privacy Policy </a>web
                        page to learn more about accessing or correcting
                        personal information or making a complaint.
                        Alternatively, telephone the department on +61 6272
                        3933.
                      </p>
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
