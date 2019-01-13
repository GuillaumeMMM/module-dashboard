import React, { Component } from 'react';
import './curveWidget.scss';
import * as d3 from 'd3';
import { styles } from '../../../constants';

class CurveWidget extends Component {

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
        const x = d3.scaleLinear()
            .domain([d3.min(this.props.data, d => d.x), d3.max(this.props.data, d => d.x)])
            .range([this.relativeWidth(this.state.margin.left), this.relativeWidth(100) - this.relativeWidth(this.state.margin.right)]);

        //  Create y scale
        const y = d3.scaleLinear()
            .domain([d3.max(this.props.data, d => d.y), 0])
            .range([this.relativeHeight(this.state.margin.top), this.relativeHeight(100) - this.relativeHeight(this.state.margin.bottom)]);

        //  Create xAxis from x scale
        const xAxis = this.state.svg.append('g')
            .attr("transform", `translate(0, ${this.relativeHeight(100) - this.relativeHeight(this.state.margin.bottom)})`)
            .call(d3.axisBottom(x).ticks(16));

    

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
            //  Draw the curves when scales saved in state
            this.drawCurve();
        });
    }

    drawCurve() {

        //  Define the line
        const valueline = d3.line()
            .curve(d3.curveBasis)
            .x(d => this.state.x(d.x))
            .y(d => this.state.y(d.y));
        
        //  Define area under curve
        const area = d3.area()
            .curve(d3.curveBasis)
            .x(d => this.state.x(d.x))
            .y0(this.state.y(0))
            .y1(d => this.state.y(d.y));
            
        //  Create the path
        const curvePath = this.state.svg.append('path')
            .datum(this.props.data)
            .attr('class', 'line')
            .style('stroke', styles.primary)
            .style('fill', 'none')
            .style('stroke-width', 25)
            .attr('d', valueline);

        //  Create the area under curve
        const curveArea = this.state.svg.append('path')
            .datum(this.props.data)
            .attr('class', 'area')
            .attr('stroke', 'none')
            .attr('fill', styles.primary)
            .attr('fill-opacity', 0.2)
            .attr('d', area);

        this.setState({curvePath: curvePath, curveArea: curveArea})
    }

    componentDidUpdate() {
        //  On resize of the block, update the svg dimensions
        this.state.svg.transition().duration(300).attr('width', this.props.dimensions.width).attr('height', this.props.dimensions.height);
    }

    componentWillReceiveProps(props) {
        //  Ensure that the component is mounted and the state is set before updating the graph
        if (this.state.curvePath) {
            this.update(props.data);
        }
    }

    update(newData) {
        console.log('update', newData);
        //  Recreate x scale
        const newX = d3.scaleLinear()
            .domain([d3.min(newData, d => d.x), d3.max(newData, d => d.x)])
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

        //  Define the new line
        const newValueline = d3.line()
            .curve(d3.curveBasis)
            .x(d => newX(d.x))
            .y(d => newY(d.y));

         //  Define new area under curve
         const newArea = d3.area()
            .curve(d3.curveBasis)
            .x(d => newX(d.x))
            .y0(newY(0))
            .y1(d => newY(d.y));
        
        this.state.curvePath.datum(newData)
            .transition().duration(500)
            .attr('d', newValueline);

        this.state.curveArea.datum(newData)
            .transition().duration(500)
            .attr('d', newArea);
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

export default CurveWidget;