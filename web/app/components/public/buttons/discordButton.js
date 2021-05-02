import React from 'react';
import discordLogo from '../../../assets/images/discord.svg';

const DiscordBtn = () => (
  <a href={process.env.inviteLink} className="btn-primary btn-lg">
    <img src={discordLogo} />
    Add To Discord
  </a>
);

export default DiscordBtn;