import React, { Component } from 'react';
import DashboardEdit from './DashboardEdit';
import DashboardLive from './DashboardLive';
import { Route, Switch } from "react-router-dom";


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            layout: [
                {i: 'a', x: 0, y: 0, w: 3, h: 3, 
                    widget: {
                        type: 'Widget type',
                        title: 'Widget title',
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
}

export default Dashboard;
