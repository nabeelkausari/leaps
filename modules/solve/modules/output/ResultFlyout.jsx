import React, { Component, Fragment } from "react";
import StepDataset from "../dataset/components/StepDatasets";
import Chart from "../../../../components/Chart";
import { Error } from "./results/components/Error";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
// import { RightArrowIcon } from "../../../../../common/images";
import cx from "classnames";
import EditorView from "../../../../components/Editor/EditorView";
import { chunkArray } from "../../../../common/utils/helperFunctions"
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import Tooltip from "../../../../components/Tooltip/Tooltip";

//temp fix
const replace = url => {
  if (typeof url === "string" || url instanceof String) {
    return url.replace("//data.analyttica.com/", "");
  }
  return {
    ...url,
    href: url.href.replace("//data.analyttica.com/", "")
  };
};

const override = css`
  border-color: var(--highlight-primary);
`;

export const renderResult = (
  { name, _links: { data, image, table, error, chart, pdf } },
  theme,
  secondary
) => {
  if (data !== undefined) {
    return (
      <p key={data.href}>
        {!!name && <b>{`${name}: `}</b>}The data is updated in the table
      </p>
    );
  }
  if (image !== undefined) {
    return (
      <div key={image.href}>
        {name && <h6>{name}</h6>}
        <img
          key={image.href}
          src={replace(image.href)}
          alt={name}
          width="fit-content"
        />
      </div>
    );
  }
  if (table !== undefined) {
    return (
      <div key={table.href} style={{ overflow: "auto" }}>
        {name && <h3>{formatHeader(name)}</h3>}
        {<StepDataset csv={replace(table.href)} secondary={secondary} />}
      </div>
    );
  }
  if (chart !== undefined) {
    return (
      <Fragment key={chart.href}>
        {name && <h6>{name}</h6>}
        <Chart link={replace(chart)} theme={theme} />
      </Fragment>
    );
  }
  if (error !== undefined) {
    return (
      <div key={error.href}>
        {name && <h6>{name}</h6>}
        <div
          style={{
            padding: "2rem",
            borderRadius: "5px",
            marginBottom: "25px",
            color: "var(--color-error)",
            fontSize: "12px"
          }}
        >
          <Error error_link={replace(error)} download={true} />
        </div>
      </div>
    );
  }
  if (pdf !== undefined) {
    return (
      <div key={pdf.href}>
        {name && <h6>{name}</h6>}
        <object
          data={replace(pdf.href)}
          type="application/pdf"
          width="100%"
          height="500px"
        >
          <p>
            Your web browser doesn't have a PDF plugin. Instead you can{" "}
            <a href={pdf.href}>click here to download the PDF file.</a>
          </p>
        </object>
      </div>
    );
  }
  return null;
};

const formatHeader = label => {
  label = label.replace(/^\d+_/i, " ");
  return label;
};

class ResultFlyout extends Component {
  handleAccordionClick = () => {
    if (!this.props.results.isAccordionOpen) {
      if (!this.props.results.function_description) {
        this.props.getFunctionDesc(
          this.props.results.function_url,
          this.props.secondary
        );
      }
    }
    this.props.toggleOutputAccordion(this.props.secondary);
  };

  getParameters = parameter => {
    if (parameter[0] === "[") {
      let modifiedParamString = parameter.substring(1, parameter.length - 1);
      return modifiedParamString.split(",");
    } else {
      return [parameter];
    }
  };

  render() {
    const {
      results,
      theme,
      secondary,
      function_desc_loading,
      print_ref
    } = this.props;
    const data_set_names = results.data_set_names;
    return (
      <Fragment>
        <div className="flyout-container__desc-accordion">
          <Accordion
            activeKey={this.props.results.isAccordionOpen ? "0" : null}
          >
            <Card className="flyout-container__desc-wrapper">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                onClick={this.handleAccordionClick}
              >
                {/*Input Selections & Parameters*/}
                <div className="flyout-container__accordion-title">
                  Input Selections & Parameters
                </div>
                {/*<div className="flyout-container__desc">*/}
                {/*{results.description}*/}
                {/*</div>*/}
                <RightArrowIcon
                  className={cx("flyout-container__accordion-toggle-icon", {
                    "flyout-container__accordion-toggle-icon--active": this
                      .props.results.isAccordionOpen
                  })}
                />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="flyout-container__accordion-content">
                    <div className="flyout-container__desc-wrapper">
                      <div className="flyout-container__desc-title">
                        Description
                      </div>
                      <div className="flyout-container__desc">
                        {results.description}
                      </div>
                    </div>

                    <div className="flyout-container__selected-columns-wrapper">
                      <div className="flyout-container__selected-columns">
                        {data_set_names !== undefined &&
                          data_set_names &&
                          data_set_names.map((ds, dsi) => {
                            return (
                              <div key={dsi}>
                                <div className="flyout-container__add-info-title">
                                  {ds.name}
                                </div>
                                <div className="flyout-container__add-info-wrapper flyout-container__add-info-wrapper--2 ">
                                  {Object.keys(results.selections).map(
                                    (selection, is) => {
                                      return (
                                        selection === ds.path &&
                                        chunkArray(
                                          results.selections[selection],
                                          3
                                        ).map(row => {
                                          return (
                                            <div
                                              key={is}
                                              className="flyout-container__columns-selected-row"
                                            >
                                              {row.map((column, i) => (
                                                <Tooltip
                                                  placement="top"
                                                  text={column.key}
                                                >
                                                  <span
                                                    key={i}
                                                    className="flyout-container__add-info-item"
                                                  >
                                                    {column.key}&nbsp;
                                                  </span>
                                                </Tooltip>
                                              ))}
                                            </div>
                                          );
                                        })
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    {Object.keys(results.parameters).length !== 0 && (
                      <div className="flyout-container__parameters">
                        <div className="flyout-container__add-info-title flyout-container__add-info-title--1">
                          Parameters
                        </div>
                        {Object.keys(results.parameters).map(
                          (parameter, pi) => {
                            return (
                              <div
                                key={pi}
                                className="flyout-container__parameter-wrapper"
                              >
                                <div className="flyout-container__parameter">
                                  {parameter}
                                </div>
                                <div className="flyout-container__add-info-wrapper">
                                  {this.getParameters(
                                    results.parameters[parameter]
                                  ).map((parameter, i) => {
                                    return (
                                      <Tooltip placement="top" text={parameter}>
                                        <span
                                          key={i}
                                          className="flyout-container__add-info-item flyout-container__add-info-item--1"
                                        >
                                          {parameter}
                                        </span>
                                      </Tooltip>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                    {function_desc_loading ? (
                      <div className="flyout-container__add-info-wrapper--1">
                        <div className="flyout-container__add-info-title ">
                          Function Description
                        </div>
                        <div className="flyout-container__function-description">
                          <BeatLoader
                            css={override}
                            color={"var(--highlight-primary)"}
                            loading={function_desc_loading}
                            size={10}
                          />
                        </div>
                      </div>
                    ) : (
                      results.function_description && (
                        <div className="flyout-container__add-info-wrapper--1">
                          <div className="flyout-container__add-info-title ">
                            Function Description
                          </div>
                          <div className="flyout-container__function-description">
                            <EditorView
                              content={results.function_description.text}
                              controlled
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="flyout-container__results" ref={print_ref}>
          {results.results !== undefined &&
            results.results.length > 0 &&
            results.results.map(item => renderResult(item, theme, secondary))}
        </div>
      </Fragment>
    );
  }
}

export default ResultFlyout;
