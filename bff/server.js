// @ts-check
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const CustomersApi = require("./data/CustomersApi");
const JobsApi = require("./data/JobsApi");

const resolvers = {
  Query: {
    customers: (_source, _args, { dataSources }) => dataSources.customersApi.getAllCustomers(),
  },
  Customer: {
    job: (source, _args, { dataSources }) => {
      return dataSources.jobsApi.getJob(source.jobId)
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      customersApi: new CustomersApi(),
      jobsApi: new JobsApi(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
