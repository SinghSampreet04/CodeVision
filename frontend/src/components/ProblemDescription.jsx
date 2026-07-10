function ProblemDescription({

    problem

}) {

    return (

        <div className="section-card">

            <h2
                className="section-title"
            >
                Problem Description
            </h2>

            <p>
                {problem.description}
            </p>

            <br />

            <h3>
                Sample Input
            </h3>

            <pre>
                {problem.sampleInput}
            </pre>

            <h3>
                Sample Output
            </h3>

            <pre>
                {problem.sampleOutput}
            </pre>

        </div>

    );

}

export default ProblemDescription;