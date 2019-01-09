import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class DashboardLive extends Component {

    maxRows = 5;
    rowHeight = ((window.innerHeight * 0.9 - 10) / this.maxRows) - 10;
    maxCols = 8;

    render() {
        const { layout } = this.props;
        if (layout.length > 0) {
            layout.map(layoutBlock => layoutBlock.static = true);
        }


        return (
            <GridLayout className="layout" layout={layout} cols={this.maxCols} width={window.innerWidth} rowHeight={this.rowHeight} maxRows={this.maxRows} preventCollision={true} verticalCompact={false}>
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

export default DashboardLive;
