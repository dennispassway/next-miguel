import { useRouter } from "next/router";
import Link from "next/link";

export const Describer = ({ children, description, title, id }) => {
  const {
    query: { component },
  } = useRouter();

  if (component) {
    return children;
  }

  return (
    <div id={id}>
      <h2>{title}</h2>
      <p>{description}</p>
      {id && (
        <Link href={`/miguel-styleguide?component=${id}`}>
          <a>{`/miguel-styleguide?component=${id}`}</a>
        </Link>
      )}
      {children}
    </div>
  );
};
