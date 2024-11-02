// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import levels from "../levels";

const Home = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Choose a Level</h2>
            <ul>
                {levels.map((level) => (
                    <li key={level.id} className="mb-2">
                        <Link
                            to={`/levels/${level.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            Go to Level {level.id}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
