// src/components/Level.js
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { javascriptGenerator } from "blockly/javascript";
import BlocklyEditor from "./BlocklyEditor";
import GameCanvas from "./GameCanvas";
import levels from "../levels";

const Level = () => {
    const { levelId } = useParams();
    const levelIndex = parseInt(levelId, 10) - 1;
    const level = levels[levelIndex];
    const workspaceRef = useRef(null);
    const gameCanvasRef = useRef(null);

    window.highlightBlock = (blockId) => {
        if (workspaceRef.current) {
            workspaceRef.current.highlightBlock(blockId);
        }
    };

    const runCode = () => {
        clearAllHighlights();

        if (gameCanvasRef.current) {
            gameCanvasRef.current.resetPosition();
        }

        javascriptGenerator.STATEMENT_PREFIX = "highlightBlock(%1);\n";
        javascriptGenerator.addReservedWords("highlightBlock");

        // Znalezienie głównego bloku "po uruchomieniu"
        const startBlock = workspaceRef.current.getBlocksByType("on_start", false)[0];
        if (startBlock) {
            const code = javascriptGenerator.blockToCode(startBlock);
            const commandList = code.split("\n").filter(Boolean);

            if (gameCanvasRef.current) {
                gameCanvasRef.current.executeCommands(commandList);
            }
        } else {
            console.warn("Nie znaleziono bloku startowego 'on_start'.");
        }
    };

    const clearAllHighlights = () => {
        if (workspaceRef.current) {
            workspaceRef.current.getAllBlocks().forEach((block) => {
                block.setHighlighted(false);
            });
        }
    };

    const handleLevelComplete = () => {
        alert("Poziom ukończony!");
    };

    return (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 w-full px-6">
            <div className="w-full">
                <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
                    <h2 className="text-lg font-semibold">Opis poziomu</h2>
                    <p>{level.description}</p>
                </div>

                <div className="flex flex-col items-start w-full">
                    <BlocklyEditor
                        toolboxConfiguration={level.toolbox}
                        initialXml={level.initialXml} // Początkowy XML z blokiem "po uruchomieniu"
                        onWorkspaceInjected={(workspace) => (workspaceRef.current = workspace)}
                    />
                    <button
                        onClick={runCode}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Run Code
                    </button>
                </div>
            </div>
            <GameCanvas
                ref={gameCanvasRef}
                startPosition={level.startPosition || { x: 0, y: 0 }}
                startDirection={level.startDirection || "right"}
                obstacles={level.obstacles || []}
                goalPosition={level.goalPosition || { x: 4, y: 4 }}
                goalCheck={level.goalCheck}
                onLevelComplete={handleLevelComplete}
                className="flex-grow"
            />
        </div>
    );
};

export default Level;
