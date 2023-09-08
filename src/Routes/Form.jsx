import React from "react";

export default function Form() {
  return (
    <div className="form-container">
      <h5>Fill New Entries</h5>
      <br />
      <div className="form">
        <form action="">
          <div className="row">
            <div className="col">
              <label htmlFor="">Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">Quantity</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">Year</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">Month</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
              />
              <span className="error">Err</span>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="">Age</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">Gender</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">Country</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">state</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
              />
              <span className="error">Err</span>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="">Product Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">Sub Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">unit Cost</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
              />
              <span className="error">Err</span>
              <hr />
            </div>
            <div className="col">
              <label htmlFor="">unit price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
              />
              <span className="error">Err</span>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="">Cost</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
              <span className="error">Err</span>
            </div>
            <div className="col">
              <label htmlFor="">Revenue</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
              <span className="error">Err</span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="submit" className="btn btn-success" />
            </div>
            <div className="col">
              <input type="reset" className="btn btn-danger" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
