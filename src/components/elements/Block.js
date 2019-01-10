import React, { Component } from 'react'

class Block extends Component {
  mode = '';

  render() {

    const { id, widget } = this.props;
    this.mode = this.props.mode;

    return (
      <div>
          <div className="block-header">
            <div className="block-title">{widget.title}</div>
            <div className="block-delete" onClick={this.onDeleteBlock.bind(this, id)}>X</div>
          </div>
          <div className="block-content">
            content
          </div>
      </div>
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
}

export default Block;
