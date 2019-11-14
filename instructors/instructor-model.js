const db = require('../data/dbconfig')

const insert = instructor => {
   return db('instructors').insert(instructor, "id")
   .then(([id]) => {
       return db('instructors')
       .where({id})
       .first()
   })
}

const remove = id => {
    return db('instructors')
    .where({ id })
    .del()
}

const updateInstructor = (changes, id) => {
    return db('instructors')
    .where("id", Number(id))
    .update(changes)
}

const fetchAll = () => {
    return db('instructors')
}

const fetchById = id =>{
    return db('instructors')
    .where('id', Number(id))
    .first()
}


module.exports = { insert, remove, updateInstructor, fetchAll, fetchById }