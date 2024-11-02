// src/components/GameView.js
import React, { useState, useEffect } from "react";

const GRID_SIZE = 5;

const GameView = ({ commands }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState("right");

    useEffect(() => {
        if (commands.length > 0) {
            const executeCommands = async () => {
                for (const command of commands) {
                    executeCommand(command);
                    await new Promise((resolve) => setTimeout(resolve, 300)); // Opóźnienie po wykonaniu komendy
                }
            };
            executeCommands();
        }
    }, [commands]);

    const executeCommand = (command) => {
        try {
            // eslint-disable-next-line no-eval
            console.log(command);
            eval(command);
        } catch (e) {
            console.log(e);
        }
    };

    const moveForward = () => {
        setPosition((prev) => {
            const newPosition = { ...prev };
            if (direction === "up") newPosition.y = Math.max(0, prev.y - 1);
            if (direction === "down") newPosition.y = Math.min(GRID_SIZE - 1, prev.y + 1);
            if (direction === "left") newPosition.x = Math.max(0, prev.x - 1);
            if (direction === "right") newPosition.x = Math.min(GRID_SIZE - 1, prev.x + 1);
            return newPosition;
        });
    };

    const turnLeft = () => {
        setDirection((prev) => (prev === "up" ? "left" : prev === "left" ? "down" : prev === "down" ? "right" : "up"));
    };

    const turnRight = () => {
        setDirection((prev) => (prev === "up" ? "right" : prev === "right" ? "down" : prev === "down" ? "left" : "up"));
    };

    const renderGrid = () => {
        const grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const isCharacter = position.x === x && position.y === y;
                grid.push(
                    <div key={`${x}-${y}`} className="w-16 h-16 border flex items-center justify-center">
                        {isCharacter && <div className={`character ${direction}`}>🙂</div>}
                    </div>
                );
            }
        }
        return grid;
    };

    return (
        <div>
            <h3>Game View</h3>
            <div className="grid grid-cols-5 gap-1">{renderGrid()}</div>
        </div>
    );
};

export default GameView;
