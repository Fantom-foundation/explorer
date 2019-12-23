import React from "react";
import { Container, Row, Col, Card, Table } from "reactstrap";
import { tableMockData } from "./mokeData";
import qrInon from "src/assets/images/icons/qr.svg";
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import { callbackify } from "util";
import axios from "axios";
import { api_get_singleValidators, api_get_singleValidatorsDelegator } from 'src/utils/Utlity';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
function durationToDisplay(millisec) {
  var seconds = (millisec / 1000).toFixed(0);
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
    return hours + " Hour " + minutes + " mins " + seconds + " sec ";
  }
  return minutes + " mins " + seconds + " sec";
}
function ValidatorDetail() {
  const match = useRouteMatch('/validator/:stakeId');
  const { params: { stakeId } } = match;
  const [card, setCard] = React.useState([]);
  const [txCopied, setTxCopied] = React.useState(false);
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `${api_get_singleValidators}${stakeId}?verbosity=2`,
    })
      .then(function (response) {
        //console.log(response.data.data);
        const card = [
          {
            title: "Delegate address:",
            value: response.data.data.address,
            valueClass: "text-ellipsis validator-hash"
          },
          {
            title: "Staking start time:",
            value: durationToDisplay(response.data.data.createdTime)
          },
          {
            title: "Validating power:",
            value: response.data.data.validationScore
          },
          {
            title: "Amount staked:",
            value: `${response.data.data.stake} FTM`
          },
          {
            title: "Amount delegated:",
            value: `${response.data.data.delegatedMe} FTM`
          },
          {
            title: "Staking total:",
            value: `${response.data.data.totalStake} FTM`
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
        console.log(response.data.data);
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
            <Card className="detail-card validator-card h-100">
              <h3 className="text-grey">Overview</h3>
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
                               
                              <button className="d-none d-lg-block">
                                <img src={qrInon} alt="QR" />
                              </button>
                              {txCopied ? ( <span className="copied-text" style={{ color: '#777' }}>  <i class="far fa-check-circle" aria-hidden="true"></i>  Copied.</span>) :null}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="font-weight-bold text-navy mb-4">Delegations</h3>
            <p className="total-tranactions  mb-3 mb-lg-4">10 delegates</p>
            <div>
              <Table className="ftm-table responsive single-validator">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tableMockData.map(data => (
                    <tr>
                      <td className="title">
                        <p className="text-ellipsis">
                          <a className="text-primary">
                            ftm1mt9ye3g0u72dlvyf6j68f2u78s0zaurjftpe28
                          </a>
                        </p>
                      </td>

                      <td className="value" heading="Delegated">
                        306,460 FTM
                      </td>
                    </tr>
                  ))}
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
export default ValidatorDetail