const Tag = ({ name, weight }) => {
  console.log("weight", weight);

  return (
    <div
      style={{ background: "cyan", flex: 1, margin: 10, padding: weight, fontSize: weight * 100 }}
    >
      {name}
    </div>
  );
};

export default Tag;
