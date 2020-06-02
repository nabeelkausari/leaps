import * as React from "react";
import { fetchLinkDirectly } from "../../../../../../../common/api/helpers";
import "../styles/Fileviewer.scss";
import { icon_copy } from "../../../../../../../common/images";
import Tooltip from "../../../../../../../app/components/Tooltip/Tooltip";

class FileViewer extends React.Component {
  constructor(props) {
    super(props);
    this.readTextFile = file => {
      fetchLinkDirectly(file)
        .then(response => response.text())
        .then(text => this.setState({ text: text }))
        .catch(reason => console.log(reason.message))
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    };
    this.copyToClipboard = () => {
      this.CopyCode.select();
      document.execCommand("copy");
    };
    this.state = {
      loading: true,
      text: ""
    };
  }
  componentDidMount() {
    const { file_link } = this.props;
    this.readTextFile(file_link);
  }

  getLanguage = (fx_name, code_type) => {
    if (fx_name === undefined) {
      switch (code_type) {
        case "LEARNRCODE":
          return "R";
        case "LEARNPYTHONCODE":
          return "Python";
        default:
          return "";
      }
    }

    return fx_name;
  };

  render() {
    const { text } = this.state;
    const { function_language, code_type } = this.props;
    return (
      <div className="file-container">
        <div className="file-container__header">
          <span className="language">
            Language : {this.getLanguage(function_language, code_type)}
          </span>
          <Tooltip placement={"bottom"} text={"Copy"}>
            <div className="copy">
              <textarea
                className="file-container__text-area-for-copy"
                value={text}
                onChange={console.log}
                ref={node => (this.CopyCode = node)}
              />
              <img src={icon_copy} onClick={this.copyToClipboard} alt="copy" />
            </div>
          </Tooltip>
        </div>
        {text !== "" ? (
          <div className="text">{text}</div>
        ) : (
          <div className="text">No Code Here</div>
        )}
      </div>
    );
  }
}
export default FileViewer;
