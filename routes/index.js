const Tracker = require("../model/Tracker");
const router = require("express").Router();
const statusNumber = require("../constants");
const { ensureAuthenticated } = require("../config/auth")

router.get("/", (req, res) => {
    try {
        return res.render("index", { layout: "layout", req });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/track", (req, res) => {
    try {
        return res.render("track", { layout: "layout", req });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/tracking", async (req, res) => {
    try {
        const trackingNumber = req.query.q.trim();
        const tracker = await Tracker.findOne({ trackingNumber });
        let statusN = 1;
        if (tracker) {
            statusN = statusNumber[tracker.status];
        }
        return res.render("tracking", { layout: "layout", req, tracker, statusN });
    }
    catch (err) {
        console.log(err)
        return res.redirect("/");
    }
});

router.get("/create-tracker", ensureAuthenticated, (req, res) => {
    try {
        const trackingNumber = `PHW-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000).toString(36).toLocaleUpperCase()}`
        return res.render("createTracker", { layout: "layout2", req, trackingNumber });
    }
    catch (err) {
        return res.redirect("/dashboard");
    }
});

router.post("/create-tracker", ensureAuthenticated, async (req, res) => {
    try {
        const newTracker = new Tracker({
            ...req.body
        });
        await newTracker.save();
        req.flash("success_msg", "Tracker added successfully");
        return res.redirect("/create-tracker");
    }
    catch (err) {
        return res.render("createTracker", { layout: "layout2", ...req.body });
    }
});

router.get("/manage-tracker/:id", ensureAuthenticated, async (req, res) => {
    try {
        const trackingNumber = req.params.id;
        const tracker = await Tracker.findOne({ trackingNumber });
        return res.render("manage", { layout: "layout2", req, tracker });
    }
    catch (err) {
        return res.redirect("/dashboard");
    }
});

router.post("/manage-tracker/:id", ensureAuthenticated, async (req, res) => {
    try {
        const trackingNumber = req.params.id;
        const {
            currentLocation,
            status,
            message
        } = req.body;
        await Tracker.updateOne({ trackingNumber }, {
            currentLocation,
            status,
            message
        });
        req.flash("success_msg", "Tracker updated successfully");
        return res.redirect(`/manage-tracker/${trackingNumber}`)
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.post("/delete-tracker/", ensureAuthenticated, async (req, res) => {
    try {
        const {
            trackingNumber
        } = req.body;
        await Tracker.deleteOne({ trackingNumber });
        req.flash("success_msg", "Tracker deleted successfully");
        return res.redirect(`/dashboard`)
    }
    catch (err) {
        return res.redirect("/");
    }
});


router.get("/admin", ensureAuthenticated, (req, res) => {
    try {
        return res.render("dashboard", { layout: "layout2", req });
    }
    catch (err) {
        return res.redirect("/");
    }
})

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
    try {
        const trackers = await Tracker.find();
        return res.render("dashboard", { layout: "layout2", req, trackers });
    }
    catch (err) {
        return res.redirect("/");
    }
})






module.exports = router;