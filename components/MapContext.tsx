import React, { createContext, useContext, useState, ReactNode } from 'react';

export type NodeType = {
  [key: string]: { x: number; y: number; color: string; type: 'friend' } | { x: number; y: number; color: string; type: 'media'; iconType?: 'media' | 'book' | 'music' };
};

export type EdgeType = [string, string];

const initialNodes: NodeType = {
  'Anant': { x: 0, y: -120, color: '#F8797E', type: 'friend' },
  'Selin': { x: -100, y: 0, color: '#F8797E', type: 'friend' },
  'Gus': { x: 0, y: 0, color: '#F8797E', type: 'friend' },
  'Grit': { x: -100, y: -70, color: '#FFA600', type: 'media' },
  'Interstellar': { x: 100, y: -70, color: '#00D62E', type: 'media' },
  'The Big Bang Theory': { x: 100, y: 50, color: '#00D62E', type: 'media' },
  '1989': { x: 0, y: 100, color: '#4DDEFF', type: 'media' },
};

const initialEdges: EdgeType[] = [
  ['Anant', 'Interstellar'],
  ['Selin', 'Grit'],
  ['Gus', 'The Big Bang Theory'],
  ['Selin', '1989'],
  ['Gus', '1989'],
  ['Anant', 'Grit'],
  ['Gus', 'Grit'],
];

interface MapContextType {
  nodes: NodeType;
  edges: EdgeType[];
  addNode: (label: string, node: NodeType[string]) => void;
  addEdge: (from: string, to: string) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error('useMap must be used within MapProvider');
  return ctx;
};

export function MapProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<NodeType>(initialNodes);
  const [edges, setEdges] = useState<EdgeType[]>(initialEdges);

  const addNode = (label: string, node: NodeType[string]) => {
    setNodes(prev => ({ ...prev, [label]: node }));
  };

  const addEdge = (from: string, to: string) => {
    setEdges(prev => [...prev, [from, to]]);
  };

  return (
    <MapContext.Provider value={{ nodes, edges, addNode, addEdge }}>
      {children}
    </MapContext.Provider>
  );
}
