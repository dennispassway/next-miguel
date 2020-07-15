import { useMiguelContext } from "./context";
import { useRouter } from "next/router";
import Link from "next/link";

export const Describer = ({ children, description, title, id }) => {
  const { miguelRoot } = useMiguelContext();
  const router = useRouter();

  const component = router?.query.component;
  const root = miguelRoot || "miguel";

  if (component) {
    return children;
  }

  return (
    <div id={id}>
      <h2>{title}</h2>
      <p>{description}</p>
      {id && (
        <Link href={`/${root}?component=${id}`}>
          <a>{`/${root}?component=${id}`}</a>
        </Link>
      )}
      {children}
    </div>
  );
};
