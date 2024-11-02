// src/levels.js
const levels = [
    {
        id: 1,
        description: "Move the character to the target point.",
        requirements: ["move_forward", "turn_left", "turn_right"],
        validate: (gameState) => {
            // Sprawdzenie, czy postać dotarła do punktu docelowego
            return gameState.position.x === gameState.target.x && gameState.position.y === gameState.target.y;
        },
        toolbox: {
            kind: "flyoutToolbox",
            contents: [
                { kind: "block", type: "move_forward" },
                { kind: "block", type: "turn_left" },
                { kind: "block", type: "turn_right" },
            ],
        },
    },
];

export default levels;
