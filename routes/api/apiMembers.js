const express = require('express')
const router = express.Router()
const members = require('../../members')
const uuid = require('uuid')

//gets all members
router.get('/', (req, res)=>{
    res.json(members)
})

//get singe memb
router.get('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `Member not found: id ${req.params.id}`})
    }

    
})
 //Create memb
 router.post('/',(req,res)=>{
    const newMemeber = {
        id: uuid.v4(),
        name : req.body.name,
        email: req.body.email,
        ststus: 'active'

    }
    if(!newMemeber.name || !newMemeber.email){
       return res.status(400).json({msg: 'Please include name and email'})
    }

    members.push(newMemeber)
    res.json(members)
    //res.redirect('/')
 })

//update member
router.put('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        const updMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg: "Member was updated", member})
            }
        })
        
    } else {
        res.status(400).json({msg: `Member not found: id ${req.params.id}`})
    }

    
})
//delete member
router.delete('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        res.json({msg: "Member deleted", 
        members: members.filter(member => member.id !== parseInt(req.params.id))
    })
    } else {
        res.status(400).json({msg: `Member not found: id ${req.params.id}`})
    }

    
})




module.exports = router