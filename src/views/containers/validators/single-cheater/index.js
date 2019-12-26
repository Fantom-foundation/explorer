import React from "react";
import { Container, Row, Col, Card, Table } from "reactstrap";
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import axios from "axios";
import { api_get_singleValidators, api_get_singleValidatorsDelegator } from 'src/utils/Utlity';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
function durationToDisplay(millisec) {
  var seconds = (millisec / 100000000000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = (hours >= 10) ? hours : "0" + hours;
    minutes = minutes - (hours * 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }

  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours != "") {
    return hours + " Hours " + minutes + " mins " + seconds + " sec ";
  }
  return minutes + " mins " + seconds + " sec";
}
function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

function CheaterDetail() {
  const match = useRouteMatch('/cheater/:stakeId');
  const { params: { stakeId } } = match;
  const [card, setCard] = React.useState([]);
  const [deligatorData, setDeligatorData] = React.useState([]);
  const [deligatorDataCount, setdeligatorDataCount] = React.useState(0);
  const [txCopied, setTxCopied] = React.useState(false);
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `${api_get_singleValidators}${stakeId}?verbosity=2`,
    })
      .then(function (response) {
        //console.log(response.data.data);
        let validatingPower = response.data.data.validationScore;
        let validatingPowerCal = validatingPower / 10000000;
        let validatingPowerCalResult = formatMoney(validatingPowerCal);
        let precision = 18;
        let result = 10 ** precision;
        let amountStaked = response.data.data.stake / result;
        let delegatedme = response.data.data.delegatedMe / result;
        let totalStake = response.data.data.totalStake / result;
        let timestamp = response.data.data.createdTime;
        let date = new Date((timestamp / 1000000000) * 1000);

        const card = [
          {
            title: "Delegate address:",
            value: response.data.data.address,
            valueClass: "text-ellipsis validator-hash"
          },
          {
            title: "Staking start time:",
            value: '' + date
          },
          {
            title: "Validating power:",
            value: validatingPowerCalResult
          },
          {
            title: "Amount staked:",
            value: `${formatMoney(amountStaked.toString())} FTM`
          },
          {
            title: "Amount delegated:",
            value: `${formatMoney(delegatedme.toString())} FTM`
          },
          {
            title: "Staking total:",
            value: `${formatMoney(totalStake.toString())} FTM`
          }
        ];
        setCard(card);
      }).catch(function (error) {
        console.log(error.message);
      });
    axios({
      method: 'get',
      url: `${api_get_singleValidatorsDelegator}${stakeId}?verbosity=2`,
    })
      .then(function (response) {
        //console.log(response.data.data.delegators);
        setdeligatorDataCount(response.data.data.delegators.length)
        setDeligatorData(response.data.data.delegators);
      }).catch(function (error) {
        console.log(error.message);
      });
  }, []);
  function fntxCopied() {
    setTxCopied(true)
    setTimeout(() => {
      setTxCopied(false)
    }, 2000);
  }
  return (
    <section className="page-section">
      <Container>
        <Row className="top-row">
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <h2 className="text-grey mb-0 title-top">Validator</h2>
                <h3 className="font-weight-bold text-navy ml-1 ml-lg-0 mb-0 pl-3 pl-lg-5">
                  Fantom Validator{" "}
                  <span className="d-none d-lg-inline">{stakeId}</span>
                </h3>
              </div>
              <div className="d-none d-lg-block">
                <div className="breacrumb">
                  <ul className="d-flex justify-content-end">
                    <li><Link to={`/`}>Home</Link></li>
                    <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                    <li ><Link to={`/validators`}>Validators</Link></li>
                    <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                    <li className="active">Fantom Validator {stakeId}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="card-row mb-3 mb-lg-4 pb-3">
          <Col>
            <Card className="detail-card validator-card danger h-100">
              <h3 className="text-grey red">Cheater</h3>
              <table>
                <tbody>
                  {card.map(({ title, value, valueClass = "" }, index) => (

                    <tr key={index}>
                      <td className="title-col">
                        <h4>{title}</h4>
                      </td>
                      <td className="info-col pl-2 pl-lg-5">
                        <div className="d-flex align-items-center">
                          <h4 className={valueClass}>{value}</h4>
                          {index === 0 && (
                            <div className="hashBtnWrapper">
                              <CopyToClipboard
                                text={value}
                                onCopy={fntxCopied}
                              >
                                <button className="ml-0 ml-lg-4">
                                  <i className="far fa-copy" />
                                </button>
                              </CopyToClipboard>
                              {txCopied ? (<span className="copied-text" style={{ color: '#777' }}>  <i class="far fa-check-circle" aria-hidden="true"></i>  Copied.</span>) : null}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="mt-3 pt-4">
                <h3 className="text-danger">Cheater</h3>
                <table className="cheater">
                  {cheaterData.map(({ title, value }, index) => (
                    <tr key={index}>
                      <td className="title-col">
                        <h4>{title}</h4>
                      </td>
                      <td className="info-col pl-1 pl-lg-5">
                        <div className="d-flex align-items-center">
                          <h4 className="text-danger">{value}</h4>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div> */}
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="font-weight-bold text-navy mb-4">Delegations</h3>
            <p className="total-tranactions mb-3 mb-lg-4">{deligatorDataCount} delegates</p>
            <div>
              <Table className="ftm-table responsive single-validator">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {deligatorDataCount > 0 ? deligatorData.map(data => {
                    let precision = 18;
                    let result = 10 ** precision;
                    let amountStaked = data.amount / result;
                    //console.log(data.amount);
                    return (
                      <tr>
                        <td className="title">
                          <p className="text-ellipsis">
                            <Link to={`/address/${data.address}`} className="text-primary">
                              {data.address}
                            </Link>
                          </p>
                        </td>

                        <td className="value" heading="Delegated">
                          {formatMoney(amountStaked)} FTM
                      </td>

                      </tr>
                    )
                  }) :

                    <tr>

                      <td className="title text-center" colSpan="2">
                        <p>No data found.</p>
                      </td>
                    </tr>
                  }
                </tbody>
              </Table>
            </div>
            <div className="d-flex align-items-center justify-content-end mb-4"></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CheaterDetail