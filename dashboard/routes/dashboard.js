const express = require('express');
const router = express.Router();
const moment = require("moment");
require("moment-duration-format");
const checkAuth = require('../backend/CheckAuth');
const db = require("quick.db")

 
router.get("/profile", checkAuth, async (req, res) => {

    let userObj = req.client.users.cache.get(req.user.id);

        let userSubscription = {
            undefined: "None",
            0: "None",
            1: "Nitro Classic",
            2: "Nitro Premium"
        };

        let status = {
            "online": "#43b581",
            "idle": "#faa61a",
            "dnd": "#f04747",
            "offline": "#747f8d"
        };
    
        let statusName = {
            "online": "Online",
            "idle": "Idle",
            "dnd": "Do Not Disturb",
            "offline": "Offline"
        };

        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee ⚒',
            DISCORD_PARTNER: 'Discord Partner ♾',
            PARTNERED_SERVER_OWNER: 'Partnered Server Owner ♾',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1) 🐞',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2) 🐛',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            EARLY_VERIFIED_BOT_DEVELOPER: 'Early Verified Bot Developer',
            EARLY_VERIFIED_DEVELOPER: 'Early Verified Developer',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };
    
        let userFlags;

        try {
            userFlags = userObj.flags.toArray();    
        } catch (e) {
            userFlags = [];
        }
    
        res.render("dashboard/profile", {
            tag: (req.user ? req.user.tag : "Login"),
            bot: req.client,
            userObj: userObj,
            userFlags: userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None',
            status: status[userObj.presence.status],
            statusName: statusName[userObj.presence.status],
            moment: moment,
            userSubscription: userSubscription[req.user.premium_type],
            user: req.user || null,
            message: db.fetch(`${req.user.id}_messages`) || '0'
        });
});

module.exports = router;