type Props = {
  content: string;
  style: string[];
};

const Button = (props: Props) => {
  const { content, style } = props;
  return <button className={style.join(" ")}>{content}</button>;
};

export default Button;
