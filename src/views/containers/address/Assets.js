// @flowimport * as React from 'react';
import * as React from 'react';

import Web3 from 'web3';
import Loading from 'src/assets/images/icons/Loading.gif';
import searchIcon from "src/assets/images/icons/search-icon.svg";
import { Row, Col, Card, Table, Input } from 'reactstrap';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { api_get_address, api_get_delegator, api_get_price, api_get_epoch } from 'src/utils/Utlity';
import axios from "axios";

const abi = JSON.parse('[{"constant":true,"inputs":[],"name":"minDelegation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"bondedRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakersNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"slashedStakeTotalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"short","type":"uint256"},{"internalType":"uint256","name":"long","type":"uint256"}],"name":"updateGasPowerAllocationRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawDelegation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"updateBaseRewardPerSec","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"prepareToWithdrawDelegation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"delegationLockPeriodEpochs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochSnapshots","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"epochFee","type":"uint256"},{"internalType":"uint256","name":"totalBaseRewardWeight","type":"uint256"},{"internalType":"uint256","name":"totalTxRewardWeight","type":"uint256"},{"internalType":"uint256","name":"baseRewardPerSecond","type":"uint256"},{"internalType":"uint256","name":"stakeTotalAmount","type":"uint256"},{"internalType":"uint256","name":"delegationsTotalAmount","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxDelegatedRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"contractCommission","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"delegationsTotalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"metadata","type":"bytes"}],"name":"updateStakerMetadata","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"stakerID","type":"uint256"},{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"calcTotalReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"updateCapReachedDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"unbondingUnlockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"stakeTotalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"capReachedDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakeLockPeriodTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"delegationsNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unbondingStartDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"stakeLockPeriodEpochs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getStakerID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bondedTargetRewardUnlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unbondingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentSealedEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakersLastID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsAllowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"stakerID","type":"uint256"},{"internalType":"uint256","name":"_fromEpoch","type":"uint256"},{"internalType":"uint256","name":"maxEpochs","type":"uint256"}],"name":"calcValidatorRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakerMetadata","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"slashedDelegationsTotalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"validatorCommission","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"maxStakerMetadataSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"delegator","type":"address"},{"internalType":"uint256","name":"_fromEpoch","type":"uint256"},{"internalType":"uint256","name":"maxEpochs","type":"uint256"}],"name":"calcDelegationRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"e","type":"uint256"},{"internalType":"uint256","name":"v","type":"uint256"}],"name":"epochValidator","outputs":[{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"delegatedMe","type":"uint256"},{"internalType":"uint256","name":"baseRewardWeight","type":"uint256"},{"internalType":"uint256","name":"txRewardWeight","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegations","outputs":[{"internalType":"uint256","name":"createdEpoch","type":"uint256"},{"internalType":"uint256","name":"createdTime","type":"uint256"},{"internalType":"uint256","name":"deactivatedEpoch","type":"uint256"},{"internalType":"uint256","name":"deactivatedTime","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"paidUntilEpoch","type":"uint256"},{"internalType":"uint256","name":"toStakerID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"to","type":"uint256"}],"name":"createDelegation","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"prepareToWithdrawStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minStakeIncrease","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"metadata","type":"bytes"}],"name":"createStake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"increaseStake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"stakerID","type":"uint256"},{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"uint256","name":"delegatedAmount","type":"uint256"}],"name":"calcDelegationReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"delegationLockPeriodTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_fromEpoch","type":"uint256"},{"internalType":"uint256","name":"maxEpochs","type":"uint256"}],"name":"claimValidatorRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"stakerID","type":"uint256"},{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"calcValidatorReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_fromEpoch","type":"uint256"},{"internalType":"uint256","name":"maxEpochs","type":"uint256"}],"name":"claimDelegationRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakers","outputs":[{"internalType":"uint256","name":"status","type":"uint256"},{"internalType":"uint256","name":"createdEpoch","type":"uint256"},{"internalType":"uint256","name":"createdTime","type":"uint256"},{"internalType":"uint256","name":"deactivatedEpoch","type":"uint256"},{"internalType":"uint256","name":"deactivatedTime","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"paidUntilEpoch","type":"uint256"},{"internalType":"uint256","name":"delegatedMe","type":"uint256"},{"internalType":"address","name":"stakerAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"},{"indexed":true,"internalType":"address","name":"stakerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CreatedStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"}],"name":"UpdatedStakerMetadata","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"diff","type":"uint256"}],"name":"IncreasedStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"toStakerID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CreatedDelegation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fromEpoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"untilEpoch","type":"uint256"}],"name":"ClaimedDelegationReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fromEpoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"untilEpoch","type":"uint256"}],"name":"ClaimedValidatorReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"}],"name":"PreparedToWithdrawStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"}],"name":"WithdrawnStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"}],"name":"PreparedToWithdrawDelegation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"stakerID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"}],"name":"WithdrawnDelegation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_capReachedDate","type":"uint256"}],"name":"ChangedCapReachedDate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"UpdatedBaseRewardPerSec","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"short","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"long","type":"uint256"}],"name":"UpdatedGasPowerAllocationRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]')




