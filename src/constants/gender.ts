export const Gender = {
  PreferNotToSay: 'prefer_not_to_say',
  Male: 'male',
  Female: 'female',
  NonBinary: 'non_binary',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
