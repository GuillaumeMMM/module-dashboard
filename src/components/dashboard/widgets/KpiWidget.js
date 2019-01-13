import React, { Component } from 'react';
import './kpiWidget.scss';
import * as d3 from 'd3';
import { styles } from '../../../constants';

class KpiWidget extends Component {

    state = {
        //  Constants
        donutStrokeWidth: 30,
        lastValue: this.props.data[0].value,
        lastOver: this.props.data[0].over,
    };

    render() {
        return (
            <React.Fragment>
                <div className={"svg-container-" + this.props.id}>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const svg = d3.select('.svg-container-' + this.props.id).append('svg')
            .attr('id', 'svg-' + this.props.id)
            .attr('width', this.props.dimensions.width)
            .attr('height', this.props.dimensions.height)
            .attr('viewBox', '0 0 1000 1000');

        const group = svg.append('g').attr('transform', 'translate(500, 500)');

        this.setState({svg: svg, group: group}, () => {
            this.appendCircleArcs();
            this.appendTexts();
        });
    }

    componentWillReceiveProps(props) {
        //  Ensure that the component is mounted and the state is set before updating the graph
        if (this.state.pathGood) {
            this.update(props.data[0]);
        } 
    }

    appendCircleArcs() {
        let arcGood = d3.arc()
            .innerRadius(400 - this.state.donutStrokeWidth)
            .outerRadius(400)
            .startAngle(0)
            .endAngle(2 * Math.PI * this.props.data[0].value / this.props.data[0].over);
        let arcBack = d3.arc()
            .innerRadius(400 - this.state.donutStrokeWidth)
            .outerRadius(400)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const pathBack = this.state.group.selectAll('.path-back').data(this.props.data)
            .enter().append('path').attr('class', 'path-back')
            .attr('d', arcBack)
            .attr('fill', styles.textDarkSecondary);

        const pathGood = this.state.group.selectAll('.path-good').data(this.props.data)
            .enter().append('path').attr('class', 'path-good')
            .attr('d', arcGood)
            .attr('fill', styles.primary);

        this.setState({pathBack: pathBack, pathGood: pathGood});
    }

    appendTexts() {
        const valueText = this.state.group.selectAll('.text-value').data(this.props.data)
        .enter().append('text')
            .attr('class', 'text-value')
            .attr('x', 0)
            .attr('y', 0)
            .attr('font-size', 100)
            .attr('font-family', 'sans-serif')
            .style('text-anchor', 'middle')
            .style('alignment-baseline', 'middle')
            .attr('fill', styles.textDarkPrimary)
            .text((d) => d.value);

        const kpiNameText = this.state.group.selectAll('.text-name').data(this.props.data)
            .enter().append('text')
                .attr('class', 'text-name')
                .attr('x', 0)
                .attr('y', 100)
                .attr('font-size', 60)
                .attr('font-family', 'sans-serif')
                .style('text-anchor', 'middle')
                .style('alignment-baseline', 'middle')
                .attr('fill', styles.textDarkSecondary)
                .text((d) => d.name);

        this.setState({valueText: valueText, kpiNameText: kpiNameText});
    }

    update(newData) {
        const previousValue = this.state.lastValue;
        const previousOver = this.state.lastOver;
        this.setState({ data: [{ value: newData.value, over: 100 }] }, () => {
            const arcTweenGood = (a) => {
                let i = d3.interpolate(2 * Math.PI * previousValue / previousOver, 2 * Math.PI * this.props.data[0].value / this.props.data[0].over);
                return (t) => {
                    return d3.arc()
                        .innerRadius(400 - this.state.donutStrokeWidth)
                        .outerRadius(400)
                        .startAngle(0)
                        .endAngle(i(t))();
                };
            }
            this.state.pathGood.transition().duration(500).attrTween('d', arcTweenGood);

            this.state.valueText.transition().duration(500).tween('text', function(d) {
                var i = d3.interpolate(previousValue, newData.value);
                return (t) => {
                  d3.select(this).text(Math.round(i(t)));
                };
              });
        });
        this.setState({lastValue: newData.value, lastOver: newData.over});
    }

    componentDidUpdate() {
        this.state.svg.transition().duration(300).attr('width', this.props.dimensions.width).attr('height', this.props.dimensions.height);
    }
}

export default KpiWidget;