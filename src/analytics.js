// import ReactGA from "react-ga";
import ReactGA from "react-ga4";

const GOOGLE_ANALYTICS_TRACKING_ID = "G-PLZMQ7DP7Q"; // process.env.GOOGLE_ANALYTICS_TRACKING_ID
export const initGA = () => {
  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send(window.location.pathname + window.location.search);
};

export const trackApiCall = (action, outcome) => {
  ReactGA.event({
    category: "API",
    action: action,
    label: outcome,
  });
};
