import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../Style/App.css";

function DetailsCourse({ apiResponse2 }) {
  const [expandedRows, setExpandedRows] = useState([]);

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span>{data.phase}</span>
      </React.Fragment>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={apiResponse2.learningroadmap}
        rowGroupMode="subheader"
        groupRowsBy="phase"
        sortField="phase"
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowGroupHeaderTemplate={headerTemplate}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="course"
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
        <Column
          field="durationInHours"
          header="Duration(Hours)"
          sortable
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="url"
          header="Website"
          sortable
          style={{ width: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default DetailsCourse;
