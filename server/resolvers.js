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
    }
  },
  Mutation: {
    register: async (_, { username, email, password }, ctx) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.prisma.createUser({
        username,
        email,
        password: hashedPassword
      });
      return user;
    },
    login: async (_, { username, password }, ctx) => {
      const user = await ctx.prisma.user({ username });

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
      return { message: "Logged out!"}
    } 
  }
};
