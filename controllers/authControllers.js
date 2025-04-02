const db = require('../config/db')

exports.showRegister = (req,res) =>{
    res.render('register')
}
exports.showLogin = (req,res) =>{
    res.render('login')
}

exports.Register = (req,res)=>{
    const {username,password,role} = req.body
    const sql = 'INSERT INTO users (username,password,role) VALUES (?,?,?)'
    db.query(sql,[username,password,role],(err,result)=>{
        if(err) throw err
        console.log(result)
         return res.redirect('/login')
    })
}
exports.Login = (req,res)=>{
    const {username,password} = req.body
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?'
    db.query(sql,[username,password],(err,result)=>{
        if(err) throw err
        if(result.length > 0){
            req.session.user = result[0]
            if(req.session.user && req.session.user.role ==='admin'){
                return res.redirect('/admin/dashboard')
            }else{
                return res.redirect('/user/dashboard')
            }
        }else{
            return res.send('Username atau Password salah')
        }
    })
}