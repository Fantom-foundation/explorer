import React,{ Component} from 'react';
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';

class Wrapper extends  Component {
  render(){
    return (
      <React.Fragment>
      <Header />
      {this.props.children}
      </React.Fragment>
    );
  }

}
export default Wrapper;