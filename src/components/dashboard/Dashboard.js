import React, { Component } from 'react';
import DashboardEdit from './DashboardEdit';
import DashboardLive from './DashboardLive';
import { BrowserRouter as Router, Route } from "react-router-dom";


class Dashboard extends Component {

    state = {
        layout: [
            {i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 1, y: 0, w: 3, h: 1},
            {i: 'c', x: 4, y: 0, w: 1, h: 2},
            {i: 'd', x: 5, y: 0, w: 1, h: 10}
        ]
    };

    render() {
        return (
        <div className="dashboard">
            <Router>
                <div>
                    <Route path="/edit" render={(props) => <DashboardEdit {...props} layout={this.state.layout} />} />
                    <Route path="/dashboard" render={(props) => <DashboardLive {...props} layout={this.state.layout} />} />
                </div>
            </Router>
        </div>
        )
    }
}

export default Dashboard;
