// @flow

import React from 'react';
import { createSelector } from 'reselect';

// import { setBlockData } from './views/controllers/blocks/action';
// import { getBlockUpdateDetails } from './views/controllers/blocks/selector';
// import { getRealtimeUpdateDetails } from './views/controllers/realtime-blockchain-update/selector';

import Routes from 'src/routes';
import Header from 'src/views/components/header/header';
import Footer from 'src/views/components/footer/footer';

export default function Main() {
    // constructor(props) {
    //   super(props);
    //   this.getBlockData = this.getBlockData.bind(this);
    //   this.state = {
    //     intervalSet: false,
    //   };
    // }
    // componentDidMount() {
    //   if (this.interval) {
    //     clearInterval(this.interval);
    //   }
    //
    //   if (this.props.realtimeUpdate.isRealtimeUpdate) {
    //     this.interval = setInterval(this.getBlockData, 5000);
    //   } else {
    //     this.interval = setInterval(this.getBlockData, 20000);
    //   }
    //   this.getBlockData();
    // }
    // componentDidUpdate(prevProps, prevState) {
    //   if (
    //     this.props.realtimeUpdate.isRealtimeUpdate !==
    //     prevProps.realtimeUpdate.isRealtimeUpdate
    //   ) {
    //     if (this.interval) {
    //       clearInterval(this.interval);
    //     }
    //
    //     if (this.props.realtimeUpdate.isRealtimeUpdate) {
    //       this.interval = setInterval(this.getBlockData, 5000);
    //     } else {
    //       this.interval = setInterval(this.getBlockData, 20000);
    //     }
    //     // this.setState({
    //     //   intervalSet: true,
    //     // });
    //     // setInterval(this.getBlockData, 4000);
    //   }
    // }
    //
    // getBlockData() {
    //   const { setBlocksData } = this.props;
    //
    //   const initialValue = 30;
    //   // HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
    //   //   query: `
    //   // {
    //   //   blocks(first: ${initialValue}, by: "index", byDirection: "desc") {
    //   //     pageInfo {
    //   //       hasNextPage
    //   //     }
    //   //     edges {
    //   //       cursor,
    //   //       node {
    //   //         id,
    //   //         payload,
    //   //         created
    //   //       }
    //   //     }
    //   //   }
    //   // }`,
    //   // })
    //   Promise.reject([])
    //     .then(
    //       (res) => {
    //         if (res && res.data) {
    //           const allData = res.data;
    //           if (
    //             allData.data &&
    //             allData.data.blocks &&
    //             allData.data.blocks.edges &&
    //             allData.data.blocks.edges.length
    //           ) {
    //             const blockDetails = {
    //               payload: allData.data.blocks.edges,
    //             };
    //             setBlocksData(blockDetails);
    //           } else {
    //             console.log('else part');
    //           }
    //         }
    //         return null;
    //       },
    //     )
    //     .catch(() => {
    //       console.log('error');
    //       setBlocksData({
    //         payload: [],
    //       });
    //     });
    // }
    // const { setBlockData, store } = this.props;

    return (
        <>
            <Header />
            <Routes />
            <Footer />
        </>
    );
}

// Main.propTypes = {
//     setBlockData: PropTypes.func,
// };
// const mapStateToProps = createSelector(
//     getRealtimeUpdateDetails(),
//     (realtimeUpdate) => ({ realtimeUpdate })
// );
//
// const mapDispatchToProps = (dispatch) => ({
//     setBlocksData: (blockData) => dispatch(setBlockData(blockData)),
// });
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Main);
