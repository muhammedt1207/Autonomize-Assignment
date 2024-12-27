export interface GitHubUser {
    login: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
  }
  
 export interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
  }
  