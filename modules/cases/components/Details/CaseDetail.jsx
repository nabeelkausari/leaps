import React, { Component, Fragment } from "react";
import { Tab, DescriptionTabView, DataDictionaryTabView } from "./shared/Tabs";
import { withRouter } from "react-router-dom";
import { PlayIcon, Clone, EditIcon } from "../../../../../common/images";
import CloneCase from "../Clone";
import Loader from "../../../../components/Loader";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import get from "lodash/get";
import AddModule from "../../../courses/modules/create/components/AddModule";
import CaseDetailEdit from "./shared/CaseDetailEdit";

const override = css`
  display: block;
  border-color: var(--highlight-primary);
  margin-right: 2rem;
`;

class CaseDetail extends Component {
  state = {
    selected_tab: 0
  };

  componentDidMount() {
    const {
      match: {
        params: { case_id }
      },
      history,
      getCaseById
    } = this.props;

    if (case_id) {
      getCaseById(case_id);
    } else {
      history.push("/cases");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_case_details_succeeded,
      current_case: { info }
    } = this.props;
    if (
      fetch_case_details_succeeded &&
      fetch_case_details_succeeded !== prevProps.fetch_case_details_succeeded
    ) {
      this.props.getCaseMaterial(info._links.get_case_material);
    }

    if (
      fetch_case_details_succeeded === false &&
      fetch_case_details_succeeded !== prevProps.fetch_case_details_succeeded
    ) {
      this.props.history.push("/cases");
      // notify.error("Case details could not be loaded", "Please try again");
    }
  }

  showCloneCase = clone_case_link => {
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

  openCase = () => {
    const {
      current_case: {
        info: { _links, clone_case }
      }
    } = this.props;
    let case_Detail_link = _links.self;
    if (clone_case) {
      case_Detail_link = _links.get_case_details;
    }
    this.props.getCaseDetail(case_Detail_link);
  };

  selectTab = key => {
    const { selected_tab } = this.state;
    if (selected_tab !== key) this.setState({ selected_tab: key });
  };

  renderTabView = () => {
    const { selected_tab } = this.state;
    const {
      current_case: { info }
    } = this.props;
    switch (selected_tab) {
      case 0:
        return (
          <DescriptionTabView
            case_material_link={info._links.get_case_material}
            edit_case_material={info._links.edit_case_material}
          />
        );
      // case 1:
      //   return <DataDictionaryTabView />;
    }
  };

  editCaseDetail = () => {
    this.props.showDialog({
      title: "Edit Case Detail",
      Component: CaseDetailEdit,
      hide_footer: true
    });
  };

  crumb = [
    {
      text: "Cases",
      link: "/cases"
    }
  ];

  render() {
    const { selected_tab } = this.state;
    const {
      is_logged_in,
      case_details_loading,
      current_case: {
        info: { name, overview, category, _links }
      },
      cloning_case
    } = this.props;

    const edit_overview = get(_links, "edit_case_overview");
    const loading = case_details_loading || !name;

    return (
      <div className="case-detail">
        {loading ? (
          <Loader loading={loading} is_component />
        ) : (
          <Fragment>
            <div className="case-detail__info-wrapper">
              <div className="case-detail__info-wrapper-bg"></div>
              <div className="case-detail__info-sub-wrapper">
                <Breadcrumb crumbs={this.crumb} final_crumb={name} />
                <h4 className="case-detail__title">{name}</h4>
                <p className="case-detail__overview">{overview}</p>
                <div className="case-detail__category">{category}</div>
              </div>

              <div className="case-detail__action-wrapper">
                {edit_overview && (
                  <div
                    className="case-detail__detail-edit-wrapper"
                    onClick={this.editCaseDetail}
                  >
                    <EditIcon className="case-detail__edit-icon" /> Edit Details
                  </div>
                )}
                {is_logged_in && (
                  <Fragment>
                    <button
                      className="case-detail__btn--primary"
                      onClick={this.openCase}
                    >
                      <PlayIcon className="case-detail__btn--icon" /> Resume
                      Case
                    </button>

                    <button
                      className="case-detail__btn--outline case-detail__btn--outline--1"
                      onClick={() => this.showCloneCase(_links.clone_case)}
                      disabled={cloning_case}
                    >
                      <Fragment>
                        {cloning_case ? (
                          <ClipLoader
                            css={override}
                            sizeUnit={"rem"}
                            size={2}
                            color={"var(--highlight-primary)"}
                            loading={cloning_case}
                          />
                        ) : (
                          <Clone className="case-detail__btn--icon" />
                        )}{" "}
                        Clone Case
                      </Fragment>
                    </button>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="case-detail__data-wrapper">
              <div className="case-detail__tabs-wrapper">
                <Tab
                  title="Description"
                  tab_key={0}
                  onClick={this.selectTab}
                  active={selected_tab}
                />
                {/*<Tab*/}
                {/*title="Data Dictionary"*/}
                {/*tab_key={1}*/}
                {/*onClick={this.selectTab}*/}
                {/*active={selected_tab}*/}
                {/*/>*/}
              </div>
              <div className="case-detail__content">{this.renderTabView()}</div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(CaseDetail);