function AssetsPage() {
    const match = useRouteMatch('/address/:addressid');
    const { params: { addressid } } = match;
    const [addressBalance, setaddressBalance] = React.useState(0);
    const [currentPrice, setcurrentPrice] = React.useState(0);
    const [delegatedAmount, setDelegatedAmount] = React.useState(0);
    const [claimedRewards, setClaimedRewards] = React.useState(0);
    const [pendingRewards, setPendingRewards] = React.useState(0);
    const [Loader, setLoader] = React.useState(false);
    const e18 = Math.pow(10, 18);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${api_get_address}${addressid}&offset=0&count=30`,
        })
            .then(function (response) {
                // console.log(response.data.data.account);
                console.log("setaddressBalance");
                console.log(response.data.data.account.balance)
                setaddressBalance(response.data.data.account.balance)
                setLoader(true);
            }).catch(function (error) {
                //console.log(error.message);
            });
            axios({
                method: 'get',
                url: `${api_get_epoch}`,
            })
                .then(function (response) {
                    // console.log(response.data.data.account);
                    console.log(response.data.data.epochNumber)
                    const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.fantom.network/"));
                    const sfc = new web3.eth.Contract(abi, '0xfc00face00000000000000000000000000000000');
                      sfc.methods
                        .calcDelegationRewards(addressid, 1, response.data.data.epochNumber)
                        .call({ addressid }, function (error, result) {
                          if (result) {
                            console.log('result');
                            axios({
                                method: 'get',
                                url: `${api_get_epoch}`,
                            })
                                .then(function (response) {
                                  console.log('hello');
                                  console.log(parseFloat(result['0']) / Math.pow(10, 18))
                                  setPendingRewards(parseFloat(result['0']) / Math.pow(10, 18));
                                  console.log('hello')
                                }).catch(function (error) {
                                    //console.log(error.message);
                                });
                          }
                        });
                }).catch(function (error) {
                    //console.log(error.message);
                });
        axios({
            method: 'get',
            url: `${api_get_delegator}${addressid}?verbosity=2`,
        })
            .then(function (response) {
              // console.log(response.data.data.account);
              setDelegatedAmount(parseInt(response.data.data.amount)/e18)
              setClaimedRewards(parseInt(response.data.data.claimedRewards)/e18)
            });
            axios({
                method: 'get',
                url: `${api_get_price}`,
            })
                .then(function (response) {
                    const priceParsed = JSON.parse(response.data.body);
                    //console.log(priceParsed);
                    if (priceParsed && priceParsed.price) {
                        const price3d = parseFloat(priceParsed.price).toFixed(3);
                        setcurrentPrice(price3d);
                    }
                });
    }, []);
    return (
        <div>
            {Loader ?
                (
                    <div>
                        <Row className="card-row">
                            <Col lg={6}>
                                <Card>
                                    <div>
                                        <h3 className="text-grey">Value in FTM</h3>
                                        <h3 className="text-navy">
                                            <b>{addressBalance.toFixed(2)} FTM</b>
                                        </h3>
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <div>
                                        <h3 className="text-grey">Value in USD</h3>
                                        <h3 className="text-navy">
                                            <b>${(parseFloat(addressBalance) * parseFloat(currentPrice)).toFixed(3)} USD</b>
                                        </h3>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>
                                    <div className="ftm-table-search ml-auto mr-auto mr-lg-0">
                                        <Input
                                            type="search"
                                            placeholder="Search for assets in wallet"
                                            className="ftm-table-search-input"
                                        />
                                        <button className="search-btn">
                                            <img src={searchIcon} alt="search" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Table className="ftm-table responsive address-assets-table">
                                        <thead>
                                            <tr>
                                                <th>Asset</th>
                                                <th>Balance</th>
                                                <th>Value in FTM</th>
                                                <th>Value in USD</th>
                                                <th>Token price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="title">
                                                    <p className="assetName text-primary mb-0 d-inline">
                                                        FTM
                                        </p>
                                                    <p className="assetFullName mb-0 ml-1 d-inline">
                                                        Fantom
                                        </p>
                                                </td>
                                                <td className="value" heading="Balance">
                                                    {addressBalance.toFixed(2)}
                                                </td>
                                                <td className="value" heading="Value in FTM">
                                                    {addressBalance.toFixed(2)} FTM
                                    </td>
                                                <td className="value" heading="Value in USD">
                                                    ${(parseFloat(addressBalance) * parseFloat(currentPrice)).toFixed(3)} USD
                                    </td>
                                                <td className="value" heading="Token price">
                                                    ${currentPrice}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="title">
                                                    <p className="assetName text-primary mb-0 d-inline">
                                                        FTM
                                        </p>
                                                    <p className="assetFullName mb-0 ml-1 d-inline">
                                                        Delegated
                                        </p>
                                                </td>
                                                <td className="value" heading="Balance">
                                                    {delegatedAmount.toFixed(2)}
                                                </td>
                                                <td className="value" heading="Value in FTM">
                                                    {delegatedAmount.toFixed(2)} FTM
                                    </td>
                                                <td className="value" heading="Value in USD">
                                                    ${(parseFloat(delegatedAmount) * parseFloat(currentPrice)).toFixed(3)} USD
                                    </td>
                                                <td className="value" heading="Token price">
                                                    ${currentPrice}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="title">
                                                    <p className="assetName text-primary mb-0 d-inline">
                                                        FTM
                                        </p>
                                                    <p className="assetFullName mb-0 ml-1 d-inline">
                                                        Pending Rewards
                                        </p>
                                                </td>
                                                <td className="value" heading="Balance">
                                                    {pendingRewards.toFixed(2)}
                                                </td>
                                                <td className="value" heading="Value in FTM">
                                                    {pendingRewards.toFixed(2)} FTM
                                    </td>
                                                <td className="value" heading="Value in USD">
                                                    ${(parseFloat(pendingRewards) * parseFloat(currentPrice)).toFixed(3)} USD
                                    </td>
                                                <td className="value" heading="Token price">
                                                    ${currentPrice}
                                                </td>
                                              </tr>
                                            <tr>
                                                <td className="title">
                                                    <p className="assetName text-primary mb-0 d-inline">
                                                        FTM
                                        </p>
                                                    <p className="assetFullName mb-0 ml-1 d-inline">
                                                        Claimed Rewards
                                        </p>
                                                </td>
                                                <td className="value" heading="Balance">
                                                    {claimedRewards.toFixed(2)}
                                                </td>
                                                <td className="value" heading="Value in FTM">
                                                    {claimedRewards.toFixed(2)} FTM
                                    </td>
                                                <td className="value" heading="Value in USD">
                                                    ${(parseFloat(claimedRewards) * parseFloat(currentPrice)).toFixed(3)} USD
                                    </td>
                                                <td className="value" heading="Token price">
                                                    ${currentPrice}
                                                </td>
                                              </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
                : (<div className="text-center loader-img"><img alt="Search" src={Loading} className="icon" /></div>)
            }
        </div>
    );
} export default AssetsPage;
