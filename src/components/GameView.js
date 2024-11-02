// src/components/GameView.js
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import './GameView.css';

const GRID_SIZE = 5;

const GameView = forwardRef(({ commands, goalCheck, obstacles, startPosition, startDirection, onLevelComplete }, ref) => {
    const positionRef = useRef(startPosition);
    const directionRef = useRef(startDirection);
    const movesRef = useRef(0);
    const [renderedPosition, setRenderedPosition] = useState(startPosition);
    const [renderedDirection, setRenderedDirection] = useState(startDirection);

    // Funkcja resetująca pozycję i kierunek
    const resetPosition = () => {
        positionRef.current = startPosition;
        directionRef.current = startDirection;
        movesRef.current = 0;
        setRenderedPosition(startPosition);
        setRenderedDirection(startDirection);
    };

    useImperativeHandle(ref, () => ({
        resetPosition,
        executeCommands
    }));

    const executeCommands = async (commands) => {
        for (const command of commands) {
            executeCommand(command);
            await new Promise((resolve) => setTimeout(resolve, 300));
        }
        eval('highlightBlock(null)');

        // Sprawdzenie warunku celu po zakończeniu komend
        checkGoal();
    };

    const executeCommand = (command) => {
        try {
            console.log(command);
            // eslint-disable-next-line no-eval
            eval(command);
            movesRef.current += 1;
        } catch (e) {
            console.log(e);
        }
    };

    const checkGoal = () => {
        const state = { position: positionRef.current, direction: directionRef.current, moves: movesRef.current };
        if (goalCheck && goalCheck(state)) {
            onLevelComplete();
        }
    };

    const moveForward = () => {
        const newPosition = { ...positionRef.current };
        if (directionRef.current === "up") newPosition.y = Math.max(0, newPosition.y - 1);
        if (directionRef.current === "down") newPosition.y = Math.min(GRID_SIZE - 1, newPosition.y + 1);
        if (directionRef.current === "left") newPosition.x = Math.max(0, newPosition.x - 1);
        if (directionRef.current === "right") newPosition.x = Math.min(GRID_SIZE - 1, newPosition.x + 1);

        positionRef.current = newPosition;
        setRenderedPosition(newPosition);
    };

    const turnLeft = () => {
        const newDirection = directionRef.current === "up" ? "left" :
            directionRef.current === "left" ? "down" :
                directionRef.current === "down" ? "right" : "up";

        directionRef.current = newDirection;
        setRenderedDirection(newDirection);
    };

    const turnRight = () => {
        const newDirection = directionRef.current === "up" ? "right" :
            directionRef.current === "right" ? "down" :
                directionRef.current === "down" ? "left" : "up";

        directionRef.current = newDirection;
        setRenderedDirection(newDirection);
    };

    const renderGrid = () => {
        const grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const isCharacter = renderedPosition.x === x && renderedPosition.y === y;
                const obstacle = obstacles.find((obstacle) => obstacle.x === x && obstacle.y === y);

                grid.push(
                    <div key={`${x}-${y}`} className="w-16 h-16 flex items-center justify-center relative">
                        {isCharacter && (
                            <div
                                className={`character ${renderedDirection} transition-transform`}
                            >
                                🙂
                            </div>
                        )}
                        {obstacle && <div className={`obstacle ${obstacle.type}`}>{getObstacleIcon(obstacle.type)}</div>}
                    </div>
                );
            }
        }
        return grid;
    };

    const getObstacleIcon = (type) => {
        switch (type) {
            case "rock":
                return "🪨";
            case "tree":
                return "🌳";
            case "water":
                return "💧";
            default:
                return "❓";
        }
    };

    return (
        <div>
            <h3>Game View</h3>
            <div
                className="grid grid-cols-5 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/65614919-0734-4dc8-9460-7034fd979346/dbg8qqd-0fb0aced-d05c-4df6-a7c6-b8e04c184ac5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY1NjE0OTE5LTA3MzQtNGRjOC05NDYwLTcwMzRmZDk3OTM0NlwvZGJnOHFxZC0wZmIwYWNlZC1kMDVjLTRkZjYtYTdjNi1iOGUwNGMxODRhYzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9IQbxC3HC3uuJLf8V9Ridq005b2_-4zFg6Cb9rJ2tbw')",
                    width: "320px",
                    height: "320px",
                }}
            >
                {renderGrid()}
            </div>
        </div>
    );
});

export default GameView;
