//A Custom Table component made with react-table
import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";
// import Screen from "../Screen";

const CustomTable = ({
  column_header,
  table_data,
  childComponent,
  disablePagination,
  disableSearch,
  perPage = 10,
  actions,
}) => {
  const columns = useMemo(() => column_header, []);
  const data = useMemo(() => table_data, [table_data]);
  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: GlobalFilter,
  //   }),
  //   []
  // );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      // defaultColumn,
      autoResetPage: false,
      initialState: { pageIndex: 0, pageSize: perPage },
      actions,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { pageIndex, pageSize, globalFilter } = state;
  //Create a custom table component
  // console.log("This is table data", table_data, data);
  // if(table_data.length === 0){
  //   return (
  //   <div>
  //     <div>{childComponent}</div>
  //     <div className="flex justify-around my-5 font-bold">No data to display</div>
  //   </div>
  //   )
  // }
  // else{
  return (
    <div className="">
      <div
        className={`tableTopBar flex justify-between items-center w-full py-2 px-4 bg-white ${
          disableSearch ? "hidden" : ""
        }`}
      >
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div>{childComponent}</div>
      </div>
      <div
        className={`flex justify-around my-5 font-bold ${
          table_data.length !== 0 ? "hidden" : ""
        }`}
      >
        No data to display
      </div>
      <div
        className={`flex flex-col items-center ${
          table_data.length === 0 ? "hidden" : ""
        }`}
      >
        <table className="globalCustomTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="tableHeaderRow"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <svg
                            className="inline-flex"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.49988 5.70981L2.85551 8.35418C2.66024 8.54944 2.34366 8.54944 2.1484 8.35418C1.95314 8.15891 1.95314 7.84233 2.1484 7.64707L5.61673 4.17874C5.70845 4.06947 5.84605 4 5.99988 4L6.00155 4C6.08023 3.99998 6.15892 4.01841 6.23056 4.05531C6.27569 4.07847 6.31803 4.10895 6.35583 4.14675L6.36581 4.15701L9.85588 7.64709C10.0511 7.84235 10.0511 8.15893 9.85588 8.3542C9.66062 8.54946 9.34404 8.54946 9.14878 8.3542L6.49988 5.7053V15.5C6.49988 15.7761 6.27602 16 5.99988 16C5.72374 16 5.49988 15.7761 5.49988 15.5V5.70981ZM14.5044 14.2902L17.1488 11.6458C17.344 11.4506 17.6606 11.4506 17.8559 11.6458C18.0511 11.8411 18.0511 12.1577 17.8559 12.3529L14.3875 15.8213C14.2958 15.9305 14.1582 16 14.0044 16L14.0027 16C13.924 16 13.8454 15.9816 13.7737 15.9447C13.7286 15.9215 13.6862 15.8911 13.6484 15.8533L13.6385 15.843L10.1484 12.3529C9.95313 12.1577 9.95313 11.8411 10.1484 11.6458C10.3437 11.4505 10.6602 11.4505 10.8555 11.6458L13.5044 14.2947L13.5044 4.5C13.5044 4.22386 13.7283 4 14.0044 4C14.2805 4 14.5044 4.22386 14.5044 4.5L14.5044 14.2902Z"
                              fill="#8D9096"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            className="inline-flex"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.49988 5.70981L2.85551 8.35418C2.66024 8.54944 2.34366 8.54944 2.1484 8.35418C1.95314 8.15891 1.95314 7.84233 2.1484 7.64707L5.61673 4.17874C5.70845 4.06947 5.84605 4 5.99988 4L6.00155 4C6.08023 3.99998 6.15892 4.01841 6.23056 4.05531C6.27569 4.07847 6.31803 4.10895 6.35583 4.14675L6.36581 4.15701L9.85588 7.64709C10.0511 7.84235 10.0511 8.15893 9.85588 8.3542C9.66062 8.54946 9.34404 8.54946 9.14878 8.3542L6.49988 5.7053V15.5C6.49988 15.7761 6.27602 16 5.99988 16C5.72374 16 5.49988 15.7761 5.49988 15.5V5.70981ZM14.5044 14.2902L17.1488 11.6458C17.344 11.4506 17.6606 11.4506 17.8559 11.6458C18.0511 11.8411 18.0511 12.1577 17.8559 12.3529L14.3875 15.8213C14.2958 15.9305 14.1582 16 14.0044 16L14.0027 16C13.924 16 13.8454 15.9816 13.7737 15.9447C13.7286 15.9215 13.6862 15.8911 13.6484 15.8533L13.6385 15.843L10.1484 12.3529C9.95313 12.1577 9.95313 11.8411 10.1484 11.6458C10.3437 11.4505 10.6602 11.4505 10.8555 11.6458L13.5044 14.2947L13.5044 4.5C13.5044 4.22386 13.7283 4 14.0044 4C14.2805 4 14.5044 4.22386 14.5044 4.5L14.5044 14.2902Z"
                              fill="#8D9096"
                            />
                          </svg>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className={`mt-5 bg-white paginationBox ${
            disablePagination ? "hidden" : ""
          }`}
        >
          {/* <button
            onClick={() => previousPage()}
            className="border-r border-slate-300 py-2 w-28 text-[14px] text-[#383b40]"
            disabled={!canPreviousPage}
          >
            {"<  "} Previous
          </button> */}
          {pageIndex > 1 && pageIndex != 2 ? (
            <button onClick={() => gotoPage(0)} className="mx-2">
              {1}
            </button>
          ) : (
            <></>
          )}
          {pageCount <= 1 ? (
            <>
              {/* <button
                onClick={() => gotoPage(0)}
                className="mx-2  bg-blue-700 px-3 py-1 text-white font-semibold"
              >
                {1}
              </button> */}
            </>
          ) : (
            <>
              {pageIndex < pageCount - 3 ? (
                <></>
                // <div className="inline">
                //   <button
                //     onClick={() => gotoPage(pageIndex)}
                //     className="mx-2  bg-blue-700 px-3 py-1 text-white font-semibold"
                //   >
                //     {pageIndex + 1}
                //   </button>
                //   <button
                //     onClick={() => gotoPage(pageIndex + 1)}
                //     className="mx-2"
                //   >
                //     {pageIndex + 2}
                //   </button>
                //   <button
                //     onClick={() => gotoPage(pageIndex + 2)}
                //     className="mx-2"
                //   >
                //     {pageIndex + 3}
                //   </button>
                //   {"...."}
                // </div>
              ) : (
                <>
                  {/* {pageIndex == pageCount - 3 ? (
                    <button
                      onClick={() => gotoPage(pageCount - 3)}
                      className="mx-2  bg-blue-700 px-3 py-1 text-white font-semibold"
                    >
                      {pageCount - 2}
                    </button>
                  ) : (
                    <>
                      {pageCount > 2 ? (
                        <button
                          onClick={() => gotoPage(pageCount - 3)}
                          className="mx-2 "
                        >
                          {pageCount - 2}
                        </button>
                      ) : (
                        <></>
                      )}
                    </>
                  )} */}
                  {/* {pageIndex == pageCount - 2 ? (
                    <button
                      onClick={() => gotoPage(pageCount - 2)}
                      className="mx-2  bg-blue-700 px-3 py-1 text-white font-semibold"
                    >
                      {pageCount - 1}
                    </button>
                  ) : (
                    <button
                      onClick={() => gotoPage(pageCount - 2)}
                      className="mx-2 "
                    >
                      {pageCount - 1}
                    </button>
                  )} */}
                </>
              )}
              {/* {pageIndex == pageCount - 1 ? (
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  className="mx-2  bg-blue-700 px-3 py-1 text-white font-semibold"
                >
                  {pageCount}
                </button>
              ) : (
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  className="mx-2 "
                >
                  {pageCount}
                </button>
              )} */}
            </>
          )}
          {/* <button
            onClick={() => nextPage()}
            className="border-l border-slate-300 py-2 w-28 text-[14px] text-[#383b40]"
            disabled={!canNextPage}
          >
            Next {" >"}
          </button> */}
        </div>
      </div>
    </div>
  );
  // }
};
export default CustomTable;
