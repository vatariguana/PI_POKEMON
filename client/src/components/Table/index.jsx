import React from "react";
import "./styles.css";

const Table = (props) => {
  const { headers, data } = props;
  console.log(data, "componente table");
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
                        elementArray = `${elementArray} ${item}`;
                      });
                      return <td>{elementArray}</td>;
                    } else {
                      if (keyValue === "imagen") {
                        return (
                          <td>
                            <img src={element[keyValue]} alt="imagenPoke" />
                          </td>
                        );
                      }
                      return <td>{element[keyValue]}</td>;
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
