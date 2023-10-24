import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../Style/App.css";

function DetailsCourse({ apiResponse2 }) {
  const [expandedRows, setExpandedRows] = useState([]);

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span>{data.phaseName}</span>
      </React.Fragment>
    );
  };
  const courseTemplate = (rowData) => {
    return (
        <span>{rowData.courses[0].name}</span>
    );
};
const platformTemplate = (rowData) => {
    return (
        <span>{rowData.courses[0].platform}</span>
    );
};


  return (
    <div className="card">
      <DataTable
        value={apiResponse2.courses}
        rowGroupMode="subheader"
        groupRowsBy="phaseName"
        sortField="phaseName"
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowGroupHeaderTemplate={headerTemplate}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="name"
          header="Course Name"
          sortable
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="platform"
          header="Platform"
          sortable
          style={{ width: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default DetailsCourse;
