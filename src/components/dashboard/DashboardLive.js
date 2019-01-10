import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Block from '../elements/Block';

class DashboardLive extends Component {
    
    state = {layout: this.props.layout};
    maxRows = 5;
    rowHeight = ((window.innerHeight * 0.9 - 10) / this.maxRows) - 10;
    maxCols = 8;

    render() {
        if (this.state.layout.length > 0) {
            this.state.layout.map(layoutBlock => layoutBlock.static = true);
        }

        return (
            <GridLayout className="layout" layout={this.state.layout} cols={this.maxCols} width={window.innerWidth} rowHeight={this.rowHeight} maxRows={this.maxRows} preventCollision={true} compactType={null}>
                {this.createLayout(this.state.layout)}
            </GridLayout>
        )
    }

    createLayout(layout) {
        let layoutElements = [];
        for (let i = 0; i < layout.length; i++) {
            layoutElements.push(<div key={layout[i].i} className="dashboard-block"><Block id={layout[i].i} mode="live" widget={this.props.layout[i].widget}></Block></div>);
        }
        return layoutElements;
    }
}

export default DashboardLive;
