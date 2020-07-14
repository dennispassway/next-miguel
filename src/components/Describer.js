import { useRouter } from "next/router";
import Link from "next/link";

export const Describer = ({ children, description, title, id }) => {
  const router = useRouter();
  const component = router?.query.component;

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
