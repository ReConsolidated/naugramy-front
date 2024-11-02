// src/components/Level.js
import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Task from "./Task";
import Progress from "./Progress";
import levels from "../levels";

const Level = () => {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const levelIndex = parseInt(levelId, 10) - 1;
    const level = levels[levelIndex];

    const [moves, setMoves] = useState(0);
    const [workspace, setWorkspace] = useState(null);

    const handleMove = () => {
        setMoves((prevMoves) => prevMoves + 1);
    };

    const validateLevel = useCallback((workspace) => {
        return level.validate(workspace);
    }, [level]);

    const handleLevelCompletion = () => {
        if (workspace && validateLevel(workspace)) {
            alert("Level completed!");
            if (levelIndex < levels.length - 1) {
                navigate(`/levels/${levelIndex + 2}`); // Przechodzimy do następnego poziomu
                setMoves(0); // Resetujemy licznik ruchów
            } else {
                alert("Congratulations, you have completed all levels!");
                navigate("/"); // Powrót na stronę główną
            }
        } else {
            alert("Try again!");
        }
    };

    if (!level) {
        return <p>Level not found</p>;
    }

    return (
        <div className="text-center w-full">
            <Task
                level={level}
                onMove={handleMove}
                onWorkspaceInjected={setWorkspace}
            />
            {/* Ustawienie Progress i przycisku w jednej linii */}
            <div className="flex items-center justify-center space-x-4 mt-4">
                <Progress moves={moves} level={level.id} />
                <button
                    onClick={handleLevelCompletion}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Check Level
                </button>
            </div>
        </div>
    );
};

export default Level;
