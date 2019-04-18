const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    showOrMovieData: async (_, { title }, { dataSources }) => {
      return dataSources.omdbAPI.getMediaDetails(title);
    },
    currentUser: (_, args, { prisma, user }) => {
      if (!user) {
        throw new Error("Not Authenticated! Please login/signup.");
      }

      return prisma.user({ id: user.id });
    },
    users: (_, __, { prisma }) => {
      return prisma.users();
    }
  },
  Mutation: {
    register: async (
      _,
      { data: { username, email, password } },
      { prisma }
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.createUser({
        username,
        email,
        password: hashedPassword
      });
      return user;
    },
    login: async (_, { username, password }, { prisma }) => {
      const user = await prisma.user({ username });

      if (!user) {
        throw new Error("Invalid Login");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d"
        }
      );

      return {
        token,
        user
      };
    },
    signout: (_, args, context) => {
      return { message: "Logged out!" };
    },
    updateUser: (_, { media, userId }, { prisma }) => {
      const user = prisma.user({ id: userId });
      const newUser = prisma.updateUser({
        data: {
          playlist: {
            create: media
          }
        },
        where: { id: user.id }
      });

      return {
        newUser
      };
    }
  }
};
