import Head from "next/head";
import { Container } from "./Container";

export const StyleGuide = ({ children, clean }) => (
  <>
    <Head>
      <style
        dangerouslySetInnerHTML={{
          __html: `body { margin: 0 !important; padding: 0 !important; }`,
        }}
      />
    </Head>

    {clean ? children : <Container>{children}</Container>}
  </>
);
