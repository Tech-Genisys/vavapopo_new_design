const RevalidationHelper = async (pathOrTag, type = "path") => {
  await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ pathOrTag, type }),
  });
};

export default RevalidationHelper;
