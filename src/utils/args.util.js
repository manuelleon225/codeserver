import { Command } from "commander";

const args = new Command();

args.option("-d", "debug", false)
args.option("-p <port>", "port")
args.option("--env <env>", "environment","prod")
args.option("--persistence <pers>", "persistence","mongo")

args.parse()
export default args.opts()