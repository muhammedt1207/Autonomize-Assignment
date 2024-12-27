import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class User extends Model {
  public id!: number;
  public github_id!: number;
  public login!: string;
  public name!: string | null;
  public location!: string | null;
  public blog!: string | null;
  public bio!: string | null;
  public public_repos!: number;
  public public_gists!: number;
  public followers!: number;
  public following!: number;
  public created_at!: Date;
  public deleted_at!: Date | null;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  github_id: {
    type: DataTypes.INTEGER,
    unique: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  blog: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  public_repos: DataTypes.INTEGER,
  public_gists: DataTypes.INTEGER,
  followers: DataTypes.INTEGER,
  following: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  modelName: 'User',
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
});