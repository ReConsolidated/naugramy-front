// src/customBlocks.js
import * as Blockly from "blockly/core";
import {javascriptGenerator} from "blockly/javascript";

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
    {
        type: "repeat_n_times",
        message0: "repeat %1 times",
        args0: [
            {
                type: "field_dropdown",
                name: "TIMES",
                options: [
                    ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]
                ]
            }
        ],
        message1: "do %1",
        args1: [
            {
                type: "input_statement",
                name: "DO"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 120,
        tooltip: "",
        helpUrl: ""
    }
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

javascriptGenerator.forBlock["repeat_n_times"] = function (block) {
    const repeats = String(block.getFieldValue('TIMES'));
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return 'for (var count = 0; count < ' + repeats + '; count++) {\n' + branch + '}\n';
};