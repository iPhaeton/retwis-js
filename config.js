const Joi = require('@hapi/joi');
const path = require('path');
const filePath = path.join(__dirname, `.env.${process.env.NODE_ENV}`);
const dotenv = require('dotenv');
const fs = require('fs');

const schema = {
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().required(),
    SALT: Joi.string().required(),
};

let config = {};
try {
    config = dotenv.parse(fs.readFileSync(filePath));
    console.log(`Got variables from ${filePath} successfully`);
} catch (err) {
    console.log(`Cannot get variables from ${filePath}. Getting variables from process.env`);
}

console.log(`WARNING: Environment varibles from process.env (if exist) override environment variables from ${filePath}`);
config = Object.keys(schema).reduce((res, key) => (process.env[key] ? {...res, [key]: process.env[key]} : res), config);

const validateInput = (envConfig, schema) => {
    const envVarsSchema = Joi.object(schema);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
}

module.exports = validateInput(config, schema);