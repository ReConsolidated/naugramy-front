// src/customBlocks.js
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

// Definicja bloków
Blockly.defineBlocksWithJsonArray([
    {
        type: "move_forward",
        message0: "move forward",
        previousStatement: null,
        nextStatement: null,
        colour: 160,
    },
    {
        type: "turn_left",
        message0: "turn left",
        previousStatement: null,
        nextStatement: null,
        colour: 160,
    },
    {
        type: "turn_right",
        message0: "turn right",
        previousStatement: null,
        nextStatement: null,
        colour: 160,
    },
]);

// Generowanie kodu JavaScript dla bloków
javascriptGenerator.forBlock["move_forward"] = function () {
    return "moveForward();\n";
};

javascriptGenerator.forBlock["turn_left"] = function () {
    return "turnLeft();\n";
};

javascriptGenerator.forBlock["turn_right"] = function () {
    return "turnRight();\n";
};
