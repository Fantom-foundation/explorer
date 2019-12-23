import React from "react";
import axios from "axios";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card } from 'reactstrap';
import classnames from 'classnames';
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import { api_get_validators } from 'src/utils/Utlity';
import { api_get_epoch } from 'src/utils/Utlity';
import TimeAgo from 'react-timeago';
import DataTable from 'react-data-table-component';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

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
function ValidatorPage() {
  const [activeTab, setActiveTab] = React.useState('1');
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const [card1, setCard1] = React.useState([]);
  const [card2, setCard2] = React.useState([]);
  const [TableData, setTableData] = React.useState([]);
  const [CheatersTableData, setCheatersTableData] = React.useState([]);
  var jsonArr = [];
  const columns = [
    {
      name: 'Rank',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'validatorname',
      sortable: true,
      right: false,
      ignoreRowClick: true,
      cell: row => (
        <Link
          to={`/validator/${row.id}`}>
        {row.validatorname}
        </Link>
      ),

    },

    {
      name: 'Proof of Importance',
      selector: 'poi',
      sortable: true,
      right: false,
    },
    {
      name: 'Validating power',
      selector: 'validatingpower',
      sortable: true,
      right: false,
    },
    {
      name: 'Downtime',
      selector: 'downtime',
      sortable: true,
      right: false,
    },

  ];
  var jsonArrCheaters = [];
  const columnsCheaters = [
    {
      name: 'Name',
      selector: 'title',
      sortable: true,
      ignoreRowClick: true,
      cell: row => (
        <Link
          to={`/validator/${row.id}`}>
        {row.validatorname}
        </Link>
      ),

    },
    {
      name: 'Tokens slashed',
      selector: 'tokensslashed',
      sortable: true,
      right: false,
    },
  ];


  React.useEffect(() => {
    axios({
      method: 'get',
      url: `${api_get_validators}`,
    })
      .then(function (response) {
        let StakedSum = 0;
        let arrayCount = response.data.data.stakers.length;
        for (let i = 0; i < arrayCount; i++) {
          StakedSum = parseFloat(StakedSum) + parseFloat(response.data.data.stakers[i].totalStake);
          if (response.data.data.stakers[i].isCheater === false) {
            jsonArr.push({
              id: response.data.data.stakers[i].id,
              title: i + 1,
              validatorname: response.data.data.stakers[i].address,
              poi: `${response.data.data.stakers[i].poi}`,
              validatingpower: response.data.data.stakers[i].validationScore,
              downtime: response.data.data.stakers[i].downtime
            });
          }
          else {
            jsonArrCheaters.push({
              id: response.data.data.stakers[i].id,
              title: response.data.data.stakers[i].address,
              tokensslashed: '',
            });
          }
        }
        setTableData(jsonArr);
        setCheatersTableData(jsonArrCheaters);
       
        setCard1([
          {
            title: "Validators:",
            value: `${response.data.data.stakers.length}`
          },
          {
            title: "FTM staked:",
            value: `${StakedSum} (69.58%)`
          },
          {
            title: "Inflation:",
            value: "6.55%"
          },
          {
            title: "Average rewards:",
            value: "9%"
          }
        ]);

      }).catch(function (error) {
        console.log(error.message);
      });
    axios({
      method: 'get',
      url: `${api_get_epoch}`,
    })
      .then(function (response) {
        let duration = durationToDisplay(response.data.data.duration)

        let ValidatingPower = response.data.data.validatingPower;
        if (ValidatingPower === null || ValidatingPower === undefined) {
          ValidatingPower = 0;
        }
        setCard2([
          {
            title: "Epoch number:",
            value: `${response.data.data.epochNumber}`
          },
          {
            title: "End time:",
            value: `${response.data.data.endTime}`
          },
          {
            title: "Duration:",
            value: `${duration}`
          },
          {
            title: "Fee:",
            value: `${response.data.data.totalTxFee} FTM`
          },
          {
            title: "Validating power:",
            value: `${ValidatingPower}`
          }
        ]);

      }).catch(function (error) {
        console.log(error.message);
      });

  }, [Error]);  
  return (
    <section className="page-section ">
      <Container>
        <Row className="top-row">
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-grey mb-0 title-top">Validators</h2>
              <div className="d-none d-lg-block">
                <div className="breacrumb">
                  <ul className="d-flex justify-content-end">
                    <li><Link to={`/`}>Home</Link></li>
                    <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                    <li className="active">Validators</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="card-row validator-card-row mb-2 mb-lg-4 pb-lg-3">
          <Col lg={6}>
            <Card className="detail-card validator-card h-100">
              <h3 className="text-grey">Overview</h3>
              <table>
                <tbody>
                  {card1.map(({ title, value }, index) => (
                    <tr key={index}>
                      <td className="title-col">
                        <h4>{title}</h4>
                      </td>
                      <td className="info-col">
                        <h4>{value}</h4>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="detail-card validator-card h-100">
              <h3 className="text-grey">Current epoch</h3>
              <table>
                <tbody>
                  {card2.map(({ title, value }, index) => (
                    <tr key={index}>
                      <td className="title-col">
                        <h4>{title}</h4>
                      </td>

                      <td className="info-col">
                        <h4>{title === 'End time:' ? (<div><TimeAgo date={value} /></div>) : value}</h4>
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
            <div className="fantom-tabs-wrapper address-wrapper">
              <Nav tabs>
                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}> Active </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }} >Cheaters </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <DataTable
                        title=""
                        columns={columns}
                        data={TableData}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <DataTable
                        title=""
                        columns={columnsCheaters}
                        data={CheatersTableData}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default ValidatorPage;
