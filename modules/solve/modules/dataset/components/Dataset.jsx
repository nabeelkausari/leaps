import React, { Component } from "react";
import { DatasetContainer } from "../containers/dataset";

import { TableContainer } from "../containers/table";
import DataTable from "./DataTable";
import CreateDataset from "./CreateDataset/CreateDataset";
import {
  AddIcon,
  DeployIcon,
  DownloadIcon
} from "../../../../../../common/images/index";
import Tooltip from "../../../../../../app/components/Tooltip/Tooltip";
import { AddBtnCircleIcon, PencilIcon } from "../../../../../../common/images";
import { Button } from "../../../../../components/Buttons/Button";
import cx from "classnames";
import { downloadFile } from "../../../../../../common/utils/downloadFile";
import { withRouter } from "react-router-dom";
import { notify } from "../../../../../../common/utils/notification";
import { handleOnEnter } from "../../../../../../common/api/helpers";
import {
  isSimulab,
  getMaskedFeature
} from "../../../../../../common/utils/helperFunctions";

class Dataset extends Component {
  state = {
    handleCreateDataset: false,
    pivot: false,
    tab_dropdown_active_index: null,
    rename_table_tab_index: null,
    table_name: "",
    edit_dataset: null,
    table_nav_left: true,
    table_nav_right: true,
    download_table_masked: false
  };

  tabs_ref = React.createRef();
  active_tab_ref = React.createRef();
  add_new_dataset_tab_ref = React.createRef();

  handleSelectTable = href => {
    const { selected_table_reference } = this.props;
    if (!(href === selected_table_reference)) {
      this.setState({ rename_table_tab_index: null });
    }
    this.props.selectTable(href);
    this.closeCreateDataset();
  };

  componentDidMount() {
    if (
      this.props.fetch_dataset_succeeded &&
      this.props.data_sets.length === 0
    ) {
      this.handleCreateDataset();
    }
    const maskedFeatures = getMaskedFeature();
    if (maskedFeatures.indexOf("DOWNLOAD_TABLE") > -1) {
      this.setState({ download_table_masked: true });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.fetch_dataset_succeeded &&
      this.props.fetch_dataset_succeeded !== prevProps.fetch_dataset_succeeded
    ) {
      this.setState({ handleCreateDataset: false });

      if (this.active_tab_ref && this.active_tab_ref.current) {
        this.tabs_ref.current.scrollLeft += this.active_tab_ref.current.offsetLeft;
      }

      if (this.props.data_sets.length === 0) {
        this.handleCreateDataset();
      }
    }
    if (
      this.props.dataset_created_succeeded &&
      this.props.dataset_created_succeeded !==
        prevProps.dataset_created_succeeded
    ) {
      this.props.getScenarioDetails();
      this.closeCreateDataset();
    }
  }

  componentWillUnmount() {
    this.props.resetFlyouts();
  }

  renameTableClick = (e, i) => {
    const { data_sets } = this.props;
    this.setState({
      rename_table_tab_index: i,
      table_name: data_sets[i].name,
      edit_dataset: data_sets[i]
    });
    this.props.resetFlyouts();
    e.stopPropagation();
  };
  resetTableRename = () => {
    this.setState({
      rename_table_tab_index: null,
      table_name: "",
      edit_dataset: null
    });
  };

  onTableNameChange = e => {
    let table_name = e.target.value;
    if (table_name.includes(" ")) {
      notify.warning("Space Not Allowed", "Table name cannot have space in it");
      table_name = table_name.replace(" ", "");
    }
    this.setState({ table_name });
  };

  saveTableName = e => {
    e.preventDefault();
    const { table_name, edit_dataset } = this.state;
    this.props.renameDataset(edit_dataset.name, table_name, edit_dataset.ref);
    this.resetTableRename();
  };

  getTableTab = (ds, i) => {
    const {
      handleCreateDataset,
      tab_dropdown_active_index,
      rename_table_tab_index,
      table_name
    } = this.state;
    const { selected_table_reference, read_only } = this.props;
    const table_tab_active = ds.ref === selected_table_reference;
    return (
      <div
        key={i}
        className={
          !handleCreateDataset
            ? table_tab_active
              ? "table-tabs__name table-tabs__name--active"
              : "table-tabs__name"
            : "table-tabs__name"
        }
        onClick={() => this.handleSelectTable(ds.ref)}
        ref={table_tab_active && this.active_tab_ref}
      >
        {rename_table_tab_index === i ? (
          <span>
            <input
              className="table-tabs__table-name--input"
              type="text"
              value={table_name}
              onChange={this.onTableNameChange}
              onBlur={this.saveTableName}
              onKeyDown={e => handleOnEnter(e, this.saveTableName)}
            />
          </span>
        ) : (
          <span title={ds.name} className="table-tabs__table-name">
            {ds.name}
          </span>
        )}
        {!read_only && table_tab_active && !handleCreateDataset && (
          <div
            className={cx("table-tabs__edit-wrapper", {
              "table-tabs__edit-wrapper--edit-active":
                rename_table_tab_index === i
            })}
            onClick={e => this.renameTableClick(e, i)}
          >
            <PencilIcon className={cx("table-tabs__menu-icon")} />
          </div>
        )}
      </div>
    );
  };

  downloadDataset = file => {
    downloadFile(file);
    this.toggleDropDown();
  };

  toggleDropDown = (i = null) => {
    const { tab_dropdown_active_index } = this.state;
    this.setState({
      tab_dropdown_active_index: tab_dropdown_active_index === i ? null : i
    });
  };

