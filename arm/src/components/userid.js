const {v4:uuidv4}=require('uuid')
function userid(){
    const prefix='user'
    const uuid=uuidv4()
    const id=uuid.replace(/-/g,"").substring(0,8)
    return `${prefix}${id}`

}
module.exports={userid}