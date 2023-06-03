import { FC } from 'react';
import GraphVis from 'react-graph-vis';

import { IGraph } from '@/types';

type Graph = {
  graph: IGraph;
  options?: any;
  events: any;
};

export const Graph: FC<Graph> = ({ graph, events, options }) => {
  const defaultOptions = {
    autoResize: true,
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#FFFFFF',
    },
    nodes: {
      shape: 'circle',
    },
    height: '100%',
    width: '100%',
  };

  return (
    <GraphVis
      graph={graph}
      options={{
        ...defaultOptions,
        ...options,
      }}
      events={events}
      getNetwork={(network) => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
        console.log(network);
      }}
    />
  );
};
