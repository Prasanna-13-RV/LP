const express = require("express");
const router = express.Router();
const Motorcycle = require("../model/motorcycle");

router.get('/', async (req,res) => {
    const Motorcycles = await Motorcycle.find({})
    res.render("motorcycle" , { Motorcycles })
})

router.get('/motorcycle/add', (req,res) => {
    res.render("add")
})

router.post('/motorcycle/add', async(req,res) => {
    const motorcycle = await new Motorcycle(req.body.motorcycle)
    await motorcycle.save()
    res.redirect(`/motorcycle/${motorcycle._id}`)
})

router.get('/motorcycle/:id', async(req,res) => {
    const motorcycle = await Motorcycle.findById(req.params.id)
    res.render("show", {motorcycle})
})

router.get('/motorcycles/:id/update', async(req,res) => {
    const motorcycle = await Motorcycle.findById(req.params.id)
    res.render("update", {motorcycle})
})

router.put('/motorcycle/:id', async(req,res) => {
    const motorcycle = await Motorcycle.findByIdAndUpdate(req.params.id,{...req.body.motorcycle})
    await motorcycle.save()
    res.redirect(`/motorcycle/${motorcycle._id}`)
})

router.delete('/motorcycles/:id/delete', async(req,res) => {
    await Motorcycle.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router;