import React, { Component } from 'react'

class Block extends Component {
  render() {

    const { id } = this.props;

    return (
      <div>
          {id}
      </div>
    )
  }
}

export default Block;
