import { IMilestones } from "../features/interfaces";

type MilestonesLength = {
    [Key in keyof IMilestones]: {
      min: number;
      typical: number;
    };
  };

const milestonesLenght = {
    'concept': { min: 1, typical: 2 },
    'officialOffer': { min: 3, typical: 4 },
    'order': { min: 0, typical: 0 },
    'implementation': { min: 1, typical: 2},
    'launch': { min: 1, typical: 2},
}

export default milestonesLenght