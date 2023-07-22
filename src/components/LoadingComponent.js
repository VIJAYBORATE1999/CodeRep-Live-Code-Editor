import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "25vh", height:"100%" }}
    >
      <Spinner
        color="dark"
        type="grow"
        style={{ width: "3rem", height: "3rem" }}
      />
    </div>
  );
}

export default Loading;
