import { useEffect, useState } from "react";

import {
    getProfile
} from "../services/api";

function Profile() {

    const [profile, setProfile] =
        useState(null);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data =
                    await getProfile();

                setProfile(
                    data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        }

        loadProfile();

    }, []);

    if (!profile) {

        return (
            <p>
                Loading...
            </p>
        );
    }

    const badges = [];

    if (
        profile.acceptedSubmissions >= 1
    ) {

        badges.push(
            "🏆 First AC"
        );
    }

    if (
        profile.solvedProblems >= 5
    ) {

        badges.push(
            "🔥 Problem Solver"
        );
    }

    if (
        profile.solvedProblems >= 10
    ) {

        badges.push(
            "⭐ Advanced Solver"
        );
    }

    if (
        profile.solvedProblems >= 25
    ) {

        badges.push(
            "💎 Elite Solver"
        );
    }

    if (
        profile.hardSolved >= 1
    ) {

        badges.push(
            "🚀 Hard Problem Solver"
        );
    }

    if (
        profile.hardSolved >= 5
    ) {

        badges.push(
            "👑 Hard Master"
        );
    }

    if (
        profile.acceptanceRate >= 80
    ) {

        badges.push(
            "🎯 Accuracy Master"
        );
    }

    return (
        <div>

            <h1>
                My Profile
            </h1>

            <p>
                Username:
                {" "}
                {profile.username}
            </p>

            <p>
                Email:
                {" "}
                {profile.email}
            </p>

            <p>
                Role:
                {" "}
                {profile.role}
            </p>

            <hr />

            <h2>
                Statistics
            </h2>

            <p>
                Total Submissions:
                {" "}
                {profile.totalSubmissions}
            </p>

            <p>
                Accepted Submissions:
                {" "}
                {profile.acceptedSubmissions}
            </p>

            <p>
                Acceptance Rate:
                {" "}
                {profile.acceptanceRate}%
            </p>

            <hr />

            <h2>
                Solved Problems
            </h2>

            <p>
                Total Solved:
                {" "}
                {profile.solvedProblems}
            </p>

            <p>
                Easy Solved:
                {" "}
                {profile.easySolved}
            </p>

            <p>
                Medium Solved:
                {" "}
                {profile.mediumSolved}
            </p>

            <p>
                Hard Solved:
                {" "}
                {profile.hardSolved}
            </p>

            <hr />

            <h2>
                Achievements
            </h2>

            {
                badges.length === 0 && (
                    <p>
                        No achievements yet.
                    </p>
                )
            }

            {
                badges.map(
                    (
                        badge,
                        index
                    ) => (
                        <p
                            key={index}
                        >
                            {badge}
                        </p>
                    )
                )
            }

        </div>
    );
}

export default Profile;