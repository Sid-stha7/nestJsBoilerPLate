export const isNullString = (input?: string) => {
  return (
    input === "" ||
    input === undefined ||
    input === "undefined" ||
    input === null ||
    input === "null"
  );
};
