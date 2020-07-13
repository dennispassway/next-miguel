export const Container = ({ children }) => (
  <div style={{ margin: "0 auto", maxWidth: 800, padding: "100px 20px" }}>
    {React.Children.map(children, (child) => (
      <div style={{ borderBottom: "solid 1px #ddd", padding: "40px 0" }}>
        {child}
      </div>
    ))}
  </div>
);
