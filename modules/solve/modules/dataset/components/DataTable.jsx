import React, { Component, Fragment } from "react";
import { DataTableContainer } from "../containers/dataTable";
import RenderTableContainer from "../containers/renderTable";
import TableSkeleton from "../../../../../../app/components/Skeletons/TableSkeleton";
import Tooltip from "../../../../../../app/components/Tooltip/Tooltip";

import TableRenderers from "react-pivottable/TableRenderers";
import PivotTableUI from "react-pivottable";
import "react-pivottable/pivottable.css";
import get from "lodash/get";
import cx from "classnames";

import { CloseIcon, FullScreenIcon } from "../../../../../../common/images";
import { getColumnSelectionText } from "../../../../../../common/api/helpers";

export class DataTable extends Component {
  state = {
    csvData: [],
    headerRow: [],
    selectedHeaders: [],
    table_loading: true,
    table_data: [[" "], []],
    is_pivot_full_screen: false,
    pivot_keys: {
      rendererName: "Table"
    }
  };

  componentDidMount() {
    this.prepareCsvData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.fetch_dataset_succeeded &&
      this.props.fetch_dataset_succeeded !== prevProps.fetch_dataset_succeeded
    ) {
      this.prepareCsvData();
    }

    if (
      this.props.csv &&
      this.props.csv !== "" &&
      this.props.csv !== prevProps.csv
    ) {
      this.resetState();
      this.prepareCsvData();
    }
    if (
      this.props.data_download_succeeded &&
      this.props.data_download_succeeded !== prevProps.data_download_succeeded
    ) {
      if (
        !(
          Object.keys(this.props.data_by_uri).length === 0 &&
          this.props.data_by_uri[this.props.csv]
        )
      ) {
        this.getCsvDataFromStore();
      }
    }
  }

  resetState = () => {
    this.setState({ pivot_keys: {} });
  };

  getCsvDataFromStore = () => {
    let dataset = this.props.data_by_uri[this.props.csv] || [[" "], []];
    this.setState({
      table_data: dataset
    });
    this.setState({ table_loading: false });
  };

  prepareCsvData = () => {
    this.setState({ table_loading: true });
    if (Object.keys(this.props.data_by_uri).length === 0) {
      this.props.fetchCsvData(this.props.csv);
      // this.props.fetchCsvData("https://devdata.analyttica.com/output/da49652c-ba7d-4531-b610-a50cf856d841/solve_100010/user_3820/data/Airline_SmoothLanding.uidata")
    } else {
      if (this.props.data_by_uri[this.props.csv] !== undefined) {
        this.getCsvDataFromStore();
      } else {
        this.props.fetchCsvData(this.props.csv);
        // this.props.fetchCsvData("https://devdata.analyttica.com/output/da49652c-ba7d-4531-b610-a50cf856d841/solve_100010/user_3820/data/Airline_SmoothLanding.uidata")
      }
    }
  };

  selectHeaders = (i, header) => {
    if (this.props.read_only) return;
    const selected_column = {
      index: i,
      key: header
    };

    if (i === 0) {
      this.props.setAllColumnSelections(this.props.dataset_reference);
    } else {
      this.props.setColumnSelections(
        this.props.dataset_reference,
        selected_column
      );
    }
  };

  handleFullScreen = () => {
    this.setState(state => ({
      is_pivot_full_screen: !state.is_pivot_full_screen
    }));
  };

  onPivotDataChange = s => {
    this.setState(state => ({
      pivot_keys: {
        ...state.pivot_keys,
        ...s
      }
    }));
  };

  render() {
    const {
      is_steps_open,
      read_only,
      pivot,
      selected_table_reference,
      by_uri,
      data_by_uri,
      selections,
      is_case,
      in_apply,
      show_notification_banner
    } = this.props;
    const {
      table_loading,
      table_data: [raw_headers, ...raw_columns],
      is_pivot_full_screen,
      pivot_keys: { rendererName }
    } = this.state;
    return (
      <div
        className={cx(
          "data-table",
          { "data-table--1": is_steps_open },
          { "data-table--2": !is_steps_open },
          { "data-table--3": !is_case && in_apply },
          { "data-table--notify-banner": show_notification_banner }
        )}
      >
        {table_loading ||
        (data_by_uri[
          get(by_uri[selected_table_reference], "uiDataLink.href")
        ] === undefined &&
          data_by_uri[get(by_uri[selected_table_reference], "datasetPath")] ===
            undefined) ? (
          <TableSkeleton is_steps_open={is_steps_open} />
        ) : pivot ? (
          <div
            className={cx(
              "data-table__pivot-table",
              { "data-table__pivot-table--full-screen": is_pivot_full_screen },
              {
                "data-table__pivot-table--heat-map":
                  rendererName && rendererName.indexOf("Heatmap") >= 0
              }
            )}
          >
            {is_pivot_full_screen ? (
              <CloseIcon
                className="data-table__pivot-icon data-table__pivot-icon--close"
                onClick={this.handleFullScreen}
              />
            ) : (
              <FullScreenIcon
                className={cx("data-table__pivot-icon", {
                  "data-table__pivot-icon--1": is_steps_open
                })}
                onClick={this.handleFullScreen}
              />
            )}
            <PivotTableUI
              data={
                data_by_uri[
                  get(by_uri[selected_table_reference], "uiDataLink.href")
                ] ||
                data_by_uri[
                  get(by_uri[selected_table_reference], "datasetPath")
                ] === undefined
              }
              onChange={s => this.onPivotDataChange(s)}
              renderers={Object.assign({}, TableRenderers)}
              {...this.state.pivot_keys}
            />
          </div>
        ) : (
          <table className="table">
            <span className="jr-table-header" />
            <span className="jr-table-body" />
            <thead>
              <tr>
                <Fragment>
                  {read_only ? (
                    <th className="read-only" />
                  ) : (
                    <Tooltip
                      placement={"bottom"}
                      text={getColumnSelectionText(
                        raw_headers.length,
                        selections[selected_table_reference]
                          ? selections[selected_table_reference].length
                          : 0
                      )}
                    >
                      <th
                        onClick={() => !read_only && this.selectHeaders(0)}
                        key={0}
                      />
                    </Tooltip>
                  )}

                  {/*<ColumnResizer className="column-resizer" minWidth={1} />*/}
                </Fragment>
                {raw_headers &&
                  raw_headers
                    .slice(0, 30)
                    .map((h, i) => (
                      <RenderColumn key={i} h={h} i={i} read_only={read_only} />
                    ))}
              </tr>
            </thead>
            <tbody>
              {raw_columns &&
                raw_columns.map((rows, ri) => (
                  <Fragment key={ri}>
                    <tr key={ri}>
                      <RenderRow rows={rows} index={ri} />
                    </tr>
                  </Fragment>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

class RenderColumnClass extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const selection =
      nextProps.selectedHeaders &&
      nextProps.selectedHeaders.indexOf(nextProps.i + 1) >= 0;
    const deselection =
      this.props.selectedHeaders &&
      this.props.selectedHeaders.indexOf(this.props.i + 1) >= 0;
    return !!selection || !!deselection || this.props.h !== nextProps.h;
  }

  render() {
    const { h, i, selectedHeaders, selectHeaders, read_only } = this.props;
    return (
      <Fragment key={i}>
        <td
          title={h}
          className={cx(
            {
              selected: selectedHeaders && selectedHeaders.indexOf(i + 1) >= 0
            },
            { "read-only": read_only }
          )}
          onClick={() => !read_only && selectHeaders(i + 1, h)}
          key={i}
        >
          {h}
        </td>
        {/*<ColumnResizer className="column-resizer" minWidth={1} />*/}
      </Fragment>
    );
  }
}

const RenderColumn = RenderTableContainer(RenderColumnClass);

const RenderRow = RenderTableContainer(({ rows, index, selectedHeaders }) => {
  let result = [
    <Fragment key={index + "_row"}>
      <td key={index}>{index + 1}</td>
    </Fragment>
  ];
  rows
    .slice(0, 30)
    .map((r, i) =>
      result.push(
        <RenderRowCell
          key={i}
          r={r}
          selected={selectedHeaders && selectedHeaders.indexOf(i + 1) >= 0}
        />
      )
    );
  return result;
});

class RenderRowCell extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !!this.props.selected ||
      !!nextProps.selected ||
      this.props.r !== nextProps.r
    );
  }

  render() {
    const { selected, r } = this.props;
    return (
      <Fragment>
        <td className={selected && "selected"}>{r}</td>
        {/*<ColumnResizer className="column-resizer" minWidth={1} />*/}
      </Fragment>
    );
  }
}

export default DataTableContainer(DataTable);
