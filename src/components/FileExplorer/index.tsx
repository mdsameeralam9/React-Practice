import React, { useState, useRef } from 'react';
import "./style.css";
import FolderAndFile, { type FileItem, type NewItem } from './FolderAndFile';
import explorer from "./data";

const addNewNodeToTree = (newNode:NewItem, nodeTree: FileItem) => {
    if(newNode.id === nodeTree.id){
        nodeTree.items = [...nodeTree.items, {...newNode, id: Date.now(), items:[]}];
        return nodeTree;
    }


    nodeTree.items = nodeTree.items.map(childNode => addNewNodeToTree(newNode, childNode));
    return nodeTree;
}

const FileExplorer: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(350);
  const [fileData, setFileData] = useState({...explorer})
  const isResizing = useRef<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX;
    if (newWidth > 100 && newWidth < 600) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  //handleNewNode
  const handleNewNode = (newNode: NewItem) => {
    const newNodeTree = addNewNodeToTree(newNode, fileData);
    setFileData(newNodeTree)
  }

  return (
    <div className="fileExplorerWraps">
      <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
        <h3>File Explorer</h3>
        <FolderAndFile 
          data={fileData}
          handleNewNode={handleNewNode}
          />
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="resizer"
        style={{ left: `${sidebarWidth - 1}px` }}
      />
      <div className="mainContent">mainContent</div>
    </div>
  );
};

export default FileExplorer;
