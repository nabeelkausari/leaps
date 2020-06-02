import * as React from "react";
import { Component } from "react";
import * as Loader from "react-loader";
import styled from "styled-components";
import { Table as TableUnstyled } from "react-bootstrap";
// import allColors from "../../../styles/colors";
const Papa = require("papaparse");

const ColumnHeading = styled.th`
  color: rgb(0, 0, 0);
  background: rgb(242, 242, 242);
  cursor: pointer;
  font-family: "LatoReg";
  font-weight: normal;
`;
const Table = styled(TableUnstyled)`
  font-size: 12px;
  white-space: nowrap;
`;
const HeaderCol = styled.div`
  color: rgb(0, 0, 0);
  background: rgb(242, 242, 242);
  cursor: pointer;
  font-family: "LatoReg";
  font-weight: normal;
  padding: 8px;
  padding-bottom: 10px;
  padding-top: 9px;

  text-align: left;
  display: table-cell;
`;
const FixedTableHeaderWrapper = styled.div`
  position: absolute;
  top: 0;
`;
const NoDataSetText = styled.p`
  text-align: center;
  color: gainsboro;
  text-transform: uppercase;
  padding-top: 30px;
  font-size: 18px !important;
`;

const getTableInfos = rows => {
  if (rows[0][0].trim().indexOf("Name:") !== 0) return [{ rows }];
  const table_rows = rows.reduce((tables, row) => {
    if (row[0].trim().indexOf("Name:") === 0) {
      tables.push({ name: row[0].trim(), rows: [] });
      return tables;
    } else {
      const last_table = tables[tables.length - 1];
      last_table.rows.push(row);
      return tables;
    }
  }, []);
  return table_rows;
};
const formatHeader = label => {
  label = label.replace("\n", "");
  if (label.length > 20) {
    return label.substring(0, 19) + "...";
  } else return label;
};
export class CsvTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      message: "",
      tables: [],
      transformHeader: props.transformHeader || this.identity,
      getHeaders: props.getHeaders || this.identity,
      getRow: props.getRow || this.identity
    };
    this.tableDivs = [];
  }
  identity(value) {
    return value;
  }
  fetchCsv() {
    const { csv, download, preview, delimiter, onError } = this.props;
    const { getHeaders, transformHeader, getRow } = this.state;
    this.setState(
      {
        processing: true,
        tables: [],
        message: undefined
      },
      () => {
        if (this.props.csv !== csv) return;
        let data = [];
        Papa.parse(csv, {
          download: download,
          preview: preview,
          delimiter,
          error: ({ message }) => {
            if (onError !== undefined) onError(message);
            this.setState({
              processing: false,
              message: message || ""
            });
          },
          step: (result, parser) => {
            data.push(result.data[0]);
            if (data.length === preview) parser.abort();
          },
          complete: result => {
            if (this.props.csv !== csv) return;
            const table_infos = getTableInfos(data);
            const tables = table_infos.map(table_info => {
              const raw_rows = table_info.rows;
              const headers = getHeaders(raw_rows.shift()).map(
                (header, index) => ({
                  label: transformHeader(header),
                  key: header,
                  index
                })
              );
              const rows = raw_rows
                .map((row, i) => getRow(row, i))
                .filter(row => row.length === headers.length)
                .filter(
                  row =>
                    !row.every(datum => datum === undefined || datum === "")
                );
              if (rows.length !== raw_rows.length)
                console.log(
                  "Some rows don't have the required number of columns, or didn\t have data, and have been ignored."
                );
              return {
                name: table_info.name,
                headers,
                rows,
                widths: headers.map(h => 0),
                width: 0
              };
            });
            this.setState(
              {
                processing: false,
                tables,
                message: undefined
              },
              () => setTimeout(() => this.computeHeaderWidths(), 50)
            );
            if (this.props.fixedHeader && this.props.addHeaders)
              tables.map(table => this.props.addHeaders(table.headers));
            return;
          }
        });
      }
    );
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.csv !== this.props.csv) this.fetchCsv();
  }
  componentDidMount() {
    this.fetchCsv();
  }
  computeHeaderWidths() {
    const { tables } = this.state;
    const new_tables = tables.map((table, i) => {
      const table_div = this.tableDivs[i];
      const tds = [].slice.call(table_div.querySelectorAll("th"));
      const width = table_div.querySelector("thead").getBoundingClientRect()
        .width;
      const widths = tds.map(
        td => (td.getBoundingClientRect().width / width) * 100
      );
      return {
        ...table,
        widths,
        width
      };
    });
    this.setState({
      tables: new_tables
    });
  }
  render() {
    const { tables, processing, message } = this.state;
    const {
      onColumnHeaderClick,
      selectedColumnIndices,
      selectedStyle,
      responsive,
      bordered,
      className,
      height,
      fixedHeader
    } = this.props;
    return (
      <Loader loaded={!processing} loadedClassName={className}>
        {message !== undefined && (
          <NoDataSetText>{message || "Could not load data set"}</NoDataSetText>
        )}
        {message === undefined &&
          tables.map(({ headers, rows, name, widths, width }, index) => (
            <div
              className="dataTableParentWrapper"
              key={index}
              ref={element => (this.tableDivs[index] = element)}
              style={{ height: height || "100%" }}
            >
              {name && <h5>{name}</h5>}
              <div
                className="dataTableWrapper"
                style={{ position: "relative" }}
              >
                {fixedHeader && (
                  <FixedTableHeaderWrapper
                    className="fixedTableHeaderWrapper"
                    style={{ width: width, minWidth: "100%" }}
                  >
                    <FixedTableHeader
                      width={width}
                      headers={headers}
                      widths={widths}
                      onColumnHeaderClick={onColumnHeaderClick}
                      selectedColumnIndices={selectedColumnIndices}
                    />
                  </FixedTableHeaderWrapper>
                )}
                <ContentTable
                  responsive={responsive}
                  bordered={bordered}
                  width={width}
                  widths={widths}
                  headers={headers}
                  selectedStyle={selectedStyle}
                  selectedColumnIndices={selectedColumnIndices}
                  rows={rows}
                />
              </div>
            </div>
          ))}
      </Loader>
    );
  }
}
class FixedTableHeader extends Component {
  constructor() {
    super(...arguments);
    this.formatHeader = label => {
      label = label.replace("\n", "");
      if (label.length > 20) {
        return label.substring(0, 19) + "...";
      } else return label;
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }
  render() {
    const {
      width,
      headers,
      widths,
      selectedColumnIndices,
      onColumnHeaderClick
    } = this.props;
    return (
      <div
        className="fixedTableHeader"
        style={{ display: "table", width: width, minWidth: "100%" }}
      >
        {headers.map((header, index) => (
          <HeaderCol
            title={header.label}
            style={{ width: `${widths[index]}%` }}
            onClick={() =>
              onColumnHeaderClick &&
              onColumnHeaderClick(header, headers, selectedColumnIndices)
            }
            key={index}
          >
            {formatHeader(header.label)}
          </HeaderCol>
        ))}
      </div>
    );
  }
}
class ContentTable extends Component {
  constructor() {
    super(...arguments);
    this.formatHeader = label => {
      label = label.replace("\n", "");
      if (label.length > 20) {
        return label.substring(0, 19) + "...";
      } else return label;
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }
  render() {
    const {
      responsive,
      bordered,
      width,
      headers,
      widths,
      rows,
      selectedStyle,
      selectedColumnIndices
    } = this.props;
    return (
      <Table
        className="dataTable"
        responsive={responsive}
        bordered={bordered}
        style={{ width: width, minWidth: "100%" }}
      >
        <colgroup>
          {headers.map(({ index }) => (
            <col
              key={index}
              style={
                !!selectedStyle &&
                (selectedColumnIndices || []).indexOf(index) !== -1
                  ? { width: `${widths[index]}%`, ...selectedStyle }
                  : { width: `${widths[index]}%` }
              }
            />
          ))}
        </colgroup>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <ColumnHeading key={index} title={header.label}>
                {formatHeader(header.label)}
              </ColumnHeading>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, row_index) => (
            <tr key={row_index}>
              {headers.map(({ index }) => (
                <td key={`${index}_${row_index}`}>{row[index]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
