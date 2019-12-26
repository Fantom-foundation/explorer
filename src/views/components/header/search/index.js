import React from "react";
import searchMobileIconhome from 'src/assets/images/icons/search-alt.svg';
import close from 'src/assets/images/icons/btn-x.svg';
import SearchBar from 'src/views/components/SearchBar';
export default () => {
  const [showSearch, setshowSearch] = React.useState(false);
  return (
      <div className={showSearch ? 'headerSearch active' : 'headerSearch'}>
        <img alt="Search" src={searchMobileIconhome} onClick={() => setshowSearch(true)} className="icon show-mobile" />
        <img alt="Search" src={close} onClick={() => setshowSearch(false)} className="icon close-icon" />
        <SearchBar placeHolder="Search" />
      </div>
  )
}
