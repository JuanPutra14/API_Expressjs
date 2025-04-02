const db = require('../config/db')

exports.thirdDashboard = (req,res)=>{
    const sql = 'SELECT * FROM items'
    if(!req.session.user && req.session.user.role !=='admin'){
        return res.redirect('/login')
    }
    db.query(sql,(err,result)=>{
        if(err) throw err

    return res.render('third_dashboard',{data : result , error : null })
    })
   
}
