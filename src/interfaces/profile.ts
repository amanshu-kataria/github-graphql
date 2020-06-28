export interface IEdgeNode<T> {
  edges: {
    cursor: string;
    node: T;
  }[];
  totalCount: number;
}

export interface IFollower {
  avatarUrl: string;
  bio: string;
  name: string;
  url: string;
  __typename: 'User';
}

export interface IFollowing {
  avatarUrl: string;
  bio: string;
  name: string;
  url: string;
  __typename: 'User';
}

export interface IRepository {
  createdAt: string;
  description: null;
  id: string;
  isFork: false;
  isPrivate: false;
  name: string;
  primaryLanguage: { color: string; name: string; __typename: 'Language' };
  stargazers: { totalCount: number; __typename: 'StargazerConnection' };
  url: string;
  watchers: { totalCount: number; __typename: 'UserConnection' };
  __typename: 'Repository';
}

export interface IStarredRepository {
  description: string;
  name: string;
  url: string;
  __typename: 'Repository';
}

export interface IGithubProfile {
  followers?: IEdgeNode<IFollower>;
  following?: IEdgeNode<IFollowing>;
  repositories?: IEdgeNode<IRepository>;
  starredRepositories?: IEdgeNode<IStarredRepository>;
  loading?: boolean;
}

export interface IQueryResponse<T> {
  data: {
    user: T;
  };
}

export interface IProfileResponse
  extends IQueryResponse<
    IGithubProfile & {
      bio: string;
      createdAt: string;
      email: string;
    }
  > {}

export interface IUserQueryResponse extends IQueryResponse<IGithubProfile> {}
