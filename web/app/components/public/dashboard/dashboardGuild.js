import React from 'react';

const DashboardGuild = (props) => (
  <div className="shinobu-dashboard-guild">
    <div className="shinobu-dashboard-guild-container">
      {props.guild.icon ?
        <img src={`https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.png?size=512`}/>
        :
        <span className="guild-image-backup info-white info-bold info-xsl">{props.guild.name.match(/\b(\w)/g).join('')}</span>}
      <p className="info-xsl info-white info-bold">{props.guild.name}</p>
    </div>
    {props.botGuild ?
      <a className="info-xsl info-bold success">Coming soon..</a>
      // <a href={`dashboard/${props.guild.id}`} className="info-xsl info-bold success">Manage Server</a>
      :
      <a href={`${process.env.inviteLink}&guild_id=${props.guild.id}`} target="_blank" rel="noreferrer" className="info-xsl info-bold">Set up Shinobu</a> }
  </div>
);

export default DashboardGuild;
