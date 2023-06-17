'use client';
import { useGraph, useGraphActions } from '@/store/graph';
import { useGraphToolsActions } from '@/store/graphTools';
import { GraphTools } from '@/tools';
import { Edge, Node } from '@/types';
import { ElementDefinition } from 'cytoscape';
import { Ref, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const mapGraphToElements = (
  nodes: Node[],
  edges: Edge[]
): ElementDefinition[] => {
  const nodesElements = nodes.map((node) => ({
    data: { id: node.id, label: node.label },
    position: { x: 0, y: 0 },
  }));

  const edgesElements = edges.map((edge) => ({
    data: {
      source: edge.from,
      target: edge.to,
      label: edge.label,
      weight: edge.label,
    },
  }));

  return [...nodesElements, ...edgesElements];
};

export default function Home() {
  const { nodes, edges } = useGraph();
  const { changeNodePosition, getNodeById } = useGraphActions();

  const elements = mapGraphToElements(nodes, edges);

  const { setSelectedNode } = useGraphToolsActions();

  const onClickANode = (nodeId: string) => setSelectedNode(getNodeById(nodeId));

  const containerRef = useRef<HTMLElement>(null);

  return (
    <main
      className='flex flex-col items-center justify-between h-full relative'
      ref={containerRef}
    >
      <GraphTools containerRef={containerRef} />
      <CytoscapeComponent
        elements={elements}
        cy={(cy) => {
          cy.on('click', 'node', (e) => {
            const { id } = e.target._private.data;
            onClickANode(id);
          });

          cy.on('dragfree', 'node', (e) => {
            const { id } = e.target._private.data;
            const { position } = e.target._private;

            // console.log('draging a node: ', e.target._private);

            changeNodePosition(id, [position.x, position.y]);

            console.log('drag free');
          });
        }}
        wheelSensitivity={0.1}
        stylesheet={[
          {
            selector: 'node',
            style: {
              width: 20,
              height: 20,
              label: 'data(label)',
              color: '#fff',
            },
          },
          {
            selector: 'edge',
            style: {
              label: 'data(weight)',
              color: '#fff',
            },
          },
        ]}
        style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
      />
    </main>
  );
}
