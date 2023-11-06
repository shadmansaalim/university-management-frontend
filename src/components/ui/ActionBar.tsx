type ActionBarProps = {
  title?: string;
  subTitle?: string;
  children?: React.ReactElement | React.ReactNode;
};

const ActionBar = ({ title, subTitle, children }: ActionBarProps) => {
  return (
    <div>
      <div style={{ margin: "8px 0px" }}>
        <h1>{title}</h1>
        <p style={{ fontSize: "20px", marginTop: "8px", color: "#8B1E3F" }}>
          {subTitle}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
