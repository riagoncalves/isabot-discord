import '../../../assets/styles/index.scss';
import '../../../assets/scripts';
import React from 'react';
import Head from 'next/head';
const Layout = (props) => (
  <main>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="format-detection" content="telephone=yes"/>
      <link rel='shortcut icon' type='image/x-icon' href='https://shinobu-discord.s3-eu-west-1.amazonaws.com/Website/favicon.ico'/>

      <meta property="og:title" content={props.title ? `${props.title} | Shinobu - Backoffice` : 'Shinobu - Backoffice'}/>
      <meta property="og:description" content="Your personal administration bot with custom profiles and a lot of features."/>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Shinobu - Backoffice"/>
      <meta property="og:image" content=""/>

      <meta name="twitter:title" content={props.title ? `${props.title} | Shinobu - Backoffice` : 'Shinobu - Backoffice'}/>
      <meta name="twitter:description" content="Your personal administration bot with custom profiles and a lot of features."/>
      <meta name="twitter:image" content=""/>

      <title>{props.title ? `${props.title} | ` : ''}Shinobu - Backoffice</title>
      <meta name="description" content="Your personal administration bot with custom profiles and a lot of features."/>
      <meta name="keywords" content="discord, bot, administration, anime" />
    </Head>
    <div className="shinobu-admin-wrap">
      {props.children}
    </div>
  </main>
);

export default Layout;
