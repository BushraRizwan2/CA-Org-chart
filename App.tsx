
import React, { useState, useCallback } from 'react';
import type { OrgNodeData } from './types';
import OrgChart from './components/OrgChart';

// Helper to add unique image URLs to the initial data recursively
const addPropsToData = (node: Omit<OrgNodeData, 'imageUrl' | 'color'>): OrgNodeData => ({
  ...node,
  imageUrl: `https://i.pravatar.cc/64?u=${node.id}`,
  children: node.children.map(addPropsToData),
});


const initialData: Omit<OrgNodeData, 'imageUrl' | 'color'> = {
  id: '1',
  name: 'Adnan Ghaffar',
  role: 'Chief Executive Officer',
  isExpanded: true,
  children: [
    {
      id: '2',
      name: 'Ambreen Younas',
      role: 'Chief Technology Officer',
      isExpanded: true,
      children: [
        { id: '2-1', name: 'Muhammad Nouman Zahid', role: 'Senior Js Developer', isExpanded: true, children: [] },
        { id: '2-2', name: 'Muhammad Rehan', role: 'Junior Andriod Developer', isExpanded: true, children: [] },
        { id: '2-3', name: 'Farzana Bibi', role: 'Python Developer', isExpanded: true, children: [] },
        { id: '2-4', name: 'Muhammad Nasar', role: 'Java Developer (Remote Full Time)', isExpanded: true, children: [] },
        { id: '2-5', name: 'Rao Muhammad Farman', role: 'Remote Zoho Developer', isExpanded: true, children: [] },
        { id: '2-6', name: 'Eman Amir', role: 'Python Developer (Remote)', isExpanded: true, children: [] },
        {
          id: '2-7',
          name: 'Syeda Malika',
          role: 'Project Coordinator',
          isExpanded: true,
          children: [
            { id: '2-7-1', name: 'Sheikh Wahib Ifthikar', role: 'Senior SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-2', name: 'Anum Abbas', role: 'SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-3', name: 'Zia Ur Rehman', role: 'SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-4', name: 'Waqar Rasheed', role: 'SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-5', name: 'Mubeen Alam', role: 'SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-6', name: 'Faizan Sultan', role: 'JS Developer', isExpanded: true, children: [] },
            { id: '2-7-7', name: 'Rao Shaheryar', role: 'SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-8', name: 'Syeda Husnaina', role: 'SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-9', name: 'Aleena Raza', role: 'SQA Engineer', isExpanded: true, children: [] },
            { id: '2-7-10', name: 'Sana Amiad', role: 'SQA Engineer', isExpanded: true, children: [] },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Farhan Ghaffar',
      role: 'Software Development Team Lead',
      isExpanded: true,
      children: [
        { id: '3-1', name: 'Muhammad Nouman', role: 'Senior SQA Engineer', isExpanded: true, children: [] },
        { id: '3-2', name: 'Saad Shabbir', role: 'Js Developer', isExpanded: true, children: [] },
        { id: '3-3', name: 'Ayaz Mahmood', role: 'JS Developer', isExpanded: true, children: [] },
        { id: '3-4', name: 'Hadia Khan', role: 'JS Developer', isExpanded: true, children: [] },
        { id: '3-5', name: 'Awais Ur Rehman', role: 'SQA Engineer', isExpanded: true, children: [] },
        { id: '3-6', name: 'Ali Moiz Qureshi', role: 'SQA Engineer', isExpanded: true, children: [] },
        { id: '3-7', name: 'Natasha Javed', role: 'Java Developer', isExpanded: true, children: [] },
        { id: '3-8', name: 'Muhammad Auon Jabbar Hashmi', role: 'JS Developer', isExpanded: true, children: [] },
        { id: '3-9', name: 'Muhammad Touqeer', role: 'Js Developer', isExpanded: true, children: [] },
        { id: '3-10', name: 'Shahid Iqbal', role: 'SQA Engineer', isExpanded: true, children: [] },
        { id: '3-11', name: 'Bilal Aziz', role: 'JS Developer', isExpanded: true, children: [] },
        { id: '3-12', name: 'Zabair Ghoss', role: 'Automation Engineer', isExpanded: true, children: [] },
        { id: '3-13', name: 'Muhammad Bilal Dogar', role: 'SQA Engineer', isExpanded: true, children: [] },
        { id: '3-14', name: 'Fahad Jamal', role: 'IOS Developer', isExpanded: true, children: [] },
      ],
    },
    {
      id: '4',
      name: 'Mir Usman Rafi',
      role: 'Senior HR Manager',
      isExpanded: true,
      children: [
        { id: '4-1', name: 'Usama Bin Ahmad', role: 'HR Executive', isExpanded: true, children: [] },
      ],
    },
    {
      id: '5',
      name: 'Zoya Ahmad',
      role: 'Senior Project Manager',
      isExpanded: true,
      children: [
        { id: '5-1', name: 'Muhammad Imran', role: 'Digital Marketer', isExpanded: true, children: [] },
        { id: '5-2', name: 'Ali Ahmad', role: 'Ecommmerce Expert', isExpanded: true, children: [] },
        { id: '5-3', name: 'Abdul Moiz', role: 'Designer', isExpanded: true, children: [] },
      ],
    },
    {
      id: '6',
      name: 'Huda Rizwan',
      role: 'Project Manager/ Senior SQA',
      isExpanded: true,
      children: [
        { id: '6-1', name: 'Muhammad Umaid', role: 'CMS Developer', isExpanded: true, children: [] },
        { id: '6-2', name: 'Ayesha Munir', role: 'CMS Developer', isExpanded: true, children: [] },
        { id: '6-3', name: 'Saqib Ali', role: 'SQA Engineer', isExpanded: true, children: [] },
        { id: '6-4', name: 'Sameed Akram', role: 'UI/UX Designer', isExpanded: true, children: [] },
      ],
    },
    {
      id: '7',
      name: 'Muniba Iqbal',
      role: 'Senior SQA Project Manager',
      isExpanded: true,
      children: [
        { id: '7-1', name: 'Maryum Saleem', role: 'Js Developer', isExpanded: true, children: [] },
      ],
    },
    {
      id: '8',
      name: 'Sadia Dastgir',
      role: 'VA',
      isExpanded: true,
      children: [
        { id: '8-1', name: 'Malik Asif Hayat', role: 'Senior BD', isExpanded: true, children: [] },
        { id: '8-2', name: 'Ahsan Abbas', role: 'BD', isExpanded: true, children: [] },
        { id: '8-3', name: 'Sarmad Hashim', role: 'SEO Executive', isExpanded: true, children: [] },
        { id: '8-4', name: 'Syed Hamid', role: 'BD', isExpanded: true, children: [] },
        { id: '8-5', name: 'Mohsin Iqbal', role: 'Cold Caller', isExpanded: true, children: [] },
        { id: '8-6', name: 'Aneeb Amjad', role: 'BD', isExpanded: true, children: [] },
        { id: '8-7', name: 'Umer Aziz', role: 'Java Developer', isExpanded: true, children: [] },
        { id: '8-8', name: 'Usman Hussain', role: 'UI/UX & Graphic Designer', isExpanded: true, children: [] },
        { id: '8-9', name: 'Zain Ul Abideen', role: 'Bidding Specialist', isExpanded: true, children: [] },
      ],
    },
  ],
};

const initialOrgData = addPropsToData(initialData);

const App: React.FC = () => {
  const [orgData, setOrgData] = useState<OrgNodeData>(initialOrgData);

  const handleUpdate = useCallback((nodes: OrgNodeData[], nodeId: string, newName: string, newRole: string): OrgNodeData[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, name: newName, role: newRole };
      }
      if (node.children.length > 0) {
        return { ...node, children: handleUpdate(node.children, nodeId, newName, newRole) };
      }
      return node;
    });
  }, []);
  
  const handleImageUpdate = useCallback((nodes: OrgNodeData[], nodeId: string, imageUrl: string): OrgNodeData[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, imageUrl };
      }
      if (node.children.length > 0) {
        return { ...node, children: handleImageUpdate(node.children, nodeId, imageUrl) };
      }
      return node;
    });
  }, []);

  const handleAdd = useCallback((nodes: OrgNodeData[], parentId: string): OrgNodeData[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        const newNodeId = crypto.randomUUID();
        const newNode: OrgNodeData = {
          id: newNodeId,
          name: 'New Employee',
          role: 'New Role',
          imageUrl: `https://i.pravatar.cc/64?u=${newNodeId}`,
          isExpanded: true,
          children: [],
        };
        return { ...node, isExpanded: true, children: [...node.children, newNode] };
      }
      if (node.children.length > 0) {
        return { ...node, children: handleAdd(node.children, parentId) };
      }
      return node;
    });
  }, []);

  const handleDelete = useCallback((nodes: OrgNodeData[], nodeId: string): OrgNodeData[] => {
    return nodes.filter(node => node.id !== nodeId).map(node => {
      if (node.children.length > 0) {
        return { ...node, children: handleDelete(node.children, nodeId) };
      }
      return node;
    });
  }, []);
  
  const handleToggle = useCallback((nodes: OrgNodeData[], nodeId: string): OrgNodeData[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, isExpanded: !node.isExpanded };
      }
      if (node.children.length > 0) {
        return { ...node, children: handleToggle(node.children, nodeId) };
      }
      return node;
    });
  }, []);

  const handleAddNode = (parentId: string) => {
      setOrgData(currentData => {
        if (currentData.id === parentId) {
             const newNodeId = crypto.randomUUID();
             const newNode: OrgNodeData = {
              id: newNodeId,
              name: 'New Employee',
              role: 'New Role',
              imageUrl: `https://i.pravatar.cc/64?u=${newNodeId}`,
              isExpanded: true,
              children: [],
            };
            return {...currentData, isExpanded: true, children: [...currentData.children, newNode]};
        }
        return {...currentData, children: handleAdd(currentData.children, parentId)}
    });
  };

  const handleUpdateNode = (nodeId: string, newName: string, newRole: string) => {
    setOrgData(currentData => {
       if (currentData.id === nodeId) {
         return {...currentData, name: newName, role: newRole };
       }
       return ({...currentData, children: handleUpdate(currentData.children, nodeId, newName, newRole)});
    });
  };

  const handleUpdateImageNode = (nodeId: string, imageUrl: string) => {
    setOrgData(currentData => {
       if (currentData.id === nodeId) {
         return {...currentData, imageUrl };
       }
       return ({...currentData, children: handleImageUpdate(currentData.children, nodeId, imageUrl)});
    });
  };

  const handleDeleteNode = (nodeId: string) => {
    if (nodeId === orgData.id) {
        alert("Cannot delete the root node.");
        return;
    }
    setOrgData(currentData => ({...currentData, children: handleDelete(currentData.children, nodeId)}));
  };

  const handleToggleExpand = (nodeId: string) => {
     setOrgData(currentData => {
        if(currentData.id === nodeId) {
            return {...currentData, isExpanded: !currentData.isExpanded};
        }
        return {...currentData, children: handleToggle(currentData.children, nodeId)}
     });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col p-4 sm:p-8">
      <header className="text-center mb-10 shrink-0">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">CodeAutomation AI LLC</h1>
        <p className="text-lg text-slate-600 mt-2">Interactive Organizational Chart</p>
      </header>
      <main className="flex-grow w-full flex justify-start items-start overflow-x-auto py-8">
          <div className="inline-block mx-auto">
            <OrgChart 
              node={orgData} 
              onAddNode={handleAddNode}
              onUpdateNode={handleUpdateNode}
              onDeleteNode={handleDeleteNode}
              onToggleExpand={handleToggleExpand}
              onUpdateImageNode={handleUpdateImageNode}
              isRoot={true}
            />
          </div>
      </main>
       <footer className="text-center mt-auto text-slate-500 text-sm shrink-0">
        <p>&copy; {new Date().getFullYear()} CodeAutomation AI LLC. All rights reserved.</p>
        <p>Powered by Bushra Rizwan.</p>
      </footer>
    </div>
  );
};

export default App;
