import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import * as uuid from 'uuid';
import Block from '../elements/Block';

class DashboardEdit extends Component {

    maxRows = 5;
    rowHeight = ((window.innerHeight * 0.9 - 10) / this.maxRows) - 10;
    maxCols = 8;

    state = {layout: this.props.layout};

    render() {

        return (
            <React.Fragment>
                <GridLayout className="layout" layout={this.state.layout} data-grid={this.state.layout} cols={this.maxCols} width={window.innerWidth} rowHeight={this.rowHeight} maxRows={this.maxRows} preventCollision={true} verticalCompact={false} onResizeStop={this.resizedBlock.bind(this)}>
                    {this.createLayout(this.state.layout)}
                </GridLayout>
                <button onClick={this.addBlock.bind(this)}>Add</button>
            </React.Fragment>
        )
    }

    createLayout(layout) {
        let layoutElements = [];
        for (let i = 0; i < layout.length; i++) {
            layoutElements.push(<div key={layout[i].i} className="dashboard-block" data-grid={layout[i]}><Block id={layout[i].i}></Block></div>);
        }
        return layoutElements;
    }

    resizedBlock(newLayout) {
        //  Update layout
        this.setState({layout: newLayout});
    }

    addBlock = () => {
        const avaliableSquare = this.avaliableSquare(this.state.layout, this.maxRows, this.maxCols);
        const newLayout = this.state.layout;
        if (avaliableSquare.x !== -1 && avaliableSquare.y !== -1) {
            newLayout.push({i: uuid(), x: avaliableSquare.x, y: avaliableSquare.y, h: 1, w: 1});
            this.setState({layout: newLayout});
        }
    }

    avaliableSquare(layoutTmp, maxRowsTmp, maxColsTmp) {
        //  Construct matrix
        const layoutMatrix = [];
        for (let i = 0; i < maxRowsTmp; i++) {
            const row = [];
            for (let j = 0; j < maxColsTmp; j++) {
                row.push(0);
            }
            layoutMatrix.push(row);
        }

        //  Identify used squares
        layoutTmp.forEach(layoutBlock => {
            for (let i = layoutBlock.x; i < layoutBlock.x + layoutBlock.w; i++) {
                for (let j = layoutBlock.y; j < layoutBlock.y + layoutBlock.h; j++) {
                    layoutMatrix[j][i] = 1;
                }
            }
        });

        //  Find first Empty space
        for (let i = 0; i < layoutMatrix.length; i++) {
            for (let j = 0; j < layoutMatrix[i].length; j++) {
                if (layoutMatrix[i][j] === 0) {
                    return {x: j, y: i};
                }
            }
        }
        return {x: -1, y: -1};
    }
}

export default DashboardEdit;
