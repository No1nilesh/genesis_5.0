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
    const { email, college, theme } = req.body;

    try {
      success = false;
      themeDb = await Event.findOne({ theme: theme });
      collegeDb = await Event.findOne({ college: college });

      if (themeDb) {
        res.status(400).send({ error: "theme is not availible" });
      }

      if (collegeDb) {
        res
          .status(400)
          .send({ error: "This college is already selected the theme" });
      }

      const themes = new Event({
        email: email,
        college: college,
        theme: theme,
      });

    const valtheme =  themes.save();
    success=true;
      if(valtheme){ 
        res.redirect(`/api/select-theme/success?data=${encodeURIComponent(JSON.stringify(req.body))}`)
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get('/success', (req , res)=>{
  const theme = JSON.parse(decodeURIComponent(req.query.data));

  res.render('success', { theme });
})

module.exports = router;


