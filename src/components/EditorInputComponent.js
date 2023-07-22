import { Card, CardHeader, CardBody, Alert } from "reactstrap";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-cobalt";

function EditorInput({ mode, displayName, value, onValueChange }) {
  const availableModes = ["html", "css", "javascript"];

  const editorSettings = {
    theme: "cobalt",
    width: "100%",
    height: "320px",
    fontSize: 14,
    wrapEnabled: true,
    editorProps: { $blockScrolling: true },
    setOptions: {
      highlightActiveLine: false,
      indentedSoftWrap: false,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    },
  };

  if (availableModes.includes(mode)) {
    return (
      <div className="editor_input">
        <Card>
          <CardHeader className="bg-dark text-white">{displayName}</CardHeader>
          <CardBody className="p-0">
            <AceEditor
              mode={mode}
              value={value}
              name={displayName}
              onChange={(editorValue) => onValueChange(editorValue)}
              {...editorSettings}
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return (
      <Alert className="text-center m-1">No Such Editor Mode Availble</Alert>
    );
  }
}

export default EditorInput;
