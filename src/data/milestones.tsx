import { IMilestones } from "../features/interfaces";

type TMilestonesLengths = {
    [Key in keyof IMilestones]: {
      min: number;
      typical: number;
    };
  };

const milestonesLengths: TMilestonesLengths = {
    'concept': { min: 1, typical: 2 },
    'officialOffer': { min: 3, typical: 4 },
    'order': { min: 0, typical: 0 },
    'implementation': { min: 8, typical: 12},
    'launch': { min: 0, typical: 0},
}

export const milestoneOrder: (keyof IMilestones)[] = ['concept', 'officialOffer', 'order', 'implementation', 'launch'];

export default milestonesLengths