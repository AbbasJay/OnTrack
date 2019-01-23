import React, { Component } from "react";
import { connect } from "react-redux";
import { SetData, SetPageNumber } from "./actions";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

export class ShowResults extends Component {
  state = {
    currentPage: this.props.match.params.id,
    itemsPerPage: 20,
    inputSearchText: "",
    filters: []
  };

  componentDidMount() {
    let pageNumber = this.props.match.params.id;
    this.props.SetPageNumber(pageNumber);

    if (pageNumber) {
      this.getResults(pageNumber);
    }
  }

  getResults = pageNumber => {
    axios
      .post("http://nyx.vima.ekt.gr:3000/api/books", {
        page: pageNumber,
        itemsPerPage: this.state.itemsPerPage,
        filters: this.state.filters
      })
      .then(res => {
        this.props.SetData(res.data.books);
        this.setState({ count: res.data.count });
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.state.currentPage = this.props.match.params.id;
      this.getResults(this.props.match.params.id);
    }
  }

  displayData = () => {
    let { results } = this.props;
    if (results.length) {
      return results.map((book, index) => {
        return (
          <div key={index} className="body-container">
            <div className="element-container">Title : {book.book_title}</div>
            <div className="attribute-container">
              <div className="id">
                <strong>Author: </strong>
                {book.book_author + " | "}

                <strong>Publication year: </strong>
                {book.book_publication_year + " | "}

                <strong>Id: </strong>
                {book.id + " | "}

                <strong>Country: </strong>
                {book.book_publication_country + " | "}

                <strong>City: </strong>
                {book.book_publication_city + " | "}

                <strong>Pages: </strong>
                {book.book_pages}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  getPagination = () => {
    debugger;
    let maxPageNumber = Math.ceil(this.state.count / this.state.itemsPerPage);
    let result = [];
    let currentPage = parseInt(this.props.match.params.id);

    if (maxPageNumber < 4) {
      for (let i = 1; i < maxPageNumber; i++) {
        result.push(
          <div key={i} className="pagination-tab">
            <Link to={"/results/" + i} className="route-link">
              {i}
            </Link>
          </div>
        );
      }
      return result;
    }
    result.push(
      <div key={1} className="pagination-tab">
        <Link to={"/results/1"} className="route-link">
          1
        </Link>
      </div>
    );

    if (currentPage > 4) {
      result.push(<div>...</div>);
    }

    if (currentPage > 1) {
      if (currentPage > 3 && currentPage < maxPageNumber - 2) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          result.push(
            <div key={i} className="pagination-tab">
              <Link to={"/results/" + i} className="route-link">
                {i}
              </Link>
            </div>
          );
        }
      } else if (currentPage >= maxPageNumber - 2) {
        for (let i = currentPage - 2; i < maxPageNumber; i++) {
          result.push(
            <div key={i} className="pagination-tab">
              <Link to={"/results/" + i} className="route-link">
                {i}
              </Link>
            </div>
          );
        }
      } else {
        for (let i = 2; i <= 4; i++) {
          result.push(
            <div key={i} className="pagination-tab">
              <Link to={"/results/" + i} className="route-link">
                {i}
              </Link>
            </div>
          );
        }
      }
    } else {
      for (let i = 2; i < 5; i++) {
        result.push(
          <div key={i} className="pagination-tab">
            <Link to={"/results/" + i} className="route-link">
              {i}
            </Link>
          </div>
        );
      }
    }
    if (currentPage < maxPageNumber - 3) {
      result.push(<div>...</div>);
    }
    if (maxPageNumber) {
      result.push(
        <div key={maxPageNumber} className="pagination-tab">
          <Link to={"/results/" + maxPageNumber} className="route-link">
            {maxPageNumber}
          </Link>
        </div>
      );
    }
    return result;
  };

  handleForm = event => {
    this.setState({ inputSearchText: event.target.value });
  };

  handleSearch = () => {
    debugger;
    this.state.currentPage = 1;
    this.state.filters = [
      { type: "all", values: [this.state.inputSearchText] }
    ];

    this.getResults(1);
  };

  render() {
    return (
      <div className="App">
        <div className="title-container" />
        <h1 className="results-title">
          <input
            className="input-placeholder"
            placeholder="Search..."
            onChange={this.handleForm}
          />
          <button onClick={this.handleSearch}>Search</button>
        </h1>

        {this.props.results ? (
          <div>
            {this.displayData(this.state.currentPage)}
            <div className="pagination-container">{this.getPagination()}</div>
          </div>
        ) : (
          <div>Fetching data...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { results: state.data };
};

const mapDispatchToProps = dispatch => {
  return {
    SetData: res => dispatch(SetData(res)),
    SetPageNumber: pageNumber => dispatch(SetPageNumber(pageNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowResults);
