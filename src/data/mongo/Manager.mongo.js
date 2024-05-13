class MongoManager {
    constructor(Model){
        this.Model = Model
    }
    async create(data){
        try {
            const model = await this.Model.create(data);
            return model
        } catch (error) {
            throw error
        }
    }
    async read(filter){
        try {
            const models = await this.Model.find(filter).lean();
            return models
        } catch (error) {
            throw error
        }
    }
    async readOne(id){
        try {
            const model = await this.Model.findById({_id: id}).lean();
            console.log(model);
            return model
        } catch (error) {
            throw error
        }
    }
    async update(id, data){
        try {
            const model = await this.Model.findByIdAndUpdate({_id: id}, data, {new: true}).lean();
            return model
        } catch (error) {
            throw error
        }
    }
    async destroy(id){
        try {
            const model = await this.Model.findByIdAndDelete({_id: id});
            return model
        } catch (error) {
            throw error
        }
    }
}

export default MongoManager