type Props = {
  content: string;
  style: string[];
};

const Text = (props: Props) => {
  const { content, style } = props;
  return <div className={style.join(" ")}>{content}</div>;
};

export default Text;
