import axios from 'axios';

const fetchDataWithRetry = async (url: string, retries = 3): Promise<any> => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const headers = {
    Authorization: `token ${token}`,
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error: any) {
      if (
        error.response?.status === 403 &&
        error.response.data.message.includes('rate limit')
      ) {
        console.log('Rate limit exceeded. Retrying...');
        await new Promise((resolve) => setTimeout(resolve, (i + 1) * 1000));
      } else {
        throw error;
      }
    }
  }
};

export const fetchUserData = async (username: string): Promise<any> => {
  try {
    const user = await fetchDataWithRetry(
      `https://api.github.com/users/${username}`
    );
    return user;
  } catch (error: any) {
    console.error('Failed to fetch user data:', error.message);
    throw new Error('Failed to fetch user data');
  }
};

export const fetchUserRepos = async (reposUrl: string): Promise<any[]> => {
  try {
    const repos = await fetchDataWithRetry(reposUrl);
    return repos;
  } catch (error: any) {
    console.error('Failed to fetch user repositories:', error.message);
    throw new Error('Failed to fetch user repositories');
  }
};
