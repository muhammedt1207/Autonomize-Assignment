import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const token =process.env.GITHUB_AUTH?.trim() 

export const fetchUserData = async (username: string): Promise<any> => {
  try {
    console.log(username, 'username for fetching data');
    const result = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Accept': 'application/vnd.github.v3+json'
      },
    });
    
    return result.data;
  } catch (error: any) {
  
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};
