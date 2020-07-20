import Head from "next/head";

export const StyleGuide = ({ children, clean }) => (
  <>
    <Head>
      <style
        dangerouslySetInnerHTML={{
          __html: `body { margin: 0 !important; padding: 0 !important; }`,
        }}
      />
    </Head>

    {clean ? (
      children
    ) : (
      <div style={{ margin: "72px 0 0" }}>
        {React.Children.map(children, (child) => (
          <div style={{ margin: "0 0 72px" }}>{child}</div>
        ))}
      </div>
    )}
  </>
);
