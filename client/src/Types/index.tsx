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
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    created_at: string; 
    updated_at: string;
    pushed_at: string;
    language: string | null;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
  }