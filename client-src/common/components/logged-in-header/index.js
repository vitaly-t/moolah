import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import Nav from '../nav';
import ProfileDropdown from '../profile-dropdown';
import preventScroll from 'prevent-scroll';

const LoggedInHeader = React.createClass({
  getInitialState() {
    return {
      isOverlayNavVisible: false,
      isProfileDropdownVisible: false
    };
  },

  toggleOverlayNav(showOverlayNav) {
    let newValue;
    if (typeof showOverlayNav === 'undefined') {
      newValue = !this.state.isOverlayNavVisible;
    } else {
      newValue = showOverlayNav;
    }

    if (newValue) {
      preventScroll.on();
    } else {
      preventScroll.off();
    }

    this.setState({
      isOverlayNavVisible: newValue
    });
  },

  showProfileDropdown() {
    this.setState({
      isProfileDropdownVisible: true
    });

    preventScroll.on();
  },

  hideProfileDropdown() {
    this.setState({
      isProfileDropdownVisible: false
    });

    preventScroll.off();
  },

  render() {
    const overlayNavToggleClass = classNames({
      'is-active': this.state.isOverlayNavVisible,
      'hamburger hamburger--squeeze': true,
      'appHeader-overlayNavToggle': true
    });

    const userNameClass = classNames({
      'appHeader-userName': true,
      overlayIsOpen: this.state.isOverlayNavVisible
    });

    const profilePictureClass = classNames({
      'appHeader-profilePicture': true,
      overlayIsOpen: this.state.isOverlayNavVisible
    });

    let profileDropdown;
    if (this.state.isProfileDropdownVisible) {
      profileDropdown = <ProfileDropdown closeDropdown={this.hideProfileDropdown}/>;
    }

    return (
      <header className="appHeader">
        <div className="container padded-container appHeader-container">
          <h1 className="appHeader-appLogo">
            <Link to="/" className="appHeader-appLogo-Link">
              Moolah
            </Link>
          </h1>
          <button
            className={overlayNavToggleClass}
            onClick={() => this.toggleOverlayNav()}>
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <Nav
            isOverlayNavVisible={this.state.isOverlayNavVisible}
            toggleOverlayNav={() => this.toggleOverlayNav(false)}/>
          <div className="appHeader-accountContainer">
            <div
              className="appHeader-accountLink"
              onClick={this.showProfileDropdown}>
              <span className={userNameClass}>
                James S.
              </span>
              <img className={profilePictureClass}/>
            </div>
            {profileDropdown}
          </div>
        </div>
      </header>
    );
  }
});

export default LoggedInHeader;
