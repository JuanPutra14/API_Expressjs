const db = require('../config/db')

exports.adminDashboard = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    
    let page = parseInt(req.query.page)|| 1
    let limit = 5
    let offset = (page - 1) * limit

    let countQuery = 'SELECT COUNT(*) AS total FROM items'
    let dataQuery = 'SELECT * FROM items LIMIT ? OFFSET ?'

    db.query(countQuery,(err,countResult)=>{
        if(err) throw err
    let totalItems = countResult[0].total;
    let totalPages = Math.ceil (totalItems/limit)
    db.query(dataQuery,[limit,offset],(err,result)=>{
        if (err) throw err
        res.render('admin_dashboard',{data : result,error : null, currentPage : page,totalPages : totalPages})
    })

})
};

exports.addItems = (req,res)=>{
    const {name,description} = req.body
    if(!req.session.user && req.session.user.role !=='admin'){
        return res.redirect('/login')
    }
    
    db.query('insert into items (name,description) VALUES (?,?)',[name,description],(err,result)=>{
        if (err) throw err
        if(err){
            return res.render('admin_dashboard',{error:'Gagal Melakukan Aksi', error : null})
        }
        console.log(result)
        res.redirect('/admin/dashboard')
    })
}
exports.searchItems = (req,res)=>{
    const {query} = req.query
    const sql = 'SELECT * FROM items WHERE name LIKE ?'
    db.query(sql,[`%${query}%`],(err,result)=>{
        if (err) throw err
        if(err){
            return res.render('admin_dashboard',{error:'Gagal Melakukan Aksi'})
        }
        console.log(result)
        res.render('admin_dashboard',{data : result, error:'Gagal Melakukan Aksi', error : null,currentPage : 1,totalPages: 1})
    })
}

exports.updateItems = (req,res)=>{
    const {id} = req.params
    const {name,description} = req.body
    if(!req.session.user && req.session.user.role !=='admin'){
        return res.redirect('/login')
    }
    
    db.query('UPDATE items SET name = ? ,description = ? WHERE id = ?',[name,description,id],(err,result)=>{
        if (err) throw err
        if(err){
            return res.render('admin_dashboard',{error:'Gagal Melakukan Aksi', error : null,currentPage : 1,totalPages: 1})
        }
        console.log(result)
        res.redirect('/admin/dashboard')
    })
}
exports.deleteItems = (req,res)=>{
    const {id} = req.params
    const sql = 'DELETE FROM items WHERE id = ?'
    db.query(sql,[id],(err,result)=>{
        if (err) throw err
        console.log(result)
        if(err){
            return res.render('admin_dashboard',{error:'Gagal Melakukan Aksi', error : null,currentPage : 1,totalPages: 1})
        }
        return res.redirect('/admin/dashboard')
    })
}