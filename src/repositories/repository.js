class Repository {
    constructor(manager) {
      this.manager = manager;
    }
    createRepository = async (data) => {
      const create = await this.manager.create(data);
      return create;
    };
    readRepository = async () => {
      const read = await this.manager.read();
      return read;
    };
    readOneRepository = async (id) => {
      const readOne = await this.manager.readOne(id);
      return readOne;
    };
    readByEmailRepository = async (email) => {
      const readEmail = await this.manager.readByEmail(email);
      return readEmail;
    };
    destroyRepository = async (id) => {
      const destroy = await this.manager.destroy(id);
      return "File deleted ID: " + destroy._id;
    };
    updateRepository = async (id, data) => {
      const update = await this.manager.update(id, data);
      return update;
    };
    paginateRepository = async ({ filter, opts }) => {
      const paginate = await this.manager.paginate({ filter, opts });
      return paginate;
    };
  }
  
  export default Repository;