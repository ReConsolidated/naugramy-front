// src/levels.js
const levels = [
    {
        id: 1,
        description: "Add two numbers together.",
        requirements: ["math_arithmetic", "math_number"],
        validate: (workspace) => {
            const blocks = workspace.getAllBlocks(false);
            return blocks.some(block => block.type === "math_arithmetic" && block.getFieldValue("OP") === "ADD");
        },
        toolbox: {
            kind: "flyoutToolbox",
            contents: [
                { kind: "block", type: "math_number" },
                { kind: "block", type: "math_arithmetic" },
            ],
        },
    },
    {
        id: 2,
        description: "Use a loop to repeat an action.",
        requirements: ["controls_repeat_ext", "math_number"],
        validate: (workspace) => {
            const blocks = workspace.getAllBlocks(false);
            return blocks.some(block => block.type === "controls_repeat_ext");
        },
        toolbox: {
            kind: "flyoutToolbox",
            contents: [
                { kind: "block", type: "controls_repeat_ext" },
                { kind: "block", type: "math_number" },
            ],
        },
    },
    {
        id: 3,
        description: "Use an if statement to check a condition.",
        requirements: ["controls_if"],
        validate: (workspace) => {
            const blocks = workspace.getAllBlocks(false);
            return blocks.some(block => block.type === "controls_if");
        },
        toolbox: {
            kind: "flyoutToolbox",
            contents: [
                { kind: "block", type: "controls_if" },
                { kind: "block", type: "logic_compare" },
                { kind: "block", type: "logic_boolean" },
                { kind: "block", type: "math_number" },
                { kind: "block", type: "math_arithmetic" },
            ],
        },
    },
    {
        id: 4,
        description: "Create a variable and assign it a value.",
        requirements: ["variables_set", "math_number"],
        validate: (workspace) => {
            const blocks = workspace.getAllBlocks(false);
            return blocks.some(block => block.type === "variables_set");
        },
        toolbox: {
            kind: "flyoutToolbox",
            contents: [
                { kind: "block", type: "variables_set" },
                { kind: "block", type: "math_number" },
                { kind: "block", type: "variables_get" },
            ],
        },
    },
    {
        id: 5,
        description: "Use a variable in an arithmetic operation.",
        requirements: ["variables_get", "math_arithmetic"],
        validate: (workspace) => {
            const blocks = workspace.getAllBlocks(false);
            return (
                blocks.some(block => block.type === "variables_get") &&
                blocks.some(block => block.type === "math_arithmetic")
            );
        },
        toolbox: {
            kind: "flyoutToolbox",
            contents: [
                { kind: "block", type: "variables_get" },
                { kind: "block", type: "math_arithmetic" },
                { kind: "block", type: "variables_set" },
                { kind: "block", type: "math_number" },
            ],
        },
    },
];

export default levels;
