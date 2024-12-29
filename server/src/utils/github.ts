import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const token =process.env.GITHUB_AUTH?.trim() 
console.log('token:',token)

export const fetchUserData = async (username: string): Promise<any> => {
  try {
    console.log(username, 'username for fetching data');
    const result = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Changed from 'token' to 'Bearer'
        'Accept': 'application/vnd.github.v3+json'
      },
    });
    
    return result.data;
  } catch (error: any) {
    // Enhanced error logging
    if (error.response) {
      console.error('Error response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

// Add a function to test the token
export const testGitHubToken = async (): Promise<boolean> => {
  try {
    await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};