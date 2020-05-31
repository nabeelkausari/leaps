import React, { Component, Fragment } from "react";
import Layout from "./shared/Layout";
import CaseListView from "./CaseListView";
import CategoryColors from "./shared/colors";
import { getSampleCases } from "../../redux/actions";
import AuthModal from "../../../auth/components/shared/AuthModal";

const Categories = [
  {
    title: "Sample Cases",
    to: "/cases/sample_cases?type=all"
  },
  {
    title: "My Cases",
    to: "/cases/my_cases?type=all"
  },
  {
    title: "Shared Cases",
    to: "/cases/shared_cases?type=all"
  }
];
const UnAuthCategories = [
  {
    title: "Sample Cases",
    to: "/sample_cases?type=all"
  }
];

const getCasesList = props => {
  switch (props.match.url) {
    case "/cases/my_cases":
      if (!props.is_logged_in) return null;
      return {
        items: props.list.items.filter(item => !item.sample_case),
        loading: props.list.fetch_cases_requested,
        getCasesList: props.getCases
      };
    case "/cases/shared_cases":
      if (!props.is_logged_in) return null;
      return {
        items: props.all_cases.items,
        loading: props.list.fetch_all_cases_requested,
        getCasesList: props.getAllCases
      };
    case "/cases/sample_cases":
      return {
        items: props.list.items.filter(item => item.sample_case),
        loading: props.list.fetch_cases_requested,
        getCasesList: props.getCases
      };
    case "/sample_cases":
      if (props.is_logged_in) return null;
      return {
        items: props.sample_cases.items,
        loading: props.list.fetch_sample_cases_requested,
        getCasesList: props.getSampleCases
      };
    default:
      return props.history.push("/");
  }
};

const getCaseTypes = (types, match) => {
  const types_list = ["All", ...types];
  return types_list.map(type => ({
    title: type,
    to: `${match.url}?type=${type.replace(/\s/g, "").toLowerCase()}`,
    search_param: type.replace(/\s/g, "").toLowerCase(),
    color: CategoryColors[type]
  }));
};

class CaseList extends Component {
  state = {
    show_auth_modal: false
  };

  toggleAuthModal = show_auth_modal => {
    this.setState({ show_auth_modal });
  };
  openCase = current_case => {
    const { is_logged_in } = this.props;
    if (!is_logged_in) return this.toggleAuthModal(true);
    let case_Detail_link = current_case._links.self;
    if (current_case.clone_case) {
      case_Detail_link = current_case._links.get_case_details;
    }
    this.props.getCaseDetail(case_Detail_link);
  };

  componentDidMount() {
    this.props.getCaseCategories();
  }

  render() {
    const {
      collaborators,
      categories,
      history,
      match,
      is_logged_in
    } = this.props;
    const { show_auth_modal } = this.state;
    const cases = getCasesList(this.props);
    if (cases === null) {
      if (is_logged_in) {
        history.push("/cases");
      } else {
        history.push("/");
      }
      return null;
    }
    return (
      <Fragment>
        <Layout
          title="Cases"
          categories={is_logged_in ? Categories : UnAuthCategories}
          second_title="Case Type"
          types={getCaseTypes(categories.list, match)}
        >
          <CaseListView
            collaborators_list={collaborators.list}
            openCase={this.openCase}
            {...cases}
            {...this.props}
          />
        </Layout>
        <AuthModal
          openModal={show_auth_modal}
          hideTrigger={true}
          onCloseCallback={() => this.toggleAuthModal(false)}
        />
      </Fragment>
    );
  }
}

export default CaseList;
