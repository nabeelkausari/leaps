import React from "react";

export const ParameterSkeleton = props => {
  return (
    <div className="fx-parameter">
      <div className="fx-parameter__skeleton fx-parameter__skeleton--1 no-margin"></div>
      <div className="fx-parameter__skeleton fx-parameter__skeleton--1"></div>
      <div className="fx-parameter__skeleton fx-parameter__skeleton--2"></div>
      <div className="fx-parameter__skeleton fx-parameter__skeleton--2"></div>
      <div className="fx-parameter__skeleton fx-parameter__skeleton--3"></div>
      <div className="fx-parameter__skeleton fx-parameter__skeleton--3"></div>
      <div className="fx-parameter__skeleton fx-parameter__skeleton--4"></div>
      <div className="fx-parameter__skeleton fx-parameter__skeleton--4"></div>
    </div>
  );
};
