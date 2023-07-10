
export const buildProgramByIdAndWindowUrl = (id, windowStart, windowEnd) =>
  `https://wayfinder-api-qa.cbssports.com/schedule/channel/${id}/window/${windowStart}/${windowEnd}`;
