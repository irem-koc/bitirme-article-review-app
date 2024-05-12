type Props = {
  content: string;
  htmlFor?: string;
  style: string[];
};

const Label = (props: Props) => {
  const { content, htmlFor, style } = props;
  return (
    <label htmlFor={htmlFor} className={style?.join(" ")}>
      {content}
    </label>
  );
};

export default Label;
