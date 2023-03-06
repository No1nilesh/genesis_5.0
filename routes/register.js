const express = require("express");
const router = express.Router();
const Event = require("../models/theme");
const pug = require('pug');
const { body, validationResult } = require("express-validator");

// /api/select-theme


router.get("/", async(req, res)=>{
  const  events = await Event.find();
  const colleges = events.map(event => event.college);
  const Ethemes = events.map(event => event.theme);
  res.render('select',{colleges, Ethemes});
})

router.post(
  "/",
  [
    body("college", "Enter Valid College Name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("theme").isLength({ min: 3 }),
  ],
  async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('error')
    }


    
    try {
      const { email, college, theme , group_dance, fifa, nfs, cs_go, cinematic_creation, photography, blind_coding, code_hunt, meme_making, third_degree, war_of_word, surprice_event, tug_of_war, mr_ms, fashion_show} = req.body;
      success = false;
      themeDb = await Event.findOne({ theme: theme });
      collegeDb = await Event.findOne({ college: college });

      if (themeDb) {
        res.status(409).send({ error: "theme is not availible" });
      }

      if (collegeDb) {
        res
          .status(409)
          .send({ error: "This college is already selected the theme" });
      }

      const themes = new Event({
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
        code_hunt:code_hunt,
        meme_making: meme_making,
        third_degree: third_degree,
        war_of_word: war_of_word,
        surprice_event: surprice_event,
        tug_of_war: tug_of_war,
        mr_ms:mr_ms,
        fashion_show: fashion_show,
        
      });

    const valtheme =  themes.save();
    success=true;
      if(valtheme){ 
        res.redirect(`/api/register/success?data=${encodeURIComponent(JSON.stringify(req.body))}`)
      }
      res.json(themes)
    } catch (error) {
      if (res.headersSent) {
        console.error('Headers already sent', error);
      } else {
        // Handle other errors
        console.error('Error getting data from database', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
);

router.get('/success', (req , res)=>{
  const theme = JSON.parse(decodeURIComponent(req.query.data));

  res.render('success', { theme });
})

module.exports = router;


