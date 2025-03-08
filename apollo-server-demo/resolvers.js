const resolvers = {
  Query: {
    allBusinesses: (obj, args, context, info) => {
      // вернуть список всех компаний
      return context.db.businesses;
    },
    businessBySearchTerm: (obj, args, context, info) => {
      // TODO: отыскать компании, соответствующие условиям в запросе
      return context.db.businesses;
    }
  },
  Business: {
    reviews: (obj, args, context, info) => {
      // TODO: отыскать отзывы для конкретной компании
    },
    avgStars: (obj, args, context, info) => {
      // TODO: вычислить средний рейтинг
    }
  },
  Review: {
    user: (obj, args, context, info) => {
      // TODO: отыскать пользователя, оставившего отзыв
    },
    business: (obj, args, context, info) => {
      // TODO: отыскать компанию для этого отзыва
    }
  },
  User: {
    reviews: (obj, args, context, info) => {
      // TODO: отыскать все отзывы, оставленные этим пользователем
    }
  }
};

module.exports = resolvers;