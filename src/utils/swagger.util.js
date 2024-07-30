import __dirname from '../../utils.js'

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "CODESERVER SHOP API",
            description: "This is a ecommerce developed into coderhouse course."
        }
    },
    apis: [__dirname+"/src/docs/*.yaml"]
}

export default options;