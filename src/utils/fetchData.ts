import fs from 'fs';
import path from 'path';

import { ITeamItem } from '@/modules/HomePage/components/Team/TeamItem';
import { ISliderItem } from '@/types/common';

export const getTeamData = (): ITeamItem[] => {
  const filePath = path.join(process.cwd(), 'public', 'jsons', 'teamMember.json');
  const teamData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(teamData).data;
};

export const getServiceData = (): ISliderItem[] => {
  const filePath = path.join(process.cwd(), 'public', 'jsons', 'serviceData.json');
  const serviceData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(serviceData).data;
};
