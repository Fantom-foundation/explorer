// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import searchIcon from 'src/assets/images/icons/search.svg';

type SearchBarInputProps = {
    searchHandler: (event: SyntheticEvent<HTMLFormElement>) => void,
    setSearchText: (event: SyntheticEvent<HTMLInputElement>) => void,
    searchText: string,
    placeHolder: string,
};

const SearchBarInput = ({
    searchHandler,
    setSearchText,
    searchText,
    placeHolder,
}: SearchBarInputProps) => (
    <section id="search-bar">
        <Container>
            <Row>
                <Col>
                    <div className="holder">
                        <form autoComplete="off" onSubmit={searchHandler}>
                            <div className="form-input">
                                <input
                                    value={searchText}
                                    id="search"
                                    className="form-element-field"
                                    placeholder={placeHolder}
                                    type="search"
                                    required=""
                                    onChange={setSearchText}
                                />
                               <button type="submit" className="seach-btn"><img alt="Search" src={searchIcon} className="icon"/></button> 
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
);

export default SearchBarInput;
