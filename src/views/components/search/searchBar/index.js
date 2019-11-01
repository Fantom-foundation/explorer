// @flow

import React from 'react';
import {Container, Row, Col} from 'reactstrap';

import searchIcon from 'src/assets/images/icons/search.svg';

type SearchBarProps = {
    searchHandler: (event: SyntheticEvent<HTMLFormElement>) => void,
    setSearchText: () => void,
    searchText: string,
    placeHolder: string,
};

const SearchBar = ({
    searchHandler,
    setSearchText,
    searchText,
    placeHolder,
}: SearchBarProps) => (
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
                                <img alt="Search" src={searchIcon} className="icon"/>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
);

export default SearchBar;
