import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  Search,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "./../data/dummy";
import { Header } from "../components";
const Customers = () => {
  const ToolbarOptions = ["Search", "Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        id="gridcomp"
        dataSource={customersData}
        allowPagingData
        allowSorting
        toolbar={ToolbarOptions}
        width="auto"
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Page, Search, Toolbar, Selection, Edit, Filter, Sort]}
        />
      </GridComponent>
    </div>
  );
};

export default Customers;
