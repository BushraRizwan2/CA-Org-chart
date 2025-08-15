
import React, { useState, useRef, useEffect } from 'react';
import type { OrgNodeData } from '../types';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import CameraIcon from './icons/CameraIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface NodeCardProps {
  node: OrgNodeData;
  onAdd: () => void;
  onUpdate: (newName: string, newRole: string) => void;
  onDelete: () => void;
  onToggleExpand: () => void;
  onUpdateImage: (imageUrl: string) => void;
  isRoot?: boolean;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, onAdd, onUpdate, onDelete, onToggleExpand, onUpdateImage, isRoot = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(node.name);
  const [role, setRole] = useState(node.role);
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(node.name);
    setRole(node.role);
  }, [node.name, node.role]);

  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isEditing]);
  
  const handleSave = () => {
    if(name.trim() && role.trim()){
      onUpdate(name, role);
      setIsEditing(false);
    } else {
        alert("Name and Role cannot be empty.");
    }
  };

  const handleCancel = () => {
    setName(node.name);
    setRole(node.role);
    setIsEditing(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-2">
       <button 
        onClick={onToggleExpand} 
        className={`flex-shrink-0 transition-opacity duration-200 ${node.children.length === 0 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
        disabled={node.children.length === 0}
        aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
       >
        {node.children.length > 0 && (node.isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />)}
       </button>
       
      <div className={`bg-white/70 backdrop-blur-sm border border-slate-200 rounded-lg p-3 w-72 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 hover:border-blue-500`}>
        <div className="flex items-start space-x-3">
          <div className="relative group flex-shrink-0">
             <img 
                src={node.imageUrl} 
                alt={node.name} 
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div 
                onClick={handleImageClick}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <CameraIcon />
              </div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </div>
          <div className="flex-grow min-w-0">
            {isEditing ? (
              <div onKeyDown={handleKeyDown}>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-slate-100 text-slate-900 font-bold w-full p-1 rounded-md text-base mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Employee Name"
                />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`bg-slate-100 text-slate-700 w-full p-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Employee Role"
                />
              </div>
            ) : (
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-base truncate" title={node.name}>{node.name}</h3>
                <p className="text-sm text-slate-500 truncate" title={node.role}>{node.role}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-1 mt-3 pt-2 border-t border-slate-200/60">
          {isEditing ? (
             <>
              <button onClick={handleSave} className="px-2 py-1 text-xs text-green-600 hover:text-green-500 transition-colors rounded-md hover:bg-slate-200">Save</button>
              <button onClick={handleCancel} className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 transition-colors rounded-md hover:bg-slate-200">Cancel</button>
             </>
          ) : (
            <>
              <button onClick={onAdd} className={`p-1.5 text-slate-500 hover:text-blue-500 hover:bg-slate-200 rounded-full transition-all`} aria-label="Add subordinate"><PlusIcon /></button>
              <button onClick={() => setIsEditing(true)} className={`p-1.5 text-slate-500 hover:text-blue-500 hover:bg-slate-200 rounded-full transition-all`} aria-label="Edit node"><PencilIcon /></button>
              {!isRoot && <button onClick={onDelete} className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-slate-200 rounded-full transition-all" aria-label="Delete node"><TrashIcon /></button>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeCard;
