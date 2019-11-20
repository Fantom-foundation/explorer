// @flow

import * as React from 'react';
import { Container, Button, Col } from 'reactstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';

import SearchForBlock from 'src/views/components/search/searchForBlock';
import TransactionBlockHeader from 'src/views/components/header/tranactionBlockHeader';
import Loader from 'src/views/components/Loader';

import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';
import { useDataProvider } from 'src/utils/DataProvider';

function BlockDetail() {
    const history = useHistory();
    const match = useRouteMatch('/blocks/:blockHeight');
    let {
        params: { blockHeight },
    } = match;

    if (!blockHeight) {
        blockHeight = '';
    }

    const [ error, setError ] = React.useState('');
    const [ blockData, setBlockData ] = React.useState([]);
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
        <section className="bg-theme full-height-conatainer">
            <Container>
                <TransactionBlockHeader
                    title="Block"
                    block="Number:"
                    total={blockHeight}
                    icon={TitleIcon}
                >
                    <Col md={6} className="text-right">
                        <Button
                            color="white"
                            className="list"
                            onClick={onShowList}
                        >
                            List
                        </Button>
                    </Col>
                </TransactionBlockHeader>
                {
                    error ? (<p className="text-white">{error}</p>) :
                        blockData.length <= 0 ? (
                            <Loader />
                        ) : blockData.length > 0 && (
                            <SearchForBlock
                                blocks={blockData}
                                showDetail={showDetail}
                            />
                        )
                }
            </Container>
        </section>
    );
}

export default BlockDetail;
