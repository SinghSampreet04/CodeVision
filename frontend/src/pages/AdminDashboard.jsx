import { useEffect, useState } from "react";

import {
    getProblems,
    getProfile
} from "../services/api";

function AdminDashboard() {

    const [profile, setProfile] =
        useState(null);

    const [problems, setProblems] =
        useState([]);

    useEffect(() => {

        async function loadData() {

            try {

                const profileData =
                    await getProfile();

                const problemsData =
                    await getProblems();

                setProfile(
                    profileData
                );

                setProblems(
                    problemsData
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        }

        loadData();

    }, []);

    if (!profile) {

        return (
            <p>
                Loading...
            </p>
        );
    }

    return (
        <div>

            <h1>
                Admin Dashboard
            </h1>

            <hr />

            <h2>
                Admin Information
            </h2>

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
                Platform Statistics
            </h2>

            <p>
                Total Problems:
                {" "}
                {problems.length}
            </p>

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
                Problems
            </h2>

            {
                problems.map(
                    problem => (

                        <div
                            key={
                                problem.id
                            }
                        >

                            <p>
                                #
                                {problem.id}
                                {" - "}
                                {problem.title}
                                {" ("}
                                {problem.difficulty}
                                {")"}
                            </p>

                        </div>
                    )
                )
            }

        </div>
    );
}

export default AdminDashboard;