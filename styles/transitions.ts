export const transitionAll = `all 250ms cubic-bezier(0.645, 0.045, 0.355, 1)`;

export const transitionHamburger = {
  before: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
  beforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
  after: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  afterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,
};
