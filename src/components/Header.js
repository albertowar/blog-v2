import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';

export default class Header extends React.Component {
  render() {
    return (
      <header id="masthead" className={'site-header ' + _.get(this.props, 'pageContext.site.siteMetadata.header.background', null)}>
        <div className="site-header-wrap">
          <div className="site-header-inside">
            <div className="site-branding">
              {_.get(this.props, 'pageContext.site.siteMetadata.header.profile_img', null) && (
                <p className="profile">
                  <Link to={withPrefix('/')}><img src={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.profile_img', null))}
                    className="avatar" alt="Author Avatar" /></Link>
                </p>
              )}
              <div className="site-identity">
                <p className="site-title"><Link to={withPrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title', null)}</Link></p>
                {_.get(this.props, 'pageContext.site.siteMetadata.header.tagline', null) && (
                  <p className="site-description">{_.get(this.props, 'pageContext.site.siteMetadata.header.tagline', null)}</p>
                )}
              </div>
              {(_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) || _.get(this.props, 'pageContext.site.siteMetadata.header.has_social', null)) && (
                <button id="menu-toggle" className="menu-toggle"><span className="screen-reader-text">Menu</span><span className="icon-menu"
                  aria-hidden="true" /></button>
              )}
            </div>
            {(_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) || _.get(this.props, 'pageContext.site.siteMetadata.header.has_social', null)) && (
              <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                <div className="site-nav-wrap">
                  <div className="site-nav-inside">
                    {_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) && (
                      <ul className="menu">
                        {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links', null), (action, action_idx) => {
                          let pageUrl = _.trim(_.get(this.props, 'pageContext.url', null), '/');
                          let actionUrl = _.trim(_.get(action, 'url', null), '/');
                          return (
                            <li key={action_idx} className={classNames('menu-item', { 'current-menu-item': pageUrl === actionUrl, 'menu-button': _.get(action, 'style', null) === 'button' })}>
                              <Link className={classNames({ 'button': _.get(action, 'style', null) === 'button' })} to={withPrefix(_.get(action, 'url', null))}{...(_.get(action, 'new_window', null) ? ({ target: '_blank', rel: 'noopener' }) : null)}>{_.get(action, 'label', null)}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </nav>
            )}
          </div>
          {_.get(this.props, 'pageContext.site.siteMetadata.header.has_social', null) && (
            <div className="social-links">
              {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.social_links', null), (action, action_idx) => (
                action && (
                  <Link key={action_idx} className={classNames({ 'button button-icon': _.get(action, 'style', null) === 'icon' })} to={withPrefix(_.get(action, 'url', null))}{...(_.get(action, 'new_window', null) ? ({ target: '_blank', rel: 'noopener' }) : null)}>
                    {((_.get(action, 'style', null) === 'icon') && _.get(action, 'icon_class', null)) ? (<React.Fragment>
                      <span className={'fab ' + _.get(action, 'icon_class', null)} aria-hidden="true" /><span className="screen-reader-text">{_.get(action, 'label', null)}</span>
                    </React.Fragment>) :
                      _.get(action, 'label', null)
                    }
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </header>
    );
  }
}