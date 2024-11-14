import React from "react";
import Styles from "./Paginate.module.scss";
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(Styles);

const Paginate = ({ npage, handlePageClick, currentPage }) => {
  return (
    <>
      <ReactPaginate
        pageCount={npage}
        className={cx("pagination")}
        breakLabel="..."
        breakClassName={cx("break-page")}
        previousLabel={null}
        nextLabel={null}
        pageClassName={cx("page-item")}
        pageLinkClassName={cx("page-link")}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        activeClassName={cx("active")}
      />
    </>
  );
};

export default Paginate;
