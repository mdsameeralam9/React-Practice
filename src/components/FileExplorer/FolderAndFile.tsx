import React, { useRef, useState } from 'react';
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaFolderPlus } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import { FaFileCode } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export interface NewItem {
    id: string;
    name: string;
    isFolder: boolean;
}

export interface FileItem {
    id: string;
    name: string;
    isFolder: boolean;
    items: FileItem[]
}

interface PropsInterFace {
    data: FileItem;
    handleNewNode: () => void;
}

const FolderAndFile: React.FC<PropsInterFace> = ({ data, handleNewNode }) => {
    const [showChildNode, setShowChildNode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);
    const selectedISFolder = useRef<boolean>(false)

    const handleAdd = (e: React.MouseEvent<HTMLElement>, isFolder: boolean) => {
        e.stopPropagation();
        setShowInput(true);
        selectedISFolder.current = isFolder;
    }

    const handleSubmit = (e: React.FocusEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        setShowInput(false)
        const newNode: NewItem = {
            name: inputValue,
            id,
            isFolder: selectedISFolder.current
        }
        setInputValue("")
        handleNewNode(newNode)
    }

    const { id, name, isFolder, items } = data;

    if (isFolder) {
        return (
            <>
                <div className='FolderAndFile' onClick={() => setShowChildNode(p => !p)}>
                    <div className="folderName">
                        <span><FaFolder /></span>
                        <span>{name}</span>
                    </div>

                    <div className="folderAction">
                        <span className="folderActionItem" onClick={(e) => handleAdd(e, true)}><FaFolderPlus /></span>
                        <span className="folderActionItem" onClick={(e) => handleAdd(e, false)}><FaFileCirclePlus /></span>
                    </div>
                </div>
                {showInput &&
                    <form onSubmit={(e) => handleSubmit(e, id)}>
                        <input style={{width: "100%"}} type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </form>

                }
                {showChildNode && items?.length > 0 &&
                    <div className="childrenFileFOlder" style={{ paddingLeft: "20px" }}>
                        {items.map((child => (
                            <FolderAndFile key={child.id} data={child}  handleNewNode={handleNewNode}/>
                        )))}
                    </div>
                }

            </>

        )

    } else {
        return (
            <div className='FolderAndFile'>
                <span><FaFileCode /></span>
                <span>{name}</span>
            </div>
        )
    }

}

export default FolderAndFile