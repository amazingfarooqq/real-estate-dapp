import React from "react";

export const PendingPropertyCard = ({classNameTop}) => {
  return (
    <div className={classNameTop}>
      <div className="card shadow-0 border rounded-3">
        <div className="card-body">
          <div className="row px-3">
            <div
              className="col-12 col-lg-6 bg-secondary p-3 rounded"
              style={{ height: "220px" }}
            ></div>
            <div className="col-12 col-lg-6 border-sm-start-none border-start">
              <div className="row">
                <div className="col-12">
                  <a className="btn btn-success px-5 py-3 loading_thing disabled placeholder "></a>
                  <a className="loading_thing disabled placeholder btn btn-primary disabled mx-lg-1 px-5 py-3"></a>
                </div>
              </div>

              <div className="row px-2 mt-2">
                <a className="col-7 btn btn-secondary px-5 py-2 loading_thing disabled mb-4 mb-lg-0"></a>
                <a className="col-9 mb-4 px-5 py-5 mt-2 mb-lg-0 btn btn-secondary loading_thing disabled placeholder"></a>
              </div>
            </div>

            <div className="col-12">
              <a className="btn btn-secondary my-1 px-5 py-3 loading_thing disabled placeholder">
                {" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
