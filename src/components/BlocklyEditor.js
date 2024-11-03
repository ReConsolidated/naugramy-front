// src/components/BlocklyEditor.js
import React, { useCallback, useRef } from "react";
import { BlocklyWorkspace } from "react-blockly";
import * as Blockly from "blockly/core";
import * as BlocklyMessages from "blockly/msg/en";
import "../customBlocks"; // Importowanie niestandardowych bloków

Blockly.setLocale(BlocklyMessages);

// Funkcja do podświetlania bloków
Blockly.BlockSvg.prototype.setHighlighted = function(highlighted) {
    if (!this.rendered) {
        return;
    }
    if (highlighted) {
        this.addSelect();
    } else {
        this.removeSelect();
    }
};

const BlocklyEditor = ({ onMove, toolboxConfiguration, initialXml, onWorkspaceInjected }) => {
    const previousBlockCount = useRef(0);

    const handleWorkspaceChange = useCallback(
        (workspace) => {
            const currentBlockCount = workspace.getAllBlocks(false).length;
            if (currentBlockCount !== previousBlockCount.current) {
                if (onMove) onMove(); // Wywołanie onMove, jeśli jest przekazane
                previousBlockCount.current = currentBlockCount;
            }
        },
        [onMove]
    );

    return (
        <div className="w-full h-96">
            <BlocklyWorkspace
                toolboxConfiguration={toolboxConfiguration}
                workspaceConfiguration={{
                    grid: {spacing: 20, length: 3, colour: "#ccc", snap: true},
                    trashcan: true,
                }}
                className="w-full h-full"
                initialXml={initialXml}
                initialJson={null} // Domyślna wartość dla wymaganego atrybutu
                onXmlChange={(xml) => {
                }}
                onImportXmlError={(error) => console.error("Import XML error:", error)}
                onJsonChange={() => {
                }} // Pusta funkcja dla wymaganego atrybutu
                onImportError={(error) => console.error("Import error:", error)}
                onDispose={() => console.log("Workspace disposed")} // Pusta funkcja dla wymaganego atrybutu
                onInject={(workspace) => {
                    console.log("Workspace injected", workspace);
                    onWorkspaceInjected(workspace);
                }}
                onWorkspaceChange={handleWorkspaceChange}
            />
        </div>
    );
};

export default BlocklyEditor;
