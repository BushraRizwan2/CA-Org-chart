
import React from 'react';
import type { OrgNodeData } from '../types';
import NodeCard from './NodeCard';

interface OrgChartProps {
  node: OrgNodeData;
  onAddNode: (parentId: string) => void;
  onUpdateNode: (nodeId: string, newName: string, newRole: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onToggleExpand: (nodeId: string) => void;
  onUpdateImageNode: (nodeId: string, imageUrl: string) => void;
  isRoot?: boolean;
  color?: string;
}

const OrgChart: React.FC<OrgChartProps> = ({ 
  node, 
  onAddNode, 
  onUpdateNode, 
  onDeleteNode, 
  onToggleExpand,
  onUpdateImageNode, 
  isRoot = false,
  color = 'blue'
}) => {
  // The root node's children are laid out horizontally
  if (isRoot) {
    return (
      <div className="flex flex-col items-center">
        <NodeCard
          node={node}
          onAdd={() => onAddNode(node.id)}
          onUpdate={(newName, newRole) => onUpdateNode(node.id, newName, newRole)}
          onDelete={() => onDeleteNode(node.id)}
          onToggleExpand={() => onToggleExpand(node.id)}
          onUpdateImage={(imageUrl) => onUpdateImageNode(node.id, imageUrl)}
          isRoot={true}
        />
        {node.isExpanded && node.children?.length > 0 && (
          <ul className="flex justify-center mt-12 relative">
            {/* Vertical line from root node */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-slate-300" />
            {node.children.map((child, index) => {
              return (
                <li key={child.id} className="px-4 relative">
                  {/* Horizontal line segment for each child */}
                  <div className="absolute top-0 w-full h-px bg-slate-300" />
                  {/* Mask for first child's line */}
                  {index === 0 && <div className="absolute top-0 left-0 w-1/2 h-px bg-slate-50" />}
                  {/* Mask for last child's line */}
                  {index === node.children.length - 1 && <div className="absolute top-0 right-0 w-1/2 h-px bg-slate-50" />}

                  {/* Vertical line connecting to child card */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-slate-300" />
                  
                  <div className="pt-12">
                    <OrgChart
                      node={child}
                      onAddNode={onAddNode}
                      onUpdateNode={onUpdateNode}
                      onDeleteNode={onDeleteNode}
                      onToggleExpand={onToggleExpand}
                      onUpdateImageNode={onUpdateImageNode}
                      isRoot={false} // Children are roots of vertical trees
                      color={color} // Pass down the same color
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    );
  }

  // All other nodes are laid out vertically
  return (
    <div className="relative">
      <NodeCard
        node={node}
        onAdd={() => onAddNode(node.id)}
        onUpdate={(newName, newRole) => onUpdateNode(node.id, newName, newRole)}
        onDelete={() => onDeleteNode(node.id)}
        onToggleExpand={() => onToggleExpand(node.id)}
        onUpdateImage={(imageUrl) => onUpdateImageNode(node.id, imageUrl)}
        isRoot={false}
      />
      {node.isExpanded && node.children?.length > 0 && (
        <ul className="pl-12 mt-4 relative">
          {/* Vertical line connecting all children in this group */}
          <div className="absolute -left-px top-0 w-px h-full bg-slate-300" />
          
          {node.children.map(childNode => (
            <li key={childNode.id} className="relative pt-4">
              {/* Horizontal line from vertical connector to child */}
              <div className="absolute -left-12 top-[28px] w-12 h-px bg-slate-300" />
              <OrgChart
                node={childNode}
                onAddNode={onAddNode}
                onUpdateNode={onUpdateNode}
                onDeleteNode={onDeleteNode}
                onToggleExpand={onToggleExpand}
                onUpdateImageNode={onUpdateImageNode}
                color={color}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrgChart;
