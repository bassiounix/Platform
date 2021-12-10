import { DataTypes, Model } from "@/deps.ts";

export class Users extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      length: 50,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 50
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 150
    }
  };

  static defaults = {};
}
