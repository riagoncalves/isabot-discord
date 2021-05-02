import React from 'react';
import Link from 'next/link';
import UserDropdown from './userDropdown';


const Header = (props) => {
  return (
    <header className="shinobu-header">
      <nav className="shinobu-header-menu">
        <Link href='/'>
          <a className="title-xsl title-white">Shinobu</a>
        </Link>
        <a className="info-xsl info-white" href='/commands'>Commands</a>
        <a href={process.env.serverInvite} className="info-xsl info-white" rel="noreferrer" target="_blank">Support server</a>
      </nav>
      <div className="shinobu-header-profile">
        { props.user ? <UserDropdown user={props.user} /> : <a href='/login' className="btn-primary btn-sl">Login</a> }
      </div>
    </header>
  );
};

export default Header;
