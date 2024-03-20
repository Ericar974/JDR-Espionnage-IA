import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { v4 as uuidv4 } from 'uuid';
import {ScenariosSchema} from "../api-schema/scenario.t";

const prefix: string = 'sce';


interface ScenarioInstance extends Model<ScenariosSchema>, ScenariosSchema {}

export default sequelize.define<ScenarioInstance>('Scenario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => `${prefix}-${uuidv4()}`,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishedDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    missionId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Missions',
            key: 'id',
        },
    },
}, {
    tableName: 'Scenario',
});