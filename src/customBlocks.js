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
    {
        type: "on_start",
        message0: "on start",
        nextStatement: null, // Pozwala na podłączenie bloków poniżej
        colour: 230,
        tooltip: "Blok startowy. Wykonuje podłączone do niego bloki.",
        helpUrl: "",
        deletable: false,
        movable: false,
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

// Generator kodu dla bloku `on_start`
javascriptGenerator.forBlock["on_start"] = function (block) {
    return "";
};
