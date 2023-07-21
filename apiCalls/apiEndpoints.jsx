
export const buildProgramByIdAndWindowUrl = (id, windowStart, windowEnd) =>
  `https://wayfinder-api-qa.cbssports.com/schedule/channel/${id}/window/${windowStart}/${windowEnd}`;

export const buildThumbnailsByEventIdNonRepeat = (id) =>
  `https://wayfinder-api-qa.cbssports.com/programs/${id}`;

  export const buildThumbnailsByEventIdRepeat = (id, windowStart, windowEnd) =>
  `https://wayfinder-api-qa.cbssports.com/programs/${id}/window/${windowStart}/${windowEnd}`;

  export const buildChannels = () =>
  'https://wayfinder-api-qa.cbssports.com/schedulingchannel/all';


