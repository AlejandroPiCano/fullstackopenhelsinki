
export const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => { 
    console.log("sum:",  sum, "exercises:", part.exercises);
    return sum + part.exercises;
  }, 0);
  return <p style={{"fontWeight": "Bold"}}>Total of {total} exercises </p>;
};