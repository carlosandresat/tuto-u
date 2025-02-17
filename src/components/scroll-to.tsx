"use client";

export default function ScrollElement({
  children,
  id,
}: {
  children: JSX.Element;
  id: string;
}) {
  const handleScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return <div onClick={handleScroll}>{children}</div>;
}
