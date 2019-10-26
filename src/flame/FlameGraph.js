import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import ItemRenderer from './ItemRenderer';
import { rowHeight } from './constants';

const FlameGraphContext = React.createContext({});

class FlameGraph extends PureComponent {
  // Select the root node by default.
  state = {
    focusedNode: this.props.data.nodes[this.props.data.root],
  };

  // Shared context between the App and individual List item renderers.
  // Memoize this wrapper object to avoid breaking PureComponent's sCU.
  // Attach the memoized function to the instance,
  // So that multiple instances will maintain their own memoized cache.
  getItemData = memoize((data, focusedNode, focusNode, width) => ({
    data,
    focusedNode,
    focusNode,
    scale: value => value / focusedNode.width * width,
  }));

  focusNode = (uid) => {
    const { nodes } = this.props.data;
    const chartNode = nodes[uid];
    this.setState(
      {
        focusedNode: chartNode,
      },
      () => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
          onChange(chartNode, uid);
        }
      }
    );
  };

  render() {
    const { data, height, width, classes } = this.props;
    const { focusedNode } = this.state;

    const itemData = this.getItemData(data, focusedNode, this.focusNode, width);

    return (
      <FlameGraphContext.Provider value={classes}>
        <List
          height={height}
          innerTagName="svg"
          itemCount={data.height}
          itemData={itemData}
          itemSize={rowHeight}
          width={width}
        >
          {ItemRenderer}
        </List>
      </FlameGraphContext.Provider>
    );
  }
}

export { FlameGraphContext, FlameGraph };