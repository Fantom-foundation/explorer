import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import searchIcon from '../../../../images/icons/search.svg';

const SearchBar = (props) => (
  <section id="search-bar">
    <Container>
      <Row>
        <Col>
          <div className="holder">
            <form autoComplete="off" onSubmit={(e) => props.searchHandler(e)}>
              <div className="form-input">
                <input
                  value={props.searchText}
                  id="search"
                  className="form-element-field"
                  placeholder={props.placeHolder}
                  type="search"
                  required=""
                  onChange={(e) => props.setSearchText(e)}
                />
                <img src={searchIcon} className="icon" />
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);
export default SearchBar;
