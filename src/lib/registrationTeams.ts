// event.sa registration teams. Each option in the /visit form posts to the same
// endpoint; only registration_team_id changes with the type the visitor picks.
export const registrationTeams = {
  visitor: 433,
  media: 436,
  ambassador: 438,
  volunteer: 439,
} as const;

export type VisitorType = keyof typeof registrationTeams;

export const isVisitorType = (value: string): value is VisitorType =>
  Object.prototype.hasOwnProperty.call(registrationTeams, value);
