/**
 * Dummy candidate data for the voting system demo
 * Each candidate has a unique symbol and party for easy identification
 */

export interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string; // Emoji symbol for easy recognition
  color: string; // HSL color for the candidate's theme
  description: string;
  slogan: string;
}

export const candidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Priya Sharma',
    party: 'Progress Party',
    symbol: '🌱',
    color: '158 64% 52%', // Green
    description: 'Advocates for sustainable development and environmental protection.',
    slogan: 'Growth with Nature',
  },
  {
    id: 'candidate-2',
    name: 'Rajesh Kumar',
    party: 'People\'s Alliance',
    symbol: '🤝',
    color: '221 83% 53%', // Blue
    description: 'Focuses on community welfare and social justice initiatives.',
    slogan: 'Together We Rise',
  },
  {
    id: 'candidate-3',
    name: 'Anita Patel',
    party: 'Innovation Front',
    symbol: '💡',
    color: '38 92% 50%', // Orange/Saffron
    description: 'Champions technology-driven solutions and digital transformation.',
    slogan: 'Ideas for Tomorrow',
  },
  {
    id: 'candidate-4',
    name: 'Vikram Singh',
    party: 'Heritage Union',
    symbol: '🏛️',
    color: '280 65% 60%', // Purple
    description: 'Preserves cultural heritage while embracing modern governance.',
    slogan: 'Roots to Future',
  },
  {
    id: 'candidate-5',
    name: 'Meera Reddy',
    party: 'Equality Movement',
    symbol: '⚖️',
    color: '174 62% 47%', // Teal
    description: 'Fights for equal rights and opportunities for all citizens.',
    slogan: 'Justice for All',
  },
  {
    id: 'candidate-6',
    name: 'Arjun Nair',
    party: 'Youth Forward',
    symbol: '🚀',
    color: '340 82% 52%', // Pink/Red
    description: 'Empowers youth through education and employment opportunities.',
    slogan: 'The Future Starts Now',
  },
];

// Voting positions/offices being voted for
export interface VotingPosition {
  id: string;
  title: string;
  description: string;
}

export const votingPositions: VotingPosition[] = [
  {
    id: 'position-1',
    title: 'State Representative',
    description: 'Represents your district in the State Legislature.',
  },
];
