const fetch = require('node-fetch');
const Discord = require('discord.js');
const YouTube = require('discord-youtube-api');
const owner = process.env.OWNER_ID;
const version = require('../package.json').version;
const parseChangelog = require('changelog-parser');
const GoogleImages = require('google-images');
const imagesClient = new GoogleImages(process.env.CSE_ID, process.env.API_GI);
const youtube = new YouTube(process.env.API_YT);
const models = require('../db/models');
const fs = require('fs');
const dailyDonuts = 100;

const aliases = {
	'id': 'myid', 'mid': 'myid',
	'invite': 'invitelink', 'inv': 'invitelink',
	'status': 'activity', 'play': 'activity',
	'fortnite': 'ftn',
	'w': 'wtt', 'weather': 'wtt',
	'ud': 'urban', 'urbandictionary': 'urban', 'udictionary': 'urban',
	'images': 'gi', 'google-images': 'gi', 'gimages': 'gi',
	'youtube': 'yt', 'video': 'yt',
	'changelog': 'log', 'clog': 'log',
	'v': 'version',
	'h': 'help',
	'setprefix': 'newprefix',
	'nick': 'setnickname', 'setnick': 'setnickname',
};

const commands = {
	'myid': {
		desc: function(prefix) {
			return `Sends own user client ID.\nWrite \`${prefix}myid\` to use.`;
		},
		process: function(client, msg) {
			msg.reply(`Your ID is ${msg.author.id}`);
		},
	},
	'ping': {
		desc: function(prefix) {
			return `Sends bot's ping.\nWrite \`${prefix}ping\` to use.`;
		},
		process: function(client, msg) {
			msg.reply(`Your ping is **${Math.round(Date.now() - msg.createdTimestamp)} ms**!`);
		},
	},
	'invitelink': {
		desc: function(prefix) {
			return `Sends bot's invite link.\nWrite \`${prefix}invitelink\` to use.`;
		},
		process: function(client, msg) {
			msg.reply(`Invite me to another server: ${process.env.INVITE_LINK}`);
		},
	},
	'activity': {
		desc: function(prefix) {
			return `Switches bot's activity!\nWrite \`${prefix}activity <listening/playing/watching> <activity>\` to use.`;
		},
		process: function(client, msg, args) {
			if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
			const type = args.shift();
			client.user.setActivity(args.join(' '), { type: type.toUpperCase() });

			switch (type.toLowerCase()) {
			case 'listening':
				msg.reply(`I'm listening to ${args.join(' ')}!`);
				break;

			case 'playing':
				msg.reply(`I'm playing ${args.join(' ')}!`);
				break;

			case 'watching':
				msg.reply(`I'm watching to ${args.join(' ')}!`);
				break;
			}
		},
	},
	'stream': {
		desc: function(prefix) {
			return `Apply a stream activity with url to bot.\nWrite \`${prefix}stream <game_name> <stream_url>\` to use.`;
		},
		process: function(client, msg, args) {
			if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
			client.user.setActivity(args[0], { type: 'STREAMING', url: args[1] });
			msg.reply(`Streaming ${args[0]}!`);
		},
	},
	'ftn': {
		desc: function(prefix) {
			return `Gets searched user fortnite status!\nWrite \`${prefix}ftn <pc/psn/xb1> <player_name>\` to use.`;
		},
		process: function(client, msg, args) {
			if (args[0] != 'pc' && args[0] != 'psn' && args[0] != 'xb1') {
				msg.channel.send('Invalid parameters!');
				return;
			}

			fetch(`https://api.fortnitetracker.com/v1/profile/${args[0]}/${(args.slice(1)).join('%20')}`, {
				method: 'GET',
				headers: {
					'TRN-Api-Key': `${process.env.API_FTN}`,
				},
			}).then(res => res.json())
				.then(userInfo => {
					try {
						msg.channel.send(`${userInfo.epicUserHandle} killed ${userInfo.lifeTimeStats[10].value} players overall!`);
					}
					catch (e) {
						msg.channel.send(userInfo.error);
					}
				});
		},
	},
	'wtt': {
		desc: function(prefix) {
			return `Gets searched location temperature in Celsius.\nWrite \`${prefix}wtt <city_name>\` to use.`;
		},
		process: function(client, msg, args) {
			fetch(`http://api.openweathermap.org/data/2.5/weather?q=${args.join('+')}&APPID=${process.env.API_WTT}`).then(res => res.json())
				.then(wttInfo => {
					try {
						msg.channel.send(`${wttInfo.name} ${Math.round(wttInfo.main.temp - 273.15)}ºC`);
					}
					catch(e) {
						msg.channel.send('Invalid location!');
					}
				});
		},
	},
	'urban': {
		desc: function(prefix) {
			return `Sends search urban dictionary description and url.\nWrite \`${prefix}urban <search>\` to use.`;
		},
		process: function(client, msg, args) {
			fetch(`https://api.urbandictionary.com/v0/define?term=${args.join('-')}`).then(res => res.json())
				.then(json => {
					msg.channel.send(`${json.list[0].definition.replace(/\[/g, '').replace(/\]/g, '')} ${json.list[0].permalink}`);
				});
		},
	},
	'gi': {
		desc: function(prefix) {
			return `Get searched image.\nWrite \`${prefix}gi <search>\` to use.`;
		},
		process: async function(client, msg, args) {
			try {
				const images = await imagesClient.search(args.join(' '));
				let replyImage = images[Math.floor(Math.random() * images.length)].url;
				if (!replyImage.endsWith('.png') && !replyImage.endsWith('.jpeg') && !replyImage.endsWith('.jpg')) {
					replyImage = `${replyImage}.jpg`;
				}
				msg.channel.send(new Discord.Attachment(replyImage));
			}
			catch (e) {
				console.error(e);
				msg.channel.send('No results!');
			}
		},
	},
	'yt': {
		desc: function(prefix) {
			return `Sends youtube searched video.\nWrite \`${prefix}yt\` to use.`;
		},
		process: async function(client, msg, args) {
			try {
				const video = await youtube.searchVideos(args.join(' '));
				msg.channel.send(`https://www.youtube.com/watch?v=${video.id}`);
			}
			catch (e) {
				console.error(e);
				msg.channel.send('No results!');
			}
		},
	},
	'ship': {
		desc: function(prefix) {
			return `Ship a couple.\nWrite \`${prefix}ship <user1> <user2>\` to use.`;
		},
		process: function(client, msg) {
			const firstUser = msg.mentions.users.first().username;
			const secondUser = msg.mentions.users.last().username;
			const shipName = `${firstUser.substring(0, 4)}${secondUser.slice(-4)}`.toLowerCase();

			msg.channel.send(`Long live to ${shipName.charAt(0).toUpperCase() + shipName.slice(1)}! 🚢`)
				.then((botMsg) => {
					botMsg.react('🚢');
				});
		},
	},
	'log': {
		desc: function(prefix) {
			return `Get bot's last version changelog.\nWrite \`${prefix}log\` to use.`;
		},
		process: function(client, msg) {
			parseChangelog('./CHANGELOG.md', (err, result) => {
				if (err) throw err;
				console.log(`Sent CHANGELOG with ${version} modifications.`);
				msg.channel.send(`\`\`\`md\n# ${result.title.toUpperCase()}\n\n## ${result.versions[0].title}\n\n${result.versions[0].body}\`\`\``);
			});
		},
	},
	'version': {
		desc: function(prefix) {
			return `Get bot version.\nWrite \`${prefix}version\` to use.`;
		},
		process: function(client, msg) {
			msg.channel.send(`My version is \`${version}\`!`);
		},
	},
	'newprefix': {
		desc: function(prefix) {
			return `Set new prefix for your server.\nWrite \`${prefix}newprefix\` to use.`;
		},
		process: async function(client, msg, args) {
			if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || (msg.author.id === owner)) {
				const server = await models.Guild.findOne({ where: { guildID: msg.channel.guild.id } });
				server.update({ prefix: args[0] });

				const prefixesFile = await JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));
				prefixesFile[server.guildID] = {
					prefix: args[0],
				};
				fs.writeFile('./data/prefixes.json', JSON.stringify(prefixesFile), () => {
					console.log('Updating prefixes.json!');
				});
				msg.channel.send(`Your server new prefix is \`${args[0]}\`!`);
			}
			else {
				msg.reply('You don\'t have permissions to do that!');
			}
		},
	},
	'help': {
		desc: function(prefix) {
			return `Get the description of the searched command.\nWrite \`${prefix}help <command>\` to use.`;
		},
		process: function(client, msg, args, prefix) {
			try {
				if(commands.hasOwnProperty(args[0])) {
					msg.channel.send(`${commands[args[0]].desc(prefix)}`);
				}
				else {
					msg.channel.send(`${commands[aliases[args[0]]].desc(prefix)}`);
				}
			}
			catch (e) {
				msg.channel.send('Invalid parameters!');
			}
		},
	},
	'debugger': {
		desc: function(prefix) {
			return `Apply a stream activity with url to bot.\nWrite \`${prefix}debugger\` to get message info.`;
		},
		process: function(client, msg) {
			if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
			msg.channel.send(`${msg.guild.name}, ${msg.guild.id}`);
			console.log(msg.guild);
		},
	},
	'daily': {
		desc: function(prefix) {
			return `Write \`${prefix}daily\` to get your daily donuts.`;
		},
		process: async function(client, msg) {
			const user = await models.User.findOne({ where: { userID: msg.author.id } });
			const hourDiff = Math.abs(user.dailyCheck.getTime() - new Date(Date.now()).getTime()) / 1000 / 60 / 60;

			if(hourDiff >= 20) {
				const donuts = user.donuts + dailyDonuts;
				user.update({
					donuts: donuts,
					dailyCheck: new Date(Date.now()),
				});

				msg.reply(`You've received **${dailyDonuts} donuts** as your daily bonus! 🍩`);
			}
			else {
				msg.reply(`It seems you already claimed your daily donuts today, you can get more in: **${20 - Math.round(hourDiff)} hours**`);
			}
		},
	},
	'kick': {
		desc: function(prefix) {
			return `Write \`${prefix}kick <user> <reason>\` to kick a server member.`;
		},
		process: function(client, msg, args) {
			if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || (msg.author.id === owner)) {
				const mentionMember = msg.mentions.members.first();
				if(!mentionMember) return msg.reply('Please mention a valid member of this server');
				if(!mentionMember.kickable) return msg.reply('I cannot kick this user! Do I have kick permissions?');
				let reason = args.slice(1).join(' ');
				if(!reason) reason = 'No reason provided';
				mentionMember.kick(reason).then((member) => {
					msg.channel.send(`${member.displayName} has been successfully kicked!`);
				}).catch((err) => {
					msg.reply(`Sorry, I couldn't ban because of: ${err}`);
				});
			}
			else {
				msg.reply('You don\'t have permissions to do that!');
			}
		},
	},
	'ban': {
		desc: function(prefix) {
			return `Write \`${prefix}ban <user> <reason>\` to ban a server member.`;
		},
		process: function(client, msg, args) {
			if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || (msg.author.id === owner)) {
				const mentionMember = msg.mentions.members.first();
				if(!mentionMember) return msg.reply('Please mention a valid member of this server');
				if(!mentionMember.bannable) return msg.reply('I cannot ban this user! Do I have ban permissions?');
				let reason = args.slice(1).join(' ');
				if(!reason) reason = 'No reason provided';
				mentionMember.ban({ reason: reason }).then((member) => {
					msg.channel.send(`${member.displayName} has been successfully banned!`);
				}).catch((err) => {
					msg.reply(`Sorry, I couldn't ban because of: ${err}`);
				});
			}
			else {
				msg.reply('You don\'t have permissions to do that!');
			}
		},
	},
	'purge': {
		desc: function(prefix) {
			return `Write \`${prefix}purge <number>\` to delete up to 100 messages.`;
		},
		process: function(client, msg, args) {
			if(msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || msg.member.hasPermission('MANAGE_MESSAGES') || msg.member.hasPermission('MANAGE_CHANNELS') || (msg.author.id === owner)) {
				const deleteCount = parseInt(args[0], 10);
				msg.delete();
				if(!deleteCount || deleteCount < 2 || deleteCount > 100) return msg.reply('Please provide a number between 2 and 100 for the number of messages to delete');
				msg.channel.bulkDelete(deleteCount);
			}
			else {
				msg.reply('You don\'t have permissions to do that!');
			}
		},
	},
	'say': {
		desc: function(prefix) {
			return `Write \`${prefix}say <what you want>\` to make the bot say what you want.`;
		},
		process: function(client, msg, args) {
			msg.delete();
			msg.channel.send(args.join(' '));
		},
	},
	'mute': {
		desc: function(prefix) {
			return `Write \`${prefix}mute <user>\` to mute temporarly a user.`;
		},
		process: async function(client, msg) {
			if(msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || msg.member.hasPermission('MANAGE_MESSAGES') || msg.member.hasPermission('MANAGE_CHANNELS') || (msg.author.id === owner)) {
				const mentionMember = msg.mentions.members.first();
				if(!mentionMember) return msg.reply('Please mention a valid member of this server');
				if(mentionMember.hasPermission('MANAGE_MESSAGES')) return msg.reply('I cannot ban this user! Do I have ban permissions?');
				let muteRole = msg.guild.roles.cache.find(role => role.name === 'Muted 🔇');
				if(!muteRole) {
					try {
						muteRole = await msg.guild.roles.create({
							data: {
								name: 'Muted 🔇',
								color: '#d49100',
								permissions: [],
							},
						});
						msg.guild.channels.cache.forEach(async (channel) => {
							await channel.updateOverwrite(muteRole, {
								SEND_MESSAGES: false,
								ADD_REACTIONS: false,
								SPEAK: false,
							});
						});
					}
					catch (err) {
						msg.reply(`Sorry, I couldn't mute because of: ${err}`);
					}
				}
				await (mentionMember.roles.add(muteRole.id));
				msg.reply(`${mentionMember.displayName} has been muted!!🔇`);
			}
			else {
				msg.reply('You don\'t have permissions to do that!');
			}
		},
	},
	'setnickname': {
		desc: function(prefix) {
			return `Write \`${prefix}setnickname <user> <nickname>\` to change a user nickname.`;
		},
		process: function(client, msg, args) {
			if(msg.member.hasPermission('CHANGE_NICKNAME') || msg.member.hasPermission('MANAGE_NICKNAMES') || (msg.author.id === owner)) {
				const mentionMember = msg.mentions.members.first();
				if(!mentionMember) return msg.reply('Please mention a valid member of this server');
				const nickname = args.slice(1).join(' ');
				mentionMember.setNickname(nickname).then(user => {
					msg.reply(`${user.displayName} nickname has been changed!!`);
				}).catch((err) => {
					msg.reply(`Sorry, I couldn't change ${mentionMember.displayName} nickname because of: ${err}`);
				});
			}
			else {
				msg.reply('You don\'t have permissions to do that!');
			}
		},
	},
	'profile': {
		desc: function(prefix) {
			return `Write \`${prefix}profile\` to see your own profile and \`${prefix}profile <user>\` to see other user profile.`;
		},
		process: async function(client, msg) {
			if(msg.mentions.users.first()) {
				const user = await models.User.findOne({ where: { userID: msg.mentions.users.first().id } });
				if(!user) return msg.channel.send('Invalid user!');
				return msg.channel.send(`**${msg.mentions.users.first().username}** is **level ${user.level}** and has **${user.donuts} donuts**!!`);
			}
			const user = await models.User.findOne({ where: { userID: msg.author.id } });
			msg.reply(`You are **level ${user.level}** and you have **${user.donuts} donuts**!!`);
		},
	},
};

module.exports = function(cmd, client, msg, args, prefix) {

	try {
		if(commands.hasOwnProperty(cmd)) {
			commands[cmd].process(client, msg, args, prefix);
		}
		else {
			commands[aliases[cmd]].process(client, msg, args, prefix);
		}
	}
	catch(e) {
		console.log('Invalid command.');
	}
};