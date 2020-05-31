import React, { Component } from "react";
import get from "lodash/get";
import cx from "classnames";
import Loader from "../../../../components/Loader";
import { CaseCard } from "./shared/caseCard";
import { SearchInput } from "../../../../components/Forms/FormInput";
import { AddIcon, EmptyCase } from "../../../../../common/images";
import { Button } from "../../../../components/Buttons/Button";
import { withRouter } from "react-router-dom";
import CloneCase from "../Clone";
import DescriptionModal from "../../../../../tenants/atoms/modules/cases/components/List/shared/DescriptionModal";

class CaseListView extends Component {
  state = {
    search_query: "",
    current_cloning_case_id: null,
    show_description: false
  };

  setSearchQuery = e => {
    this.setState({ search_query: e.target.value });
  };

  componentDidMount() {
    this.props.getCasesList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      match: { path },
      is_logged_in,
      profile_loaded
    } = this.props;
    if (path && path !== prevProps.match.path) {
      this.props.getCasesList();
    }

    if (
      is_logged_in &&
      profile_loaded &&
      profile_loaded !== prevProps.profile_loaded
    ) {
      this.props.getCasesList();
    }
  }

  createCase = () => {
    this.props.history.push("/create");
  };

  showDeleteConfirmationAlert = link => {
    this.props.showDialog({
      title: "Delete Case?",
      subtitle: "Are you sure you want to delete the Case?",
      yesButton: {
        text: "Yes",
        onClick: () => {
          this.props.deleteCase(link);
          return true;
        }
      },
      noButton: {
        text: "No"
      },
      items_centered: true
    });
  };

  showCloneCase = (clone_case_link, id) => {
    this.setState({ current_cloning_case_id: id });

    this.props.showDialog({
      title: "Clone Case",
      yesButton: {
        text: "Submit",
        onClick: () => {
          this.props.cloneCase(clone_case_link);
          return true;
        }
      },
      noButton: {
        text: "Cancel"
      },
      Component: CloneCase,
      items_centered: true
    });
  };

  showDescription = case_info => {
    const { id } = case_info;
    const { is_logged_in } = this.props;
    // this.setState({
    //   show_description: true,
    //   case_description: description,
    //   case_overview: overview,
    //   case_link: _links
    // });
    if (is_logged_in) {
      this.props.history.push(`/cases/${id}`);
    } else {
      this.props.history.push(`/sample_cases/${id}`);
    }
  };

  closeDescription = () => {
    this.setState({
      show_description: false,
      case_description: "",
      case_overview: "",
      case_link: null
    });
  };

  render() {
    const {
      items,
      loading,
      cloning_case,
      collaborators_list,
      openCase,
      current_case,
      edit,
      editCaseOverview,
      editCaseDescription,
      getCaseMaterial,
      location,
      match,
      can_create_case
    } = this.props;
    const {
      search_query,
      current_cloning_case_id,
      show_description,
      case_link,
      case_overview,
      case_description
    } = this.state;
    const case_description_material = current_case.material;
    const show_create_case =
      match.url.indexOf("my_cases") >= 0 && can_create_case;
    const params = new URLSearchParams(location.search);
    const type = params.get("type");

    let final_search_query = search_query.toLowerCase();

    let case_list =
      final_search_query !== ""
        ? items.filter(
            c => c.name && c.name.toLowerCase().indexOf(final_search_query) >= 0
          )
        : items;

    case_list =
      type === "all"
        ? case_list
        : case_list.filter(
            c =>
              c.category &&
              c.category
                .replace(/\s/g, "")
                .toLowerCase()
                .includes(type)
          );

    case_list.sort(
      (a, b) => new Date(b.modified_time) - new Date(a.modified_time)
    );
    return (
      <div className="list-container">
        <Loader loading={loading} is_component />
        <div
          className={cx("list-container__search-wrapper", {
            "list-container__search-wrapper--1": !show_create_case
          })}
        >
          {show_create_case && (
            <Button
              variant="outline-primary"
              className="list-container__create-case"
              size="md"
              onClick={this.createCase}
            >
              <AddIcon className="list-container__create--icon" />
              Create New Case
            </Button>
          )}
          <div className="list-container__search">
            <SearchInput
              placeholder="Search Case"
              name="search_query"
              onChange={this.setSearchQuery}
              value={search_query}
              type="text"
            />
          </div>
        </div>
        <div className="list-body">
          {!loading &&
            case_list.map(item => (
              <CaseCard
                myCase
                key={item.id}
                viewCase={openCase}
                case={item}
                hideDelete
                loading={item.id === current_cloning_case_id && cloning_case}
                showDescription={this.showDescription}
                showDeleteConfirmationAlert={this.showDeleteConfirmationAlert}
                collaborators_details_list={collaborators_list}
                showCloneCase={this.showCloneCase}
              />
            ))}
          {case_list.length === 0 && (
            <div className="case-list-container__empty">
              <h4 className="case-list-container__empty--title">
                It's Empty Here
              </h4>
              <EmptyCase className="case-list-container__empty--icon" />
            </div>
          )}

          {show_description && (
            <DescriptionModal
              show={show_description}
              description={
                case_description_material && case_description_material.text
              }
              onClose={this.closeDescription}
              onSave={editCaseDescription}
              links={case_link}
              edit_case_successful={edit.edit_case_successful}
              overview={case_overview}
              editCaseOverview={editCaseOverview}
              getCaseMaterial={getCaseMaterial}
              overview_readonly={!get(case_link, "edit_case_overview")}
              description_readonly={!get(case_link, "edit_case_material")}
              loading={current_case.material_loading}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(CaseListView);
