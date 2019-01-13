import React, { Component } from 'react'
import KpiWidget from '../dashboard/widgets/KpiWidget';
import BarChartWidget from '../dashboard/widgets/BarChartWidget';

class Block extends Component {
  mode = '';

  render() {
    console.log('render');

    const { id, widget } = this.props;
    this.mode = this.props.mode;

    const contentHeight = this.props.dimensions.height - window.innerHeight * 0.07;
    const contentWidth = this.props.dimensions.width;

    let renderBlock = this.getWidgetFromType(widget, contentHeight, contentWidth);

    return (
      <React.Fragment>
          <div className="block-header">
            <div className="block-title">{widget.title}</div>
            <div className="block-delete" onClick={this.onDeleteBlock.bind(this, id)}>X</div>
          </div>
          <div className="block-content">
            {renderBlock}
          </div>
      </React.Fragment>
    )
  }

  onDeleteBlock(id) {
    this.props.deleteBlock(id);
  }

  componentDidMount() {
    if (this.mode === 'live') {
      const deleteXElm = document.getElementsByClassName('block-delete');
      for (let i = 0; i < deleteXElm.length; i++) {
        deleteXElm[i].setAttribute("style", "display: none");
      }
    }
  }

  getWidgetFromType(widget, contentHeight, contentWidth) {
    switch (widget.type) {
      case 'kpi':
        return <KpiWidget data={widget.data} id={this.props.id} dimensions={{width: contentWidth, height: contentHeight}}></KpiWidget>;
      case 'barchart':
        return <BarChartWidget data={widget.data} id={this.props.id} dimensions={{width: contentWidth, height: contentHeight}}></BarChartWidget>;
      default: return null;
    }
  }
}

export default Block;
