import React from "react";
import { FormGroup, Input } from "reactstrap";
import searchIcon from 'src/assets/images/icons/search.svg';
import searchMobileIcon from 'src/assets/images/icons/search-mobile-blue.svg';
import searchMobileIconhome from 'src/assets/images/icons/search-alt.svg';
import close from 'src/assets/images/icons/btn-x.svg';
export default () => {
  const [showSearch, setshowSearch] = React.useState(false);
  let classheader = '';

  return (
      <div className={showSearch ? 'headerSearch active' : 'headerSearch'}>
        <img alt="Search" src={searchMobileIconhome} onClick={() => setshowSearch(true)} className="icon show-mobile" />
        <img alt="Search" src={close} onClick={() => setshowSearch(false)} className="icon close-icon" />
        <FormGroup className={showSearch ? 'mb-0 d-flex align-items-center active' : 'mb-0 d-flex align-items-center'}>
          <Input type="search" placeholder="Search" />
          <button className="btn-search">
            <img alt="Search" src={searchIcon} className="icon hide-mobile" />
            <img alt="Search" src={searchMobileIcon} className="icon show-mobile" />
          </button>
        </FormGroup>
      </div>
  )
}
