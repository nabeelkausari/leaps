import { connect } from "react-redux";
import { connectToExternalDatabase, fetchSqlForm } from "../../redux/actions";

const mapStateToProps = state => {
  const {
    sql_parameters,
    db_drivers,
    connect_to_db_requested
  } = state.solve.datasets;
  return {
    sql_form: sql_parameters.list,
    db_drivers: db_drivers.list,
    connect_to_db_requested
  };
};

export const ConnectToExternalDataBase = connect(mapStateToProps, {
  fetchSqlForm,
  connectToExternalDatabase
});
