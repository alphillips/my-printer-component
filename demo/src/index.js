import React, {Component} from 'react'
import {render} from 'react-dom'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import './uikit.css'
import './base.css'

import Commodities from '../../src'

// window.IS_STAFF = true

let commodities = [
  {value: "D",label: "Dairy (Just For Testing)"},
  {value: "F",label: "Fish (Just For Testing)"},
  {value: "H",label: "Hort (For Testing Only)"},
  {value: "X",label: "All Other Goods"}
]

let activeCommodities = []

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodities: commodities,
      activeCommodities: activeCommodities
    }
    this.tacJSON = {"body":"<ul>\n  <li>testI declared that the information I have provided is true and correct . I understand that it is a criminal offence under the Criminal Code Act 1995 to knowingly give false or misleading information to a Commonwealth officer exercising powers under Commonwealth law. This offence carries a maximum penalty of 12 months imprisonment&nbsp;</li>\n  <li>I, and/or the company where I am employed, may be audited by authorised department officers regarding any interaction I have had with NEXDOC, and as part of this process may be asked to provide evidence to substantiate any information I entered into the NEXDOC system .</li>\n  <li>I have read and understood the Privacy Notice and Privacy Policy.</li>\n  <li>I consent to the collection, use and disclosure of my personal information, including disclosure to overseas authorities, as set out in the Privacy Notice.</li>\n</ul>\n<p>Privacy Notice:</p>\n<p>'Personal information' means information or an opinion about an identified, or reasonably identifiable, individual.</p>\n<p>The Department of Agriculture and Water Resources collects your personal information (as defined in the Privacy Act 1988) in relation to this form for the purposes of assessing your export application and related purposes. If you fail to provide some or all of the personal information requested in this form, the department will be unable to process your application.</p>\n<p>The department may disclose your personal information to Australian Government agencies, including the Department of Immigration and Border Protection, other Australian agencies, persons or organisations where necessary for the purposes described, provided the disclosure is consistent with relevant laws, particularly the Privacy Act.</p>\n<p>Your personal information may also be disclosed to overseas governments and relevant authorities in an importing country where this is required for importing country requirements. Overseas authorities in the importing country may not be subject to any privacy obligations or to any principles similar to the Australian Privacy Principles. The department has not taken steps to ensure that the relevant authorities in the importing country do not breach the Australian Privacy Principles. This means that:</p>\n<ul>\n  <li>relevant authorities in the importing country will not be accountable under the Privacy Act</li>\n  <li>you will not be able to seek redress under the Privacy Act</li>\n  <li>you may not be able to seek redress in the overseas jurisdiction.</li>\n</ul>\n<p>\tYour personal information will be used and stored in accordance with the Australian Privacy Principles.</p>\n<p>\tSee the department’s <a target=\"_blank\" href=\"http://www.agriculture.gov.au/about/privacy\">Privacy Policy</a> web page to learn more about accessing or correcting personal information or making a complaint. Alternatively, telephone the department on +61 6272 3933.</p>\n"}
  }

  handleSubmit = () => {
    this.refs.commodities.handleSave()
  }

  render() {
    return (<div className="uikit-body">
    <MuiThemeProvider>

    {this.state.commodities && this.state.activeCommodities &&
                        this.state.commodities.length > 0 && (
      <Commodities
        ref="commodities"
        commodities={this.state.commodities}
        tac={this.tacJSON}
        activeCommodities={this.state.activeCommodities}
        onlyShowCommodities={false}
        standAlonePage={true}
      />
    )}
    </MuiThemeProvider>

    <button onClick={this.handleSubmit}>Submit from Host</button>
    </div>
  )}
}

render(<Demo/>, document.querySelector('#demo'))
