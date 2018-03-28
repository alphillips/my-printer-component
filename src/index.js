import React from "react";

import Checkbox from "@react-ag-components/checkbox";

import "./commodities.css";

class Commodities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commodities: props.commodities || [],
      activeCommodities: props.activeCommodities || [],
    };
  }

  getDetails = () => {
    let remotePrintCommodities = []
    remotePrintCommodities = this.state.activeCommodities
    return remotePrintCommodities
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
        <h3>Export Commodities</h3>
        <p>Select all commodities this exporter will be exporting</p>
        <div>
          {this.state.commodities.map((commodity, i) => (
            <Checkbox
              key={i + commodity.value}
              label={commodity.label}
              checked={this.state.activeCommodities.includes(commodity.value)}
              onCheck={this.handleCommodityChange(commodity.value)}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Commodities;
