import React, { Component } from 'react';
import './barChartWidget.scss';
import * as d3 from 'd3';
import { styles } from '../../../constants';

class BarChartWidget extends Component {

    state = {
        margin: { top: 10, right: 5, bottom: 10, left: 5 }
    }

    render() {
        return (
            <React.Fragment>
                <div className={"svg-container-" + this.props.id}>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.relativeWidth = this.createRelativeFunctions(this.props.dimensions).width;
        this.relativeHeight = this.createRelativeFunctions(this.props.dimensions).height;

        //  Create main svg
        const svg = d3.select('.svg-container-' + this.props.id).append('svg')
            .attr('id', 'svg-' + this.props.id)
            .attr('width', this.props.dimensions.width)
            .attr('height', this.props.dimensions.height)
            .attr('viewBox', '0 0 ' + (10 * this.props.dimensions.width) + ' ' + (10 * this.props.dimensions.height)).attr("preserveAspectRatio", "none");

        this.setState({ svg: svg }, () => {
            //  Define and draw axes when svg set in state
            this.defineAxes();
        });
    }

    defineAxes() {
        //  Create x scale
        const x = d3.scaleBand()
            .domain(this.props.data.map(d => d.x))
            .range([this.relativeWidth(this.state.margin.left), this.relativeWidth(100) - this.relativeWidth(this.state.margin.right)]);

        //  Create y scale
        const y = d3.scaleLinear()
            .domain([d3.max(this.props.data, d => d.y), 0])
            .range([this.relativeHeight(this.state.margin.top), this.relativeHeight(100) - this.relativeHeight(this.state.margin.bottom)]);

        //  Create xAxis from x scale
        const xAxis = this.state.svg.append('g')
            .attr("transform", `translate(0, ${this.relativeHeight(100) - this.relativeHeight(this.state.margin.bottom)})`)
            .call(d3.axisBottom(x));

        //  Create yAxis from y scale
        const yAxis = this.state.svg.append('g')
            .attr("transform", `translate(${this.relativeWidth(this.state.margin.left)}, 0)`)
            .call(d3.axisLeft(y));

        //  Set style attributes of the axis
        xAxis.select('path').style('stroke-width', 10).style('stroke', styles.textDarkSecondary);
        xAxis.selectAll('text').attr('font-size', 100).attr('font-family', 'sans-serif').style('fill', styles.textDarkPrimary).attr('y', 60);
        xAxis.selectAll('line').style('stroke-width', 10).attr('y2', 40).attr('stroke', styles.textDarkPrimary);

        //  Set style attributes of the axis
        yAxis.select('path').remove();
        yAxis.selectAll('text').attr('font-size', 100).attr('font-family', 'sans-serif').style('fill', styles.textDarkSecondary).attr('x', - 60);
        yAxis.selectAll('line').style('stroke-width', 10).attr('x1', -40).attr('stroke', styles.textDarkSecondary).attr('x2', this.relativeWidth(100) - this.relativeWidth(this.state.margin.right) - this.relativeWidth(this.state.margin.left));

        this.setState({ x: x, y: y, xAxis: xAxis, yAxis: yAxis }, () => {
            //  Draw the rect elements when scales saved in state
            this.drawRect();
        });
    }

    drawRect() {
        const rectGroup = this.state.svg.append('g');

        //  Define barwidth depending on number of bars
        const barWidth = (this.relativeWidth(100) - this.relativeWidth(this.state.margin.right) - this.relativeWidth(this.state.margin.left)) / (this.props.data.length + 3);

        //  Create a rect for each data element
        const rects = rectGroup.selectAll('.rect-elm')
            .data(this.props.data)
            .enter().append('rect').attr('class', 'rect-elm')
            .attr('width', barWidth)
            .attr('height', (d) => this.relativeHeight(100) - this.relativeHeight(this.state.margin.top) - this.state.y(d.y))
            .attr('x', (d) => this.state.x(d.x) + (this.state.x.bandwidth() / 2) - barWidth / 2)
            .attr('y', (d) => this.state.y(d.y) - this.relativeHeight(this.state.margin.bottom) + this.relativeHeight(this.state.margin.top))
            .attr('fill', styles.primary)
            .attr('fill-opacity', 0.9);

        this.setState({ rects: rects, rectGroup: rectGroup });
    }

    componentWillReceiveProps(props) {
        //  Ensure that the component is mounted and the state is set before updating the graph
        if (this.state.rects) {
            this.update(props.data);
        }
    }

    update(newData) {
        //  When data changes, update the graph

        //  Update barWidth
        const newBarWidth = (this.relativeWidth(100) - this.relativeWidth(this.state.margin.right) - this.relativeWidth(this.state.margin.left)) / (newData.length + 3);

        //  Recreate x scale
        const newX = d3.scaleBand()
            .domain(newData.map(d => d.x))
            .range([this.relativeWidth(this.state.margin.left), this.relativeWidth(100) - this.relativeWidth(this.state.margin.right)]);

        //  Recreate y scale
        const newY = d3.scaleLinear()
            .domain([d3.max(newData, d => d.y), 0])
            .range([this.relativeHeight(this.state.margin.top), this.relativeHeight(100) - this.relativeHeight(this.state.margin.bottom)]);

        //  Recreate x axis based on new x scale
        const newYAxis = this.state.yAxis.attr('class', 'update-axis').transition().duration(500).call(d3.axisLeft(newY));

        //  Recreate y axis based on new y scale
        const newXAxis = this.state.xAxis.attr('class', 'update-axis').transition().duration(500).call(d3.axisBottom(newX));

        //  Style new axis
        newYAxis.selectAll('text').attr('font-size', 100).attr('font-family', 'sans-serif').style('fill', styles.textDarkSecondary).attr('x', - 60);
        newYAxis.selectAll('line').style('stroke-width', 10).attr('x1', -40).attr('stroke', styles.textDarkSecondary).attr('x2', this.relativeWidth(100) - this.relativeWidth(this.state.margin.right) - this.relativeWidth(this.state.margin.left));

        //  Style new axis
        newXAxis.select('path').style('stroke-width', 10).style('stroke', styles.textDarkSecondary);
        newXAxis.selectAll('text').attr('font-size', 100).attr('font-family', 'sans-serif').style('fill', styles.textDarkPrimary).attr('y', 60);
        newXAxis.selectAll('line').style('stroke-width', 10).attr('y2', 40).attr('stroke', styles.textDarkPrimary);

        //  For each new element, create a bar
        this.state.rectGroup.selectAll('.rect-elm').data(newData).enter()
            .append('rect').attr('class', 'rect-elm')
            .attr('width', newBarWidth)
            .attr('x', (d) => newX(d.x) + (newX.bandwidth() / 2) - newBarWidth / 2)
            .attr('fill', styles.primary)
            .attr('height', 0).attr('y', this.relativeHeight(100) - this.relativeHeight(this.state.margin.bottom)).transition().duration(500)
            .attr('height', (d) => this.relativeHeight(100) - this.relativeHeight(this.state.margin.top) - newY(d.y))
            .attr('y', (d) => newY(d.y) - this.relativeHeight(this.state.margin.bottom) + this.relativeHeight(this.state.margin.top));

        //  For each element disappearing, remove it
        this.state.rectGroup.selectAll('.rect-elm').data(newData).exit()
            .transition().duration(500)
            .attr('height', 0).attr('y', this.relativeHeight(100) - this.relativeHeight(this.state.margin.bottom)).remove();

        //  Update other rects
        this.state.rectGroup.selectAll('.rect-elm').data(newData)
            .transition().duration(500)
            .attr('height', (d) => this.relativeHeight(100) - this.relativeHeight(this.state.margin.top) - newY(d.y))
            .attr('width', newBarWidth)
            .attr('y', (d) => newY(d.y) - this.relativeHeight(this.state.margin.bottom) + this.relativeHeight(this.state.margin.top))
            .attr('x', (d) => newX(d.x) + (newX.bandwidth() / 2) - newBarWidth / 2);
    }

    componentDidUpdate() {
        //  On resize of the block, update the svg dimensions
        this.state.svg.transition().duration(300).attr('width', this.props.dimensions.width).attr('height', this.props.dimensions.height);
    }

    createRelativeFunctions(dimensions) {
        const relativeWidth = (value) => {
            return value * dimensions.width / 10;
        }
        const relativeHeight = (value) => {
            return value * dimensions.height / 10;
        }
        return {
            width: relativeWidth,
            height: relativeHeight,
        }
    }
}

export default BarChartWidget;