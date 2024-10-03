import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";

export const prisma = new PrismaClient().$extends(pagination());;

async function main() {
  // ... you will write your Prisma Client queries here
  // const allUsers = await prisma.category.findUnique({
  //   where: {
  //     id: '25be4544-8dfe-4149-93a5-f159d70a76bb',
  //   }
  // })
  // console.log(allUsers,"all users");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
