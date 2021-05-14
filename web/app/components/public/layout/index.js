import '../../../assets/styles/index.scss';
import '../../../assets/scripts';
import React from 'react';
import Head from 'next/head';
import Header from '../header';

const Layout = (props) => (
  <main>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="format-detection" content="telephone=yes"/>
      <link rel='shortcut icon' type='image/x-icon' href='https://shinobu-discord.s3-eu-west-1.amazonaws.com/Website/favicon.ico'/>

      <meta property="og:title" content={props.title ? `${props.title} | Shinobu - Discord Bot` : 'Shinobu - Discord Bot'}/>
      <meta property="og:description" content="Your personal administration bot with custom profiles and a lot of features."/>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Shinobu - Discord Bot"/>
      <meta property="og:image" content=""/>

      <meta name="twitter:title" content={props.title ? `${props.title} | Shinobu - Discord Bot` : 'Shinobu - Discord Bot'}/>
      <meta name="twitter:description" content="Your personal administration bot with custom profiles and a lot of features."/>
      <meta name="twitter:image" content=""/>

      <title>{props.title ? `${props.title} | ` : ''}Shinobu - Discord Bot</title>
      <meta name="description" content="Your personal administration bot with custom profiles and a lot of features."/>
      <meta name="keywords" content="discord, bot, administration, anime" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;800&display=swap" rel="stylesheet"/>

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.googleTag}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html:
            `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.googleTag}');`,
        }}
      />
    </Head>
    <div className="shinobu-wrap">
      <Header user={props.user}/>
      <div  className="shinobu-wrap-container">
        {props.children}
      </div>
    </div>
  </main>
);

export default Layout;
