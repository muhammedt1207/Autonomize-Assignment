import { Request, Response } from 'express';
import { User } from '../models/User';
import { fetchGithubUser } from '../utils/github';
import { Op } from 'sequelize';

export class UserController {
  static async getUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      
      let user = await User.findOne({ where: { login: username } });
      
      if (!user) {
        const userData = await fetchGithubUser(username);
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
          created_at: userData.created_at
        });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch user' });
    }
  }

  static async getFriends(req: Request, res: Response) {
    try {
      const { username } = req.params;
      
      const user:any = await User.findOne({
        where: { login: username },
        include: [{
          model: User,
          as: 'Friends',
          through: { attributes: [] }
        }]
      });

      res.json(user?.Friends || []);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch friends' });
    }
  }

  static async searchUsers(req: Request, res: Response) {
    const { query } = req.query;
    
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { login: { [Op.iLike]: `%${query}%` } },
          { location: { [Op.iLike]: `%${query}%` } }
        ]
      }
    });

    res.json(users);
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      
      await User.destroy({
        where: { login: username }
      });

      res.json({ message: 'User soft deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const updates = req.body;
      
      const [_, updatedUsers] = await User.update(updates, {
        where: { login: username },
        returning: true
      });

      res.json(updatedUsers[0]);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    const { sort_by } = req.query as { sort_by: string };
    const validSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
    
    if (!validSortFields.includes(sort_by)) {
      return res.status(400).json({ error: 'Invalid sort field' });
    }

    try {
      const users = await User.findAll({
        order: [[sort_by, 'DESC']]
      });
      res.json(users); 
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch users' });
    }
  }
}