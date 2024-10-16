import { prisma } from "../prisma";
import { UpdateUserType, UserType } from "../types/user";

export const findUnique = async (id: string) => {
  const user = await prisma.user
    .findUnique({
      where: { id },
      omit: {
        password: true,
        refreshToken: true,
      },
      include: {
        socialLinks: true,
      },
    })
    .catch((err) => {
      throw Error(err.message);
    });
  return user;
};

export const findOne = async (data: {
  email: string;
  username?: string;
  omit?: { password?: boolean };
}) => {
  const omit = data?.omit ?? { password: true };
  const user = await prisma.user
    .findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
      omit,
    })
    .catch((err) => {
      throw Error(err.message);
    });

  return user;
};

export const create = async (data: UserType) => {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
    },
    omit: {
      password: true,
      refreshToken: true,
    },
  });
  return user;
};

export const update = async (id: string, data: UpdateUserType) => {
  // @ts-ignore
  const links = data.socialLinks && JSON.parse(data.socialLinks);
  await Promise.all(
    links.map(async (link: any) => {
      return prisma.socialLink.updateMany({
        where: { userId: id },
        data: {
          platform: link.platform,
          url: link.url,
        },
      });
    })
  );

  const user = await prisma.user
    .update({
      where: { id },
      data: {
        email: data.email,
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        picture: data.picture,
        // socialLinks: {
        //   updateMany: links.map((link: any) => ({
        //     platform: link.platform,
        //     url: link.url,
        //   })),
        // }
      },
      include: {
        socialLinks: true,
      },
      omit: {
        password: true,
        refreshToken: true,
      },
    })
    .catch((err) => {
      console.log(err);
      throw Error(err.message);
    });
  return user;
};

export const deleteUnique = async (id: string) => {
  const user = await prisma.user
    .delete({
      where: { id },
      omit: {
        password: true,
        refreshToken: true,
      },
    })
    .catch((err) => {
      throw Error(err.message);
    });

  return user;
};
