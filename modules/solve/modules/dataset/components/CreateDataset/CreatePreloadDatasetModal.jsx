import React, { Component } from "react";
import { sortedUniq, uniqBy } from "lodash-es";
import { CreatePloadDataset } from "../../containers/createDataset/createPreloadDatasetModal";
import { Button } from "../../../../../../components/Buttons/Button";
import ReactSelect from "react-select";
import { BASE_URI } from "../../../../../../../common/api/constants";

const SELECT_CATEGORY = "Select Category";
const SELECT_SUBCATEGORY = "Select Sub-Category";
const SELECT_DATASET = "Select dataset";
const ALL = "All";

class CreatePreloadDatasetModal extends Component {
  state = {
    dataSets: this.props.data_sets || []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.data_set_succeeded &&
      this.props.data_set_succeeded !== prevProps.data_set_succeeded
    ) {
      this.setState(
        {
          dataSets: this.props.data_sets
        },
        () => this.initialiseDatasets()
      );
    }
  }

  getCategories = () =>
    [ALL].concat(this.state.dataSets.map(dataset => dataset.category));

  getSubCategoriesBy = category => {
    if (category === ALL) {
      return [ALL].concat(
        this.state.dataSets.map(dataset => dataset.subcategory)
      );
    } else {
      return [ALL].concat(
        this.state.dataSets
          .filter(dataset => dataset.category === category)
          .map(dataset => dataset.subcategory)
      );
    }
  };

  getTitlesBy = (category, subcategory) => {
    if (category === ALL && subcategory === ALL) {
      return [SELECT_DATASET].concat(
        this.state.dataSets.map(dataset => dataset.title)
      );
    } else if (category === ALL) {
      return [SELECT_DATASET].concat(
        this.state.dataSets
          .filter(dataset => dataset.subcategory === subcategory)
          .map(dataset => dataset.title)
      );
    } else if (subcategory === ALL) {
      return [SELECT_DATASET].concat(
        this.state.dataSets
          .filter(dataset => dataset.category === category)
          .map(dataset => dataset.title)
      );
    } else {
      return [SELECT_DATASET].concat(
        this.state.dataSets
          .filter(
            dataset =>
              dataset.category === category &&
              dataset.subcategory === subcategory
          )
          .map(dataset => dataset.title)
      );
    }
  };

  getCurrentDataSet = () => {
    const { title_selected, dataSets } = this.state;
    return dataSets.filter(({ title }) => title === title_selected).shift();
  };

  getFilepath = () => {
    const current_dataset = this.getCurrentDataSet();
    return current_dataset ? current_dataset.filepath : "";
  };

  handleCategoryChange = option => {
    let category = option.value;
    this.initialiseDatasets();
    category = category === SELECT_CATEGORY ? "" : category;
    this.setState({
      category_selected: category,
      sub_categories: this.getSubCategoriesBy(category),
      titles: this.getTitlesBy(category, this.state.subcategory_selected)
    });
  };

  handleSubCategoryChange = option => {
    let subcategory = option.value;
    this.setState({
      subcategory_selected:
        subcategory === SELECT_SUBCATEGORY ? "" : subcategory,
      titles: this.getTitlesBy(
        this.state.category_selected,
        subcategory === SELECT_SUBCATEGORY ? "" : subcategory
      ),
      title_selected: "",
      show_preview: false
    });
  };

  handleTitleChange = option => {
    let title = option.value;
    this.setState({
      title_selected: title === SELECT_DATASET ? "" : title
    });

    this.setState(
      {
        title_selected: title === SELECT_DATASET ? "" : title
      },
      () => {
        if (title !== SELECT_DATASET) {
          const current_dataset = this.getCurrentDataSet();
          const file_url = current_dataset._links.summary.href;

          this.props.onFileLoad(file_url, ";", true);
        }
      }
    );
  };

  initialiseDatasets = () => {
    this.setState({
      categories: sortedUniq(this.getCategories()),
      sub_categories: this.getSubCategoriesBy(ALL),
      titles: this.getTitlesBy(ALL, ALL),
      category_selected: ALL,
      subcategory_selected: ALL,
      title_selected: SELECT_DATASET,
      show_preview: false
    });
  };

  handleSubmit = () => {
    if (this.getFilepath() !== "") {
      const filenames = this.getFilepath();
      this.props.addDataset(filenames);
    }
  };

  render() {
    const { categories, sub_categories, titles } = this.state;
    const { is_dataset_create_loading, hideCancleButton } = this.props;

    const options_categories =
      categories &&
      categories.map(category => ({ label: category, value: category }));
    const options_sub_categories =
      sub_categories &&
      uniqBy(
        sub_categories.map(sub_category => ({
          label: sub_category,
          value: sub_category
        })),
        "label"
      );
    const options_titles =
      titles &&
      uniqBy(
        titles.map(title => ({ label: title, value: title })),
        "label"
      );

    return (
      <div className="upload-container">
        <div className="form-container">
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              flexFlow: "column"
            }}
          >
            <label>Category </label>
            <ReactSelect
              onChange={this.handleCategoryChange}
              options={options_categories}
              classNamePrefix="ath-select"
              className="ath-select-container"
            />

            {/*<select ref={ref => (this.categoryInputSelect = ref)} onChange={ev => this.handleCategoryChange(ev.target.value)} style={{width: '300px', height: '30px'}} className="input-form">*/}
            {/*{categories && categories.map((category, i) => <option key={i}>{category}</option>)}*/}
            {/*</select>*/}
          </div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              flexFlow: "column"
            }}
          >
            <label>Sub-category </label>
            <ReactSelect
              onChange={this.handleSubCategoryChange}
              options={options_sub_categories}
              classNamePrefix="ath-select"
              className="ath-select-container"
            />

            {/*<select ref={ref => (this.subcategoryInputSelect = ref)} onChange={ev => this.handleSubCategoryChange(ev.target.value)} style={{width: '300px', height: '30px'}} className="input-form">*/}
            {/*{sub_categories && sub_categories.map((subcategory, i) => <option key={i}>{subcategory}</option>)}*/}
            {/*</select>*/}
          </div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              flexFlow: "column"
            }}
          >
            <label>Dataset </label>
            <ReactSelect
              onChange={this.handleTitleChange}
              options={options_titles}
              classNamePrefix="ath-select"
              className="ath-select-container"
            />

            {/*<select style={{marginRight: '25px',width: '300px', height: '30px'}} ref={ref => (this.datasetInputSelect = ref)} onChange={ev => this.handleTitleChange(ev.target.value)} className="input-form">*/}
            {/*{titles && titles.map((title, i) => <option key={i}>{title}</option>)}*/}
            {/*</select>*/}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {hideCancleButton && (
              <Button
                variant="default"
                size="md"
                onClick={this.props.closeCreateDataset}
                style={{ marginRight: "2rem" }}
              >
                Cancel
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              disabled={this.getFilepath() === "" || is_dataset_create_loading}
              onClick={this.handleSubmit}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePloadDataset(CreatePreloadDatasetModal);
