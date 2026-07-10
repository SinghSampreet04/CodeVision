import Editor from "@monaco-editor/react";

function CodeEditor({

    language,

    setLanguage,

    code,

    setCode,

    templates,

    handleSubmit

}) {

    return (

        <div>

            <h3>
                Code Editor
            </h3>

            <select
                value={language}
                onChange={(e) => {

                    const newLanguage =
                        e.target.value;

                    setLanguage(
                        newLanguage
                    );

                    setCode(
                        templates[
                            newLanguage
                        ]
                    );

                }}
            >

                <option value="java">
                    Java
                </option>

                <option value="python">
                    Python
                </option>

                <option value="cpp">
                    C++
                </option>

                <option value="javascript">
                    JavaScript
                </option>

            </select>

            <br />

            <br />

            <Editor
                height="500px"
                language={language}
                value={code}
                onChange={(value) =>
                    setCode(
                        value || ""
                    )
                }
                theme="vs-dark"
            />

            <br />

            <button
                onClick={
                    handleSubmit
                }
            >
                Submit Solution
            </button>

        </div>

    );

}

export default CodeEditor;