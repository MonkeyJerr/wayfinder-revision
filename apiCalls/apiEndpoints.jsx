
export const buildProgramByIdAndWindowUrl = (baseURL, id, windowStart, windowEnd) =>
  `${baseURL}/schedule/channel/${id}/window/${windowStart}/${windowEnd}`;

export const buildThumbnailsByEventIdNonRepeat = (baseURL, id) =>
  `${baseURL}/programs/${id}`;

  export const buildThumbnailsByEventIdRepeat = (baseURL, id, windowStart, windowEnd) =>
  `${baseURL}/programs/${id}/window/${windowStart}/${windowEnd}`;

  export const buildChannels = (baseURL) =>
  `${baseURL}/schedulingchannel/all`;


