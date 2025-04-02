const db = require('../config/db')

exports.userDashboard = (req,res)=>{
    const sql = 'SELECT * FROM items'
    db.query(sql,(err,result)=>{
        if(err) throw err
        res.render('user_dashboard',{data : result})
    })
   
}
exports.searchItems = (req,res)=>{
    const {query} = req.query
    const sql = 'SELECT * FROM items WHERE name LIKE ?'
    db.query(sql,[`%${query}%`],(err,result)=>{
        if (err) throw err
        if(err){
            return res.render('user_dashboard',{error:'Gagal Melakukan Aksi'})
        }
        console.log(result)
        res.render('user_dashboard',{data : result, error:'Gagal Melakukan Aksi', error : null})
    })
}