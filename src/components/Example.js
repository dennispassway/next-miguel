import { useMiguelContext } from "./context";
import { useRouter } from "next/router";
import Link from "next/link";

export const Example = ({ children, description, title, id }) => {
  const { miguelRoot } = useMiguelContext();
  const router = useRouter();

  const component = router?.query.id;
  const root = miguelRoot || "miguel";

  if (component) {
    return children;
  }

  return (
    <div id={id}>
      <h2>{title}</h2>
      <p>{description}</p>
      {id && (
        <Link href={`/${root}?id=${id}`}>
          <a>{`/${root}?id=${id}`}</a>
        </Link>
      )}
      {children}
    </div>
  );
};
