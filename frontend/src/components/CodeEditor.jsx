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

    <div className="editor-card">

        <div className="editor-header">

            <h2>
                Code Editor
            </h2>

            <select
                value={language}
                onChange={(e) => {

                    const newLanguage =
                        e.target.value;

                    setLanguage(
                        newLanguage
                    );

                    setCode(
                        templates[newLanguage]
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

        </div>

        <Editor

            height="650px"

            language={language}

            value={code}

            onChange={(value) =>
                setCode(
                    value || ""
                )
            }

            theme="vs-dark"

        />

        <button

            className="submit-btn"

            onClick={handleSubmit}

        >

            Submit Solution

        </button>

    </div>

);

}

export default CodeEditor;