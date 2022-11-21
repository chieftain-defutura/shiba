import React from "react";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div>
      <div className="sidebar-container">
        <div className="box">
          <h2 className="heading">My Items</h2>
          <div className="content-cont">
            <div className="content">
              <p className="name">My Movies</p>
              <p className="number">2</p>
            </div>
            <div className="content">
              <p className="name">My Music</p>
              <p className="number">5</p>
            </div>
            <div className="content">
              <p className="name">My Books</p>
              <p className="number">4</p>
            </div>
            <div className="content">
              <p className="name">My Courses</p>
              <p className="number">1</p>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Websites</h2>
          <div className="content-cont">
            <div className="content">
              <p className="name">My Websites</p>
              <p className="number">2</p>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Domains</h2>
          <div className="content-cont">
            <div className="content">
              <p className="name">My Domains</p>
              <p className="number">5</p>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Shops</h2>
          <div className="content-cont">
            <div className="content">
              <p className="name">My Digital Shop</p>
              <p className="number">1</p>
            </div>
            <div className="content">
              <p className="name">My Goods Shop</p>
              <p className="number"></p>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Charities</h2>
          <div className="content-cont">
            <div className="content">
              <p className="name">My Charities</p>
              <p className="number">1</p>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">Delivery</h2>
          <div className="content-cont">
            <div className="content">
              <p className="name">Have to Send</p>
              <p className="number">4</p>
            </div>
            <div className="content">
              <p className="name">Awaiting Delivery</p>
              <p className="number">2</p>
            </div>
          </div>
        </div>
        <div className="select-container">
          <select>
            <option>SORT BY DATE</option>
            <option>Websites</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
