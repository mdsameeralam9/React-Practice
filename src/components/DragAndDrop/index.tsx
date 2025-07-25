import React, { useRef, useState } from "react";
import './style.css';

type TaskState = {
  [key: string]: string[];
};

const initialState: TaskState = {
  Todo: [
    "Design UI mockups",
    "Set up project repository",
    "Write unit test",
    "Integrate payment gateway",
  ],
  "In Progress": ["Develop authentication flow", "Implement responsive design"],
  Completed: [
    "Set up CI/CD pipeline",
    "Conduct code reviews",
    "Deploy initial version to staging",
  ],
};

export default function DragAndDrop() {
  const [data, setData] = useState<TaskState>(initialState);
  const dragItem = useRef<string | null>(null);
  const dragContainer = useRef<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: string,
    container: string
  ) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetContainer: string
  ) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;

    if (!item || !sourceContainer) return;

    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i !== item
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      return newData;
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.keys(data).map((container, index) => (
        <div
          key={index}
          onDrop={(e) => handleDrop(e, container)}
          onDragOver={handleDragOver}
          style={{
            background: "#f0f0f0",
            padding: "1rem",
            width: 250,
            minHeight: 300,
          }}
        >
          <h2>{container}</h2>
          {data[container].map((item, idx) => (
            <div
              key={idx}
              onDragStart={(e) => handleDragStart(e, item, container)}
              onDragEnd={handleDragEnd}
              draggable
              style={{
                userSelect: "none",
                padding: 16,
                margin: "0 0 8px 0",
                backgroundColor: "white",
                cursor: "move",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
