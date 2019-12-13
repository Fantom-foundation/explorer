// @flow

import * as React from 'react';
import { Container, Button, Col } from 'reactstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';

import SearchForBlock from 'src/views/components/search/searchForBlock';
import TransactionBlockHeader from 'src/views/components/header/tranactionBlockHeader';
import Loader from 'src/views/components/Loader';
import BlockDetails from 'src/views/containers/blockDetail/BlockDetails';
import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';
import { useDataProvider } from 'src/utils/DataProvider';
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import {Link} from "react-router-dom";
function BlockDetail() {
    const history = useHistory();
    const match = useRouteMatch('/blocks/:blockHeight');
    let {
        params: { blockHeight },
    } = match;

    if (!blockHeight) {
        blockHeight = '';
    }

    const [error, setError] = React.useState('');
    const [blockData, setBlockData] = React.useState([]);
    const provider = useDataProvider();

    const showDetail = React.useCallback((blockNumber) => {
        if (blockNumber === '') {
            return;
        }

        history.push(`/block/${blockNumber}`);
    }, [history]);

    /**
     * @method onShowList():  Function to show list of blocks
     */

    const onShowList = React.useCallback(() => {
        history.push('/blocks');
    }, [history]);

    React.useEffect(() => {
        async function fetchData() {
            if (blockHeight && blockHeight !== '') {
                const result = await provider.getBlock(blockHeight);

                if (result.error) {
                    setError(result.error.message);
                } else {
                    setBlockData(result.blockData);
                }
            } else {
                return [];
            }
        }

        fetchData();
    }, [blockHeight, provider]);

    return (
        <div>
            <section className="bg-theme full-height-conatainer">

            <div className="breacrumb">
                <Container>
                    <ul className="d-flex justify-content-end">
                        <li><Link to="/">Home</Link></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li><Link to="/blocks">Blocks</Link></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li className="active">Block</li>
                    </ul>
                </Container>
            </div>
                <Container>
                    <BlockDetails />
                </Container>
            </section>
        </div>
    );
}

export default BlockDetail;
