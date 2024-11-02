// src/components/Progress.js
import React from "react";

const Progress = ({ moves, level }) => {
    const evaluateProgress = () => {
        const requiredMoves = 5;

        if (moves > requiredMoves * 2) {
            return "downgrade";
        } else if (moves <= requiredMoves) {
            return "upgrade";
        } else {
            return "stay";
        }
    };

    const result = evaluateProgress();

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center mt-6">
            <h2 className="text-xl font-bold mb-4">Progress</h2>
            <p className="mb-4">Level: {level}</p>
            <p className="mb-4">Total Moves: {moves}</p>
            <p className="font-semibold text-lg">
                Suggested Action:{" "}
                <span
                    className={
                        result === "upgrade"
                            ? "text-green-500"
                            : result === "downgrade"
                                ? "text-red-500"
                                : "text-yellow-500"
                    }
                >
          {result}
        </span>
            </p>
        </div>
    );
};

export default Progress;
