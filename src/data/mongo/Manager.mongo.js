class MongoManager {
    constructor(Model){
        this.Model = Model
    }
    async create(data){
        try {
            const model = await this.Model.create(data)
            return model
        } catch (error) {
            throw error
        }
    }
    async read(){
        try {
            const models = await this.Model.find().lean()
            return models
        } catch (error) {
            throw error
        }
    }
    async readOne(id){
        try {
            const model = await this.Model.findById(id)
            return model
        } catch (error) {
            throw error
        }
    }
    async update(id, data){
        try {
            const model = await this.Model.findByIdAndUpdate(id, data, {new: true})
            return model
        } catch (error) {
            throw error
        }
    }
    async destroy(id){
        try {
            const model = await this.Model.findOneAndDelete(id)
            return model
        } catch (error) {
            throw error
        }
    }
}

export default MongoManager