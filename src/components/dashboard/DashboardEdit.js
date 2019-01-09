import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class DashboardEdit extends Component {

  render() {
    const { layout } = this.props;

    const maxRows = 10;

    return (
        <GridLayout className="layout" layout={layout} cols={12} width={window.innerWidth} rowHeight={((window.innerHeight * 0.9 - 10) / maxRows) - 10} maxRows={maxRows} preventCollision={true}>
            {this.createLayout(layout)}
        </GridLayout>
    )
  }

  createLayout(layout) {
    let layoutElements = [];
    for (let i = 0; i < layout.length; i++) {
        layoutElements.push(<div key={layout[i].i} className="dashboard-block">{layout[i].i}</div>);
    }
    return layoutElements;
}
}

export default DashboardEdit;
