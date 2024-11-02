// src/components/BlocklyEditor.js
import React, { useCallback, useRef } from "react";
import { BlocklyWorkspace } from "react-blockly";
import * as Blockly from "blockly";
import "blockly/javascript";
import * as BlocklyMessages from "blockly/msg/en";
Blockly.setLocale(BlocklyMessages);

const BlocklyEditor = ({ onMove, toolboxConfiguration, onWorkspaceInjected }) => {
    const previousBlockCount = useRef(0);

    const handleWorkspaceChange = useCallback(
        (workspace) => {
            const currentBlockCount = workspace.getAllBlocks(false).length;
            if (currentBlockCount !== previousBlockCount.current) {
                onMove();
                previousBlockCount.current = currentBlockCount;
            }
        },
        [onMove]
    );

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
            <h2 className="text-xl font-bold mb-4">Blockly Editor</h2>
            <div className="w-full h-96">
                <BlocklyWorkspace
                    toolboxConfiguration={toolboxConfiguration}
                    workspaceConfiguration={{
                        grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
                        trashcan: true,
                    }}
                    className="w-full h-full"
                    initialXml={` 
                        <xml xmlns="http://www.w3.org/1999/xhtml">
                            <block type="math_number" x="10" y="10"></block>
                        </xml>
                    `}
                    initialJson={null}
                    onXmlChange={(xml) => console.log("XML changed:", xml)}
                    onImportXmlError={(error) => console.error("Import XML error:", error)}
                    onJsonChange={(json) => console.log("JSON changed:", json)}
                    onImportError={(error) => console.error("Import error:", error)}
                    onDispose={() => console.log("Workspace disposed")}
                    onInject={(workspace) => {
                        console.log("Workspace injected", workspace);
                        onWorkspaceInjected(workspace); // Przekazujemy workspace do App.js
                    }}
                    onWorkspaceChange={handleWorkspaceChange}
                />
            </div>
        </div>
    );
};

export default BlocklyEditor;
