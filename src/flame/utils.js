import { bg1, bg2, color } from './constants';
import Color from 'color';

function getNodeBackgroundColor(value, maxValue) {
  return Color(bg1).mix(Color(bg2), value / maxValue).string();
}

function getNodeColor(value, maxValue) {
  return color
}

export function transformChartData(rawData) {
  let uidCounter = 0;

  const maxValue = rawData.value;

  const nodes = {};
  const levels = [];

  function convertNode(
    sourceNode,
    depth,
    leftOffset,
    parent
  ) {
    const {
      backgroundColor,
      children,
      color,
      id,
      name,
      tooltip,
      value,
    } = sourceNode;

    const uidOrCounter = id || `_${uidCounter}`;

    // Add this node to the node-map and assign it a UID.
    const targetNode = (nodes[uidOrCounter] = {
      parent,
      backgroundColor:
        backgroundColor || getNodeBackgroundColor(value, maxValue),
      color: color || getNodeColor(value, maxValue),
      depth,
      left: leftOffset,
      name,
      tooltip,
      width: value / maxValue,
      value,
    });

    // Register the node's depth within the graph.
    if (levels.length <= depth) {
      levels.push([]);
    }
    levels[depth].push(uidOrCounter);

    // Now that the current UID has been used, increment it.
    uidCounter++;

    // Process node children.
    if (Array.isArray(children)) {
      children.forEach(sourceChildNode => {
        const targetChildNode = convertNode(
          sourceChildNode,
          depth + 1,
          leftOffset,
          targetNode,
        );
        leftOffset += targetChildNode.width;
      });
    }

    return targetNode;
  }

  convertNode(rawData, 0, 0, null);

  const rootUid = rawData.id || '_0';

  return {
    height: levels.length,
    levels,
    nodes,
    root: rootUid,
  };
}