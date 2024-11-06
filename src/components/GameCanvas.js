// src/components/GameCanvas.js
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";



const GameCanvas = forwardRef(({ level, startPosition, startDirection, obstacles, goalPosition, goalCheck, onLevelComplete }, ref) => {
    const canvasRef = useRef(null);
    const positionRef = useRef(startPosition);
    const directionRef = useRef(startDirection);
    const BOARD_SIZE = 320;
    const GRID_SIZE = level.gridSize;
    const TILE_SIZE = BOARD_SIZE / GRID_SIZE;
    let ctx = null;

    useEffect(() => {
        if (canvasRef.current) {
            ctx = canvasRef.current.getContext("2d");

            canvasRef.current.width = BOARD_SIZE;
            canvasRef.current.height = BOARD_SIZE;

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
        console.log("reseting position");
        if (ctx) { // Ponownie sprawdzamy `ctx`
            console.log('ctx present');
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
        executeCode,
        resetPosition
    }));

    const executeCode = async (code) => {
        console.log(code);
        try {
            await eval(`(async () => { ${code} })()`);
        } catch (e) {
            console.error(`Error executing code: ${code}`, e);
        }
        await eval('highlightBlock(null)'); // Reset podświetlenia
        checkGoal();
    };

    const moveForward = () => {
        console.log('goin forward');
        const newPosition = { ...positionRef.current };
        if (directionRef.current === "up") newPosition.y = Math.max(0, newPosition.y - 1);
        if (directionRef.current === "down") newPosition.y = Math.min(GRID_SIZE - 1, newPosition.y + 1);
        if (directionRef.current === "left") newPosition.x = Math.max(0, newPosition.x - 1);
        if (directionRef.current === "right") newPosition.x = Math.min(GRID_SIZE - 1, newPosition.x + 1);

        // Check if the new position is any type of obstacle
        const isObstacle = obstacles.some(obstacle => obstacle.x === newPosition.x && obstacle.y === newPosition.y);
        if (!isObstacle) {
            positionRef.current = newPosition;
        }

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
        console.log("Checking goal");
        const state = { position: positionRef.current, direction: directionRef.current };
        if (goalCheck(state)) {
            onLevelComplete();
            console.log("Level complete");
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
