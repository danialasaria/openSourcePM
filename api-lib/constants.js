export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    personalSite: { type: 'string', minLength: 1, maxLength: 50 },
    linkedin: { type: 'string', minLength: 1, maxLength: 50 },
    bio: { type: 'string', minLength: 0, maxLength: 10000 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 1000 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 1000 },
  },
};
