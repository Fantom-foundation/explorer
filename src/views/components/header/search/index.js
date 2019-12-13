import React, { useState } from "react";
import { FormGroup, Input } from "reactstrap";
import { SearchIcon, SearchBoldIcon } from "src/views/components/IconsSvg";
import { useHistory } from "react-router-dom";
import { getAccountApi } from "src/views/containers/apis/get-account.js";
import { checkSearchString } from "src/utils";
import Alert from "react-s-alert";
function Search() {
  const [searchText, setSearchText] = React.useState("");
  const history = useHistory();
  const [active, setActive] = useState(false);
  function activeHandler(val) {
    setActive(val);
  }
  const setSearchTextHandler = React.useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value }
      } = e;
      setSearchText(value);
    },
    [setSearchText]
  );
  const searchHandler = React.useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("searchText", searchText);
      if (searchText && searchText !== "") {
        const checkResponse = checkSearchString(searchText);

        if (checkResponse.isValid) {
          const { type } = checkResponse;

          if (type === "number") {
            history.push({
              pathname: `/blocks/${searchText}`
            });
          } else if (type === "hash") {
            history.push({
              pathname: `/transactions/${searchText}`
            });
          }
        } else if (searchText) {
          if (searchText.length === 42 && searchText.startsWith("0x")) {
            getAccountApi(searchText, 0, 10, (res) => {
              console.log("res", res);
              history.push({
                pathname: `/address/assets`,
                state: res
              });
            });
          } else {
            Alert.error("Please enter the correct Address", {
              position: "top",
              timeout: 2000
            });
          }
        }
      }
    },
    [searchText, history]
  );

  return (
    <div className="headerSearchWrapper">
      <button
        className="text-white toggle-btn d-lg-none"
        onClick={() => activeHandler(true)}
        //onBlur={() => activeHandler(!active)}
      >
        <SearchIcon />
      </button>
      <div className={`headerSearch ${active ? "active" : ""}`}>
        <FormGroup className="mb-0">
          <Input
            type="search"
            placeholder="Search"
            onChange={setSearchTextHandler}
          />
          <button className="btn-search " onClick={searchHandler}>
            <SearchIcon />
            <SearchBoldIcon />
          </button>
        </FormGroup>
      </div>
    </div>
  );
}

export default Search;
