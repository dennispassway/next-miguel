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
      <div className="container">
        {React.Children.map(children, (child) => (
          <div className="child">{child}</div>
        ))}
        <style jsx>{`
          .container {
            margin: 72px 0 0;
          }

          .child {
            margin: 0 0 72px;
          }
        `}</style>
      </div>
    )}
  </>
);
