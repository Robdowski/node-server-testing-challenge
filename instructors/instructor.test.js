const Instructors = require('./instructor-model')
const db = require('../data/dbconfig')

describe('instructors model', () =>{
    describe('insert', () => {

        beforeEach(async() =>{
            await db('instructors').truncate()
        })

        it('inserts an instructor', async() =>{
            await Instructors.insert({name: "Brit Hemming"})

            const instructors = await db('instructors')
            expect(instructors).toHaveLength(1)
        })

        it('inserts the provided instructor', async() =>{
            await Instructors.insert({name: "Brit Hemming"})
            await Instructors.insert({name: "Christina Gorton"})

            const instructors = await db('instructors')

            expect(instructors[0].name).toBe("Brit Hemming")
            expect(instructors[1].name).toBe("Christina Gorton")
        })

        it('returns the instructor from the database', async() =>{
            let instructor = await Instructors.insert({name:"Brit Hemming"})
            expect(instructor.name).toBe("Brit Hemming")
            expect(instructor.id).toBeDefined()

            instructor = await Instructors.insert({name: "Dustin Myers", topic: "React"})
            expect(instructor.name).toBe("Dustin Myers")
            expect(instructor.topic).toBe("React")
            expect(instructor.id).toBeDefined()
        })
    })

    describe('remove', () =>{

        beforeEach(async() =>{
            await db('instructors').truncate()
        })

        it('removes an instructor', async() =>{
            await Instructors.insert({name: "Brit Hemming"})
            await Instructors.insert({name: "Christina Gorton"})

            await Instructors.remove(1)

            let table = await db('instructors')
            expect(table).toHaveLength(1)
        })
        
        it('removes the correct id', async() => {
            await Instructors.insert({name: "Brit Hemming"})
            await Instructors.insert({name: "Christina Gorton"})

            await Instructors.remove(2)
            let table = await db('instructors')
            expect(table[0].name).toBe("Brit Hemming")
            expect(table).toHaveLength(1)
        })
    })

    describe('update', () =>{

        beforeEach(async() =>{
            await db('instructors').truncate()
        })

        it('updates to the correct information', async() =>{
            await Instructors.insert({name: "Lou Hernandez"})

            await Instructors.updateInstructor({name: "Luis Hernandez"}, 1)
            await Instructors.updateInstructor({topic: "Node"}, 1)

            let table = await db('instructors')
            
            expect(table[0].name).toBe("Luis Hernandez")
            expect(table[0].topic).toBe("Node")
        })
    })

    describe('fetchAll', () =>{
        
        beforeEach(async() =>{
            await db('instructors').truncate()
        })

        it('gets the entire list of instructors', async() =>{
            await Instructors.insert({name: "Brit Hemming", topic: "HTML / CSS"})
            await Instructors.insert({name: "Christina Gorton", topic: "React I"})
            await Instructors.insert({name: "Dustin Myers", topic:"React II"})
            await Instructors.insert({name: "Luis Hernandez", topic: "Node"})

            let instructorlist = await Instructors.fetchAll()
            expect(instructorlist).toHaveLength(4)
        })
    })

    describe('fetchById', () => {

        beforeEach(async() =>{
            await db('instructors').truncate()
        })

        it('fetches only one instructor', async() => {
            await Instructors.insert({name: "Brit Hemming", topic: "HTML / CSS"})
            await Instructors.insert({name: "Christina Gorton", topic: "React I"})
            await Instructors.insert({name: "Dustin Myers", topic:"React II"})
            await Instructors.insert({name: "Luis Hernandez", topic: "Node"})

            let fetched = await Instructors.fetchById(1)
            expect(fetched).toHaveLength(1)
        })

        it('fetches the correct id', async() => {
            await Instructors.insert({name: "Brit Hemming", topic: "HTML / CSS"})
            await Instructors.insert({name: "Christina Gorton", topic: "React I"})
            await Instructors.insert({name: "Dustin Myers", topic:"React II"})
            await Instructors.insert({name: "Luis Hernandez", topic: "Node"})

            let fetched = await Instructors.fetchById(2)
            console.log(fetched)
            expect(fetched[0].id).toBe(2)
        })

    })
})