// src/levels.js
const levels = [
    {
        id: 1,
        description: "Przemieść bohatera na wyznaczone miejsce, unikając przeszkód.",
        toolbox: {
            kind: "flyoutToolbox",
            contents: [
                { kind: "block", type: "move_forward" },
                { kind: "block", type: "turn_left" },
                { kind: "block", type: "turn_right" },
            ],
        },
        initialXml: `
          <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="on_start" deletable="false" movable="false" x="20" y="20"></block>
          </xml>
        `,
        goalCheck: (state) => state.position.x === 4 && state.position.y === 4,
        startPosition: { x: 0, y: 0 },
        startDirection: "right",
        obstacles: [
            { x: 2, y: 2, type: "rock" },
            { x: 3, y: 1, type: "tree" },
            { x: 1, y: 3, type: "water" },
        ],
    },
    // Kolejne poziomy z różnymi przeszkodami, startPosition i startDirection
];

export default levels;
