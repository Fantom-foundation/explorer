// @flow

import * as React from 'react';
import { useHistory } from 'react-router-dom';

import SearchBarInput from 'src/views/components/SearchBar/SearchBarInput';
import SearchBarModal from 'src/views/components/SearchBar/SearchBarModal';

import { checkSearchString } from 'src/utils';

function SearchBar() {
    const [ searchText, setSearchText ] = React.useState('');
    const [ isModalOpen, setIsModalOpen ] = React.useState(false);
    const history = useHistory();

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
                    history.push({
                        pathname: `/blocks/${searchText}`,
                    });
                } else if (type === 'hash') {
                    history.push({
                        pathname: `/transactions/${searchText}`,
                    });
                }
            } else {
                toggleModalOpen();
            }

            setSearchText('');
        }
    }, [searchText, toggleModalOpen, history, setSearchText]);

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

export default SearchBar;