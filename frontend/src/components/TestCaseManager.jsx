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

        <div className="testcase-card">

            <h2>

                Manage Test Cases

            </h2>

            <textarea

                className="testcase-input"

                aria-label="Test case input"

                placeholder="Input"

                value={input}

                onChange={(e) =>

                    setInput(
                        e.target.value
                    )

                }

            />

            <textarea

                className="testcase-input"

                aria-label="Expected output"

                placeholder="Expected Output"

                value={expectedOutput}

                onChange={(e) =>

                    setExpectedOutput(
                        e.target.value
                    )

                }

            />

            <label className="testcase-checkbox">

                <input

                    type="checkbox"

                    checked={hidden}

                    onChange={(e) =>

                        setHidden(
                            e.target.checked
                        )

                    }

                />

                Hidden Test Case

            </label>

            {

                editingTestCaseId ? (

                    <div className="testcase-actions">

                        <button

                            className="primary-btn"

                            onClick={handleUpdateTestCase}

                        >

                            Save Changes

                        </button>

                        <button

                            className="secondary-btn"

                            onClick={resetForm}

                        >

                            Cancel

                        </button>

                    </div>

                ) : (

                    <button

                        className="primary-btn"

                        onClick={handleCreateTestCase}

                    >

                        Add Test Case

                    </button>

                )

            }

            <h3>

                Test Cases

            </h3>

            {

                testCases.map(

                    testCase => (

                        <div

                            key={testCase.id}

                            className="testcase-item"

                        >

                            <h4>

                                Input

                            </h4>

                            <span className={`testcase-visibility ${testCase.hidden ? "hidden" : "public"}`}>
                                {testCase.hidden ? "Hidden" : "Public"}
                            </span>

                            <pre>

                                {testCase.input}

                            </pre>

                            <h4>

                                Expected Output

                            </h4>

                            <pre>

                                {testCase.expectedOutput}

                            </pre>

                            <div className="testcase-actions">

                                <button

                                    className="primary-btn"

                                    onClick={() =>

                                        handleEditTestCase(
                                            testCase
                                        )

                                    }

                                >

                                    Edit

                                </button>

                                <button

                                    className="danger-btn"

                                    onClick={() =>

                                        handleDeleteTestCase(
                                            testCase.id
                                        )

                                    }

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    )

                )

            }

        </div>

    );

}

export default TestCaseManager;