  handleCreateDataset = () => {
    this.setState({ handleCreateDataset: true });
    if (this.tabs_ref.current && this.add_new_dataset_tab_ref.current) {
      setTimeout(() => {
        this.tabs_ref.current.scrollLeft +=
          this.add_new_dataset_tab_ref &&
          this.add_new_dataset_tab_ref.current.offsetLeft;
      }, 0);
    }
  };

  closeCreateDataset = () => this.setState({ handleCreateDataset: false });

  togglePivotTable = () => this.setState(({ pivot }) => ({ pivot: !pivot }));

  handleTabsNavigation = target => {
    if (target === "back") {
      this.tabs_ref.current.scrollLeft -= 250;
    } else {
      this.tabs_ref.current.scrollLeft += 250;
    }

    this.tableTabsNavCheck();
  };

  tableTabsNavCheck = () => {
    if (!(this.tabs_ref && this.tabs_ref.current)) return;
    this.setState({
      table_nav_left: !(this.tabs_ref.current.scrollLeft === 0),
      table_nav_right: !(
        Math.floor(
          this.tabs_ref.current.scrollWidth - this.tabs_ref.current.scrollLeft
        ) <= this.tabs_ref.current.offsetWidth
      )
    });
  };

  render() {
    const {
      data_sets,
      selected_table_reference,
      is_steps_open,
      read_only,
      datasets_by_uri,
      is_case,
      is_course,
      toggleDataDictionary,
      data_dictionary
    } = this.props;
    const {
      handleCreateDataset,
      pivot,
      table_nav_right,
      table_nav_left,
      download_table_masked
    } = this.state;
    const hide_nav_buttons =
      this.tabs_ref.current &&
      this.tabs_ref.current.scrollWidth !== this.tabs_ref.current.offsetWidth;

    const is_atoms = isSimulab();
    const no_datasets = data_sets && data_sets.length !== 0;

    return (
      <div style={{ width: "100%", userSelect: "none" }}>
        <div className="table-tabs">
          <div className="table-tabs__container jr-tables">
            <div
              className="table-tabs__container-inner"
              onScroll={this.tableTabsNavCheck}
              ref={this.tabs_ref}
            >
              {data_sets.length > 0 &&
                data_sets
                  .sort((a, b) => a.creationSequence - b.creationSequence)
                  .map((ds, i) => this.getTableTab(ds, i))}
              {handleCreateDataset && (
                <div
                  className="table-tabs__name table-tabs__name--active"
                  ref={this.add_new_dataset_tab_ref}
                >
                  New Dataset
                </div>
              )}
            </div>
          </div>

          {is_case && !handleCreateDataset && !read_only && !pivot ? (
            <Tooltip placement="right" text="Add Dataset">
              <div
                className="table-tabs__btn-container jr-add-dataset"
                onClick={this.handleCreateDataset}
              >
                <AddBtnCircleIcon className="table-tabs__add-btn" />
              </div>
            </Tooltip>
          ) : (
            handleCreateDataset &&
            no_datasets && (
              <div
                title="Cancel"
                className="table-tabs__btn-container"
                onClick={this.closeCreateDataset}
              >
                <AddIcon className="table-tabs__cancel-btn" />
              </div>
            )
          )}

          {hide_nav_buttons && (
            <div className="table-tabs__arrows-wrapper">
              <i
                className={cx("fa fa-caret-left table-tabs__arrows", {
                  "table-tabs__arrows-disabled": !table_nav_left
                })}
                onClick={() => this.handleTabsNavigation("back")}
              />
              <i
                className={cx("fa fa-caret-right table-tabs__arrows", {
                  "table-tabs__arrows-disabled": !table_nav_right
                })}
                onClick={() => this.handleTabsNavigation("front")}
              />
            </div>
          )}

          <div className="table-tabs__right-actions">
            {!download_table_masked && (
              <a
                className={cx(
                  "table-tabs__download-btn",
                  "jr-download",
                  {
                    "table-tabs__download-btn--1": is_steps_open
                  },
                  {
                    "table-tabs__download-btn--2":
                      (is_atoms || read_only) && is_steps_open && is_case
                  }
                )}
                href={
                  datasets_by_uri[selected_table_reference] &&
                  datasets_by_uri[selected_table_reference].datasetPath
                }
              >
                <DownloadIcon className="table-tabs__download-icon" />
                Download Table
              </a>
            )}

            {!is_atoms && is_case && !read_only && (
              <Button
                className={cx(
                  "table-tabs__action-btn",
                  { "table-tabs__action-btn--steps-open": is_steps_open },
                  { "table-tabs__action-btn--active": pivot }
                )}
                variant="default"
                size="xs"
                onClick={this.togglePivotTable}
              >
                {pivot ? "Hide" : "Show"} Pivot Table
              </Button>
            )}

            {is_course && (
              <Button
                className={cx(
                  "table-tabs__action-btn",
                  { "table-tabs__action-btn--steps-open": is_steps_open },
                  { "table-tabs__action-btn--active": data_dictionary }
                )}
                variant="default"
                size="xs"
                onClick={toggleDataDictionary}
              >
                {data_dictionary ? "Hide" : "Show"} Data Dictionary
              </Button>
            )}
          </div>
        </div>
        {handleCreateDataset ? (
          <CreateDataset
            closeCreateDataset={this.closeCreateDataset}
            is_steps_open={is_steps_open}
            hideCancleButton={no_datasets}
          />
        ) : (
          selected_table_reference !== "" && (
            <DataTable
              pivot={pivot}
              dataset_reference={selected_table_reference}
              {...this.props}
            />
          )
        )}
      </div>
    );
  }
}

export default withRouter(DatasetContainer(TableContainer(Dataset)));
