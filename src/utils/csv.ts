import type { Deal } from '../types/Deal';
import { buildMetacriticURL } from './metacritic';

const headers = [
  'Deal ID',
  'Steam ID',
  'Steam URL',
  'Title',
  'Normal Price',
  'Sale Price',
  'Metacritic URL',
];

const escapeField = (value: string | number) => {
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
};

const deal2Row = (deal: Deal) => {
  const row = [
    deal.dealId,
    deal.steamId,
    `https://store.steampowered.com/app/${deal.steamId}`,
    deal.title,
    deal.normalPrice,
    deal.salePrice,
    buildMetacriticURL(deal.metacriticLink),
  ];
  return row.map(escapeField).join(',');
};

export const generateCsv = (deals: Deal[]) => {
  const header = headers.join(',');
  const rows = deals.map(deal2Row).join('\n');
  return [header, rows].join('\n');
};


