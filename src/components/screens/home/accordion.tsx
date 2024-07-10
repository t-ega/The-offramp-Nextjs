import { useState } from "react";

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion = (props: AccordionProps) => {
  const { title, content } = props;
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="accordion_item" onClick={() => setIsActive(!isActive)}>
      <div className="accordion_title">
        <h3>{title}</h3>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className="accordion_content">{content}</div>}
    </div>
  );
};

export default Accordion;
