class Repository {
    constructor(repository) {
      this.repository = repository;
    }
    createRepository = async (data) => {
      const create = await this.repository.create(data);
      return create;
    };
    readRepository = async () => {
      const read = await this.repository.read();
      return read;
    };
    readOneRepository = async (id) => {
      const readOne = await this.repository.readOne(id);
      return readOne;
    };
    readByEmailRepository = async (email) => {
      const readEmail = await this.repository.readByEmail(email);
      return readEmail;
    };
    destroyRepository = async (id) => {
      const destroy = await this.repository.destroy(id);
      return "File deleted ID: " + destroy._id;
    };
    updateRepository = async (id, data) => {
      const update = await this.repository.update(id, data);
      return update;
    };
    paginateRepository = async ({ filter, opts }) => {
      const paginate = await this.repository.paginate({ filter, opts });
      return paginate;
    };
  }
  
  export default Repository;