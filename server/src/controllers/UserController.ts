import { Request, Response } from 'express';
import User from '../models/User';
import { fetchUserData } from '../utils/github';
import axios from 'axios';

export class UserController {
  static async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;

      let user = await User.findOne({ login: username });


      console.log(username)
      if (!user) {
      
        const userData = await fetchUserData(username);
        console.log(userData);

        user = await User.create({
          github_id: userData.id,
          login: userData.login,
          name: userData.name,
          location: userData.location,
          blog: userData.blog,
          bio: userData.bio,
          avatar_url: userData.avatar_url,
          public_repos: userData.public_repos,
          public_gists: userData.public_gists,
          followers: userData.followers,
          following: userData.following,
          followers_url: userData.followers_url,
          following_url: userData.following_url,
          repos_url: userData.repos_url,
          created_at: userData.created_at,
        });

      } else {


        // Check if the data is older than 24 hours
        const currentTime = new Date();
        const lastUpdated = new Date(user.updatedAt);

        const timeDifference = currentTime.getTime() - lastUpdated.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);



        if (hoursDifference >= 24) {
       
          const userData = await fetchUserData(username);
          user = await User.findOneAndUpdate(
            { login: username },
            {
              github_id: userData.id,
              login: userData.login,
              name: userData.name,
              location: userData.location,
              blog: userData.blog,
              bio: userData.bio,
              public_repos: userData.public_repos,
              public_gists: userData.public_gists,
              followers: userData.followers,
              following: userData.following,
              followers_url: userData.followers_url,
              following_url: userData.following_url,
              repos_url: userData.repos_url,
              created_at: userData.created_at,
            },
            { new: true }
          );
        }
      }



      res.json(user);
    } catch (error) {
      console.log(error);

      res.status(400).json({ error: 'Failed to fetch user' });
    }
  }


  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 5, search = '' } = req.query;
      console.log(page,limit,search,'-------------------------------------')
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const searchQuery = {
        deleted: false,
        ...(search ? { 
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } }
          ] 
        } : {})
      };

      console.log(searchQuery,'=================');
      
      let skipNumber = (pageNumber - 1) * limitNumber

      const users = await User.find(searchQuery).skip(skipNumber).limit(limitNumber);
      console.log(users, 'total users')
      const total = await User.countDocuments(searchQuery);

      res.status(200).json({ users, total, page: pageNumber, limit: limitNumber });
    } catch (error) {
      console.log('Failed to fetch users:',error)
      res.status(400).json({ error: 'Failed to fetch users' });

    }
  };




  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { deleted: true },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ message: 'User soft deleted', user });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  }




  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const updates = req.body;

      const user = await User.findOneAndUpdate(
        { login: username },
        updates,
        { new: true }
      );

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  }

  static async getUserRepos(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;

      let user = await User.findOne({ login: username });

      if (!user) {
      
        const userData = await fetchUserData(username);
        user = await User.create({
          github_id: userData.id,
          login: userData.login,
          name: userData.name,
          location: userData.location,
          blog: userData.blog,
          bio: userData.bio,
          public_repos: userData.public_repos,
          public_gists: userData.public_gists,
          followers: userData.followers,
          following: userData.following,
          followers_url: userData.followers_url,
          following_url: userData.following_url,
          repos_url: userData.repos_url,
          created_at: userData.created_at,
        });
      }

      if (user.repos_url) {
        const response = await axios.get(user.repos_url);
        const repositories = response.data;
        res.json(repositories);
      } else {
        res.status(400).json({ error: 'Cannot find the repositories' });
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to fetch repositories' });
    }
  }
}
