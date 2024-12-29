import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  github_id: number;
  login: string;
  name?: string;
  location?: string;
  blog?: string;
  bio?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  avatar_url:string;
  following: number;
  followers_url?: string;
  following_url?: string;
  repos_url?: string;
  created_at: Date;
  deleted_at?: Date | null;
  updatedAt: Date;  
}

const UserSchema: Schema = new Schema<IUser>(
  {
    github_id: {
      type: Number,
      unique: true,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar_url:{
        type:String
    },
    location: {
      type: String,
    },
    blog: {
      type: String,
    },
    bio: {
      type: String,
    },
    public_repos: {
      type: Number,
      default: 0,
    },
    public_gists: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    followers_url: {
      type: String,
    },
    following_url: {
      type: String,
    },
    repos_url: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
