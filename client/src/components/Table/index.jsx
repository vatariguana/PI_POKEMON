import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Table = (props) => {
  const { headers, data } = props;

  return (
    <>
      <table className="table">
        <thead className="thead">
          <tr>
            {headers?.map((element, index) => {
              return <th key={`th-${index}`}>{element.label}</th>;
            })}
          </tr>
        </thead>
        <tbody className="tbody">
          {data?.map((element) => {
            return (
              <tr>
                {headers.map((header) => {
                  const keyValue = header.key;
                  if (element[keyValue]) {
                    if (header.isArray) {
                      let elementArray = "";
                      element[keyValue].map((item) => {
                        elementArray = `${elementArray} ${item.name}`;
                      });
                      return (
                        <td>
                          <Link to={`/home/detail/${element.id}`}>
                            {elementArray}
                          </Link>
                        </td>
                      );
                    } else {
                      if (keyValue === "imagen") {
                        return (
                          <td>
                            <Link to={`/home/detail/${element.id}`}>
                              <img src={element[keyValue]} alt="imagenPoke" />
                            </Link>
                          </td>
                        );
                      }
                      return (
                        <td>
                          <Link to={`/home/detail/${element.id}`}>
                            {element[keyValue]}
                          </Link>
                        </td>
                      );
                    }
                  } else {
                    return <td></td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
