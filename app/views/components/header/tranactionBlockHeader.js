import React from 'React';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import TxBlockPagination from '../../containers/pagination/txBlockPagination';

export default class TranactionBlockHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 1900,
    };
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () =>
    this.setState({
      windowWidth: window.innerWidth,
    });

  render() {
    const { windowWidth } = this.state;
    const {
      title,
      block,
      total,
      icon,
      isSearching,
      onShowList,
      currentPage,
    } = this.props;
    return (
      <Row>
        <Col md={6} className="table-title">
          <Row>
            <Col xs={6} md={12}>
              <h2 style={{ backgroundImage: `url(${icon})` }}>{title}</h2>
            </Col>
            <Col xs={6} md={12}>
              <div className="info">
                <p>{block} </p>
                <p>{total}</p>
              </div>
            </Col>
          </Row>
        </Col>
        {windowWidth >= 768 && (
          <Col md={6} className={`${isSearching && 'text-right'}`}>
            {!isSearching ? (
              <TxBlockPagination className="mr-0"
                onChangePage={this.props.onChangePage}
                currentPage={this.props.currentPage}
              />
            ) : (
              <Button color="white" className="list" onClick={() => onShowList()}>List</Button>
            )}
          </Col>
        )}
      </Row>
    );
  }
}
