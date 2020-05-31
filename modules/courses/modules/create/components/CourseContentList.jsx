import React, { Component } from "react";
import get from "lodash/get";

import { ModuleCard, ContentCard, AddContentCard } from "./CourseCreatorCards";
import {
  RightArrowIcon,
  AddIcon,
  PlusIcon
} from "../../../../../../common/images";

import { Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Tooltip from "../../../../../components/Tooltip/Tooltip";

class CourseContentList extends Component {
  onDragEnd = result => {
    const { updateModuleContentSequence, selected_module } = this.props;
    if (!result.destination) {
      return;
    }
    const items = reorder(
      selected_module.module_contents,
      result.source.index,
      result.destination.index
    );

    const params = {
      moduleSequenceDetails: items.map(m => ({
        moduleSeqid: m.module_seq_id,
        moduleSeqNum: m.module_seq
      }))
    };

    updateModuleContentSequence(selected_module._links.self.href, params);
  };

  handleDeleteModuleContent = (delete_link, content_href) => {
    const { deleteModuleContent, selected_module } = this.props;
    deleteModuleContent(
      delete_link,
      content_href,
      selected_module._links.self.href,
      selected_module._links.sequenced_module_content
    );
  };

  render() {
    const {
      course,
      handleBack,
      module_list,
      selected_module_reference,
      selected_module_content_reference,
      selected_module,
      setModuleReference,
      setModuleContentReference,
      handleModuleContentAdd,
      is_new_content,
      new_module_content_data,
      createModule,
      deleteNewContent,
      editModule,
      deleteModule
    } = this.props;
    return (
      <div className="course-list">
        <div className="course-list__course-name-wrapper">
          <RightArrowIcon
            className="course-list__back-icon"
            onClick={handleBack}
          />
          <Tooltip text={get(course, "title")}>
            <p className="course-list__course-name">{get(course, "title")}</p>
          </Tooltip>
        </div>
        <div className="course-list__sub-panels-wrapper">
          <div className="course-list__modules-structure-wrapper">
            {module_list &&
              module_list.map((module, index) => {
                return (
                  <ModuleCard
                    index={index}
                    module={module}
                    handleClick={setModuleReference}
                    handleEditClick={editModule}
                    handleDeleteClick={deleteModule}
                    key={index}
                    active={
                      module._links.self.href === selected_module_reference
                    }
                  />
                );
              })}
            <div className="course-list__add-module" onClick={createModule}>
              <PlusIcon className="course-list__add-icon" />
              <span> Add Section</span>
            </div>
          </div>

          <div className="course-list__content-structure-wrapper">
            {selected_module && (
              <Fragment>
                <ContentCard
                  content={selected_module.module_contents.find(
                    m => m.type === "MATERIAL"
                  )}
                  handleClick={setModuleContentReference}
                  active={
                    !is_new_content &&
                    selected_module_content_reference ===
                      selected_module.module_contents.find(
                        m => m.type === "MATERIAL"
                      ).data._links.self.href
                  }
                />

                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: "white",
                          marginBottom: "1rem"
                        }}
                        {...provided.droppableProps}
                      >
                        {selected_module.module_contents
                          .filter(m => m.type !== "MATERIAL")
                          .map((content, index) => {
                            return (
                              <Draggable
                                key={content.module_seq}
                                draggableId={content.module_seq.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <ContentCard
                                      handleClick={setModuleContentReference}
                                      content={content}
                                      active={
                                        !is_new_content &&
                                        selected_module_content_reference ===
                                          get(content, "data._links.self.href")
                                      }
                                      deleteModuleContent={
                                        this.handleDeleteModuleContent
                                      }
                                    />
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        {/*{provided.placeholder}*/}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {is_new_content && (
                  <ContentCard
                    content={{ data: { ...new_module_content_data } }}
                    active={is_new_content}
                    deleteModuleContent={deleteNewContent}
                  />
                )}

                <AddContentCard handleClick={handleModuleContentAdd} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseContentList;

const reorder = (module_contents, startIndex, endIndex) => {
  let contents = module_contents.filter(m => m.type !== "MATERIAL");

  if (startIndex > endIndex) {
    let upper = contents.slice(0, endIndex);
    let lower = contents.slice(startIndex + 1);
    let middle = contents.slice(endIndex, startIndex + 1);
    let temp = null;
    middle.forEach((element, index) => {
      if (index === 0) {
        temp = { ...element };
        element.module_seq = middle[index + 1].module_seq;
      } else if (index === middle.length - 1) {
        element.module_seq = temp.module_seq;
      } else {
        element.module_seq = middle[index + 1].module_seq;
      }
    });
    return [...upper, ...middle, ...lower];
  } else if (startIndex < endIndex) {
    let upper = contents.slice(0, startIndex);
    let lower = contents.slice(endIndex + 1);
    let middle = contents.slice(startIndex, endIndex + 1);
    let temp = null;
    middle.forEach((element, index) => {
      if (index === 0) {
        temp = { ...element };
        element.module_seq = middle[middle.length - 1].module_seq;
      } else if (index === middle.length - 1) {
        element.module_seq = temp.module_seq;
      } else {
        let temp_var = { ...element };
        element.module_seq = temp.module_seq;
        temp = temp_var;
      }
    });
    return [...upper, ...middle, ...lower];
  } else {
    return contents;
  }
};
