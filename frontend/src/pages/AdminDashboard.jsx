import { useEffect, useState } from "react";

import {
    Link
} from "react-router-dom";

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

        <div className="admin-page">

            <div className="section-card">

                <div className="admin-header">

                    <div>

                        <h1>

                            👑 Admin Dashboard

                        </h1>

                        <p>

                            Welcome back, {profile.username}

                        </p>

                    </div>

                    <span className="profile-role">

                        {profile.role}

                    </span>

                </div>

            </div>

            <div className="admin-stats">

                <div className="admin-stat">

                    <h2>

                        {problems.length}

                    </h2>

                    <span>

                        Problems

                    </span>

                </div>

                <div className="admin-stat">

                    <h2>

                        {profile.totalSubmissions}

                    </h2>

                    <span>

                        Submissions

                    </span>

                </div>

                <div className="admin-stat">

                    <h2>

                        {profile.acceptedSubmissions}

                    </h2>

                    <span>

                        Accepted

                    </span>

                </div>

                <div className="admin-stat">

                    <h2>

                        {profile.acceptanceRate}%

                    </h2>

                    <span>

                        Acceptance

                    </span>

                </div>

            </div>

            <div className="section-card">

                <h2>

                    ⚡ Quick Actions

                </h2>

                <div className="admin-actions">

                    <Link

                        className="primary-btn"

                        to="/create-problem"

                    >

                        + Create Problem

                    </Link>

                </div>

            </div>

            <div className="section-card">

                <h2>

                    📚 Problems

                </h2>

                {

                    problems.map(

                        problem => (

                            <div

                                key={problem.id}

                                className="admin-problem-card"

                            >

                                <div>

                                    <h3>

                                        #{problem.id} — {problem.title}

                                    </h3>

                                    <div
                                        className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}
                                        style={{
                                            display: "inline-block"
                                        }}
                                    >

                                        {problem.difficulty}

                                    </div>

                                </div>

                                <Link

                                    className="secondary-btn"

                                    to={`/edit-problem/${problem.id}`}

                                >

                                    Edit

                                </Link>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default AdminDashboard;