// src/components/Level.js
import React, {useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {javascriptGenerator} from "blockly/javascript";
import BlocklyEditor from "./BlocklyEditor";
import GameView from "./GameView";
import levels from "../levels";

const Level = () => {
    const { levelId } = useParams();
    const levelIndex = parseInt(levelId, 10) - 1;
    const level = levels[levelIndex];
    const [commands, setCommands] = useState([]);
    const workspaceRef = useRef(null);

    // Funkcja do podświetlania bloku
    // Dodanie funkcji do globalnego obiektu `window`
    window.highlightBlock = (blockId) => {
        if (workspaceRef.current) {
            workspaceRef.current.highlightBlock(blockId);
        }
    };

    const runCode = () => {
        clearAllHighlights();
        // Ustawienie `STATEMENT_PREFIX` dla automatycznego podświetlania
        javascriptGenerator.STATEMENT_PREFIX = "highlightBlock(%1);\n";
        javascriptGenerator.addReservedWords('highlightBlock');

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        const commandList = code.split("\n").filter(Boolean);
        setCommands(commandList);
    };

    const clearAllHighlights = () => {
        if (workspaceRef.current) {
            workspaceRef.current.getAllBlocks().forEach((block) => {
                block.setHighlighted(false);
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 w-full px-6">
            <div className="flex flex-col items-start w-full">
                <BlocklyEditor
                    toolboxConfiguration={level.toolbox}
                    onWorkspaceInjected={(workspace) => (workspaceRef.current = workspace)}
                />
                <button
                    onClick={runCode}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Run Code
                </button>
            </div>
            <GameView commands={commands} className="flex-grow" />
        </div>
    );
};

export default Level;
