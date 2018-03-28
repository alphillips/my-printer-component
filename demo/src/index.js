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

let activeCommodities = ["X"]

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodities: commodities,
      activeCommodities: activeCommodities
    }
  }

  render() {
    return (<div className="uikit-body">
    <MuiThemeProvider>

    {this.state.commodities && this.state.activeCommodities &&
                        this.state.commodities.length > 0 && (
      <Commodities
        ref="commodities"
        commodities={this.state.commodities}
        activeCommodities={this.state.activeCommodities}
        onlyShowCommodities={false}
      />
    )}
    </MuiThemeProvider>

    </div>
  )}
}

render(<Demo/>, document.querySelector('#demo'))
