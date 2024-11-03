// src/components/Level.js
import React, { useRef, useState, useEffect } from "react";
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
    const [blockCount, setBlockCount] = useState(0);

    window.highlightBlock = (blockId) => {
        if (workspaceRef.current) {
            workspaceRef.current.highlightBlock(blockId);
        }
    };

    useEffect(() => {
        if (workspaceRef.current) {
            const updateBlockCount = () => {
                setBlockCount(workspaceRef.current.getAllBlocks().length);
            };
            workspaceRef.current.addChangeListener(updateBlockCount);
            updateBlockCount();
        }
    }, [workspaceRef.current]);

    const runCode = async () => {
        clearAllHighlights();

        if (gameCanvasRef.current) {
            gameCanvasRef.current.resetPosition();
        }

        javascriptGenerator.STATEMENT_PREFIX = "await new Promise(resolve => setTimeout(resolve, 200));\nhighlightBlock(%1);\n";
        javascriptGenerator.addReservedWords("highlightBlock");

        javascriptGenerator.init(workspaceRef.current);

        const startBlock = workspaceRef.current.getBlocksByType("on_start", false)[0];
        if (startBlock) {
            const code = javascriptGenerator.blockToCode(startBlock);
            if (gameCanvasRef.current) {
                await gameCanvasRef.current.executeCode(code);
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
        if (level.blockLimit && blockCount > level.blockLimit) {
            alert(`Przekroczono limit bloczków! Limit: ${level.blockLimit}, Użyto: ${blockCount}`);
        } else {
            alert("Poziom ukończony!");
        }
    };

    const resetPosition = () => {
        if (gameCanvasRef.current) {
            gameCanvasRef.current.resetPosition();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 w-full px-6">
            <div className="w-full">
                <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
                    <h2 className="text-lg font-semibold">Opis poziomu</h2>
                    <p>{level.description}</p>
                </div>

                <div className="flex flex-col items-start w-full">
                    <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold mb-4">Blockly Editor</h2>
                            {level.blockLimit && (
                                <h2 className="text-xl mb-4 mx-auto">Bloki: {blockCount} / {level.blockLimit}</h2>
                            )}
                        </div>

                        <BlocklyEditor
                            toolboxConfiguration={level.toolbox}
                            initialXml={level.initialXml}
                            onWorkspaceInjected={(workspace) => (workspaceRef.current = workspace)}
                        />
                    </div>

                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={runCode}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Run Code
                        </button>
                        <button
                            onClick={resetPosition}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Reset Position
                        </button>
                    </div>
                </div>
            </div>
            <GameCanvas
                ref={gameCanvasRef}
                level={level}
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