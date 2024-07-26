import { Ragie } from "ragie";

const ragie = new Ragie({ auth: process.env.RAGIE_API_KEY });
export default ragie;
