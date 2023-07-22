import { Card, CardHeader, CardBody } from "reactstrap";
import Loading from "./LoadingComponent";

function EditorOuput({ srcDoc, preparingSrcDoc, displayName }) {
  return (
    <div className="editor_output">
      <Card className="resizable_editor_output_card">
        <CardHeader className="bg-dark text-white">{displayName}</CardHeader>
        <CardBody className="p-0 d-flex justify-content-center w-100">
          {preparingSrcDoc ? (
            <Loading />
          ) : (
            <iframe
              srcDoc={srcDoc}
              title="output"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default EditorOuput;
