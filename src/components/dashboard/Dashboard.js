import React, { Component } from 'react';
import DashboardEdit from './DashboardEdit';
import DashboardLive from './DashboardLive';
import { Route, Switch } from "react-router-dom";


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            layout: [
                {i: 'a', x: 0, y: 2, w: 4, h: 3, 
                    widget: {
                        type: 'curvechart',
                        title: 'Productions over the day',
                        description: 'Widget description',
                        data: [
                            {x: 10, y:10},
                            {x: 20, y:40},
                            {x: 30, y:30},
                            {x: 40, y:60},
                            {x: 50, y:40},
                        ],
                        options: {}
                    }
                },
                {i: 'b', x: 0, y: 0, w: 2, h: 2, 
                    widget: {
                        type: 'kpi',
                        title: 'Zone 1 production',
                        description: 'Widget description',
                        data: [
                            {value: 90, over: 100, name: 'Production'}
                        ],
                        options: {}
                    }
                },
                {i: 'c', x: 2, y: 0, w: 2, h: 2, 
                    widget: {
                        type: 'kpi',
                        title: 'Global production rate',
                        description: 'Widget description',
                        data: [
                            {value: 43, over: 100, name: 'Efficiency'}
                        ],
                        options: {}
                    }
                },
                {i: 'd', x: 4, y: 0, w: 2, h: 2, 
                    widget: {
                        type: 'kpi',
                        title: 'Machine 442',
                        description: 'Widget description',
                        data: [
                            {value: 122, over: 500, name: 'Speed'}
                        ],
                        options: {}
                    }
                },
                {i: 'e', x: 4, y: 3, w: 4, h: 2, 
                    widget: {
                        type: 'barchart',
                        title: 'Production by zone',
                        description: 'Widget description',
                        data: [
                            {x: 10, y:10},
                            {x: 20, y:40},
                            {x: 30, y:30},
                            {x: 40, y:60},
                            {x: 50, y:40},
                        ],
                        options: {}
                    }
                },
            ]
        };
    }

    render() {
        return (
        <div className="dashboard">
                <Switch>
                    <Route path="/edit" render={(props) => <DashboardEdit {...props} layout={this.state.layout} updateLayout={this.updateLayout.bind(this)}/>} />
                    <Route path="/dashboard" render={(props) => <DashboardLive {...props} layout={this.state.layout} />} />
                </Switch>
                <button onClick={this.updateData.bind(this)}>Update</button>
        </div>
        )
    }

    updateLayout(layout) {
        const newLayout = layout;
        for (let i = 0; i < this.state.layout.length; i++) {
            let index = -1;
            newLayout.filter((elm, ind) => {
                if (elm.i === this.state.layout[i].i) {
                    index = ind;
                }
                return elm.i === this.state.layout[i].i;
            });
            if (index !== -1) {
                newLayout[index].widget = this.state.layout[i].widget;
            }
        }
        this.setState({layout: newLayout});
    }

    updateData() {
        //  KPI
        const newValue = Math.round(Math.random() * 100);
        const newData = {value: newValue, over: 100, name: 'Production'}
        const newWidget = this.state.layout[1].widget;
        newWidget.data[0] = newData;
        const newLayoutElm = this.state.layout[1];
        newLayoutElm.widget = newWidget;

        //  Barchart
        const newValuesBarchart = []; 
        const barsNumber = Math.round(Math.random() * 20);
        for (let i = 0; i < 15; i++) {
            newValuesBarchart.push({x: (10 * (i + 1)), y: Math.round(Math.random() * 100)})
        }
        const newWidgetBarchart = this.state.layout[0].widget;
        newWidgetBarchart.data = newValuesBarchart;
        const newLayoutElmBarchart = this.state.layout[0];
        newLayoutElmBarchart.widget = newWidgetBarchart;
        this.setState({layout: [newLayoutElmBarchart, newLayoutElm]});
    }
}

export default Dashboard;
