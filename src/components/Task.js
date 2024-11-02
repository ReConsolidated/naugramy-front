// src/components/Task.js
import React from "react";
import BlocklyEditor from "./BlocklyEditor";

const Task = ({ level, onMove, onWorkspaceInjected }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center w-full max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Task Level {level.id}</h2>
            <p className="mb-4">{level.description}</p>
            <BlocklyEditor
                onMove={onMove}
                toolboxConfiguration={level.toolbox}
                onWorkspaceInjected={onWorkspaceInjected} // Przekazujemy funkcję ustawienia workspace
            />
        </div>
    );
};

export default Task;
