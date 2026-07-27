import Editor from "@monaco-editor/react";

function defineCodeVisionTheme(monaco) {
    monaco.editor.defineTheme("codevision-warm", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "9F8A83", fontStyle: "italic" },
            { token: "keyword", foreground: "FB7185" },
            { token: "string", foreground: "FBBF24" },
            { token: "number", foreground: "FDBA74" },
            { token: "type", foreground: "F59E0B" },
            { token: "identifier", foreground: "FFF7ED" },
            { token: "delimiter", foreground: "EADED7" }
        ],
        colors: {
            "editor.background": "#1B1418",
            "editor.foreground": "#FFF7ED",
            "editorCursor.foreground": "#F59E0B",
            "editorLineNumber.foreground": "#8F737A",
            "editorLineNumber.activeForeground": "#FBBF24",
            "editor.selectionBackground": "#78350F88",
            "editor.inactiveSelectionBackground": "#5B243255",
            "editor.lineHighlightBackground": "#2B2025",
            "editorIndentGuide.background1": "#4A343B",
            "editorIndentGuide.activeBackground1": "#D97706",
            "editorSuggestWidget.background": "#241A20",
            "editorSuggestWidget.border": "#513942",
            "editorSuggestWidget.selectedBackground": "#5B2432",
            "editorWidget.background": "#241A20",
            "editorWidget.border": "#513942"
        }
    });
}

function CodeEditor({

    language,

    setLanguage,

    code,

    setCode,

    templates,

    handleSubmit,

    submitting

}) {

    return (

    <div className="editor-card">

        <div className="editor-header">

            <h2>
                Code Editor
            </h2>

            <select
                aria-label="Programming language"
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

            beforeMount={defineCodeVisionTheme}

            theme="codevision-warm"

        />

        <button

            className="submit-btn"

            onClick={handleSubmit}

            disabled={submitting}

        >
            {submitting ? "Evaluating..." : "Submit Solution"}

        </button>

    </div>

);

}

export default CodeEditor;
