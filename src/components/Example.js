import { useEffect, useRef } from "react";
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
      <Container size="small">
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>
      </Container>
      <Container>
        <div style={styles.childrenContainerContainer}>
          <ChildrenContainer id={id} root={root}>
            {children}
          </ChildrenContainer>
        </div>
      </Container>
    </div>
  );
};

const Container = ({ children, size }) => (
  <div
    style={{
      margin: "0 auto",
      maxWidth: size === "small" ? 760 : 1140,
      padding: "0 20px",
    }}
  >
    {children}
  </div>
);

const ChildrenContainer = ({ children, id, root }) => {
  const backgroundRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      containerRef.current.style.width = null;
    };

    window.addEventListener("resize", onResize, false);

    return () => window.removeEventListener("resize", onResize, false);
  }, []);

  return (
    <div ref={backgroundRef} style={styles.background}>
      <div ref={containerRef} style={styles.container}>
        <div style={styles.children}>{children}</div>
        <div
          style={styles.dragButton}
          onMouseDown={(e) =>
            onDragMouseDown({
              clientX: e.clientX,
              element: containerRef.current,
              maxWidthElement: backgroundRef.current,
            })
          }
        >
          <DragIcon style={styles.dragIcon} />
        </div>
      </div>
      <div style={styles.linkContainer}>
        {id && (
          <Link href={`/${root}?id=${id}`}>
            <a style={styles.link} target="_blank" rel="noopener noreferrer">
              <LinkIcon style={styles.linkIcon} />
              <span>{`/${root}?id=${id}`}</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

const DragIcon = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M13 7H11V17H13V7Z" />
    <path d="M5.99996 7.75732L7.4218 9.17154L5.58572 11L9.99996 11V13L5.58579 13L7.41418 14.8284L5.99996 16.2426L1.75732 12L5.99996 7.75732Z" />
    <path d="M18 16.2427L16.5858 14.8285L18.4143 13H14V11L18.4142 11L16.5858 9.17161L18 7.75739L22.2427 12L18 16.2427Z" />
  </svg>
);

const LinkIcon = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.8284 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z" />
    <path d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z" />
    <path d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z" />
  </svg>
);

function onDragMouseDown({ clientX, element, maxWidthElement }) {
  let startX = clientX;
  let startWidth = parseInt(maxWidthElement.getBoundingClientRect().width, 10);

  const onDrag = ({ clientX }) => {
    const minWidth = 360;
    const maxWidth = startWidth;
    const targetWidth = startWidth + clientX - startX;
    const newWidth =
      targetWidth < minWidth
        ? minWidth
        : targetWidth > maxWidth
        ? maxWidth
        : targetWidth;
    element.style.width = `${newWidth}px`;
  };

  const onDragEnd = () => {
    window.removeEventListener("mousemove", onDrag, false);
    window.removeEventListener("mouseup", onDragEnd, false);
  };

  window.addEventListener("mousemove", onDrag, false);
  window.addEventListener("mouseup", onDragEnd, false);
}

const styles = {
  title: {
    color: "#222",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.2,
    margin: "0 0 15px",
  },
  description: {
    color: "#666",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.7,
    margin: "0 0 9px",
  },
  childrenContainerContainer: {
    margin: "24px 0 0",
  },
  background: {
    backgroundColor: "#fafafa",
  },
  container: {
    backgroundColor: "#fff",
    border: "solid 1px #ddd",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    overflow: "hidden",
    padding: "20px 60px 20px 20px",
    position: "relative",
  },
  children: {
    overflow: "hidden",
  },
  dragButton: {
    alignItems: "center",
    borderLeft: "solid 1px #ddd",
    color: "#aaa",
    cursor: "ew-resize",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
    width: 40,
  },
  dragIcon: {
    fill: "currentColor",
    height: 20,
    width: 20,
  },
  linkContainer: {
    backgroundColor: "#fff",
    borderBottom: "solid 1px #ddd",
    borderLeft: "solid 1px #ddd",
    borderRadius: 2,
    borderRight: "solid 1px #ddd",
    display: "flex",
    justifyContent: "center",
    padding: "10px 20px",
  },
  link: {
    alignItems: "center",
    display: "flex",
    color: "#2DC7FF",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.2,
    margin: "0",
  },
  linkIcon: {
    fill: "currentColor",
    height: 20,
    margin: "0 10px 0 0",
    width: 20,
  },
};
