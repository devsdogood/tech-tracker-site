// Prisma generates the client to the parent directory
// `node_modules`, so we need to export this for `pinger`
// to have access to it.
export { Device, User, PrismaClient } from "@prisma/client";
