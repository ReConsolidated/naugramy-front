// src/components/GameCanvas.js
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const GRID_SIZE = 5;
const TILE_SIZE = 64;

const GameCanvas = forwardRef(({ startPosition, startDirection, obstacles, goalPosition, goalCheck, onLevelComplete }, ref) => {
    const canvasRef = useRef(null);
    const positionRef = useRef(startPosition);
    const directionRef = useRef(startDirection);
    let ctx = null; // Kontekst rysowania

    useEffect(() => {
        if (canvasRef.current) {
            ctx = canvasRef.current.getContext("2d");

            canvasRef.current.width = GRID_SIZE * TILE_SIZE;
            canvasRef.current.height = GRID_SIZE * TILE_SIZE;

            resetCanvas();
            drawObstacles();
            drawCharacter();
        }
    }, []);

    const resetCanvas = () => {
        if (ctx) { // Sprawdzamy, czy `ctx` istnieje przed wywołaniem metod
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawGrid();
            drawGoal(); // Rysowanie celu przy każdym odświeżeniu planszy
        }
    };

    const resetPosition = () => {
        if (ctx) { // Ponownie sprawdzamy `ctx`
            positionRef.current = startPosition;
            directionRef.current = startDirection;
            resetCanvas();
            drawObstacles();
            drawCharacter();
        }
    };

    const drawGrid = () => {
        if (ctx) {
            ctx.strokeStyle = "#ccc";
            for (let x = 0; x <= GRID_SIZE; x++) {
                ctx.beginPath();
                ctx.moveTo(x * TILE_SIZE, 0);
                ctx.lineTo(x * TILE_SIZE, GRID_SIZE * TILE_SIZE);
                ctx.stroke();
                ctx.moveTo(0, x * TILE_SIZE);
                ctx.lineTo(GRID_SIZE * TILE_SIZE, x * TILE_SIZE);
                ctx.stroke();
            }
        }
    };

    const drawGoal = () => {
        if (ctx && goalPosition) {
            ctx.fillStyle = "yellow"; // Kolor celu
            ctx.beginPath();
            ctx.arc(
                goalPosition.x * TILE_SIZE + TILE_SIZE / 2,
                goalPosition.y * TILE_SIZE + TILE_SIZE / 2,
                TILE_SIZE / 4, // Rozmiar punktu celu
                0,
                2 * Math.PI
            );
            ctx.fill();
        }
    };

    const drawObstacles = () => {
        if (ctx) {
            obstacles.forEach(({ x, y, type }) => {
                ctx.fillStyle = type === "rock" ? "#7d7d7d" : type === "tree" ? "#228B22" : "#00f";
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            });
        }
    };

    const drawCharacter = () => {
        if (ctx) {
            const { x, y } = positionRef.current;
            ctx.fillStyle = "orange";
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    };

    useImperativeHandle(ref, () => ({
        executeCommands,
        resetPosition
    }));

    const executeCommands = async (commands) => {
        for (const command of commands) {
            await executeCommand(command);
        }
        checkGoal();
        eval('highlightBlock(null)'); // Reset podświetlenia
    };

    const executeCommand = (command) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    eval(command); // Wykonujemy komendę jako JavaScript
                } catch (e) {
                    console.error(`Error executing command: ${command}`, e);
                }
                resolve();
            }, 300);
        });
    };

    const moveForward = () => {
        const newPosition = { ...positionRef.current };
        if (directionRef.current === "up") newPosition.y = Math.max(0, newPosition.y - 1);
        if (directionRef.current === "down") newPosition.y = Math.min(GRID_SIZE - 1, newPosition.y + 1);
        if (directionRef.current === "left") newPosition.x = Math.max(0, newPosition.x - 1);
        if (directionRef.current === "right") newPosition.x = Math.min(GRID_SIZE - 1, newPosition.x + 1);

        positionRef.current = newPosition;

        resetCanvas();
        drawObstacles();
        drawCharacter();
    };

    const turnLeft = () => {
        directionRef.current = directionRef.current === "up" ? "left" :
            directionRef.current === "left" ? "down" :
                directionRef.current === "down" ? "right" : "up";
    };

    const turnRight = () => {
        directionRef.current = directionRef.current === "up" ? "right" :
            directionRef.current === "right" ? "down" :
                directionRef.current === "down" ? "left" : "up";
    };

    const checkGoal = () => {
        const state = { position: positionRef.current, direction: directionRef.current };
        if (goalCheck(state)) {
            onLevelComplete();
        }
    };

    return (
        <canvas
            ref={canvasRef}
            style={{ border: "1px solid black", width: `${GRID_SIZE * TILE_SIZE}px`, height: `${GRID_SIZE * TILE_SIZE}px` }}
        />
    );
});

export default GameCanvas;
