function TestCaseManager({

    input,
    setInput,

    expectedOutput,
    setExpectedOutput,

    hidden,
    setHidden,

    editingTestCaseId,

    handleCreateTestCase,
    handleUpdateTestCase,
    resetForm,

    testCases,

    handleEditTestCase,
    handleDeleteTestCase

}) {

    return (

        <div>

            <hr />

            <h2>
                Manage Test Cases
            </h2>

            <textarea
                placeholder="Input"
                value={input}
                onChange={(e) =>
                    setInput(
                        e.target.value
                    )
                }
                rows={4}
                cols={60}
            />

            <br />
            <br />

            <textarea
                placeholder="Expected Output"
                value={expectedOutput}
                onChange={(e) =>
                    setExpectedOutput(
                        e.target.value
                    )
                }
                rows={4}
                cols={60}
            />

            <br />
            <br />

            <label>

                <input
                    type="checkbox"
                    checked={hidden}
                    onChange={(e) =>
                        setHidden(
                            e.target.checked
                        )
                    }
                />

                {" "}
                Hidden Test Case

            </label>

            <br />
            <br />

            {

                editingTestCaseId ?

                <>

                    <button
                        onClick={
                            handleUpdateTestCase
                        }
                    >
                        Save Changes
                    </button>

                    {" "}

                    <button
                        onClick={
                            resetForm
                        }
                    >
                        Cancel
                    </button>

                </>

                :

                <button
                    onClick={
                        handleCreateTestCase
                    }
                >
                    Add Test Case
                </button>

            }

            <h3>
                Visible Test Cases
            </h3>

            {

                testCases.map(
                    testCase => (

                        <div
                            key={testCase.id}
                        >

                            <pre>

                                Input:

                                {"\n"}

                                {testCase.input}

                            </pre>

                            <pre>

                                Expected:

                                {"\n"}

                                {testCase.expectedOutput}

                            </pre>

                            <button
                                onClick={() =>
                                    handleEditTestCase(
                                        testCase
                                    )
                                }
                            >
                                Edit
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                    handleDeleteTestCase(
                                        testCase.id
                                    )
                                }
                            >
                                Delete
                            </button>

                            <hr />

                        </div>

                    )
                )

            }

        </div>

    );

}

export default TestCaseManager;