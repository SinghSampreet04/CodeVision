function ProblemHeader({

    problem,

    stats

}) {

    return (

        <div className="section-card">

            <h1>
                {problem.title}
            </h1>

            <h3>
                Difficulty: {problem.difficulty}
            </h3>

            {
                stats && (

                    <div className="stats-grid">

                        <div className="stat-box">

                            <strong>
                                Total Submissions
                            </strong>

                            <p>
                                {stats.totalSubmissions}
                            </p>

                        </div>

                        <div className="stat-box">

                            <strong>
                                Accepted
                            </strong>

                            <p>
                                {stats.acceptedSubmissions}
                            </p>

                        </div>

                        <div className="stat-box">

                            <strong>
                                Users Solved
                            </strong>

                            <p>
                                {stats.acceptedUsers}
                            </p>

                        </div>

                        <div className="stat-box">

                            <strong>
                                Acceptance Rate
                            </strong>

                            <p>
                                {stats.acceptanceRate}%
                            </p>

                        </div>

                    </div>

                )
            }

        </div>

    );

}

export default ProblemHeader;