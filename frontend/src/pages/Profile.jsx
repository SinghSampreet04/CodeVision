import { useEffect, useState } from "react";

import {
    getProfile
} from "../services/api";

function Profile() {

    const [profile, setProfile] =
        useState(null);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadProfile() {

            try {

                const data =
                    await getProfile();

                setProfile(
                    data
                );

            } catch (error) {
                setError(error.message);
            }
        }

        loadProfile();

    }, []);

    if (error) {
        return (
            <div className="section-card page-state" role="alert">
                <h1>Profile unavailable</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="section-card page-state" role="status">
                <p>Loading profile...</p>
            </div>
        );
    }

    const badges = [];

    if (profile.acceptedSubmissions >= 1) {

        badges.push("🏆 First AC");

    }

    if (profile.solvedProblems >= 5) {

        badges.push("🔥 Problem Solver");

    }

    if (profile.solvedProblems >= 10) {

        badges.push("⭐ Advanced Solver");

    }

    if (profile.solvedProblems >= 25) {

        badges.push("💎 Elite Solver");

    }

    if (profile.hardSolved >= 1) {

        badges.push("🚀 Hard Problem Solver");

    }

    if (profile.hardSolved >= 5) {

        badges.push("👑 Hard Master");

    }

    if (profile.acceptanceRate >= 80) {

        badges.push("🎯 Accuracy Master");

    }

    return (

        <div className="profile-page">

            <div className="profile-header">

                <div className="profile-user-info">

                    <div className="profile-avatar">

                        👤

                    </div>

                    <div className="profile-user-text">

                        <h1>

                            {profile.username}

                        </h1>

                        <p className="profile-role-text">

                            {profile.role}

                        </p>

                        <p className="profile-email">

                            {profile.email}

                        </p>

                    </div>

                </div>

                <span className="profile-role">

                    {profile.role}

                </span>

            </div>

            <div className="profile-stats">

                <div className="profile-stat">

                    <h2>

                        {profile.solvedProblems}

                    </h2>

                    <span>

                        Solved

                    </span>

                </div>

                <div className="profile-stat">

                    <h2>

                        {profile.totalSubmissions}

                    </h2>

                    <span>

                        Submissions

                    </span>

                </div>

                <div className="profile-stat">

                    <h2>

                        {profile.acceptanceRate}%

                    </h2>

                    <span>

                        Acceptance

                    </span>

                </div>

                <div className="profile-stat">

                    <h2>

                        {profile.hardSolved}

                    </h2>

                    <span>

                        Hard Solved

                    </span>

                </div>

            </div>

            <div className="section-card">

                <h2 className="section-title">

                    📊 Statistics

                </h2>

                <div className="stats-grid">

                    <div className="stat-box">

                        <strong>

                            Total Submissions

                        </strong>

                        <h3>

                            {profile.totalSubmissions}

                        </h3>

                    </div>

                    <div className="stat-box">

                        <strong>

                            Accepted

                        </strong>

                        <h3 className="accepted">

                            {profile.acceptedSubmissions}

                        </h3>

                    </div>

                    <div className="stat-box">

                        <strong>

                            Acceptance Rate

                        </strong>

                        <h3>

                            {profile.acceptanceRate}%

                        </h3>

                    </div>

                </div>

            </div>

            <div className="section-card">

                <h2 className="section-title">

                    ✅ Solved Problems

                </h2>

                <div className="stats-grid">

                    <div className="stat-box">

                        <strong>

                            Total

                        </strong>

                        <h3>

                            {profile.solvedProblems}

                        </h3>

                    </div>

                    <div className="stat-box">

                        <strong>

                            Easy

                        </strong>

                        <h3 className="accepted">

                            {profile.easySolved}

                        </h3>

                    </div>

                    <div className="stat-box">

                        <strong>

                            Medium

                        </strong>

                        <h3 className="pending">

                            {profile.mediumSolved}

                        </h3>

                    </div>

                    <div className="stat-box">

                        <strong>

                            Hard

                        </strong>

                        <h3 className="wrong">

                            {profile.hardSolved}

                        </h3>

                    </div>

                </div>

            </div>

            <div className="section-card">

                <h2 className="section-title">

                    🏆 Achievements

                </h2>

                {

                    badges.length === 0 ? (

                        <p>

                            No achievements yet.

                        </p>

                    ) : (

                        <div className="badge-container">

                            {

                                badges.map(

                                    (

                                        badge,

                                        index

                                    ) => (

                                        <div

                                            key={index}

                                            className="achievement-badge"

                                        >

                                            {badge}

                                        </div>

                                    )

                                )

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default Profile;
