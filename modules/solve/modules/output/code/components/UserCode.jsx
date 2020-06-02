import React, { Component } from "react";
import FileViewer from "../../results/components/FileViewer";

const generateFileViewers = code_files =>
  code_files.map(codeFile => (
    <FileViewer
      key={codeFile._links.code_file.href}
      file_link={codeFile._links.code_file}
      function_language={codeFile.function_language}
      code_type={codeFile.code_type}
    />
  ));

class UserCode extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      results,
      fetchUserCode,
      fetchUserLearnR,
      fetchUserLearnPython
    } = this.props;
    if (this.props.results !== prevProps.results) {
      fetchUserCode(results);
      fetchUserLearnR(results);
      fetchUserLearnPython(results);
    }
  }

  componentDidMount() {
    const {
      results,
      fetchUserCode,
      fetchUserLearnR,
      fetchUserLearnPython
    } = this.props;
    fetchUserCode(results);
    fetchUserLearnR(results);
    fetchUserLearnPython(results);
  }

  render() {
    const { code_primary, code_secondary, secondary } = this.props;
    return (
      <div>
        {!secondary ? (
          <div className="code-wrapper">
            {code_primary &&
              code_primary.ath_code &&
              code_primary.ath_code.code_files !== undefined && (
                <div>
                  <div className="code-block">
                    {generateFileViewers(code_primary.ath_code.code_files)}
                  </div>
                </div>
              )}
            {code_primary &&
              code_primary.r_code &&
              code_primary.r_code.code_files !== undefined && (
                <div>
                  <div className="code-block">
                    {generateFileViewers(code_primary.r_code.code_files)}
                  </div>
                </div>
              )}
            {code_primary &&
              code_primary.python_code &&
              code_primary.python_code.code_files !== undefined && (
                <div>
                  <div className="code-block">
                    {generateFileViewers(code_primary.python_code.code_files)}
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className="code-wrapper">
            {code_secondary &&
              code_secondary.ath_code &&
              code_secondary.ath_code.code_files !== undefined && (
                <div>
                  <div className="code-block">
                    {generateFileViewers(code_secondary.ath_code.code_files)}
                  </div>
                </div>
              )}
            {code_secondary &&
              code_secondary.r_code &&
              code_secondary.r_code.code_files !== undefined && (
                <div>
                  <div className="code-block">
                    {generateFileViewers(code_secondary.r_code.code_files)}
                  </div>
                </div>
              )}
            {code_secondary &&
              code_secondary.python_code &&
              code_secondary.python_code.code_files !== undefined && (
                <div>
                  <div className="code-block">
                    {generateFileViewers(code_secondary.python_code.code_files)}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}

export default UserCode;
