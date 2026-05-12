export const money = (amount, currency = "R") =>
  `${currency}${Number(amount).toLocaleString("en-ZA")}`;

export const formatViewingDateTime = (startsAt) =>
  new Date(startsAt).toLocaleString("en-ZA", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
