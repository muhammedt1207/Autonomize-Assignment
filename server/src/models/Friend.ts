import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User';

export class Friend extends Model {
  public user_id!: number;
  public friend_id!: number;
}

Friend.init({
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  friend_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Friend',
  timestamps: false
});