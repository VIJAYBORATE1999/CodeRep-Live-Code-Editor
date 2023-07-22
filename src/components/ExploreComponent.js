import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import ExploreCard from "./ExploreCardComponent";
import Loading from "./LoadingComponent";

function Explore({ editors, isLoading, errMess }) {
  const username = useSelector((state) => state.authentication.username);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("None");

  const filterEditorsBySearch = (editor) => {
    const editorName = editor.name.toLowerCase();
    const editorOwner = editor.owner.username.toLowerCase();
    const editorDescription = editor.description.toLowerCase();
    const editorHTML = editor.editorHTML.toLowerCase();
    const editorCSS = editor.editorCSS.toLowerCase();
    const editorJavascript = editor.editorJavascript.toLowerCase();
    const searchQuery = search.toLowerCase().trim();

    return (
      editorName.indexOf(searchQuery) >= 0 ||
      editorDescription.indexOf(searchQuery) >= 0 ||
      editorOwner.indexOf(searchQuery) >= 0 ||
      editorHTML.indexOf(searchQuery) >= 0 ||
      editorCSS.indexOf(searchQuery) >= 0 ||
      editorJavascript.indexOf(searchQuery) >= 0
    );
  };

  const getSortFunction = () => {
    var sortFunction;
    switch (sortBy) {
      case "None": {
        sortFunction = (a, b) => a.id - b.id;
        break;
      }
      case "Date": {
        sortFunction = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
        break;
      }
      case "Date Reversed": {
        sortFunction = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
        break;
      }
      case "Rating": {
        sortFunction = (a, b) => b.rating - a.rating;
        break;
      }
      default: {
        break;
      }
    }
    return sortFunction;
  };

  const explore_items = editors
    .filter(filterEditorsBySearch)
    .sort(getSortFunction())
    .map((editor) => {
      return (
        <Col xs="12" md="6" key={editor._id} className="p-2">
          <ExploreCard editor={editor} loggedInUsername={username} />
        </Col>
      );
    });

  if (isLoading) return <Loading />;
  else if (errMess != null) {
    return (
      <Alert color="danger" className="p-5 m-5 h5 text-center">
        {errMess}
      </Alert>
    );
  } else {
    return (
      <div className="explore">
        <Container fluid>
          <Row className="bg-dark p-3 justify-content-around">
            <Col xs="12" md="4" className="p-1">
              <InputGroup>
                <InputGroupText className="rounded-0">
                  <span className="fa fa-sort" />
                  <span className="ml-2">Sort By</span>
                </InputGroupText>
                <Input
                  type="select"
                  className="custom-select"
                  style={{ boxShadow: "none", border: "none" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Rating">Rating</option>
                  <option value="Date">Date</option>
                  <option value="Date Reversed">Date Reversed</option>
                </Input>
              </InputGroup>
            </Col>
            <Col xs="12" md={{ offset: "1", size: "6" }} className="p-1">
              <InputGroup>
                <InputGroupText className="rounded-0">
                  <span className="fa fa-search " />
                  <span className="ml-2">Search</span>
                </InputGroupText>
                <Input
                  type="search"
                  className="shadow-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="p-2">
            {explore_items.length > 0 ? (
              explore_items
            ) : (
              <Col xs="12">
                <Alert color="info" className="p-5 m-5 h5 text-center">
                  No Such Editor Found
                </Alert>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Explore;
