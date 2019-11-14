// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router/immutable';

import SearchBarInput from 'src/views/components/SearchBar/SearchBarInput';
import SearchBarModal from 'src/views/components/SearchBar/SearchBarModal';

import { checkSearchString } from 'src/utils';

import type { LocationShape } from 'react-router-dom';

type SearchBarProps = {|
    historyPush: (string | LocationShape) => void,
|};

function SearchBar(props: SearchBarProps) {
    const { historyPush } = props;
    const [ searchText, setSearchText ] = React.useState('');
    const [ isModalOpen, setIsModalOpen ] = React.useState(false);

    const toggleModalOpen = React.useCallback(() => {
        setIsModalOpen(!isModalOpen);
    }, [isModalOpen, setIsModalOpen]);

    const setSearchTextHandler = React.useCallback((e: SyntheticEvent<HTMLInputElement>) => {
        const { currentTarget: { value } } = e;
        setSearchText(value);
    }, [setSearchText]);

    const searchHandler = React.useCallback((e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchText && searchText !== '') {
            const checkResponse = checkSearchString(searchText);

            if (checkResponse.isValid) {
                const { type } = checkResponse;

                if (type === 'number') {
                    historyPush({
                        pathname: `/blocks/${searchText}`,
                    });
                } else if (type === 'hash') {
                    historyPush({
                        pathname: `/transactions/${searchText}`,
                    });
                }
            } else {
                toggleModalOpen();
            }

            setSearchText('');
        }
    }, [searchText, toggleModalOpen, historyPush, setSearchText]);

    return (
        <>
            <SearchBarModal
                isModalOpen={isModalOpen}
                toggleModalOpen={toggleModalOpen}
            />
            <SearchBarInput
                placeHolder="Search by Transaction Hash / Block Number"
                searchText={searchText}
                setSearchText={setSearchTextHandler}
                searchHandler={searchHandler}
            />
        </>
    );
}

const mapDispatchToProps = {
    historyPush: push,
};

export default connect<SearchBarProps, {||}, _, _, _, _>(null, mapDispatchToProps)(SearchBar);