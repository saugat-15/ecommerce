import React from "react";
import { Pagination } from "antd";

function Footer() {
  return (
    // <div className="pagination">
      <Pagination defaultCurrent={2} total={50} />
    // </div>
  );
}

export default Footer;
