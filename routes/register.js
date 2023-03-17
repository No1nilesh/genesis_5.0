const express = require("express");
const router = express.Router();
const Event = require("../models/theme");
const pug = require('pug');
const { body, validationResult } = require("express-validator");
const catchAsyncErro = require("../Errorhandler/catchAsyncErro");

// /api/select-theme


router.get("/", async(req, res)=>{
  const  events = await Event.find();
  const colleges = events.map(event => event.college);
  const Ethemes = events.map(event => event.theme);
  res.render('select',{colleges, Ethemes});
})
router.post(
  "/",

  catchAsyncErro(
    async (req, res, next) => {
      const { email, college, theme, group_dance, fifa, nfs, cs_go, cinematic_creation, photography, blind_coding, code_hunt, meme_making, third_degree, war_of_word, surprice_event, tug_of_war, mr_ms, fashion_show } = req.body;
      try {
        // const themeDb = await Event.findOne({ theme: theme });
        const collegeDb = await Event.findOne({ college: college });

        if (collegeDb) {
          return res
            .status(404)
            .send({ error: "This college is already selected the theme" });
        }

        const themes = await Event.create({
          email: email,
          college: college,
          theme: theme,
          group_dance: group_dance,
          fifa: fifa,
          nfs: nfs,
          cs_go: cs_go,
          cinematic_creation: cinematic_creation,
          photography: photography,
          blind_coding: blind_coding,
          code_hunt: code_hunt,
          meme_making: meme_making,
          third_degree: third_degree,
          war_of_word: war_of_word,
          surprice_event: surprice_event,
          tug_of_war: tug_of_war,
          mr_ms: mr_ms,
          fashion_show: fashion_show,
        });

        if (themes) {
          const themeObj = JSON.parse(JSON.stringify(themes));
          return res.status(200).render('success', { theme: themeObj });
        }

      } catch (error) {
        if (res.headersSent) {
          console.error('Headers already sent', error);
          console.log(error)
        } else {
          // Handle other errors
          console.error('Error getting data from database', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    }
  )
);

module.exports = router