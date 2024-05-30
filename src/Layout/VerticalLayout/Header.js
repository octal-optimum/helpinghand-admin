import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LanguageDropdown from "../../components/Common/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../../components/Common/TopbarDropdown/NotificationDropdown";

//i18n
import { withTranslation } from "react-i18next";

//import images
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

// Redux Store
import {
  showRightSidebarAction,
  changeSidebarType,
} from "../../store/slices/layout";
import ProfileMenu from "../../components/Common/TopbarDropdown/ProfileMenu";
import AppsDropdown from "../../components/Common/TopbarDropdown/AppsDropdown";

const Header = (props) => {
  const [search, setsearch] = useState(false);
  const dispatch = useDispatch();

  const showRightSidebar = useSelector((state) => state.layout.showRightSidebar);

  
  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  const tToggle = () => {
    const body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box text-center">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="logo-sm-dark" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="logo-dark" height="24" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="logo-sm-light" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="logo-light" height="24" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
              onClick={tToggle}
            >
              <i className="ri-menu-2-line align-middle"></i>
            </button>

           
          </div>

        
        </div>
      </header>
    </React.Fragment>
  );
};

export default withTranslation()(Header);
